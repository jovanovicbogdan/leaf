import { Locator, Page } from '@playwright/test';
import BasePage from '@/pages/common/base.page';

export default class LeafDemoHomePage extends BasePage {
  // Page header elements
  readonly pageTitle: Locator;
  readonly logo: Locator;

  // Login form elements
  readonly customerLoginHeading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginError: Locator;

  // Navigation links
  readonly registerLink: Locator;
  readonly forgotLoginLink: Locator;
  readonly aboutLink: Locator;
  readonly contactLink: Locator;
  readonly servicesLink: Locator;
  
  // Customer care section
  readonly customerCareHeading: Locator;
  readonly phoneNumber: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize page header elements
    this.pageTitle = page.locator('title:has-text("ParaBank")');
    this.logo = page.locator('.logo');

    // Initialize login form elements
    this.customerLoginHeading = page.getByRole('heading', {
      name: 'Customer Login',
    });
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByText('Log In');
    this.loginError = page.locator('.error');

    // Initialize navigation links
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.forgotLoginLink = page.getByRole('link', { name: 'Forgot login info?' });
    this.aboutLink = page.getByRole('link', { name: 'About Us' });
    this.contactLink = page.getByRole('link', { name: 'Contact Us' });
    this.servicesLink = page.getByRole('link', { name: 'Services' });

    // Initialize customer care elements
    this.customerCareHeading = page.getByRole('heading', { name: 'Customer Care' });
    this.phoneNumber = page.locator('.contact-info .phone');
  }
  /**
   * Login with the provided credentials
   */
  async fn_loginUser(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Clear the login form fields
   */
  async fn_clearLoginForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Navigate to the registration page
   */
  async fn_goToRegister(): Promise<void> {
    await this.registerLink.click();
  }

  /**
   * Navigate to the forgot login info page
   */
  async fn_goToForgotLogin(): Promise<void> {
    await this.forgotLoginLink.click();
  }

  /**
   * Get the current error message (if any)
   */
  async fn_getErrorMessage(): Promise<string | null> {
    try {
      return await this.loginError.textContent();
    } catch {
      return null;
    }
  }
  
  /**
   * Check if user is logged in
   */
  async fn_isLoggedIn(): Promise<boolean> {
    try {
      await this.customerLoginHeading.waitFor({ state: 'hidden', timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }
}
