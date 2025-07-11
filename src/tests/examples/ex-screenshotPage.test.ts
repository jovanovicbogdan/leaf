import { test } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';


test('Login with username and password', async ({ page, pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);

  const dateTime = new Date();
  const currentTime = dateTime.toISOString().split('T')[0];
  console.log(currentTime);
  const screenshotPath = `test-results/screenshots/${NavigationOptionsEnum.Demo_Home}-screenshot-${currentTime}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
 
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_About);
  await pomContainer.leafDemoAboutPage.g_takeScreenshot('About Page');
  
});
