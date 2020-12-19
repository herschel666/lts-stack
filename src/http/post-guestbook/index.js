/**
 * @typedef {import('../../typings/aws').APIGatewayEvent} APIGatewayEvent
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 * @typedef {import('../../typings/architect_shared').DDB} DDB
 *
 * @typedef {{
 *   author?: string;
 *   message?: string;
 *   createdAt?: string;
 * }} Payload
 */

/** @type {{ ddb: DDB }} */
const shared = require('@architect/shared');

/**
 * @param {string} body
 * @returns {Payload}
 */
const getPayload = (body) => {
  try {
    return JSON.parse(Buffer.from(body, 'base64').toString('utf8'));
  } catch (err) {
    console.log(err);
    return {};
  }
};

/**
 *
 * @param  {...string[]} fields
 * @returns {boolean}
 */
const validate = (...fields) =>
  fields.reduce(
    (prev, value) => prev && typeof value === 'string' && value.length > 0,
    true
  );

/**
 * @typedef {{ body: string }} Body
 * @typedef {APIGatewayEvent & Body} AGWRequest
 *
 * @param {AGWRequest} req
 * @returns {Promise<Response>}
 */
exports.handler = async (req) => {
  const { author, message, createdAt } = getPayload(req.body);
  const isValid = validate(author, message, createdAt);
  let statusCode = isValid ? 200 : 400;
  /** @type {string} */
  let entryId;

  if (isValid) {
    try {
      entryId = await shared.ddb.putGuestbookEntry({
        author,
        message,
        createdAt,
      });
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
