import { putGuestbookEntry } from '../../util/ddb';

type Request = Record<string, unknown> & {
  body: string;
};

interface Payload {
  author?: string;
  message?: string;
  createdAt?: string;
}

interface Response {
  statusCode: number;
  headers: { [header: string]: string };
  body: string;
}

const getPayload = (body: string): Payload => {
  try {
    return JSON.parse(Buffer.from(body, 'base64').toString('utf8'));
  } catch (err) {
    console.log(err);
    return {};
  }
};

const validate = (...fields: string[]): boolean =>
  fields.reduce(
    (prev, value) => prev && typeof value === 'string' && value.length > 0,
    true
  );

export const handler = async (req: Request): Promise<Response> => {
  const { author, message, createdAt } = getPayload(req.body);
  const isValid = validate(author, message, createdAt);
  let statusCode = isValid ? 200 : 400;
  let entryId;

  if (isValid) {
    try {
      entryId = await putGuestbookEntry({ author, message, createdAt });
    } catch (err) {
      console.log(err);
      statusCode = 500;
    }
  }

  return {
    statusCode,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/json; charset=utf8',
    },
    body: entryId ? JSON.stringify({ entryId }) : '',
  };
};
