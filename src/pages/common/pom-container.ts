import { Page } from '@playwright/test';

//Demo Pages
import LeafDemoHomePage from '@/pages/pageobject/leaf-demo-home.page';
import LeafDemoOverviewPage from '@/pages/pageobject/leaf-demo-overview.page';
import LeafDemoAboutPage from '@/pages/pageobject/leaf-demo-about.page';
import LeafDemoRegisterPage from '@/pages/pageobject/leaf-demo-register.page';

export default class PomContainer {

  //Demo PO declaration
  readonly leafDemoHomePage: LeafDemoHomePage;
  readonly leafDemoOverviewPage: LeafDemoOverviewPage;
  readonly leafDemoAboutPage: LeafDemoAboutPage;
  readonly leafDemoRegisterPage: LeafDemoRegisterPage;
  
  constructor(page: Page) {

    //Demo PO creation
    this.leafDemoHomePage = new LeafDemoHomePage(page);
    this.leafDemoOverviewPage = new LeafDemoOverviewPage(page);
    this.leafDemoAboutPage = new LeafDemoAboutPage(page);
    this.leafDemoRegisterPage = new LeafDemoRegisterPage(page);
  }
}