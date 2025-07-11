import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';

test('Example of the standardize test cases', {
  tag: ['@P1', '@LoginComponent'],
  annotation:
    [
      { type: 'issue', description: 'https://confluence.atlassian.com/jirasoftwareserver/linking-issues-939938934.html' },
    ],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  
  await pomContainer.leafDemoHomePage.loginButton.click();
  await pomContainer.leafDemoHomePage.fn_loginUser('johndoe', '123');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
  //await pomContainer.leafDemoHomePage.g_Wait(2000);
  await pomContainer.leafDemoHomePage.loginButton.click();
  await pomContainer.leafDemoHomePage.fn_loginUser('username053085', 'password053085');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
  
});

