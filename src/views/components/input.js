const { html } = require('../lib/html');

/**
 * @template {{
 *  label: string;
 *  placeholder: string;
 *  id: string;
 *  ['data-target']?: string;
 *  ['data-action']?: string;
 *  required?: boolean;
 * }} BaseProps
 * @template {Pick<BaseProps, 'id' | 'label'>} OuterProps
 */

/**
 * @template {OuterProps & { children: string }} Props
 * @param {Props}
 * @returns {string}
 */
const Outer = ({ children, id, label: labelText }) => html`
  <label for=${id} class="c-input__label"> ${labelText} </label>
  ${children}
`;

/**
 * @param {BaseProps}
 * @returns {string}
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
 * @param {BaseProps}
 * @returns {string}
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
