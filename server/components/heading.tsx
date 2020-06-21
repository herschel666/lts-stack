import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';

interface Props {
  text: string;
}

const classes = classNames('text-5xl', 'text-yellow-900');

export const H1: HC<Props> = ({ text }) => <h1 className={classes}>{text}</h1>;
