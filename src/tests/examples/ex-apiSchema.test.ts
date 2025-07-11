import { expect, test } from '@/core/fixtures';
import { z } from 'zod';
// Always initialize apiClientContext in the test file to use it in the test cases

test('Expect API schema', async ({ apiClientContext }) => {
  const response = await apiClientContext.get('/api/users/2', {
    headers: {
      'x-api-key': 'reqres-free-v1', // Add the API key here
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);

  // Define the schema: https://www.tutorialspoint.com/typescript/typescript_types.htm
  // By default, Zod allows extra fields but doesn't include them in the parsed result. 
  // It silently strips any properties not explicitly defined in your schema.
  const userSchema = z.object({
    data: z.object({
      id: z.number(),
      email: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      avatar: z.union([z.string(), z.null()]), // Allow avatar to be either a string or null
    }), // No strict() will mean that the response can provide extra field like "middle_name" and this will pass
    support: z.object({
      url: z.string(),
      text: z.string(),
    }).strict(), // Apply .strict() to the 'support' object
  }).strict(); // Apply .strict() to the top-level object

  // Validate the response body against the schema and check that it does not throw an exception
  expect(() => {
    userSchema.parse(body);
  }).not.toThrow();

  /* Data Response as reference:
  {
  data: {
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  },
  support: {
    url: 'https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral',
    text: 'Tired of writing endless social media content? Let Content Caddy generate it for you.'
  }
  }
  */
});