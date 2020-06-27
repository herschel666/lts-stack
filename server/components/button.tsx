import h, { HC } from 'vhtml';
import classNames from 'classnames';

interface Props {
  ['data-target']?: string;
}

const button = classNames(
  'py-2',
  'px-4',
  'bg-gray-200',
  'hover:bg-gray-300',
  'focus:bg-gray-300'
);

export const Button: HC<Props> = ({ ['data-target']: target, children }) => (
  <button class={button} data-target={target}>
    {children}
  </button>
);
