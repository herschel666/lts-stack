import h from 'vhtml';
import classNames from 'classnames';

import { importPage } from '../../util/import-page';
import { Page } from '../../components/page';
import { PageHeader } from '../../components/page-header';
import { H1 } from '../../components/heading';
import { FormRow } from '../../components/form-row';
import { Fieldset } from '../../components/fieldset';
import { TextInput, TextArea } from '../../components/input';
import { Button } from '../../components/button';
import { Comment } from '../../components/comment';

interface Response {
  headers: { [header: string]: string };
  body: ReturnType<typeof page>;
}

const page = importPage();

const contentClass = classNames('w-4/5', 'mx-auto', 'my-16');

const posts = [
  {
    name: 'yolo Swag',
    message:
      'Eu laboris velit mollit incididunt nisi deserunt aliquip non consectetur incididunt commodo irure.',
    createdAt: '2020-06-22T17:12:50.050Z',
  },
  {
    name: 'Foo Bar Lorem',
    message: 'Velit exercitation minim eu nulla occaecat.',
    createdAt: '2020-06-22T11:13:38.537Z',
  },
];

const Body = () => (
  <Page>
    <PageHeader />
    <main>
      <H1 text="Guestbook" />
      <p>
        Celebrate the 90ies &amp; leave a post in the guestbook. Posts are
        automatically deleted after 60 minutes.
      </p>
      <form action="/guestbook" method="post" class={contentClass}>
        <Fieldset legend="Write a message">
          <FormRow>
            <TextInput
              label="Your name"
              id="name"
              placeholder="Enter your name&hellip;"
            />
          </FormRow>
          <FormRow>
            <TextArea
              label="Your message"
              id="message"
              placeholder="Enter your message&hellip;"
            />
          </FormRow>
          <FormRow class="justify-end">
            <div class="w-2/3">
              <Button>Submit</Button>
            </div>
          </FormRow>
        </Fieldset>
      </form>
      <hr />
      <div class={classNames(contentClass, 'divide-y-2')}>
        {posts.map(({ name, message, createdAt }) => (
          <Comment name={name} createdAt={createdAt} message={message} />
        ))}
      </div>
    </main>
  </Page>
);

export const handler = async (): Promise<Response> => {
  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('Guestbook', <Body />),
  };
};
