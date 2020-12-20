// @ts-check

/**
 * @typedef {import('../../typings/html').vhtml} Vhtml
 * @typedef {import('htm')} Htm
 */

/** @type {Htm['default']} */
// @ts-ignore
const htm = require('htm');
/** @type Vhtml */
const vhtml = require('vhtml');

const html = htm.bind(vhtml);

exports.html = html;

/**
 * Ensure to create an HTML-string, even from a component,
 * that has multiple root elements, and thus returns an array
 * of strings.
 *
 * @param {(...args: unknown[]) => ReturnType<html>} Comp
 * @returns {string}
 */
exports.render = (Comp) => vhtml(null, null, vhtml(Comp));
