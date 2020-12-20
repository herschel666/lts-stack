/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 */

const { html, page, components } = require('@architect/views');

const { Page, PageHeader, Heading } = components;

/** @returns {string} */
const NotFound = () => html`
  <${Page}>
    <${PageHeader} />
    <div>
      <${Heading} text="Not found." />
    </div>
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
    body: page('Not found', html`<${NotFound} />`),
  };
};