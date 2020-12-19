/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 * @typedef {import('../../typings/components').Entry} Entry
 * @typedef {import('../../typings/architect_shared').DDB} DDB
 */

const classNames = require('classnames');
/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');
/** @type {{ ddb: DDB }} */
const shared = require('@architect/shared');

const { html, page, components } = require('@architect/views');

const {
  Button,
  Comment,
  Fieldset,
  Heading,
  FormRow,
  Page,
  PageHeader,
  TextInput,
  TextArea,
} = components;

const contentClass = classNames('w-4/5', 'mx-auto', 'my-16');

/**
 * @param {object} props
 * @param {Entry[]} props.entries
 * @returns {string}
 */
const Body = ({ entries }) => html`
  <${Page}>
    <${PageHeader} />
    <main>
      <${Heading} text="Guestbook" />
      <p>
        Leave an entry in the guestbook. Entries are automatically deleted after
        a day.
      </p>
      <form
        action=${arc.http.helpers.url('/guestbook')}
        method="post"
        class=${contentClass}
        data-controller="guestbook-form"
        data-action="guestbook-form#submit"
        data-target="guestbook-form.form"
      >
        <div data-target="guestbook-form.error" hidden></div>
        <${Fieldset} legend="Write a message">
          <${FormRow}>
            <${TextInput}
              label="Your name"
              id="author"
              placeholder="Enter your name…"
              data-target="guestbook-form.author"
              data-action="input->guestbook-form#changeAuthor"
              required=${true}
            />
          </${FormRow}>
          <${FormRow}>
            <${TextArea}
              label="Your message"
              id="message"
              placeholder="Enter your message…"
              data-target="guestbook-form.message"
              data-action="input->guestbook-form#changeMessage"
              required=${true}
            />
          </${FormRow}>
          <${FormRow} class="justify-end">
            <div class="w-2/3">
              <${Button} data-target="guestbook-form.submit">Submit</${Button}>
            </div>
          </${FormRow}>
        </${Fieldset}>
      </form>
      <hr />
      <div class=${classNames(contentClass, 'divide-y-2')}>
        ${entries.map(
          ({ entryId, author, message, createdAt }) => html`
            <${Comment}
              entryId=${entryId}
              author=${author}
              createdAt=${createdAt}
              message=${message}
            />
          `
        )}
      </div>
    </main>
  </${Page}>
`;

/** @returns {Promise<Response>} */
exports.handler = async () => {
  /** @type {Entry[]} */
  const entries = await shared.ddb.getGuestbookEntries();
  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    statusCode: 200,
    body: page('Guestbook', html`<${Body} entries=${entries} />`),
  };
};
