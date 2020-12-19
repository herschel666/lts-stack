/**
 * @typedef {import('../../typings/architect_functions').Data} ArcData
 * @typedef {import('../../typings/architect_shared').DDB} DDB
 */

/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');
const { nanoid } = require('nanoid');

/**
 * @type {DDB['getGuestbookEntries']}
 */
exports.getGuestbookEntries = async () => {
  /** @type {ArcData} */
  const data = await arc.tables();
  const currentTime = Math.round(Date.now() / 1000);
  const query = {
    IndexName: 'GSI1PK-GSI1SK-index',
    KeyConditionExpression: 'GSI1PK = :GuestbookEntry',
    FilterExpression: '_ttl >= :CurrentTime',
    ExpressionAttributeValues: {
      ':GuestbookEntry': 'GUESTBOOK_ENTRY',
      ':CurrentTime': currentTime,
    },
    ProjectionExpression: 'entryId, author, message, createdAt',
    scanIndexForward: false,
  };
  const { Items: guestbookEntries = [] } = await data['lts-stack'].query(query);

  return guestbookEntries;
};

/**
 * @type {DDB['getGuestbookEntry']}
 */
exports.getGuestbookEntry = async (entryId) => {
  /** @type {ArcData} */
  const data = await arc.tables();
  const compositeKey = `GUESTBOOK_ENTRY#${entryId}`;
  const entry = await data['lts-stack'].get({
    PK: compositeKey,
    SK: compositeKey,
  });
  return entry;
};

/**
 * @type {DDB['putGuestbookEntry']}
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
