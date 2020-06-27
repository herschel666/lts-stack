import h, { HC } from 'vhtml';
import arc from '@architect/functions';

import type { Entry } from '../../components/comment';

import { getGuestbookEntry } from '../../util/ddb';
import { importPage } from '../../util/import-page';
import { Fragment } from '../../components/fragment';
import { Page } from '../../components/page';
import { Heading } from '../../components/heading';
import { PageHeader } from '../../components/page-header';
import { Comment } from '../../components/comment';

interface Request {
  pathParameters: {
    entryId: string;
  };
}

interface Response {
  statusCode: number;
  headers: { [header: string]: string };
  body: ReturnType<typeof page>;
}

interface Props {
  content: string;
}

const page = importPage();

const Body: HC<Props> = ({ content }) => (
  <Page>
    <PageHeader />
    <main>{content}</main>
  </Page>
);

export const handler = async (req: Request): Promise<Response> => {
  const { entryId } = req.pathParameters;
  let statusCode;
  let entry;

  try {
    entry = ((await getGuestbookEntry(entryId)) as unknown) as Entry;
    statusCode = entry ? 200 : 404;
  } catch (err) {
    console.log(err);
    statusCode = 500;
  }

  const content =
    statusCode === 500 ? (
      <Heading text="An error occured." />
    ) : entry ? (
      <Fragment>
        <a href={arc.http.helpers.url(`/guestbook#entry-${entryId}`)}>back</a>
        <hr />
        <Comment
          entryId={entry.entryId}
          author={entry.author}
          createdAt={entry.createdAt}
          message={entry.message}
          detail={true}
        />
      </Fragment>
    ) : (
      <Heading text="Nothing found." />
    );

  return {
    statusCode,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('Guestbook', <Body content={content} />),
  };
};
