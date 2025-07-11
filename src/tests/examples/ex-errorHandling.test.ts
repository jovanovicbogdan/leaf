import { test, expect } from '@playwright/test';
import { errors } from 'playwright';

//Wrap potentially failing Playwright actions within a try...catch block to handle exceptions.
test('Handle element not found', async ({ page }) => {
  try {
    await page.goto('https://example.com');
    await page.locator('non-existent-element').click();
  } catch (error) {
    if (error instanceof errors.TimeoutError) {
      console.error('Element not found within the timeout period.');
    } else {
      console.error('An error occurred:', error);
    }
  }
});

//Playwright provides specific error classes, like errors.TimeoutError, to handle different failure scenarios.
test('Handle timeout error', async ({ page }) => {
  try {
    await page.goto('https://example.com', { timeout: 1000 }); // Set a short timeout
  } catch (error) {
    if (error instanceof errors.TimeoutError) {
      console.log('Navigation timed out.');
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
});

//For non-critical assertions, use expect.soft() to prevent test failures from stopping execution.
test('Soft assertion example', async ({ page }) => {
  await page.goto('https://example.com');
  

  await expect.soft(page.locator('h1')).toHaveText('Example');
  // Test will continue even if the above assertion fails
  await expect.soft(page.locator('a')).toHaveAttribute('href', 'https://www.iana.org/domains/example');
  
  // The test will continue even if one or more of the above assertions fail
});