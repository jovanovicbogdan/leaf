import { test, expect } from '@/core/fixtures';

test('Simple test with no page object', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');


  await expect(page.locator('h2')).toContainText('Customer Login');

  await page.locator('input[name="username"]').fill('username');
  await page.locator('input[name="password"]').fill('password');

  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.locator('h1')).toContainText('Error!');
});
