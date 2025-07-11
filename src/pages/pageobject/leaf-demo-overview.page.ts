import { Locator, Page } from '@playwright/test';
import BasePage from '@/pages/common/base.page';

export default class LeafDemoOverviewPage extends BasePage {
  readonly accountsOverview: Locator;

  constructor(page: Page) {
    super(page);
    this.accountsOverview = page.getByRole('heading', {
      name: 'Accounts Overview',
    });
  }
}
