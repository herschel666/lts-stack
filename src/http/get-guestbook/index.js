// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 * @typedef {import('../../typings/components').Entry} Entry
 * @typedef {import('../../typings/architect_shared').GuestbookEntry} GuestbookEntry
 * @typedef {import('../../typings/architect_shared').ddb} ddb
 */

/** @type {{ ddb: ddb }} */
const { ddb } = require('@architect/shared');

const { html, page, components } = require('@architect/views');

const {
  Button,
  Comment,
  Fieldset,
  Heading,
  FormRow,
  Page,
  TextInput,
  TextArea,
  SlimContent,
} = components;

/**
 * @param {object} props
 * @param {GuestbookEntry[]} props.entries
 * @returns {string}
 */
const Body = ({ entries }) => {
  const intro = html`${Heading({ text: 'Guestbook' })}
    <p>
      Leave an entry in the guestbook. Entries are automatically deleted after a
      day.
    </p>`;
  const nameInput = TextInput({
    label: 'Your name',
    id: 'author',
    placeholder: 'Enter your name…',
    'data-target': 'guestbook-form.author',
    'data-action': 'input-&gt;guestbook-form#changeAuthor',
    required: true,
  });
  const messageInput = TextArea({
    label: 'Your message',
    id: 'message',
    placeholder: 'Enter your message…',
    'data-target': 'guestbook-form.message',
    'data-action': 'input-&gt;guestbook-form#changeMessage',
    required: true,
  });
  const submit = html`<div class="w-2/3">
    ${Button({ 'data-target': 'guestbook-form.submit', children: 'Submit' })}
  </div>`;
  const fieldset = Fieldset({
    legend: 'Write a message',
    children: [
      FormRow({ children: nameInput }),
      FormRow({ children: messageInput }),
      FormRow({ class: 'justify-end', children: submit }),
    ].join(''),
  });
  const form = html`<form
    action="/guestbook"
    method="post"
    data-controller="guestbook-form"
    data-action="guestbook-form#submit"
    data-guestbook-form-target="form"
  >
    <div data-guestbook-form-target="error" hidden></div>
    ${fieldset}
  </form>`;
  const comments = entries.map(({ entryId, author, message, createdAt }) =>
    Comment({ entryId, author, message, createdAt })
  );

  return Page({
    children: [
      intro,
      SlimContent({ children: form }),
      html`<hr />`,
      SlimContent({ children: comments.join(''), divided: true }),
    ].join(''),
  });
};

/** @returns {Promise<Response>} */
exports.handler = async () => {
  const entries = await ddb.getGuestbookEntries();

  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    statusCode: 200,
    body: page('Guestbook', Body({ entries })),
  };
};
