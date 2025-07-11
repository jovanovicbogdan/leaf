import { expect, test } from '@/core/fixtures';

test.use({
  baseURL: 'https://restful-booker.herokuapp.com',
});

test('API Test', async ({ request }) => {
  const response = await request.get('/booking');
  console.log(await response.json());
  expect(response.status()).toBe(200);
});
