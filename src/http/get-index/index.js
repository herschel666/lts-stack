/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 */

const classNames = require('classnames');
/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');

const { html, page, components } = require('@architect/views');

const { Page, PageHeader, Heading } = components;

const image = classNames('w-1/3', 'mb-12');
const addendum = classNames(
  'mt-16',
  'text-xl',
  'text-gray-800',
  'tracking-wider'
);

/** @returns {string} */
const Body = () => html`
  <${Page}>
    <${PageHeader} />
    <img src=${arc.static('images/lts-stack-logo.png')} alt="" class=${image} />
    <div>
      <${Heading} text="A modern stack consisting of Lambda, Turbolinks & StimulusJS." />
      <p class=${addendum}>
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
    body: page('Welcome', html`<${Body} />`),
  };
};
