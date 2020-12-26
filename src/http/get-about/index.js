// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 */

const { html, render, page, components } = require('@architect/views');

const { Page, Heading } = components;

/** @returns {ReturnType<html>} */
const Body = () => html`
  <${Page}>
    <${Heading} text="About the LTSstack" />
    <p>
      Labore Lorem veniam consequat aute veniam excepteur eiusmod anim non
      sint eiusmod qui eu fugiat.
    </p>
  </${Page}>
`;

/** @returns {Promise<Response>} */
exports.handler = async () => {
  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
      'content-type': 'text/html; charset=utf8',
    },
    statusCode: 200,
    body: page('About', render(Body)),
  };
};
