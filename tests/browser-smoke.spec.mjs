import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/ch03/',
  '/ch04/',
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

  test('homepage engineering hero particle narrative boots cleanly', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => pageErrors.push(String(err)));
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-engineering-hero]')).toHaveCount(1);
    const heroStage = page.locator('.engineering-hero-stage');
    await expect(heroStage).toHaveAttribute('data-hero-renderer', /^(webgl|canvas)$/);
    await expect(heroStage).toHaveAttribute('data-hero-quality', /^(high|balanced|low|adaptive-low|adaptive-balanced)$/);
    await expect(page.locator('.engineering-hero-status [data-hero-phase]')).not.toBeEmpty();
    await expect(page.locator('.engineering-hero-status [data-hero-detail]')).not.toBeEmpty();
    await expect(page.locator('[data-hero-progress]')).toHaveCount(1);
    await page.screenshot({ path: 'test-results/hero-desktop.png', fullPage: false });
    for (const phase of [1, 2, 3, 4]) {
      await page.evaluate((p) => window['6044HeroVisual']?.seekPhase(p, 0.55), phase);
      await page.waitForTimeout(60);
      await page.screenshot({ path: `test-results/hero-phase-${phase}.png`, fullPage: false });
    }
    const mobileContext = await page.context().browser().newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce'
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(mobilePage.locator('[data-engineering-hero]')).toHaveCount(1);
    await mobilePage.screenshot({ path: 'test-results/hero-mobile.png', fullPage: false });
    await mobileContext.close();
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('homepage intelligence core + visual showcase boot', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(page.locator('.engineering-core')).toHaveCount(1);
    await expect(page.locator('.home-visual-preview')).toHaveCount(1);
    await expect(page.locator('.home-visual-preview')).toHaveAttribute('data-visual-state','0');
    await page.locator('.home-visual-preview [data-particle-play]').click();
    await page.waitForTimeout(250);
    await expect(page.locator('.home-visual-preview')).toHaveAttribute('data-visual-state','0');
    await page.locator('.home-visual-preview [data-particle-reset]').click();
    await expect(page.locator('.home-visual-preview')).toHaveAttribute('data-visual-state','0');
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
