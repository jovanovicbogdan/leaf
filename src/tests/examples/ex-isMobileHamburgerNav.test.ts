import { test } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';


test('How to check if page is Mobile for different interaction', {
  tag: ['@P1', '@LoginComponent'],
  annotation:
    [
      { type: 'issue', description: 'https://confluence.atlassian.com/jirasoftwareserver/linking-issues-939938934.html' },
    ],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoAboutPage.g_navigateTo(NavigationOptionsEnum.Demo_About);
  await pomContainer.leafDemoAboutPage.g_navigateToUrlPageOutside('https://ultimateqa.com/dummy-automation-websites/');
  await pomContainer.leafDemoAboutPage.clickServiceLink();
});
