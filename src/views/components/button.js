const classNames = require('classnames');

const { html } = require('../lib/html');

const button = classNames(
  'py-2',
  'px-4',
  'bg-gray-200',
  'hover:bg-gray-300',
  'focus:bg-gray-300'
);

/**
 * @template {{ 'data-target'?: string; children: string }} Props
 * @param {Props}
 * @returns {string}
 */
exports.Button = ({ ['data-target']: target, children }) => html`
  <button class="${button}" data-target="${target}">${children}</button>
`;
