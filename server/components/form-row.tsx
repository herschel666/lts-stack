import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';

interface Props {
  class?: string;
}

const row = classNames('mb-8', 'flex', 'items-center');

export const FormRow: HC<Props> = ({ class: cssClass, children }) => (
  <div class={classNames(row, cssClass)}>{children}</div>
);
