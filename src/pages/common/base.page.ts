import { Page } from '@playwright/test';
import { getBaseApiUrl, getBaseUrl, getFeatureFlags } from '@/core/configuration';

/* 
Notes:
  - Creating global navigation object will allow our IDE to understand the hiearchy structure.
  - This will allow us to easily update all our scripts and object if a migration is require as the IDE will know where to make updates.
  - Type will also be enforced within each scripts so there will be no broken reference to each object.
*/
export const NavigationOptionsEnum = {
  Demo_Home: 'home page for demo',
  Demo_Register: 'register page for demo',
  Demo_About: 'about page for demo',
  Demo_Overview: 'overview page for demo',
} as const;
export type NavigationOptions =
  (typeof NavigationOptionsEnum)[keyof typeof NavigationOptionsEnum];

// Interface for performance metrics options
// This interface defines the options that can be passed to the performance measurement method.
// CDP session is only available in Chromium
interface PerformanceMetricsOptions {
  waitForNetworkIdle?: boolean;
  logMetrics?: boolean;
  assertMetrics?: boolean;
  maxLoadTime?: number;
  maxFcpTime?: number;
}

interface PerformanceMetrics {
  loadTime: number;
  fcpTime?: number;
  chromeMetrics: Array<{
    name: string;
    value: number;
  }>;
}


// All page object constructor will have access to these global base methods. All method must start off with g_ to classify and identify the method.
export default abstract class BasePage {
  protected page: Page;
  protected baseURL: string;
  static baseApiURL = getBaseApiUrl(); // Centralized base URL for API requests from configuration
 
  constructor(page: Page) {
    this.page = page;
    this.baseURL = getBaseUrl();
  }
  
  //Global Base Wait (Manual Sleep)
  async g_Wait(Time: number) {
    // This is a manual sleep method. It is not recommended to use this in production code.
    await this.page.waitForTimeout(Time);
  }

  //Global Base Navigation URL - Individual navigation that might not be part of the global domain
  async g_navigateToUrlPage(URL: string) {
    await this.page.goto(`${this.baseURL}/${URL}`);
  }

  async g_navigateToUrlPageOutside(URL: string) {
    await this.page.goto(`${URL}`);
  }

  //Global Base Navigation
  async g_navigateTo(navigation: NavigationOptions) {
    switch (navigation) {
    case NavigationOptionsEnum.Demo_Home:
      await this.page.goto(
        `${this.baseURL}/parabank/index.htm`,
      );
      break;
    case NavigationOptionsEnum.Demo_Register:
      await this.page.goto(
        `${this.baseURL}/parabank/register.htm`,
      );
      break;
    case NavigationOptionsEnum.Demo_About:
      await this.page.goto(
        `${this.baseURL}/parabank/about.htm`,
      );
      break;  
    case NavigationOptionsEnum.Demo_Overview:
      await this.page.goto(
        `${this.baseURL}/parabank/overview.htm`,
      );
      break;  
    }
  }  //Global Base Screenshot
  async g_takeScreenshot(pagename: string) {
    const dateTime = new Date();
    const currentTime = dateTime.toISOString().split('T')[0];
    const screenshotPath = `test-results/screenshots/${pagename}-screenshot-${currentTime}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }

  // Get feature flags output
  g_getfeatureFlagOutput(): string {
    try {
      const flags = getFeatureFlags();
      return JSON.stringify(flags.FEATURE_FLAGS, null, 2);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error('Failed to read feature flags: ' + errorMessage);
    }
  }

  // Check if the current viewport is a mobile viewport
  // This method checks if the viewport width is less than or equal to 768 pixels, which is a common breakpoint for mobile devices.
  protected isMobileViewport(): boolean {
    const viewport = this.page.viewportSize();
    // Standard mobile breakpoint
    return viewport !== null && viewport.width <= 768;
  }

  /**
   * Measures performance metrics for a navigation action. 
   * CDP session is only available in Chromium
   * @param navigationAction - Async function that performs the navigation
   * @param options - Optional configuration for performance measurement
   * @returns Promise<PerformanceMetrics> - Object containing performance metrics
   */
  public async g_measurePerformance(
    navigationAction: () => Promise<void>,
    options: PerformanceMetricsOptions = {},
  ): Promise<PerformanceMetrics> {
    const {
      waitForNetworkIdle = true,
      logMetrics = true,
      assertMetrics = true,
      maxLoadTime = 5000,
      maxFcpTime = 2000,
    } = options;

    // Create CDP session for performance monitoring
    const client = await this.page.context().newCDPSession(this.page);
    await client.send('Performance.enable');

    // Start measuring
    const startTime = Date.now();

    // Execute the navigation action
    await navigationAction();
    
    // Wait for network idle if requested
    if (waitForNetworkIdle) {
      await this.page.waitForLoadState('networkidle');
    }
    
    const loadTime = Date.now() - startTime;

    // Get Chrome performance metrics
    const perfMetrics = await client.send('Performance.getMetrics');

    // Get FCP from Performance API
    const fcpMetric = await this.page.evaluate(() => {
      const [fcp] = performance.getEntriesByName('first-contentful-paint');
      return fcp ? fcp.startTime : undefined;
    });

    // Format metrics
    const metrics: PerformanceMetrics = {
      loadTime,
      fcpTime: fcpMetric,
      chromeMetrics: perfMetrics.metrics
        .filter((metric: { name: string }) => 
          ['FirstContentfulPaint', 'DomContentLoaded', 'LoadEvent'].includes(metric.name),
        )
        .map((metric: { name: string; value: number }) => ({
          name: metric.name,
          value: Math.round(metric.value),
        })),
    };

    // Log metrics if requested
    if (logMetrics) {
      console.log('\nPerformance Metrics:');
      console.log(`Page Load Time: ${metrics.loadTime}ms`);
      if (metrics.fcpTime) {
        console.log(`First Contentful Paint: ${Math.round(metrics.fcpTime)}ms`);
      }
      
      console.log('\nChrome Performance Metrics:');
      metrics.chromeMetrics.forEach(metric => {
        console.log(`${metric.name}: ${metric.value}ms`);
      });
    }

    // Assert metrics if requested
    if (assertMetrics) {
      if (metrics.loadTime > maxLoadTime) {
        throw new Error(`Page load time ${metrics.loadTime}ms exceeds maximum ${maxLoadTime}ms`);
      }
      if (metrics.fcpTime && metrics.fcpTime > maxFcpTime) {
        throw new Error(`First Contentful Paint ${metrics.fcpTime}ms exceeds maximum ${maxFcpTime}ms`);
      }
    }

    return metrics;
  }
}
