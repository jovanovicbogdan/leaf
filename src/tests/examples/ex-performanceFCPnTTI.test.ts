import { test, expect } from '@/core/fixtures';
import { NavigationOptionsEnum } from '@/pages/common/base.page';

test('Performance metrics for Demo Home page', {
  tag: ['@P1', '@Performance'],
}, async ({ pomContainer }) => {
  const metrics = await pomContainer.leafDemoHomePage.g_measurePerformance(
    async () => {
      await pomContainer.leafDemoHomePage.g_navigateTo(NavigationOptionsEnum.Demo_Home);
    },
    {
      waitForNetworkIdle: true,
      logMetrics: true,
      assertMetrics: true,
      maxLoadTime: 5000,
      maxFcpTime: 2000,
    },
  );

  // Additional custom assertions if needed
  expect(metrics.loadTime).toBeLessThan(5000);
  if (metrics.fcpTime) {
    expect(metrics.fcpTime).toBeLessThan(2000);
  }
});

test('Performance metrics for Demo About page', {
  tag: ['@P1', '@Performance'],
}, async ({ pomContainer }) => {
  const metrics = await pomContainer.leafDemoAboutPage.g_measurePerformance(
    async () => {
      await pomContainer.leafDemoAboutPage.g_navigateTo(NavigationOptionsEnum.Demo_About);
    },
  );

  // Additional custom assertions if needed
  expect(metrics.loadTime).toBeLessThan(5000);
  if (metrics.fcpTime) {
    expect(metrics.fcpTime).toBeLessThan(2000);
  }
});

test('Performance metrics for Demo Overview page', {
  tag: ['@P1', '@Performance'],
}, async ({ pomContainer }) => {
  const metrics = await pomContainer.leafDemoOverviewPage.g_measurePerformance(
    async () => {
      await pomContainer.leafDemoOverviewPage.g_navigateTo(NavigationOptionsEnum.Demo_Overview);
    },
  );

  // Additional custom assertions if needed
  expect(metrics.loadTime).toBeLessThan(5000);
  if (metrics.fcpTime) {
    expect(metrics.fcpTime).toBeLessThan(2000);
  }
});