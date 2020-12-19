const classNames = require('classnames');

const { html } = require('../lib/html');

const legend = classNames('block', 'pb-8', 'text-2xl', 'font-bold');
// TODO: improve this
const legendStyle = 'margin-left: 33.3%';

/**
 * @param {object} props
 * @param {string} [props.legend]
 * @param {string} props.children
 * @returns string
 */
exports.Fieldset = ({ legend: legendText, children }) => html`
  <fieldset>
    ${legendText
      ? html`<legend class=${legend} style=${legendStyle}>
          ${legendText}
        </legend>`
      : ''}
    ${children}
  </fieldset>
`;
