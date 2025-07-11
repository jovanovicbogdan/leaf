import { test } from '@/core/fixtures';
import { expect } from '@playwright/test';
import PomContainer from '@/pages/common/pom-container';

test('Single user context', async ({ page }) => {
  await page.goto('https://talkjs.com/demo/playground/?conversationId=_nzbxt74');
  const msg = `hello you ${Math.floor(Math.random() * 1000)}`;
  await page.locator('iframe[name="____talkjs__chat__ui_internal"]').contentFrame().getByRole('paragraph').click();
  await page.locator('iframe[name="____talkjs__chat__ui_internal"]').contentFrame().getByRole('textbox', { name: 'Message field' }).fill(msg);
  await page.locator('iframe[name="____talkjs__chat__ui_internal"]').contentFrame().getByRole('button', { name: 'Send' }).click();
  await expect(page.locator('iframe[name="____talkjs__chat__ui_internal"]').contentFrame().locator('#chat-scrollable')).toContainText(msg);
  await page.close();
  // Ensure the page is closed after the test. This is important when testing multiple contexts within the same test file.
});

test('Test chat interaction between two browser contexts', {
  tag: ['@P0', '@DualUsers'],
}, async ({ page, context }) => {
  // First user context is already provided via pomContainer
  const pomContainer1 = new PomContainer(page);

  // Create second browser context. Gets the current browser instance from the test context.
  const browser = context.browser();
  if (!browser) throw new Error('Browser instance not found');
  
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  const pomContainer2 = new PomContainer(page2);

  /*
  This setup is necessary because to test chat interaction between two users, we need:
    Two separate browser contexts to simulate two different users
    Each context needs its own POM container to manage page interactions
    Both contexts need to share the same underlying browser instance
  */

  try {
    // Navigate both users to the test site
    await pomContainer1.leafDemoAboutPage.g_navigateToUrlPageOutside('https://talkjs.com/demo/playground/?conversationId=_nzbxt74');
    await pomContainer2.leafDemoAboutPage.g_navigateToUrlPageOutside('https://talkjs.com/demo/playground/?conversationId=_nzbxt74');

    // Wait for pages to load
    await page.waitForLoadState('networkidle');
    await page2.waitForLoadState('networkidle');

    // Get iframe for both users
    const iframe1 = page.frameLocator('iframe[name="____talkjs__chat__ui_internal"]');
    const iframe2 = page2.frameLocator('iframe[name="____talkjs__chat__ui_internal"]');

    // Wait for chat components to be ready
    await iframe1.getByRole('textbox', { name: 'Message field' }).waitFor({ state: 'visible', timeout: 10000 });
    await iframe2.getByRole('textbox', { name: 'Message field' }).waitFor({ state: 'visible', timeout: 10000 });    // User 1 sends a message
    const randomNum = Math.floor(Math.random() * 1000);
    const user1Message = 'Hello from User 1! ' + randomNum;
    await iframe1.getByRole('textbox', { name: 'Message field' }).fill(user1Message);
    await iframe1.getByRole('button', { name: 'Send' }).click();

    // Wait for message to be sent and received
    await page.waitForTimeout(1000);

    // Verify message appears in both chats (might be shown with "Visitor" prefix)
    const chatContent1 = await iframe1.locator('#chat-scrollable').textContent();
    const chatContent2 = await iframe2.locator('#chat-scrollable').textContent();
    
    expect(chatContent1).toContain(user1Message);
    expect(chatContent2).toContain(user1Message);

    // User 2 responds
    const user2Message = 'Hi User 1, got your message! ' + randomNum;
    await iframe2.getByRole('textbox', { name: 'Message field' }).fill(user2Message);
    await iframe2.getByRole('button', { name: 'Send' }).click();

    // Wait for message to be sent and received
    await page.waitForTimeout(1000);

    // Get updated chat contents
    const updatedContent1 = await iframe1.locator('#chat-scrollable').textContent();
    const updatedContent2 = await iframe2.locator('#chat-scrollable').textContent();

    // Verify both messages appear in both chats
    expect(updatedContent1).toContain(user1Message);
    expect(updatedContent1).toContain(user2Message);
    expect(updatedContent2).toContain(user1Message);
    expect(updatedContent2).toContain(user2Message);

  } finally {
    // Clean up the second context
    await context2.close();
  }
});