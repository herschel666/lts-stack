/**
 * @typedef {import('../../typings/components').Entry} Entry
 * @typedef {Entry & { detail?: boolean }} Props
 */

const format = require('date-fns/format');
/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');

const { html } = require('../lib/html');

/**
 * @param {Pick<Props, 'author' | 'entryId' | 'detail'>} props
 * @returns {string}
 */
const Author = ({ author, entryId, detail }) => {
  const inner = detail
    ? author
    : html`<a
        class="c-comment__author-link"
        href=${arc.http.helpers.url(`/guestbook/${entryId}`)}
      >
        ${author}
      </a>`;
  return html`<strong>${inner}</strong>`;
};

/**
 * @param {Props} props
 * @returns {string}
 */
exports.Comment = ({
  entryId,
  author,
  message: messageText,
  createdAt,
  detail,
}) => html`
  <figure class="c-comment" id="entry-${entryId}">
    <header class="c-comment__header">
      <${Author} author=${author} entryId=${entryId} detail=${detail} />
      <time class="c-comment__time" datetime=${createdAt}>
        ${format(new Date(createdAt), 'yyyy/MM/dd')}
      </time>
    </header>
    <p class="c-comment__message">${messageText}</p>
  </figure>
`;
