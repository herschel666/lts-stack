// @ts-check

const classNames = require('classnames');

const { html } = require('../lib/html');

/**
 * @param {object} props
 * @param {string} [props.class]
 * @param {string} props.children
 * @returns {string}
 */
exports.FormRow = ({ class: cssClass, children }) => html`
  <div class="${classNames('c-form-row', cssClass)}">${children}</div>
`;
