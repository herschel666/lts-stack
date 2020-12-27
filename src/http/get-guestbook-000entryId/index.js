// @ts-check

/**
 * @typedef {import('aws-sdk/clients/dynamodb').AttributeMap} AttributeMap
 * @typedef {import('../../typings/aws').APIGatewayEvent} APIGatewayEvent
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 * @typedef {import('../../typings/components').Entry} Entry
 * @typedef {import('../../typings/architect_shared').GuestbookEntry} GuestbookEntry
 * @typedef {import('../../typings/architect_shared').ddb} ddb
 */

/** @type {{ ddb: ddb }} */
const { ddb } = require('@architect/shared');

const { html, page, components } = require('@architect/views');

const { Page, Heading, Comment } = components;

/**
 * @param {object} props
 * @param {string} props.content
 * @returns {string}
 */
const Body = ({ content: children }) => Page({ children });

/**
 * @typedef {{ pathParameters: { entryId: string } }} Params
 * @typedef {APIGatewayEvent & Params} AGWRequest
 *
 * @param {AGWRequest} req
 * @returns {Promise<Response>}
 */
exports.handler = async (req) => {
  const { entryId } = req.pathParameters;
  /** @type {number} */
  let statusCode;
  /** @type {GuestbookEntry} */
  let entry;

  try {
    entry = await ddb.getGuestbookEntry(entryId);
    statusCode = entry ? 200 : 404;
  } catch (err) {
    console.log(err);
    statusCode = 500;
  }

  const content =
    statusCode === 500
      ? Heading({ text: 'An error occured.' })
      : entry
      ? html`
          <a
            class="p-get-guestbook-000entry-id__back"
            href=${`/guestbook#entry-${entryId}`}
          >
            back
          </a>
          <hr />
          ${Comment({
            entryId: entry.entryId,
            author: entry.author,
            createdAt: entry.createdAt,
            message: entry.message,
            detail: true,
          })}
        `
      : Heading({ text: 'Nothing found.' });

  return {
    statusCode,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('Guestbook', Body({ content })),
  };
};
