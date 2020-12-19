import type { DocumentClient } from 'aws-sdk/clients/dynamodb';

interface ArcTableClient {
  get(
    key: DocumentClient.GetItemInput['Key']
  ): Promise<DocumentClient.GetItemOutput['Item']>;
  query(
    params: Omit<DocumentClient.QueryInput, 'TableName'>
  ): Promise<DocumentClient.QueryOutput>;
  put(
    params: DocumentClient.PutItemInput['Item']
  ): Promise<DocumentClient.PutItemInput['Item']>;
  scan(
    param: Omit<DocumentClient.ScanInput, 'TableName'>
  ): Promise<DocumentClient.ScanOutput>;
}

export interface Data {
  [table: string]: ArcTableClient;
}

interface Http {
  helpers: {
    url(pathname: string): string;
    bodyParser<T = Record<string, unknown>>(req: Record<string, unknown>): T;
  };
}
interface Arc {
  http: Http;
  static(filename: string): string;
  tables(): Promise<Data>;
}

export default Arc;
