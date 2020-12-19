/**
 * @typedef {import('../../typings/html').vhtml} Vhtml
 * @typedef {import('../../typings/html').Html} Html
 * @typedef {import('htm')} Htm
 */

/** @type Htm */
const htm = require('htm');
/** @type Vhtml */
const vhtml = require('vhtml');

/** @type Html */
exports.html = htm.bind(vhtml);
