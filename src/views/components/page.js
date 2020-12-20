// @ts-check

const { html } = require('../lib/html');

/**
 * @param {object} props
 * @param {string} props.children
 * @returns {ReturnType<html>}
 */
exports.Page = ({ children }) => html` <div class="c-page">${children}</div> `;
