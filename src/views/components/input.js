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
 * @typedef {Pick<BaseProps, 'id' | 'label'>} InputWrapperProps
 */

/**
 * @typedef {InputWrapperProps & { children: string }} Props
 * @param {Props} props
 * @returns {string}
 */
const InputWrapper = ({ children, id, label: labelText }) => html`
  <label for=${id} class="c-input__label"> ${labelText} </label>
  ${children}
`;

/**
 * @param {BaseProps} props
 * @returns {string}
 */
exports.TextInput = ({
  id,
  label: labelText,
  placeholder,
  ['data-target']: target,
  ['data-action']: action,
  required,
}) => {
  const children = html`<input
    type="text"
    id=${id}
    name=${id}
    placeholder=${placeholder}
    class="c-input__element"
    data-target=${target}
    data-action=${action}
    required=${required}
  />`;

  return InputWrapper({
    label: labelText,
    children,
    id,
  });
};

/**
 * @param {BaseProps} props
 * @returns {string}
 */
exports.TextArea = ({
  id,
  label: labelText,
  placeholder,
  ['data-target']: target,
  ['data-action']: action,
  required,
}) => {
  const children = html`
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
  `;

  return InputWrapper({
    label: labelText,
    children,
    id,
  });
};
