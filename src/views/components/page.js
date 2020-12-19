const classNames = require('classnames');
const { html } = require('../lib/html');

const classes = classNames('container', 'mx-auto');

/** @returns {string} */
exports.Page = ({ children }) => html`
  <div className=${classes}>${children}</div>
`;
