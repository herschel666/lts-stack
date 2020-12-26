// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 */

const { html, render, page, components } = require('@architect/views');

const { Page, Heading } = components;

/** @returns {ReturnType<html>} */
const NotFound = () => html`
  <${Page}>
    <${Heading} text="Not found." />
  </${Page}>
`;

/** @returns {Promise<Response>} */
exports.handler = async () => {
  return {
    statusCode: 404,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: page('Not found', render(NotFound)),
  };
};
