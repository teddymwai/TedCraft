import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('TedCraft Smoke & Accessibility Suite', () => {
  test('homepage renders featured triad, hides drafts, and has working CTAs', async ({ page }) => {
    await page.goto('/');

    // Main navigation links
    await expect(page.getByRole('link', { name: 'Works', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Learning curves', exact: true }).first()).toBeVisible();

    // Curated featured triad (RangeMaster, UAM, Resilient Orchestrator)
    await expect(page.getByText('RangeMaster Cockpit').first()).toBeVisible();
    await expect(page.getByText('Automated User Access Management (UAM) Review Engine').first()).toBeVisible();
    await expect(page.getByText('GitLab Resilient Bulk CI/CD Orchestrator').first()).toBeVisible();

    // Draft entry must not be visible
    await expect(page.getByText('TCP Socket Backpressure in High-Concurrency Scrapers')).toHaveCount(0);

    // Primary CTA navigates to /works
    await page.getByRole('link', { name: /Explore production works/i }).click();
    await expect(page).toHaveURL(/\/works\/?$/);
  });

  test('mobile navigation toggles aria-expanded and closes on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const menuButton = page.locator('#mobile-menu-btn');
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await menuButton.click();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mobile-menu')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-menu')).toBeHidden();
  });

  test('works catalog has no placeholder demo/example links and detail pages load', async ({ page }) => {
    await page.goto('/works/');
    const bodyHtml = await page.content();
    expect(bodyHtml).not.toContain('example.com');

    await page.getByRole('link', { name: /RangeMaster Cockpit/i }).first().click();
    await expect(page).toHaveURL(/\/works\/rangemaster-cockpit\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('RangeMaster Cockpit');
  });

  test('learning curves exclude drafts and render published post-mortems', async ({ page }) => {
    await page.goto('/learning-curves/');
    await expect(page.getByText('TCP Socket Backpressure in High-Concurrency Scrapers')).toHaveCount(0);
    await expect(page.getByText('The Silent Deadlock')).toBeVisible();
  });

  test('accessibility scan (WCAG 2 A/AA) has zero critical or serious violations', async ({ page }) => {
    for (const route of ['/', '/works/', '/learning-curves/', '/about/']) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const blocking = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );
      expect(blocking, `Axe violations on ${route}: ${JSON.stringify(blocking, null, 2)}`).toEqual([]);
    }
  });
});
