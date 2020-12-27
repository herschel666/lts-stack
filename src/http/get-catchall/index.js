// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 */

const { page, components } = require('@architect/views');

const { Page, Heading } = components;

/** @returns {string} */
const NotFound = () =>
  Page({
    children: Heading({ text: 'Not found.' }),
  });

/** @returns {Promise<Response>} */
exports.handler = async () => {
  return {
    statusCode: 404,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('Not found', NotFound()),
  };
};
