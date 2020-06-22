import h from 'vhtml';
import classNames from 'classnames';
import arc from '@architect/functions';

import { importPage } from '../../util/import-page';
import { Page } from '../../components/page';
import { PageHeader } from '../../components/page-header';
import { H1 } from '../../components/heading';
import { StimulusExample } from '../../components/stimulus-example';

import ltsStackLogo from '../../../assets/images/lts-stack-logo.png';

interface Response {
  headers: { [header: string]: string };
  body: ReturnType<typeof page>;
}

const page = importPage();

const image = classNames('w-1/3');

const Body = () => (
  <Page>
    <PageHeader />
    <img src={arc.http.helpers.static(ltsStackLogo)} alt="" class={image} />
    <div>
      <H1 text="A modern stack consisting of Lambda, Turbolinks &amp; StimulusJS." />
      <p>…the &quot;T&quot; is also for Typescript &amp; Tailwind.</p>
      <StimulusExample />
    </div>
  </Page>
);

export const handler = async (): Promise<Response> => {
  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('Welcome', <Body />),
  };
};
