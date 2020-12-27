// @ts-check

const { html } = require('../lib/html');

/**
 * @param {object} props
 * @param {string} [props.legend]
 * @param {string} props.children
 * @returns {string}
 */
exports.Fieldset = ({ legend: legendText, children }) => html`
  <fieldset>
    ${legendText
      ? html`<legend class="c-fieldset__legend">${legendText}</legend>`
      : ''}
    ${children}
  </fieldset>
`;
