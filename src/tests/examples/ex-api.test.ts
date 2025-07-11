import { expect, test } from '@/core/fixtures';
//Always initialize apiClientContext in the test file to use it in the test cases. Imagine it as the pomContainer
//npx playwright test ex-api.test.ts --project="API" --headed

test('JIRA-123 API GET Request', {
  annotation: {
    type: 'issue',
    description: 'https://confluence.atlassian.com/jirasoftwareserver/linking-issues-939938934.html',
  },
}, async ({ apiClientContext }) => {
  const response = await apiClientContext.get('/api/users/2', {
    headers: {
      'x-api-key': 'reqres-free-v1', // Add the API key here
    },
  });
  console.log(await response.json());
  expect(response.status()).toBe(200); //Success status code for GET request
  const text = await response.text();
  expect(text).toContain('Janet');
});


test('API POST Request', async ({ apiClientContext }) => {
  const response = await apiClientContext.post('/api/users', {
    headers: {
      'x-api-key': 'reqres-free-v1', // Add the API key here
    },
    data: {
      name: 'Tommy',
      job: 'Power Ranger',
    },
  });
  console.log(await response.json());
  expect(response.status()).toBe(201); //Success status code for POST request
  const text = await response.text();
  expect(text).toContain('Tommy');
});
