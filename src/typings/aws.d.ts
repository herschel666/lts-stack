import type { APIGatewayProxyResult } from 'aws-lambda';

export type { APIGatewayEvent } from 'aws-lambda';

type Obj = Record<string, string>;
type AGWResult = Omit<APIGatewayProxyResult, 'body'>;

export interface APIGatewayResult extends AGWResult {
  body?: string;
}
