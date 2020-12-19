import type { ItemList, AttributeMap } from 'aws-sdk/clients/dynamodb';

interface GuestbookEntry {
  author: string;
  message: string;
  createdAt: string;
}

export interface DDB {
  getGuestbookEntries(): Promise<ItemList>;
  getGuestbookEntry(entryId: string): Promise<AttributeMap>;
  putGuestbookEntry(args: GuestbookEntry): Promise<string>;
}
