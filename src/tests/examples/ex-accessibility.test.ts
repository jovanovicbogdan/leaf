import { test } from '@/core/fixtures';
import AxeBuilder from '@axe-core/playwright';
import { NavigationOptionsEnum } from '@/pages/common/base.page';
import LeafDemoAboutPage from '../../pages/pageobject/leaf-demo-about.page';

// Reference: https://www.youtube.com/watch?v=cs5-Kk9nQDA&ab_channel=Checkly
// npx playwright test ex-accessibility.test.ts --project="Google Chrome Desktop" --headed
// This will fail and it will push all the violations to the console and attach the JSON file to the test report (accessibility-scan-results).

test('Testing Accessibility using Axe', async ({ page }, testInfo) => {
  const leafDemoAboutPage = new LeafDemoAboutPage(page);

  await leafDemoAboutPage.g_navigateTo(NavigationOptionsEnum.Demo_About);

  // Getting only the violations from the results
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(violations, null, 2),
    contentType: 'application/json',
  });

  // Log the violations to the console
  console.log(violations);
  //expect(violations).toHaveLength(0);

});

test('Using pomContainer', async ({ page, pomContainer }, testInfo) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);

  // Perform accessibility analysis using AxeBuilder
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

    
  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(violations, null, 2),
    contentType: 'application/json',
  });
  
  // Log the violations to the console
  console.log(violations);
  //expect(violations).toHaveLength(0);
});


