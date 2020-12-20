// @ts-check

const { html } = require('../lib/html');

/**
 * @template {{ 'data-target'?: string; children: string }} Props
 * @param {Props} props
 * @returns {ReturnType<html>}
 */
exports.Button = ({ ['data-target']: target, children }) => html`
  <button class="c-button" data-target="${target}">${children}</button>
`;
