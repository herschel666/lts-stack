import h, { HC } from 'vhtml';
import classNames from 'classnames';

const classes = classNames('container', 'mx-auto');

export const Page: HC = ({ children }) => (
  <div className={classes}>{children}</div>
);
