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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="${arc.static('images/apple-touch-icon.png')}"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="${arc.static('images/favicon-32x32.png')}"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="${arc.static('images/favicon-16x16.png')}"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <title>${title} | LTSstack</title>
      <link href="${arc.static('/main.css')}" rel="stylesheet" />
      <script src="${arc.static('/main.js')}" defer></script>
    </head>
    <body>
      ${body}
    </body>
  </html>`;
