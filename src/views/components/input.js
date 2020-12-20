// @ts-check

const { html } = require('../lib/html');

/**
 * @typedef BaseProps
 * @property {string} label
 * @property {string} placeholder
 * @property {string} id
 * @property {string} [data-target]
 * @property {string} [data-action]
 * @property {boolean} [required]
 *
 * @typedef {Pick<BaseProps, 'id' | 'label'>} OuterProps
 */

/**
 * @typedef {OuterProps & { children: string }} Props
 * @param {Props} props
 * @returns {ReturnType<html>}
 */
const Outer = ({ children, id, label: labelText }) => html`
  <label for=${id} class="c-input__label"> ${labelText} </label>
  ${children}
`;

/**
 * @param {BaseProps} props
 * @returns {ReturnType<html>}
 */
exports.TextInput = ({
  id,
  label: labelText,
  placeholder,
  ['data-target']: target,
  ['data-action']: action,
  required,
}) => html`
  <${Outer} id=${id} label=${labelText}>
    <input
      type="text"
      id=${id}
      name=${id}
      placeholder=${placeholder}
      class="c-input__element"
      data-target=${target}
      data-action=${action}
      required=${required}
    />
  </${Outer}>
`;

/**
 * @param {BaseProps} props
 * @returns {ReturnType<html>}
 */
exports.TextArea = ({
  id,
  label: labelText,
  placeholder,
  ['data-target']: target,
  ['data-action']: action,
  required,
}) => html`
  <${Outer} id=${id} label=${labelText}>
    <textarea
      id=${id}
      name=${id}
      placeholder=${placeholder}
      class="c-input__element"
      rows="8"
      data-target=${target}
      data-action=${action}
      required=${required}
    ></textarea>
  </${Outer}>
`;
