import h, { HC } from 'vhtml';
import classNames from 'classnames';

type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
  text: string;
  type?: Heading;
}

const classes = classNames('text-5xl', 'text-yellow-900');

export const Heading: HC<Props> = ({ text, type: H = 'h1' }) => (
  <H className={classes}>{text}</H>
);
