import h, { HC } from 'vhtml';
import classNames from 'classnames';

import { Fragment } from './fragment';

interface Props {
  label: string;
  placeholder: string;
  id: string;
  ['data-target']?: string;
  ['data-action']?: string;
  required?: boolean;
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

export const TextInput: HC<Props> = ({
  id,
  label: labelText,
  placeholder,
  ['data-target']: target,
  ['data-action']: action,
  required,
}) => (
  <Outer id={id} label={labelText}>
    <input
      type="text"
      id={id}
      name={id}
      placeholder={placeholder}
      class={input}
      data-target={target}
      data-action={action}
      required={required}
    />
  </Outer>
);

export const TextArea: HC<Props> = ({
  id,
  label: labelText,
  placeholder,
  ['data-target']: target,
  ['data-action']: action,
  required,
}) => (
  <Outer id={id} label={labelText}>
    <textarea
      id={id}
      name={id}
      placeholder={placeholder}
      class={input}
      rows="8"
      data-target={target}
      data-action={action}
      required={required}
    ></textarea>
  </Outer>
);
