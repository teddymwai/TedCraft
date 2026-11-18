import { test, expect } from '@playwright/test';

test.describe('Ambient Micro-Mote Canvas Suite', () => {
  test('renders on homepage with explicit layering, dark/light tokens, and zero console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');

    const canvas = page.locator('#ambient-canvas');

    await expect(canvas).toBeVisible();
    await expect(canvas).toHaveAttribute('aria-hidden', 'true');

    const styles = await page.evaluate(() => {
      const c = document.getElementById('ambient-canvas');
      const s = document.getElementById('site-shell');
      if (!c || !s) return null;
      const csC = getComputedStyle(c);
      const csS = getComputedStyle(s);
      return {
        pointerEvents: csC.pointerEvents,
        zIndexCanvas: csC.zIndex,
        zIndexShell: csS.zIndex,
        colorDark: csC.color,
        width: (c as HTMLCanvasElement).width,
        height: (c as HTMLCanvasElement).height,
      };
    });

    expect(styles).not.toBeNull();
    expect(styles!.pointerEvents).toBe('none');
    expect(styles!.zIndexCanvas).toBe('0');
    expect(styles!.zIndexShell).toBe('10');
    expect(styles!.colorDark).toBe('rgb(212, 168, 83)');
    expect(styles!.width).toBeGreaterThan(0);
    expect(styles!.height).toBeGreaterThan(0);

    await page.mouse.move(320, 240);
    await page.mouse.move(640, 420, { steps: 5 });
    await page.setViewportSize({ width: 1024, height: 768 });

    await page.locator('#theme-toggle-btn').click();
    const colorLight = await page.evaluate(() => {
      const c = document.getElementById('ambient-canvas');
      return c ? getComputedStyle(c).color : null;
    });
    expect(colorLight).toBe('rgb(140, 98, 24)');

    expect(errors).toEqual([]);
  });

  test('respects prefers-reduced-motion dynamically and at load', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const canvas = page.locator('#ambient-canvas');
    await expect(canvas).toBeHidden();

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect(canvas).toBeVisible();
  });

  test('omits ambient canvas on long-form reading pages and keeps it on project pages', async ({ page }) => {
    await page.goto('/blog/why-document-learning-curves/');
    await expect(page.locator('#ambient-canvas')).toHaveCount(0);

    await page.goto('/learning-curves/async-process-deadlocks/');
    await expect(page.locator('#ambient-canvas')).toHaveCount(0);

    await page.goto('/works/rangemaster-cockpit/');
    await expect(page.locator('#ambient-canvas')).toHaveCount(1);
    await expect(page.locator('#ambient-canvas')).toBeVisible();
  });
});
