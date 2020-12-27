// @ts-check

const { html } = require('../lib/html');

/** @returns {string} */
exports.PageTitle = () => html`
  <a href="/" class="c-page-title">
    <abbr title="Lambda, Turbolinks & StimulusJS" class="c-page-title__lts">
      LTS
    </abbr>
    stack
  </a>
`;
