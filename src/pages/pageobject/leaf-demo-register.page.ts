import { Locator, Page } from '@playwright/test';
import BasePage from '@/pages/common/base.page';

export default class LeafDemoRegisterPage extends BasePage {
  readonly registerPage: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressStreetInput: Locator;
  readonly addressCityInput: Locator;
  readonly addressStateInput: Locator;
  readonly addressZipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatedPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly registerWelcomeText: Locator;
  readonly registerConfirmationText: Locator;

  constructor(page: Page) {
    super(page);
    this.registerPage = page.getByRole('heading', {
      name: 'Signing up is easy!',
    });

    this.firstNameInput = page.locator('[id="customer\\.firstName"]');
    this.lastNameInput = page.locator('[id="customer\\.lastName"]');
    this.addressStreetInput = page.locator('[id="customer\\.address\\.street"]');
    this.addressCityInput = page.locator('[id="customer\\.address\\.city"]');
    this.addressStateInput = page.locator('[id="customer\\.address\\.state"]');
    this.addressZipCodeInput = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneNumberInput = page.locator('[id="customer\\.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer\\.ssn"]');
    this.usernameInput = page.locator('[id="customer\\.username"]');
    this.passwordInput = page.locator('[id="customer\\.password"]');
    this.repeatedPasswordInput = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.registerWelcomeText = page.locator('h1');
    this.registerConfirmationText = page.locator('#rightPanel');
  }

  //Overload the function to allow for different parameters
  async fn_registerUser(
    usernameInput: string,
    passwordInput: string,
    repeatedPasswordInput: string,
    firstNameInput?: string,
    lastNameInput?: string,
    addressStreetInput?: string,
    addressCityInput?: string,
    addressStateInput?: string,
    addressZipCodeInput?: string,
    phoneNumberInput?: string,
    ssnInput?: string,
  ): Promise<void> {
    if (usernameInput && passwordInput && repeatedPasswordInput 
      && firstNameInput && lastNameInput && addressStreetInput && addressCityInput && addressStateInput && addressZipCodeInput && phoneNumberInput && ssnInput 
    ) {
    // Full registration with all details
      await this.firstNameInput.fill(firstNameInput);
      await this.lastNameInput.fill(lastNameInput);
      await this.addressStreetInput.fill(addressStreetInput);
      await this.addressCityInput.fill(addressCityInput);
      await this.addressStateInput.fill(addressStateInput);
      await this.addressZipCodeInput.fill(addressZipCodeInput);
      await this.phoneNumberInput.fill(phoneNumberInput);
      await this.ssnInput.fill(ssnInput);
      await this.usernameInput.fill(usernameInput);
      await this.passwordInput.fill(passwordInput);
      await this.repeatedPasswordInput.fill(repeatedPasswordInput);
    } else {
      // Registration with only username and password and pregistered user
      const randomNumber = Math.random().toString().slice(2, 8);
      console.log('Random Number: ', randomNumber);
      await this.firstNameInput.fill('John' + randomNumber);
      await this.lastNameInput.fill('Doe' + randomNumber);  
      await this.addressStreetInput.fill('123 Main St');
      await this.addressCityInput.fill('Anytown'); 
      await this.addressStateInput.fill('CA');
      await this.addressZipCodeInput.fill('12345');
      await this.phoneNumberInput.fill('123-456-7890');
      await this.ssnInput.fill('123-45-6789');
      // Fill in the username and password fields
      await this.usernameInput.fill(usernameInput);
      await this.passwordInput.fill(passwordInput);
      await this.repeatedPasswordInput.fill(repeatedPasswordInput);
    }
    await this.registerButton.click();
  }

  async fn_registerUserSimple(): Promise<string> {
    const randomNumber = Math.random().toString().slice(2, 8);
    console.log('Default number: ', randomNumber);
    await this.firstNameInput.fill('John' + randomNumber);
    await this.lastNameInput.fill('Doe' + randomNumber);  
    await this.addressStreetInput.fill('123 Main St');
    await this.addressCityInput.fill('Anytown'); 
    await this.addressStateInput.fill('CA');
    await this.addressZipCodeInput.fill('12345');
    await this.phoneNumberInput.fill('123-456-7890');
    await this.ssnInput.fill('123-45-6789');
    await this.usernameInput.fill('username' + randomNumber);
    await this.passwordInput.fill('password' + randomNumber);
    await this.repeatedPasswordInput.fill('password' + randomNumber);
    await this.registerButton.click();
    return randomNumber;
  }
}
