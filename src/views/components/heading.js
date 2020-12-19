/**
 * @typedef {import('../../typings/components').Heading} Heading
 */

const classNames = require('classnames');

const { html } = require('../lib/html');

const classes = classNames('text-5xl', 'text-yellow-900');

/**
 * @param {object} props
 * @param {string} props.text
 * @param {Heading} [props.type]
 * @returns {string}
 */
exports.Heading = ({ text, type: H = 'h1' }) => html`
  <${H} className=${classes}>${text}</H>
`;
