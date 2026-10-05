import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/ch03/',
  '/ch07/',
  '/ch08/',
  '/ch10/',
  '/ch11/',
  '/ch16/',
  '/ch17/',
  '/ch21/',
  '/ch22/',
  '/assessment.html',
  '/search.html'
];

test.describe('6044 browser smoke', () => {
  for (const route of pages) {
    test(`loads ${route}`, async ({ page }) => {
      const consoleErrors = [];
      const pageErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', err => pageErrors.push(String(err)));

      await page.goto('http://127.0.0.1:8765' + route, { waitUntil: 'networkidle' });
      await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
      await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
      const pageTitle = (await page.title()).trim();
      expect(pageTitle, `non-empty title on ${route}`).not.toBe('');
      if (route.match(/^\/(ch\d{2})\/$/)) {
        expect(pageTitle, `chapter/appendix title on ${route}`).toMatch(/(فصل|پیوست)/);
      } else {
        expect(pageTitle, `book title on ${route}`).toContain('۶۰۴۴');
      }

      if (route.match(/^\/ch\d{2}\/$/)) {
        await expect(page.locator('.stage svg')).toHaveAttribute('viewBox', '0 0 1600 900');
        await expect(page.locator('script[src="../lib/engine.js"]')).toHaveCount(1);
        await expect(page.locator('.book-controls')).toHaveCount(1);
        await expect(page.locator('[data-narration-panel]')).toHaveCount(1);
        await expect(page.locator('[data-narration-transcript]')).not.toBeEmpty();
      }

      expect(consoleErrors, `console errors on ${route}`).toEqual([]);
      expect(pageErrors, `page errors on ${route}`).toEqual([]);
    });
  }


  test('Chapter 8 shared reader + simulator respond', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch08/', { waitUntil: 'networkidle' });
    await page.locator('#next').click();
    await expect(page.locator('#count')).toContainText('۲ / ۶');
    await page.locator('#run-sampling-sim').click();
    await expect(page.locator('#sampling-output')).toContainText('فاصله حداکثر ۱۵ دقیقه');
  });

  test('Chapter 10 simulator responds', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch10/', { waitUntil: 'networkidle' });
    await page.locator('#run-fresh-sim').click();
    await expect(page.locator('#fresh-sim-output')).not.toBeEmpty();
  });

  test('Appendix B target-strength calculator responds', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch17/', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-reader-hud]')).toBeVisible();
    await page.locator('#run-target-strength').click();
    await expect(page.locator('#target-strength-output')).toContainText('fcm');
    await expect(page.locator('#svg-result')).toContainText('fcm =');
  });

  test('Appendix A uniformity simulator responds', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch16/', { waitUntil: 'networkidle' });
    await page.locator('#run-uniformity').click();
    await expect(page.locator('#uniformity-output')).toContainText('اختلاف');
  });

  test('Appendix C air lookup responds', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch18/', { waitUntil: 'networkidle' });
    await page.locator('#run-air').click();
    await expect(page.locator('#air-output')).toContainText('مقدار هوای کل جدول');
  });

  test('Appendix F conditional audit path responds', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch21/', { waitUntil: 'networkidle' });
    await page.locator('#run-f-sim').click();
    await expect(page.locator('#f-output')).toContainText('ترتیب مسیر آموزشی');
  });

  test('mobile + reduced motion smoke', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => pageErrors.push(String(err)));
    await page.goto('http://127.0.0.1:8765/ch07/', { waitUntil: 'networkidle' });
    await expect(page.locator('.stage')).toBeVisible();
    await expect(page.locator('.book-controls')).toBeVisible();
    await page.locator('#next').click();
    await expect(page.locator('#count')).not.toBeEmpty();
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    await context.close();
  });
});
