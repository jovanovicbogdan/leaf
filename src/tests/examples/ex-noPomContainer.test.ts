import { test } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';

import LeafDemoAboutPage from '@/pages/pageobject/leaf-demo-about.page';
import LeafDemoHomePage from '@/pages/pageobject/leaf-demo-home.page';


test('Not using pomContainer 1', {
  annotation: {
    type: 'issue',
    description: 'Only initialize the object that is used by test case',
  },
}, async ({ page }) => {
  const leafDemoHomePage = new LeafDemoHomePage(page);
  const leafDemoAboutPage = new LeafDemoAboutPage(page);
  
  await leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await leafDemoAboutPage.g_navigateTo(NavigationOptionsEnum.Demo_About);

});

test('Not using pomContainer 2', async ({ page, pomContainer }) => {
  await pomContainer.leafDemoAboutPage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await page.waitForTimeout(3000);
  const leafDemoHomePage = new LeafDemoHomePage(page);
  await leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Register);
});
