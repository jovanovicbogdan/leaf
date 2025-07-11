import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';

//npx playwright test --grep '@LoginComponent' --project="Google Chrome Desktop" --headed
//OR::  npx playwright test --grep '@LoginComponent|@P2' --project="Google Chrome Desktop" --headed
//AND:: npx playwright test --grep '(?=.*@LoginComponent)(?=.*@P1)' --project="Google Chrome Desktop" --headed

test('Showing how to use tag to indicate Priority and Team components 1', {
  tag: ['@P2', '@LoginComponent'],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);

  await pomContainer.leafDemoHomePage.fn_loginUser('johndoe', '123');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
});

test('Showing how to use tag to indicate Priority and Team components 2', {
  tag: ['@P1', '@LoginComponent'],
  annotation: 
    [
      { type: 'issue', description: 'https://confluence.atlassian.com/jirasoftwareserver/linking-issues-939938934.html' },
      { type: 'performance', description: 'Very slow test case' },
    ],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);

  await pomContainer.leafDemoHomePage.fn_loginUser('johndoe', '123');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
});

test('Showing how to use tag to indicate Priority and Team components 3', {
  tag: ['@P2'],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);

  await pomContainer.leafDemoHomePage.fn_loginUser('johndoe', '123');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
});