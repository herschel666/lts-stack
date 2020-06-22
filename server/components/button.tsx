import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';

const button = classNames(
  'py-2',
  'px-4',
  'bg-gray-200',
  'hover:bg-gray-300',
  'focus:bg-gray-300'
);

export const Button: HC = ({ children }) => (
  <button class={button}>{children}</button>
);
