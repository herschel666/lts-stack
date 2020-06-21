import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';

const title = classNames('font-bold', 'tracking-widest', 'text-orange-500');
const lts = classNames('text-blue-700');

export const PageTitle: HC = () => (
  <span class={title}>
    <abbr
      title="Lambda, Turbolinks &amp; StimulusJS"
      class={lts}
      style="text-decoration: none"
    >
      LTS
    </abbr>
    stack
  </span>
);
