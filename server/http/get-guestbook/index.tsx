import h, { HC } from 'vhtml';
import classNames from 'classnames';
import arc from '@architect/functions';

import type { Entry } from '../../components/comment';

import { getGuestbookEntries } from '../../util/ddb';
import { importPage } from '../../util/import-page';
import { Page } from '../../components/page';
import { PageHeader } from '../../components/page-header';
import { Heading } from '../../components/heading';
import { FormRow } from '../../components/form-row';
import { Fieldset } from '../../components/fieldset';
import { TextInput, TextArea } from '../../components/input';
import { Button } from '../../components/button';
import { Comment } from '../../components/comment';

interface Response {
  headers: { [header: string]: string };
  body: ReturnType<typeof page>;
}

interface Props {
  entries: Entry[];
}

const page = importPage();

const contentClass = classNames('w-4/5', 'mx-auto', 'my-16');

export const Body: HC<Props> = ({ entries }) => (
  <Page>
    <PageHeader />
    <main>
      <Heading text="Guestbook" />
      <p>
        Leave an entry in the guestbook. Entries are automatically deleted after
        a day.
      </p>
      <form
        action={arc.http.helpers.url('/guestbook')}
        method="post"
        class={contentClass}
        data-controller="guestbook-form"
        data-action="guestbook-form#submit"
        data-target="guestbook-form.form"
      >
        <div data-target="guestbook-form.error" hidden></div>
        <div data-target="guestbook-form.success" hidden>
          Successfully submitted your message.
        </div>
        <Fieldset legend="Write a message">
          <FormRow>
            <TextInput
              label="Your name"
              id="author"
              placeholder="Enter your name&hellip;"
              data-target="guestbook-form.author"
              required={true}
            />
          </FormRow>
          <FormRow>
            <TextArea
              label="Your message"
              id="message"
              placeholder="Enter your message&hellip;"
              data-target="guestbook-form.message"
              required={true}
            />
          </FormRow>
          <FormRow class="justify-end">
            <div class="w-2/3">
              <Button data-target="guestbook-form.submit">Submit</Button>
            </div>
          </FormRow>
        </Fieldset>
      </form>
      <hr />
      <div class={classNames(contentClass, 'divide-y-2')}>
        {entries.map(({ entryId, author, message, createdAt }) => (
          <Comment
            entryId={entryId}
            author={author}
            createdAt={createdAt}
            message={message}
          />
        ))}
      </div>
    </main>
  </Page>
);

export const handler = async (): Promise<Response> => {
  const entries = ((await getGuestbookEntries()) as unknown) as Entry[];

  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('Guestbook', <Body entries={entries} />),
  };
};
