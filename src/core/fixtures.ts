import { test as base, request as playwrightRequest, APIRequestContext } from '@playwright/test';

import PomContainer from '@/pages/common/pom-container';
import BasePage from '@/pages/common/base.page'; // Import BasePage to access BASE_URL

//Every time a test is passed into the fixture, 
//it will create a new class for each custom fixture like pomContainer or apiClientContext
type CustomFixture = {
  forEachTest: void;
  pomContainer: PomContainer;
  apiRequest: typeof playwrightRequest;
  apiClientContext: APIRequestContext; // Add APIRequestContext to the test context
};

export const test = base.extend<CustomFixture>({
  forEachTest: [
    async ({ browser }, use) => {
      // This code runs before each test globally.
      const testInfo = base.info();
      testInfo.annotations.push({
        type: 'browser_version',
        description: browser.version(),
      });
      
      // You can also add other global setup code here if needed

      await use();
      // Code below runs after each test globally.
      //await page.close(); // Close the page after each test - make sure to add page within the fixture: async ({ page browser }, use)
    },
    { auto: true },
  ],
  // Initialize the pomContainer object as PomContainer
  pomContainer: async ({ page }, use) => {
    await use(new PomContainer(page));
  },
  //initialize the request object as apiRequest
  apiRequest: async ({}, use) => {
    // Provide the Playwright `request` object to the test context
    await use(playwrightRequest);
  },
  //initialize the apiClientContext as APIRequestContext
  apiClientContext: async ({ apiRequest }, use) => {
    const context = await apiRequest.newContext({
      baseURL: BasePage.baseApiURL, // Use the dynamically set BASE_URL from base.page.ts
    });
    await use(context); // Provide the APIRequestContext to the test
    await context.dispose(); // Clean up after the test
  },
});

export { expect } from '@playwright/test';
