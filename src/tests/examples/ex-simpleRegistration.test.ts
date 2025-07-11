import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';

//Simple registration test cases
test('Simple Register of new account', async ({ page, pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await pomContainer.leafDemoHomePage.registerLink.click();
  await expect(pomContainer.leafDemoRegisterPage.registerPage).toBeVisible();
  const randomNumber = Math.random().toString().slice(2, 8);
  console.log('Random Number: ', randomNumber);
  const firstName = 'John' + randomNumber;
  const lastName = 'Doe' + randomNumber;  
  const addressStreetInput = '123 Main St';
  const addressCityInput = 'Anytown';
  const addressStateInput = 'CA'; 
  const addressZipCodeInput = '12345';
  const phoneNumberInput = '123-456-7890';
  const ssnInput = '123-45-6789';
  const usernameInput = 'username' + randomNumber;
  const passwordInput = 'password' + randomNumber;
  const repeatedPasswordInput = 'password' + randomNumber;
  await pomContainer.leafDemoRegisterPage.fn_registerUser(
    usernameInput,
    passwordInput,
    repeatedPasswordInput,
    firstName,
    lastName,
    addressStreetInput,
    addressCityInput,
    addressStateInput,
    addressZipCodeInput,
    phoneNumberInput,
    ssnInput,
  );

  await expect(pomContainer.leafDemoRegisterPage.registerWelcomeText).toContainText('Welcome username' + randomNumber);
  await expect(pomContainer.leafDemoRegisterPage.registerConfirmationText).toContainText('Your account was created successfully. You are now logged in.');
  //This show us that we can also use the current page declaration to validate the text instead of using the pomContainer.
  await expect(page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.');
  
});

//This is a good example of how to use the same test case but with different parameters by overloading the function
test('Simple Register with only username and password', async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await pomContainer.leafDemoHomePage.registerLink.click();
  await expect(pomContainer.leafDemoRegisterPage.registerPage).toBeVisible();
  const randomNumber = Math.random().toString().slice(2, 8);
  console.log('Random Number: ', randomNumber);
  const usernameInput = 'username' + randomNumber;
  const passwordInput = 'password' + randomNumber;
  const repeatedPasswordInput = 'password' + randomNumber;
  await pomContainer.leafDemoRegisterPage.fn_registerUser(
    usernameInput,
    passwordInput,
    repeatedPasswordInput,
  );
  await expect(pomContainer.leafDemoRegisterPage.registerWelcomeText).toContainText('Welcome username' + randomNumber);
  console.log(await pomContainer.leafDemoRegisterPage.registerWelcomeText.textContent());
  await expect(pomContainer.leafDemoRegisterPage.registerConfirmationText).toContainText('Your account was created successfully. You are now logged in.');
});

//This is a good example of how to use the same test case but with using a pregistered user
test('Simple Register with no parameters', async ({ pomContainer }) => {
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await pomContainer.leafDemoHomePage.registerLink.click();
  await expect(pomContainer.leafDemoRegisterPage.registerPage).toBeVisible();
  const usernameNumber = await pomContainer.leafDemoRegisterPage.fn_registerUserSimple();
  await expect(pomContainer.leafDemoRegisterPage.registerWelcomeText).toContainText('Welcome username' + usernameNumber);
  console.log(await pomContainer.leafDemoRegisterPage.registerWelcomeText.textContent());
  await expect(pomContainer.leafDemoRegisterPage.registerConfirmationText).toContainText('Your account was created successfully. You are now logged in.');
});

//This is a good example of a full standardized template and how to use the annotation and tag
test('E2E User Registration Flow', {
  tag: ['@P1', '@RegistrationComponent'],
  annotation: [
    { 
      type: 'issue', 
      description: 'https://your-jira-url/browse/DEMO-123',
    },
  ],
}, async ({ pomContainer }) => {
  // Navigate to home and click register
  await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
  await pomContainer.leafDemoHomePage.registerLink.click();
  
  // Verify registration page is loaded
  await expect(pomContainer.leafDemoRegisterPage.registerPage).toBeVisible();

  // Generate unique test data
  const randomNumber = Math.random().toString().slice(2, 8);
  const testData = {
    firstName: `John${randomNumber}`,
    lastName: `Doe${randomNumber}`,
    address: '123 Test Street',
    city: 'Test City',
    state: 'TS',
    zipCode: '12345',
    phone: '123-456-7890',
    ssn: '123-45-6789',
    username: `testuser${randomNumber}`,
    password: `pass${randomNumber}`,
  };

  // Register new user
  await pomContainer.leafDemoRegisterPage.fn_registerUser(
    testData.username,
    testData.password,
    testData.password,
    testData.firstName,
    testData.lastName,
    testData.address,
    testData.city,
    testData.state,
    testData.zipCode,
    testData.phone,
    testData.ssn,
  );

  // Verify successful registration
  await expect(pomContainer.leafDemoRegisterPage.registerWelcomeText)
    .toContainText(`Welcome ${testData.username}`);
  
  await expect(pomContainer.leafDemoRegisterPage.registerConfirmationText)
    .toContainText('Your account was created successfully. You are now logged in.');

  // Log test data for debugging
  console.log('Test User Created:', {
    username: testData.username,
    password: testData.password,
  });
});