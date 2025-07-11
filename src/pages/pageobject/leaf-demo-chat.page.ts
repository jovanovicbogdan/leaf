import { Page, expect } from '@playwright/test';
import BasePage from '@/pages/common/base.page';

export default class LeafDemoChatPage extends BasePage {
  private readonly chatIframe: string;
  private readonly messageFieldSelector: string;
  private readonly sendButtonSelector: string;
  private readonly chatScrollableSelector: string;

  constructor(page: Page) {
    super(page);
    this.chatIframe = 'iframe[name="____talkjs__chat__ui_internal"]';
    this.messageFieldSelector = '[data-testid="message-input"], [role="textbox"][aria-label="Message field"]';
    this.sendButtonSelector = '[data-testid="send-button"], button[aria-label="Send"]';
    this.chatScrollableSelector = '[data-testid="chat-scrollable"], [data-testid="messages"]';
  }

  /**
   * Wait for the chat iframe and its essential elements to be ready
   */
  async waitForChatReady(timeout = 20000): Promise<void> {
    const iframe = this.page.frameLocator(this.chatIframe);
    await this.page.waitForTimeout(2000); // Give iframe time to load
    
    await expect(iframe.locator(this.messageFieldSelector)).toBeVisible({ timeout });
    await expect(iframe.locator(this.chatScrollableSelector.split(',')[0])).toBeVisible({ timeout });
  }

  /**
   * Send a message in the chat
   * @param message The message to send
   */
  async sendMessage(message: string): Promise<void> {
    await this.waitForChatReady();
    const iframe = this.page.frameLocator(this.chatIframe);
    
    // Try multiple times in case of flakiness
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const messageField = iframe.locator(this.messageFieldSelector.split(',')[0]);
        await messageField.click();
        await messageField.fill(message);
        
        const sendButton = iframe.locator(this.sendButtonSelector.split(',')[0]);
        await sendButton.click();
        
        // Wait for the message to appear
        await this.waitForMessage(message);
        return;
      } catch (error) {
        if (attempt === 2) throw error;
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Get the current chat content
   * @returns The chat content as a string
   */
  async getChatContent(): Promise<string> {
    await this.waitForChatReady();
    const iframe = this.page.frameLocator(this.chatIframe);
    const content = await iframe.locator(this.chatScrollableSelector.split(',')[0]).textContent();
    if (content === null) {
      throw new Error('Could not get chat content');
    }
    return content;
  }

  /**
   * Wait for a specific message to appear in the chat
   * @param message The message to wait for
   * @param timeout Timeout in milliseconds
   */
  async waitForMessage(message: string, timeout = 10000): Promise<void> {
    const iframe = this.page.frameLocator(this.chatIframe);
    await expect(
      iframe.getByText(message, { exact: true }).first()
    ).toBeVisible({ timeout });
  }
}
