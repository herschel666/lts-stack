// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayEvent} APIGatewayEvent
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 * @typedef {import('../../typings/architect_shared').GuestbookInput} GuestbookInput
 * @typedef {import('../../typings/architect_shared').ddb} ddb
 *
 * @typedef {{
 *   author?: string;
 *   message?: string;
 *   createdAt?: string;
 * }} Payload
 */

/** @type {{ ddb: ddb }} */
const { ddb } = require('@architect/shared');
/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');

/** @type {(keyof Payload)[]} */
const payloadKeys = ['author', 'message', 'createdAt'];

/**
 * @param {AGWRequest} req
 * @returns {Payload}
 */
const getPayload = (req) => {
  try {
    /** @template {Payload} T */
    return arc.http.helpers.bodyParser(req);
  } catch (err) {
    console.log(err);
    return {};
  }
};

/**
 * @param {string} date
 * @returns {boolean}
 */
const isValidDate = (date) => {
  try {
    return typeof new Date(date).toISOString() === 'string';
  } catch {
    return false;
  }
};

/**
 *
 * @param  {Record<string, unknown>} payload
 * @returns {payload is GuestbookInput}
 */
const validate = (payload) =>
  Object.entries(payload).reduce(
    /**
     * @param {boolean} prev
     * @param {[string, unknown]} value
     */
    (prev, [key, value]) => {
      let isValid =
        prev &&
        payloadKeys.includes(
          // @ts-ignore
          key
        ) &&
        typeof value === 'string' &&
        value.length > 0;

      if (isValid && key === 'createdAt' && typeof value === 'string') {
        isValid = isValidDate(value);
      }
      return isValid;
    },
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
  const payload = getPayload(req);
  const isValid = validate(payload);
  let statusCode = isValid ? 200 : 400;
  /** @type {string} */
  let entryId;

  if (isValid) {
    try {
      entryId = await ddb.putGuestbookEntry({
        author: payload.author,
        message: payload.message,
        createdAt: payload.createdAt,
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
