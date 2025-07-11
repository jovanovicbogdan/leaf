
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  testIgnore: ['**/zzzIgnoreFolder/**'], // Ignore folder (will be use for AI Bot)
  reporter: [
    ['html', 
      { 
        open: 'never',
        outputFolder: './playwright-report/html/html-report',

      },
    ],
    [
      'junit',
      {
        embedAnnotationsAsProperties: true,
        outputFile: './playwright-report/junit/junit-report.xml',
      },
    ],
  ],
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    testIdAttribute: 'data-test',
  },
  projects: [
    /* API Config */
    {
      name: 'API',
      use: {}, // API does not require browser instance
    },

    /* Examples Folder: npx playwright test --project=Examples */
    {
      name: 'Examples',
      testDir: './src/tests/examples', // Run only test from examples folder
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1280,
          height: 720,
        },
      },
    },

    /* Google Chrome Stealth Config */
    {
      name: 'Google Test',
      use: {
        ...devices['Desktop Chrome'],
        headless: false, // run in visible mode for realism
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
               '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        locale: 'en-US',
        viewport: {
          width: 1280,
          height: 720,
        },
        permissions: ['geolocation'],
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled', // remove bot flag
          ],
        },
      },
    },

    ///////////////////////////////////////Default Configurations///////////////////////////////////////
    
    /* Google Chrome Config */
    {
      name: 'Google Chrome Desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1280,
          height: 720,
        },
      },
    },
    {
      name: 'Google Chrome Tablet',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 768,
          height: 1024,
        },
      },
    },
    {
      name: 'Google Chrome Mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 360,
          height: 800,
        },
      },
    },
    /* Firefox Config */
    {
      name: 'Firefox Desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {
          width: 1280,
          height: 720,
        },
      },
    },
    {
      name: 'Firefox Tablet',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {
          width: 768,
          height: 1024,
        },
      },
    },
    {
      name: 'Firefox Mobile',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {
          width: 360,
          height: 800,
        },
      },
    },
    /* Safari Config */
    {
      name: 'Safari Desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: {
          width: 1280,
          height: 720,
        },
      },
    },
    {
      name: 'Safari Tablet',
      use: {
        ...devices['Desktop Safari'],
        viewport: {
          width: 768,
          height: 1024,
        },
      },
    },
    {
      name: 'Safari Mobile',
      use: {
        ...devices['Desktop Safari'],
        viewport: {
          width: 360,
          height: 800,
        },
      },
    },
    /* Microsoft Edge Config */
    {
      name: 'Microsoft Edge Desktop',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: {
          width: 1280,
          height: 720,
        },
      },
    },
    {
      name: 'Microsoft Edge Tablet',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: {
          width: 768,
          height: 1024,
        },
      },
    },
    {
      name: 'Microsoft Edge Mobile',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: {
          width: 360,
          height: 800,
        },
      },
    },
  ],
});
