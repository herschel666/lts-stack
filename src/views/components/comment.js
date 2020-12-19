/**
 * @typedef {import('../../typings/components').Entry} Entry
 * @typedef {Entry & { detail?: boolean }} Props
 */

const format = require('date-fns/format');
/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');
const classNames = require('classnames');

const { html } = require('../lib/html');

const figure = classNames('my-8', 'py-8');
const header = classNames('mb-4', 'flex', 'justify-between');
const time = classNames('text-sm');
const message = classNames('whitespace-pre-wrap');

/**
 * @param {Pick<Props, 'author' | 'entryId' | 'detail'>} props
 * @returns {string}
 */
const Author = ({ author, entryId, detail }) => {
  const inner = detail
    ? author
    : html`<a href=${arc.http.helpers.url(`/guestbook/${entryId}`)}>
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
  <figure class=${figure} id="entry-${entryId}">
    <header class=${header}>
      <${Author} author=${author} entryId=${entryId} detail=${detail} />
      <time class=${time} datetime=${createdAt}>
        ${format(new Date(createdAt), 'yyyy/MM/dd')}
      </time>
    </header>
    <p class=${message}>${messageText}</p>
  </figure>
`;
