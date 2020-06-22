import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';

interface Props {
  legend?: string;
}

const legend = classNames('block', 'pb-8', 'text-2xl', 'font-bold');
// TODO: improve this
const legendStyle = 'margin-left: 33.3%';

export const Fieldset: HC<Props> = ({ legend: legendText, children }) => (
  <fieldset>
    {legendText ? (
      <legend class={legend} style={legendStyle}>
        {legendText}
      </legend>
    ) : (
      ''
    )}
    {children}
  </fieldset>
);
