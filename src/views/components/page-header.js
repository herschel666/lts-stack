// @ts-check

const { PageTitle } = require('./page-title');
const { html } = require('../lib/html');

/** @returns {ReturnType<html>} */
exports.PageHeader = () => html`
  <header class="c-page-header">
    <${PageTitle} />
    <nav class="c-page-header__navigation">
      <a href="/" class="c-page-header__nav-item">Home</a>
      <a href="/about" class="c-page-header__nav-item">About</a>
      <a href="/guestbook" class="c-page-header__nav-item">Guestbook</a>
      <a
        href="https://github.com/herschel666/lts-stack"
        class="c-page-header__nav-item"
      >
        Github
      </a>
    </nav>
  </header>
`;
