import h from 'vhtml';
import classNames from 'classnames';
import arc from '@architect/functions';

import { importPage } from '../../util/import-page';
import { Page } from '../../components/page';
import { PageHeader } from '../../components/page-header';
import { Heading } from '../../components/heading';

import ltsStackLogo from '../../../assets/images/lts-stack-logo.png';

interface Response {
  statusCode: number;
  headers: { [header: string]: string };
  body: ReturnType<typeof page>;
}

const page = importPage();

const image = classNames('w-1/3', 'mb-12');
const addendum = classNames(
  'mt-16',
  'text-xl',
  'text-gray-800',
  'tracking-wider'
);

const Body = () => (
  <Page>
    <PageHeader />
    <img src={arc.http.helpers.static(ltsStackLogo)} alt="" class={image} />
    <div>
      <Heading text="A modern stack consisting of Lambda, Turbolinks &amp; StimulusJS." />
      <p class={addendum}>
        &hellip;the &quot;T&quot; is also for Typescript &amp; Tailwind.
      </p>
    </div>
  </Page>
);

export const handler = async (): Promise<Response> => {
  const headers = {
    'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
    'content-type': 'text/html; charset=utf8',
  };

  return {
    headers,
    statusCode: 200,
    body: page('Welcome', <Body />),
  };
};
