import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';
import path from 'path';
import { TestUserData } from '@/data/models/users-json';
import JsonTestDataProvider from '@/data/providers/json-test-data-provider';

/*
2025-04-07: npx playwright test ex-0-templateStandard.test.ts --project="Google Chrome Desktop" --headed

Standardization: All test cases should have the following:
Tags: Priority, Component
Annotation: Link to jira or test case
*/

test('Example of the standardize test cases', {
  tag: ['@P1', '@LoginComponent'],
  annotation: 
    [
      { type: 'issue', description: 'https://confluence.atlassian.com/jirasoftwareserver/linking-issues-939938934.html' },
    ],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);

  await pomContainer.leafDemoHomePage.fn_loginUser('johndoe', '123');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
});

const provider = new JsonTestDataProvider<TestUserData>();
const data = await provider.getTestData(
  path.join('src', 'data', 'json', 'mock-data.json'),
);

//npx playwright test --grep '@LoginComponent' --project="Google Chrome Desktop" --headed
//OR::  npx playwright test --grep '@LoginComponent|@P2' --project="Google Chrome Desktop" --headed
//AND:: npx playwright test --grep '(?=.*@LoginComponent)(?=.*@P1)' --project="Google Chrome Desktop" --headed

test('Example of the standardize test cases 2', {
  tag: ['@P0', '@LoginComponent'],
  annotation: 
    [
      { type: 'issue', description: 'https://jira.com/123' },
    ],
}, async ({ pomContainer }) => {
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
