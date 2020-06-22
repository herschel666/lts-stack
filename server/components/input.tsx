import h from 'vhtml';
import classNames from 'classnames';

import type { HC } from '../typings/hc.type';
import { Fragment } from './fragment';

interface Props {
  label: string;
  placeholder: string;
  id: string;
}
type OuterProps = Pick<Props, 'id' | 'label'>;

const label = classNames('w-1/3', 'pr-8', 'text-right');
const input = classNames('w-2/3', 'p-2', 'border');

const Outer: HC<OuterProps> = ({ children, id, label: labelText }) => (
  <Fragment>
    <label for={id} class={label}>
      {labelText}
    </label>
    {children}
  </Fragment>
);

export const TextInput: HC<Props> = ({ id, label: labelText, placeholder }) => (
  <Outer id={id} label={labelText}>
    <input
      type="text"
      id={id}
      name={id}
      placeholder={placeholder}
      class={input}
    />
  </Outer>
);

export const TextArea: HC<Props> = ({ id, label: labelText, placeholder }) => (
  <Outer id={id} label={labelText}>
    <textarea
      id={id}
      name={id}
      placeholder={placeholder}
      class={input}
      rows="8"
    ></textarea>
  </Outer>
);
