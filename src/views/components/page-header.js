const classNames = require('classnames');

const { PageTitle } = require('./page-title');
const { html } = require('../lib/html');

const wrap = classNames('border-b', 'mb-16', 'p-8', 'flex', 'justify-between');
const navigation = classNames('flex');
const navItem = classNames(
  'block',
  'mx-8',
  'hover:text-blue-700',
  'focus:text-blue-700'
);

/** @returns {string} */
exports.PageHeader = () => html`
  <header className=${wrap}>
    <${PageTitle} />
    <nav class="${navigation}">
      <a href="/" class=${navItem}> Home </a>
      <a href="/about" class=${navItem}> About </a>
      <a href="/guestbook" class=${navItem}> Guestbook </a>
      <a href="https://github.com/herschel666/lts-stack" class=${navItem}>
        Github
      </a>
    </nav>
  </header>
`;
