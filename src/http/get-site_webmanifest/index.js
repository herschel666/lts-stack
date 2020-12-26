// @ts-check

/**
 * @typedef {import('../../typings/aws').APIGatewayResult} Response
 */

/** @type {import('../../typings/architect_functions').default} */
const arc = require('@architect/functions');

/** @returns {Promise<Response>} */
exports.handler = async () => ({
  statusCode: 200,
  headers: {
    'cache-control': 'public, must-revalidate, max-age=600',
    'content-type': 'application/manifest+json',
  },
  body: JSON.stringify({
    name: 'LTS Stack',
    short_name: 'LTS',
    description:
      'A modern stack consisting of Lambda, Turbolinks & StimulusJS.',
    icons: [
      {
        src: arc.static('images/android-chrome-192x192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: arc.static('images/android-chrome-512x512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#2b6cb0',
  }),
});
