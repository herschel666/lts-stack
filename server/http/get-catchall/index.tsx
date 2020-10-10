import h from 'vhtml';

import { importPage } from '../../util/import-page';
import { Page } from '../../components/page';
import { PageHeader } from '../../components/page-header';
import { Heading } from '../../components/heading';

interface Response {
  statusCode: number;
  headers: { [header: string]: string };
  body: ReturnType<typeof page>;
}

const page = importPage();

const NotFound = () => (
  <Page>
    <PageHeader />
    <div>
      <Heading text="Not found." />
    </div>
  </Page>
);

export const handler = async (): Promise<Response> => {
  return {
    statusCode: 404,
    body: page('Not found', <NotFound />),
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
  };
};
