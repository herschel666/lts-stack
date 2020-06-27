import h, { HC } from 'vhtml';
import classNames from 'classnames';
import format from 'date-fns/format';
import arc from '@architect/functions';

export interface Entry {
  entryId: string;
  author: string;
  message: string;
  createdAt: string;
}
type Props = Entry & { detail?: boolean };

const figure = classNames('my-8', 'py-8');
const header = classNames('mb-4', 'flex', 'justify-between');
const time = classNames('text-sm');
const message = classNames('whitespace-pre-wrap');

const Author: HC<Pick<Props, 'author' | 'entryId' | 'detail'>> = ({
  author,
  entryId,
  detail,
}) => {
  const inner = detail ? (
    author
  ) : (
    <a href={arc.http.helpers.url(`/guestbook/${entryId}`)}>{author}</a>
  );
  return <strong>{inner}</strong>;
};

export const Comment: HC<Props> = ({
  entryId,
  author,
  message: messageText,
  createdAt,
  detail,
}) => (
  <figure class={figure} id={`entry-${entryId}`}>
    <header class={header}>
      <Author author={author} entryId={entryId} detail={detail} />
      <time class={time} datetime={createdAt}>
        {format(new Date(createdAt), 'yyyy/MM/dd')}
      </time>
    </header>
    <p class={message}>{messageText}</p>
  </figure>
);
