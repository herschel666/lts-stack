export interface GuestbookInput {
  author: string;
  message: string;
  createdAt: string;
}

export type GuestbookEntry = { entryId: string } & GuestbookInput;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GuestbookEntryGuard = (item: any) => item is GuestbookEntry;

export interface ddb {
  getGuestbookEntries(): Promise<GuestbookEntry[]>;
  getGuestbookEntry(entryId: string): Promise<GuestbookEntry | null>;
  putGuestbookEntry(args: GuestbookInput): Promise<string>;
}
