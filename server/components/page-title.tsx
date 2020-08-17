import h, { HC } from 'vhtml';
import classNames from 'classnames';

const title = classNames('font-bold', 'text-orange-500', 'page-title__text');
const lts = classNames('text-blue-700', 'page-title__lts');

export const PageTitle: HC = () => (
  <span class={title}>
    <abbr title="Lambda, Turbolinks &amp; StimulusJS" class={lts}>
      LTS
    </abbr>
    stack
  </span>
);
