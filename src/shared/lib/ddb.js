// @ts-check

/**
 * @typedef {import('../../typings/architect_functions').Data} ArcData
 * @typedef {import('../../typings/architect_shared').GuestbookEntry} GuestbookEntry
 * @typedef {import('../../typings/architect_shared').GuestbookEntryGuard} GuestbookEntryGuard
 * @typedef {import('../../typings/architect_shared').ddb} ddb
 */

/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');
const { nanoid } = require('nanoid');

/**
 * @type {GuestbookEntryGuard}
 */
const isGuestbookEntry = (item) => {
  return (
    typeof item.author === 'string' &&
    typeof item.message === 'string' &&
    typeof item.createdAt === 'string' &&
    typeof item.entryId === 'string'
  );
};

/**
 * @type {ddb['getGuestbookEntries']}
 */
exports.getGuestbookEntries = async () => {
  /** @type {ArcData} */
  const data = await arc.tables();
  const currentTime = Math.round(Date.now() / 1000);
  const query = {
    IndexName: 'GSI1PK-GSI1SK-index',
    KeyConditionExpression: 'GSI1PK = :GuestbookEntry',
    FilterExpression: '#ttl >= :CurrentTime',
    ExpressionAttributeNames: {
      '#ttl': '_ttl',
    },
    ExpressionAttributeValues: {
      ':GuestbookEntry': 'GUESTBOOK_ENTRY',
      ':CurrentTime': currentTime,
    },
    ProjectionExpression: 'entryId, author, message, createdAt',
    scanIndexForward: false,
  };
  const { Items: items = [] } = await data['lts-stack'].query(query);
  /** @type {GuestbookEntry[]} */
  const guestbookEntries = items
    .map((item) => (isGuestbookEntry(item) ? item : null))
    .filter(Boolean);

  return guestbookEntries;
};

/**
 * @type {ddb['getGuestbookEntry']}
 */
exports.getGuestbookEntry = async (entryId) => {
  /** @type {ArcData} */
  const data = await arc.tables();
  const compositeKey = `GUESTBOOK_ENTRY#${entryId}`;
  const entry = await data['lts-stack'].get({
    PK: compositeKey,
    SK: compositeKey,
  });
  return isGuestbookEntry(entry) ? entry : null;
};

/**
 * @type {ddb['putGuestbookEntry']}
 */
exports.putGuestbookEntry = async (args) => {
  /** @type {ArcData} */
  const data = await arc.tables();
  const entryId = nanoid();
  const compositeKey = `GUESTBOOK_ENTRY#${entryId}`;
  const ttl = Math.round((Date.now() + 3600 * 24 * 1000) / 1000);
  const baseArgs = {
    PK: compositeKey,
    SK: compositeKey,
    GSI1PK: 'GUESTBOOK_ENTRY',
    GSI1SK: `${compositeKey}#${args.createdAt}`,
    _ttl: ttl,
    entryId,
  };
  await data['lts-stack'].put({ ...baseArgs, ...args });
  return entryId;
};
