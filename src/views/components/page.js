// @ts-check

const { html } = require('../lib/html');
const { PageHeader } = require('./page-header.js');
const { PageFooter } = require('./page-footer.js');

/**
 * @param {object} props
 * @param {string} props.children
 * @returns {ReturnType<html>}
 */
exports.Page = ({ children }) => html`
  <div class="c-page">
    <${PageHeader} />
    <main class="c-page__main">${children}</main>
    <${PageFooter} />
  </div>
`;
