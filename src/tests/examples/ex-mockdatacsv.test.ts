import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';
import path from 'path';
import { TestUserData } from '@/data/models/users-csv';
// TestUserData is being used to define the object type or schema for the test data being loaded. 
// It represents the structure of the data expected from the JSON file (mock-data.json) 
// and ensures type safety when accessing properties like data.users.enterprise in your test script.
// All data object must be define within the models folder.
import CsvTestDataProvider from '@/data/providers/csv-test-data-provider';

const provider = new CsvTestDataProvider<TestUserData>();
const data = await provider.getTestData(
  path.join('src', 'data', 'csv', 'mock-data.csv'),
);
console.log(data);

test('Login with username and password', async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  const simpleUser = data.find(
    user => user.mockDataId === 'simpleuser',
  );
  if (!simpleUser) {
    throw new Error('User with id "simpleuser" not found');
  }
  console.log(simpleUser);
  await pomContainer.leafDemoHomePage.fn_loginUser(
    simpleUser.username,
    simpleUser.password,
  );
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
});
