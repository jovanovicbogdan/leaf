import { test } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';


test('Example getting Feature Flags to run A/B testing', {
  tag: ['@P1', '@LoginComponent'],
  annotation:
    [
      { type: 'issue', description: 'https://confluence.atlassian.com/jirasoftwareserver/linking-issues-939938934.html' },
    ],
}, async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  console.log( pomContainer.leafDemoHomePage.g_getfeatureFlagOutput());

});

