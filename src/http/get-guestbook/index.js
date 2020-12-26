// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 * @typedef {import('../../typings/components').Entry} Entry
 * @typedef {import('../../typings/architect_shared').DDB} DDB
 */

/** @type {{ ddb: DDB }} */
const shared = require('@architect/shared');

const { html, render, page, components } = require('@architect/views');

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
 * @param {Entry[]} props.entries
 * @returns {ReturnType<html>}
 */
const Body = ({ entries }) => html`
  <${Page}>
    <${Heading} text="Guestbook" />
    <p>
      Leave an entry in the guestbook. Entries are automatically deleted after
      a day.
    </p>
    <${SlimContent}>
      <form
        action="/guestbook"
        method="post"
        data-controller="guestbook-form"
        data-action="guestbook-form#submit"
        data-guestbook-form-target="form"
      >
        <div data-guestbook-form-target="error" hidden></div>
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
    </${SlimContent}>
    <hr />
    <${SlimContent} divided=${true}>
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
    </${SlimContent}>
  </${Page}>
`;

/** @returns {Promise<Response>} */
exports.handler = async () => {
  const entries = await shared.ddb.getGuestbookEntries();
  const body = render(() => html`<${Body} entries=${entries} />`);

  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    statusCode: 200,
    body: page('Guestbook', body),
  };
};
