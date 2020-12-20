// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 */

/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');

const { html, render, page, components } = require('@architect/views');

const { Page, PageHeader, Heading } = components;

/** @returns {ReturnType<html>} */
const Body = () => html`
  <${Page}>
    <${PageHeader} />
    <img src=${arc.static(
      'images/lts-stack-logo.png'
    )} alt="" class="p-get-index__image" />
    <div>
      <${Heading} text="A modern stack consisting of Lambda, Turbolinks & StimulusJS." />
      <p class="p-get-index__addendum">
        …the "T" is also for Tailwind.
      </p>
    </div>
  </${Page}>
`;

/** @returns {Promise<Response>} */
exports.handler = async () => {
  const headers = {
    'cache-control': 'no-cache, no-store, must-revalidate, max-age=0',
    'content-type': 'text/html; charset=utf8',
  };

  return {
    headers,
    statusCode: 200,
    body: page('Welcome', render(Body)),
  };
};
