import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';

const classes = classNames('container', 'mx-auto');

export const Page: HC = ({ children }) => (
  <div className={classes}>{children}</div>
);
