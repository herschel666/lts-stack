// @ts-check

const { html } = require('../lib/html');

/** @type {string} */
const copy = '\u00A9';

/** @returns {ReturnType<html>} */
exports.PageFooter = () => html`
  <footer class="c-page-footer">
    <span class="c-page-footer__copy">${copy} ${new Date().getFullYear()}</span>
    <a
      href="https://github.com/herschel666/lts-stack"
      class="c-page-footer__link"
    >
      Github
    </a>
  </footer>
`;
