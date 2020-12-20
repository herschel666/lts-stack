// @ts-check

/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');
const { html } = require('./html');

/**
 *
 * @param {string} title
 * @param {string} body
 * @returns {string}
 */
exports.page = (title, body) =>
  '<!DOCTYPE html>' +
  html`<html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${title} | LTSstack</title>
      <link href="${arc.static('/main.css')}" rel="stylesheet" />
      <script src="${arc.static('/main.js')}" defer></script>
    </head>
    <body>
      ${body}
    </body>
  </html>`;
