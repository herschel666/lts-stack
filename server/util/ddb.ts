import arc from '@architect/functions';
import { nanoid } from 'nanoid';
import type { ItemList, AttributeMap } from 'aws-sdk/clients/dynamodb';

export const getGuestbookEntries = async (): Promise<ItemList> => {
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

export const getGuestbookEntry = async (
  entryId: string
): Promise<AttributeMap> => {
  const data = await arc.tables();
  const compositeKey = `GUESTBOOK_ENTRY#${entryId}`;
  const entry = await data['lts-stack'].get({
    PK: compositeKey,
    SK: compositeKey,
  });
  return entry;
};

interface PutGuestbookEntryArgs {
  author: string;
  message: string;
  createdAt: string;
}
export const putGuestbookEntry = async (
  args: PutGuestbookEntryArgs
): Promise<string> => {
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
