const classNames = require('classnames');

const { html } = require('../lib/html');

const row = classNames('mb-8', 'flex', 'items-center');

/**
 * @param {object} props
 * @param {string} [props.class]
 * @param {string} props.children
 * @returns {string}
 */
exports.FormRow = ({ class: cssClass, children }) => html`
  <div class=${classNames(row, cssClass)}>${children}</div>
`;
