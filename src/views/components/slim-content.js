// @ts-check

const classNames = require('classnames');

const { html } = require('../lib/html');

/**
 * @param {object} props
 * @param {boolean} [props.divided=false]
 * @param {string} props.children
 * @returns {ReturnType<html>}
 */
exports.SlimContent = ({ children, divided = false }) => {
  const cssClass = classNames('c-slim-content', {
    ['c-slim-content--divided']: divided,
  });

  return html`<div class=${cssClass}>${children}</div>`;
};
