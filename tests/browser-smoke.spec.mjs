import { test, expect } from '@playwright/test';

const pages = [
  '/',
  ...Array.from({ length: 23 }, (_, i) => '/ch' + String(i + 1).padStart(2, '0') + '/'),
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
      if (route === '/ch23/') {
        await expect(page).toHaveTitle(/کتاب‌نامه/);
        await expect(page.locator('body')).not.toContainText('پیوست ح');
        await expect(page.locator('body')).toContainText('EN 206: 2013+A1 2016');
        await expect(page.locator('body')).toContainText('ISO 22965-2: 2007');
      } else if (route.match(/^\/ch\d{2}\/$/)) {
        expect(pageTitle, `chapter/appendix title on ${route}`).toMatch(/(فصل|پیوست)/);
      } else {
        expect(pageTitle, `book title on ${route}`).toContain('۶۰۴۴');
        if (route === '/assessment.html' || route === '/search.html') {
          expect(pageTitle, `CRETIQ brand title on ${route}`).toContain('CRETIQ');
        }
      }

      if (route.match(/^\/ch(?!23)\d{2}\/$/)) {
        await expect(page.locator('.stage svg')).toHaveAttribute('viewBox', '0 0 1600 900');
        await expect(page.locator('script[src="../lib/engine.js"]')).toHaveCount(1);
        await expect(page.locator('.book-controls')).toHaveCount(1);
        await expect(page.locator('[data-narration-panel]')).toHaveCount(1);
        await expect(page.locator('[data-narration-transcript]')).not.toBeEmpty();
        await expect(page.locator('[data-reader-hud]')).toBeVisible();
        await expect(page.locator('.stage')).toHaveAttribute('data-tech-composed', 'v09');
        await expect(page.locator('[data-narration-status]')).toContainText('فارسی');
      }

      expect(consoleErrors, `console errors on ${route}`).toEqual([]);
      expect(pageErrors, `page errors on ${route}`).toEqual([]);
    });
  }



  test('study command drawer works from home and chapter context', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    const launcher = page.locator('[data-study-open]');
    await expect(launcher).toHaveCount(1);
    await launcher.click();
    const drawer = page.locator('[data-study-drawer]');
    await expect(drawer).toHaveClass(/is-open/);
    await expect(drawer.locator('.study-drawer-link')).toHaveCount(26);
    await expect(drawer.getByText('جست‌وجوی استاندارد')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(drawer).not.toHaveClass(/is-open/);

    await page.goto('http://127.0.0.1:8765/ch11/', { waitUntil: 'networkidle' });
    await page.locator('[data-study-open]').click();
    await expect(page.locator('[data-study-drawer] .study-drawer-link.is-current')).toContainText('الزامات بتن سخت‌شده');
    await expect(page.locator('[data-study-drawer]')).toContainText('فصل بعدی');
    await page.keyboard.press('Escape');
  });

  test('homepage photographic hero boots cleanly', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => pageErrors.push(String(err)));
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(page.locator('.photo-hero')).toHaveCount(1);
    await expect(page.locator('.photo-hero-visual img[src="assets/visuals/hero.webp"]')).toHaveCount(1);
    await expect(page.locator('.photo-hero-caption strong')).not.toBeEmpty();
    await expect(page.locator('.photo-hero-caption small')).toContainText('هوش مصنوعی');
    await expect(page.locator('.cinematic-hero canvas')).toHaveCount(0);
    await page.screenshot({ path: 'test-results/photo-hero-desktop.png', fullPage: false });
    const mobileContext = await page.context().browser().newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce'
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(mobilePage.locator('.photo-hero-visual img')).toHaveCount(1);
    await mobilePage.screenshot({ path: 'test-results/photo-hero-mobile.png', fullPage: false });
    await mobileContext.close();
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('homepage photographic editorial layout boot', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(page.locator('.cinematic-hero')).toHaveCount(1);
    await expect(page.locator('.story-intro')).toHaveCount(1);
    await expect(page.locator('.cinematic-process')).toHaveCount(1);
    await expect(page.locator('.learning-editorial')).toHaveCount(1);
    await expect(page.locator('.visual-feature')).toHaveCount(1);
    await expect(page.locator('.chapter-explorer')).toHaveCount(1);
    await expect(page.locator('.photo-process-gallery .photo-panel img')).toHaveCount(3);
    await expect(page.locator('.photo-feature .photo-lab-frame img')).toHaveCount(1);
    await expect(page.locator('[data-process-step]')).toHaveCount(3);
    await page.locator('[data-process-step="2"]').click();
    await expect(page.locator('[data-process-step="2"]')).toBeVisible();
    await expect(page.locator('.home-visual-preview')).toHaveCount(0);
    await expect(page.locator('.cinematic-hero canvas')).toHaveCount(0);
  });

  test('Chapter 4 particle morph + packaged narration wiring', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch04/', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-particle-morph]')).toHaveCount(1);
    await expect(page.locator('[data-particle-canvas]')).toHaveCount(1);
    await expect(page.locator('[data-particle-phase]')).toContainText('MATERIAL INPUT');
    await expect(page.locator('[data-particle-morph]')).toHaveAttribute('data-visual-engine','v2');
    await expect(page.locator('[data-particle-morph]')).toHaveAttribute('data-visual-state','0');
    const audioProbe = await page.evaluate(async () => {
      const r = await fetch('../audio/fa/ch04-01.mp3', { cache: 'no-store' });
      const b = await r.arrayBuffer();
      return { ok: r.ok, status: r.status, bytes: b.byteLength };
    });
    expect(audioProbe.ok).toBeTruthy();
    expect(audioProbe.status).toBe(200);
    expect(audioProbe.bytes).toBeGreaterThan(1000);

    await page.locator('[data-narrate-play]').click();
    await page.waitForTimeout(250);
    await expect(page.locator('[data-narration-status]')).toContainText('روایت صوتی فارسی آماده');

    await page.locator('[data-particle-play]').click();
    await page.waitForTimeout(250);
    await expect(page.locator('[data-particle-morph]')).toHaveAttribute('data-visual-state','0');
    await page.evaluate(() => window.BookEngine.go(5));
    await expect(page.locator('[data-particle-morph]')).toHaveAttribute('data-visual-state','5');
    await expect(page.locator('[data-particle-phase]')).toContainText('HOMOGENIZATION');
    await page.locator('[data-particle-reset]').click();
    await expect(page.locator('[data-particle-morph]')).toHaveAttribute('data-visual-state','0');
  });

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
    await expect(page.locator('#f-output')).toContainText('ترتیب مراحل');
  });

  test('Chapter 10 laboratory visual follows shared reader state', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch10/', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-lab-visual="fresh"]')).toHaveCount(1);
    await expect(page.locator('[data-lab-visual="fresh"]')).toHaveAttribute('data-lab-state','0');
    await page.evaluate(() => window.BookEngine.go(4));
    await expect(page.locator('[data-lab-visual="fresh"]')).toHaveAttribute('data-lab-state','4');
    await expect(page.locator('[data-lab-phase]')).toContainText('دما');
  });

  test('Chapter 11 strength laboratory visual follows shared reader state', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch11/', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-lab-visual="strength"]')).toHaveCount(1);
    await expect(page.locator('[data-lab-visual="strength"]')).toHaveAttribute('data-lab-state','0');
    await page.evaluate(() => window.BookEngine.go(4));
    await expect(page.locator('[data-lab-visual="strength"]')).toHaveAttribute('data-lab-state','4');
    await expect(page.locator('[data-lab-phase]')).toContainText('شکست');
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
