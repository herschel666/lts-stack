import h from 'vhtml';
import { importPage } from '../../util/import-page';
import { Page } from '../../components/page';
import { PageHeader } from '../../components/page-header';
import { H1 } from '../../components/heading';

interface Response {
  headers: { [header: string]: string };
  body: ReturnType<typeof page>;
}

const page = importPage();

const Body = () => (
  <Page>
    <PageHeader />
    <div>
      <H1 text="About the LTSstack" />
      <p>
        Labore Lorem veniam consequat aute veniam excepteur eiusmod anim non
        sint eiusmod qui eu fugiat.
      </p>
    </div>
  </Page>
);

export const handler = async (): Promise<Response> => {
  return {
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('About', <Body />),
  };
};
