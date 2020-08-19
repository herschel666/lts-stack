import { handler } from '.';

describe('handler()', () => {
  it('should return a valid response', async () => {
    const { headers, body } = await handler({ pathParameters: null });
    const headline =
      'A modern stack consisting of Lambda, Turbolinks &amp; StimulusJS.';

    expect(headers['cache-control'].includes('no-cache')).toBe(true);
    expect(headers['content-type']).toBe('text/html; charset=utf8');
    expect(body.includes(headline)).toBe(true);
  });

  it('should return a 404 page', async () => {
    const pathParameters = { proxy: '/does/not/exist' };
    const { statusCode, body } = await handler({ pathParameters });
    const headline = 'Not found.';

    expect(statusCode).toBe(404);
    expect(body.includes(headline)).toBe(true);
  });
});
