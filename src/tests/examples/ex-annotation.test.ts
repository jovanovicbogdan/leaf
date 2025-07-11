import { expect, test } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';


test('Using annotation to provide more description', {
  annotation: 
    [
      { type: 'issue', description: 'https://confluence.atlassian.com/jirasoftwareserver/linking-issues-939938934.html' },
      { type: 'performance', description: 'Very slow test case' },
    ],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoAboutPage.g_navigateTo(NavigationOptionsEnum.Demo_About);
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await pomContainer.leafDemoHomePage.fn_loginUser('johndoe', '123');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();

});

test('JIRA-12345 Open Different pages', {
  annotation: {
    type: 'issue',
    description: 'This is a simple test',
  },
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoAboutPage.g_navigateTo(NavigationOptionsEnum.Demo_About);
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await pomContainer.leafDemoHomePage.g_navigateToUrlPage('parabank/register.htm');
});
