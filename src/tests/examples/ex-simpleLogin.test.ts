import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';


test('Login with username and password', async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);

  await pomContainer.leafDemoHomePage.fn_loginUser('johndoe', '123');
  await expect(pomContainer.leafDemoHomePage.loginError).toBeVisible();
  
});
