// @ts-check

/**
 * @typedef {import('../../typings/components').Heading} Heading
 */

const { html } = require('../lib/html');

/**
 * @param {object} props
 * @param {string} props.text
 * @param {Heading} [props.type]
 * @returns {ReturnType<html>}
 */
exports.Heading = ({ text, type: H = 'h1' }) => html`
  <${H} class="c-heading">${text}</H>
`;
