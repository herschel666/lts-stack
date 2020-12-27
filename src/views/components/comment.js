// @ts-check

/**
 * @typedef {import('../../typings/components').Entry} Entry
 * @typedef {Entry & { detail?: boolean }} Props
 */

/** @type {import('date-fns/format')['default']} */
// @ts-ignore
const format = require('date-fns/format');

const { html } = require('../lib/html');

/**
 * @param {Pick<Props, 'author' | 'entryId' | 'detail'>} props
 * @returns {string}
 */
const Author = ({ author, entryId, detail }) => {
  const inner = detail
    ? author
    : html`<a class="c-comment__author-link" href=${`/guestbook/${entryId}`}>
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
  author: authorName,
  message: messageText,
  createdAt,
  detail,
}) => {
  const author = Author({
    author: authorName,
    entryId,
    detail,
  });
  const time = format(new Date(createdAt), 'yyyy/MM/dd');

  return html`
    <figure class="c-comment" id="entry-${entryId}">
      <header class="c-comment__header">
        ${author}
        <time class="c-comment__time" datetime=${createdAt}> ${time} </time>
      </header>
      <p class="c-comment__message">${messageText}</p>
    </figure>
  `;
};
