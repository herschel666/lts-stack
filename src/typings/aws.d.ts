import type { APIGatewayProxyResult } from 'aws-lambda';

export type { APIGatewayEvent } from 'aws-lambda';

type AGWResult = Omit<APIGatewayProxyResult, 'body'>;

export interface APIGatewayResult extends AGWResult {
  body?: string;
}
