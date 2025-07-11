import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';
import path from 'path';
import { TestUserData } from '@/data/models/users-json';
// TestUserData is being used to define the object type or schema for the test data being loaded. 
// It represents the structure of the data expected from the JSON file (mock-data.json) 
// and ensures type safety when accessing properties like data.users.enterprise in your test script.
// All data object must be define within the models folder.
import JsonTestDataProvider from '@/data/providers/json-test-data-provider';

const provider = new JsonTestDataProvider<TestUserData>();
const data = await provider.getTestData(
  path.join('src', 'data', 'json', 'mock-data.json'),
);
console.log(data);

test('Login with username and password', async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  const enterpriseUpworkUser = data.users.enterprise.find(
    user => user.mockDataId === 'enterpriseUpwork',
  );
  if (!enterpriseUpworkUser) {
    throw new Error('User with id "enterpriseUpwork" not found');
  }
  console.log(enterpriseUpworkUser);
  await pomContainer.leafDemoHomePage.fn_loginUser(
    enterpriseUpworkUser.username,
    enterpriseUpworkUser.password,
  );
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
});
