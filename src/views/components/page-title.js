const classNames = require('classnames');
const { html } = require('../lib/html');

const title = classNames('font-bold', 'text-orange-500', 'page-title__text');
const lts = classNames('text-blue-700', 'page-title__lts');

/** @returns {string} */
exports.PageTitle = () => html`
  <span class=${title}>
    <abbr title="Lambda, Turbolinks & StimulusJS" class=${lts}> LTS </abbr>
    stack
  </span>
`;
