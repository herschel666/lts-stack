const { handler } = require('.');

describe('handler()', () => {
  it('should return a 404 page', async () => {
    const { statusCode, body } = await handler();
    const headline = 'Not found.';

    expect(statusCode).toBe(404);
    expect(body.includes(headline)).toBe(true);
  });
});
