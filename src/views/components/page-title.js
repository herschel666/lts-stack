// @ts-check

const { html } = require('../lib/html');

/** @returns {ReturnType<html>} */
exports.PageTitle = () => html`
  <span class="c-page-title">
    <abbr title="Lambda, Turbolinks & StimulusJS" class="c-page-title__lts">
      LTS
    </abbr>
    stack
  </span>
`;
