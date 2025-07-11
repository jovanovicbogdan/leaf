import { test, expect } from '@/core/fixtures';

/*
Note: https://playwright.dev/docs/test-assertions
 - Normally, all page object assertion should be made within the page object file.
 - Only expected outcome of an action should be asserted within the script itself.
 - This will allow resuability within all asserted page object used within all other scripts file.
 */

test('Login with username and password', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  // Assert that the username field is visible
  const usernameField = page.locator('input[name="username"]');
  await expect(usernameField).toBeVisible();

  // Assert that the password field is visible
  const passwordField = page.locator('input[name="password"]');
  await expect(passwordField).toBeVisible();

  // Assert that the login button is visible
  const loginButton = page.locator('input[type="submit"]');
  await expect(loginButton).toBeVisible();

  // Optionally, check the page title or header
  await expect(page).toHaveTitle(/ParaBank/);

  // Assert that the "Customer Login" header is visible
  const customerLoginHeader = page.locator('h2:has-text("Customer Login")');
  await expect(customerLoginHeader).toBeVisible();

  // Assert that the "Forgot login info?" link is visible
  const forgotLoginLink = page.locator('a:has-text("Forgot login info?")');
  await expect(forgotLoginLink).toBeVisible();

  // Assert that the "Register" link is visible
  const registerLink = page.locator('a:has-text("Register")');
  await expect(registerLink).toBeVisible();

  
});
