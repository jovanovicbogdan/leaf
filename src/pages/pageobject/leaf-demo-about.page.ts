import { Locator, Page } from '@playwright/test';
import BasePage from '@/pages/common/base.page';

export default class LeafDemoAboutPage extends BasePage {
  readonly aboutPage: Locator;
  readonly servicesLink: Locator;
  readonly mobileServiceTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.aboutPage = page.getByRole('heading', {
      name: 'ParaSoft Demo Website',
    });
    // Initialize the services link
    this.servicesLink = page.getByRole('link', { name: 'Services' });
    this.mobileServiceTitle = page.getByRole('heading', { name: 'World\'s Best Test Automation Solutions' });
  }  
  
  async clickServiceLink(): Promise<void> {
    if (this.isMobileViewport()) {
      // On mobile, we need to handle the hamburger menu first
      const hamburgerMenu = this.page.locator('#main-menu span');

      const isHamburgerVisible = await hamburgerMenu.isVisible();
      if (isHamburgerVisible) {
        await hamburgerMenu.click();
        // Wait for mobile menu animation
        await this.page.waitForTimeout(500);
      }
    }

    // Click the services link and verify visibility first
    await this.servicesLink.waitFor({ state: 'visible' });
    await this.servicesLink.click();
    
    // Wait for the service title to be visible
    await this.mobileServiceTitle.waitFor({ state: 'visible', timeout: 5000 });
  }
}  

