import h from 'vhtml';
import classNames from 'classnames';
import format from 'date-fns/format';

import type { HC } from '../typings/hc.type';

interface Props {
  name: string;
  message: string;
  createdAt: string;
}

const figure = classNames('my-8', 'py-8');
const header = classNames('mb-4', 'flex', 'justify-between');
const time = classNames('text-sm');

export const Comment: HC<Props> = ({ name, message, createdAt }) => (
  <figure class={figure}>
    <header class={header}>
      <strong>{name}</strong>
      <time class={time} datetime={createdAt}>
        {format(new Date(createdAt), 'yyyy/MM/dd')}
      </time>
    </header>
    <p>{message}</p>
  </figure>
);
