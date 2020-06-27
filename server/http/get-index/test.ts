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
});
