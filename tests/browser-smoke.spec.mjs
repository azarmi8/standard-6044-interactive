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
        const renderLed = ['/ch04/','/ch10/','/ch11/'].includes(route);
        if (renderLed) {
          await expect(page.locator('.rendered-reader-stage')).toHaveCount(1);
          await expect(page.locator('.rendered-reader-stage svg')).toHaveCount(0);
        } else {
          await expect(page.locator('.stage svg')).toHaveAttribute('viewBox', '0 0 1600 900');
        }
        await expect(page.locator('script[src="../lib/engine.js"]')).toHaveCount(1);
        await expect(page.locator('.book-controls')).toHaveCount(1);
        await expect(page.locator('[data-narration-panel]')).toHaveCount(1);
        await expect(page.locator('[data-narration-transcript]')).not.toBeEmpty();
        await expect(page.locator('[data-reader-hud]')).toBeVisible();
        if (!renderLed) await expect(page.locator('.stage')).toHaveAttribute('data-tech-composed', 'v09');
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

  test('homepage rendered engineering visual boots cleanly', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', err => pageErrors.push(String(err)));
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });

    await expect(page.locator('.rendered-hero-stage')).toHaveCount(1);
    const hero = page.locator('.rendered-hero-stage img');
    await expect(hero).toHaveAttribute('src', 'assets/visuals/hero.webp');
    await expect(hero).toBeVisible();
    await page.screenshot({ path: 'test-results/home-render-top-desktop.png', fullPage: false });

    await expect(page.locator('[data-engineering-hero]')).toHaveCount(0);
    await expect(page.locator('.cinematic-process')).toHaveCount(0);
    await expect(page.locator('.home-visual-preview')).toHaveCount(0);
    await expect(page.locator('script[src="lib/cinematic-home.js"]')).toHaveCount(0);
    await expect(page.locator('img[src^="data:"]')).toHaveCount(0);

    const images = page.locator('.rendered-hero-stage img, .render-story img, .render-gallery img');
    await expect(images).toHaveCount(6);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
    }
    const imageState = await images.evaluateAll(imgs => imgs.map(img => ({
      src: img.getAttribute('src'),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    })));
    expect(imageState.every(x => x.complete && x.naturalWidth > 0 && x.naturalHeight > 0), JSON.stringify(imageState)).toBeTruthy();
    expect(imageState.some(x => x.src?.includes('slump.webp'))).toBeTruthy();
    expect(imageState.some(x => x.src?.includes('strength.webp'))).toBeTruthy();
    expect(imageState.some(x => x.src?.includes('hero.webp'))).toBeTruthy();

    const layout = await page.evaluate(() => {
      const body = document.body;
      const h1 = document.querySelector('h1');
      const lead = document.querySelector('.hero-lead');
      const styles = [
        h1 && getComputedStyle(h1).fontSize,
        lead && getComputedStyle(lead).fontSize
      ];
      return {
        overflowX: body.scrollWidth - document.documentElement.clientWidth,
        h1FontPx: parseFloat(styles[0] || '0'),
        leadFontPx: parseFloat(styles[1] || '0')
      };
    });
    expect(layout.overflowX, JSON.stringify(layout)).toBeLessThanOrEqual(1);
    expect(layout.h1FontPx, JSON.stringify(layout)).toBeGreaterThanOrEqual(40);
    expect(layout.h1FontPx, JSON.stringify(layout)).toBeLessThanOrEqual(76);
    expect(layout.leadFontPx, JSON.stringify(layout)).toBeGreaterThanOrEqual(16);
    expect(layout.leadFontPx, JSON.stringify(layout)).toBeLessThanOrEqual(20);

    await page.screenshot({ path: 'test-results/home-render-desktop.png', fullPage: false });
    const mobileContext = await page.context().browser().newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce'
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(mobilePage.locator('.rendered-hero-stage img')).toBeVisible();
    await mobilePage.screenshot({ path: 'test-results/home-render-mobile.png', fullPage: false });
    await mobileContext.close();

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('homepage render sequence communicates state and respects reduced motion', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    const sequence = page.locator('[data-render-sequence]');
    await expect(sequence).toHaveCount(1);
    await expect(sequence.locator('[data-render-scene]')).toHaveCount(3);
    await expect(sequence.locator('[data-render-scene]').nth(0)).toHaveAttribute('aria-selected', 'true');
    await expect(sequence.locator('[data-render-scene]').nth(1)).toHaveAttribute('aria-selected', 'false');

    await sequence.locator('[data-render-scene]').nth(1).click();
    await expect(sequence.locator('[data-render-scene]').nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(sequence.locator('[data-render-kicker]')).toContainText('FRESH CONCRETE');
    await expect(sequence.locator('.render-sequence-media img.is-active')).toHaveAttribute('src', 'assets/visuals/slump.webp');

    await sequence.locator('[data-render-play]').click();
    await expect(sequence.locator('[data-render-play]')).toHaveAttribute('aria-pressed', 'true');
    await sequence.locator('[data-render-play]').click();
    await expect(sequence.locator('[data-render-play]')).toHaveAttribute('aria-pressed', 'false');

    const reduced = await page.context().browser().newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce'
    });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    const reducedSequence = reducedPage.locator('[data-render-sequence]');
    await reducedSequence.locator('[data-render-scene]').nth(2).click();
    await expect(reducedSequence.locator('[data-render-scene]').nth(2)).toHaveAttribute('aria-selected', 'true');
    await expect(reducedSequence.locator('.render-sequence-media img.is-active')).toHaveAttribute('src', 'assets/visuals/strength.webp');
    await reduced.close();
  });

  test('authored render assets remain visually inspectable', async ({ page }) => {
    for (const asset of ['hero.webp','slump.webp','strength.webp']) {
      await page.goto('http://127.0.0.1:8765/assets/visuals/' + asset, { waitUntil: 'load' });
      await page.screenshot({ path: 'test-results/asset-' + asset + '.png', fullPage: true });
    }
  });

  test('homepage visual language contract', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });
    await expect(page.locator('.cinematic-hero')).toHaveCount(1);
    await expect(page.locator('.story-intro')).toHaveCount(1);
    await expect(page.locator('.render-story')).toHaveCount(1);
    await expect(page.locator('.learning-editorial')).toHaveCount(1);
    await expect(page.locator('.render-gallery')).toHaveCount(1);
    await expect(page.locator('.chapter-explorer')).toHaveCount(1);
    await expect(page.locator('.final-cta')).toHaveCount(1);
    await expect(page.locator('.render-gallery img[src*="strength.webp"]')).toHaveCount(1);
    await expect(page.locator('.render-gallery img[src*="hero.webp"]')).toHaveCount(1);
  });

  test('Chapter 4 authored render replaces decorative particle scene', async ({ page }) => {
    await page.goto('http://127.0.0.1:8765/ch04/', { waitUntil: 'networkidle' });
    const render = page.locator('[aria-labelledby="ch04-render-title"]');
    await expect(render).toHaveCount(1);
    await expect(render.locator('img')).toHaveAttribute('src', '../assets/visuals/hero.webp');
    await expect(render.locator('.chapter-render-step')).toHaveCount(4);
    await expect(page.locator('[data-particle-morph], [data-particle-canvas]')).toHaveCount(0);
    const meta = await render.locator('img').evaluate(img => ({ complete: img.complete, w: img.naturalWidth, h: img.naturalHeight }));
    expect(meta.complete && meta.w > 0 && meta.h > 0, JSON.stringify(meta)).toBeTruthy();
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

  test('Chapter 10 and 11 authored renders stay evidence-led', async ({ page }) => {
    const cases = [
      { route: '/ch10/', title: 'ch10-render-title', asset: '../assets/visuals/slump.webp' },
      { route: '/ch11/', title: 'ch11-render-title', asset: '../assets/visuals/strength.webp' }
    ];
    for (const item of cases) {
      await page.goto('http://127.0.0.1:8765' + item.route, { waitUntil: 'networkidle' });
      const render = page.locator('[aria-labelledby="' + item.title + '"]');
      await expect(render).toHaveCount(1);
      await expect(render.locator('img')).toHaveAttribute('src', item.asset);
      await expect(render.locator('.chapter-render-step')).toHaveCount(4);
      await expect(render.locator('.chapter-render-source')).toContainText('VISUAL / واقعی');
      await page.screenshot({ path: 'test-results/' + item.route.replaceAll('/','') + 'render-desktop.png', fullPage: false });
      const meta = await render.locator('img').evaluate(img => ({ complete: img.complete, w: img.naturalWidth, h: img.naturalHeight }));
      expect(meta.complete && meta.w > 0 && meta.h > 0, JSON.stringify(meta)).toBeTruthy();
      await expect(page.locator('[data-lab-visual], [data-lab-canvas]')).toHaveCount(0);
    }
  });

  test('representative authored render surfaces are mobile-safe', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    for (const route of ['/ch04/', '/ch10/', '/ch11/']) {
      await page.goto('http://127.0.0.1:8765' + route, { waitUntil: 'networkidle' });
      const render = page.locator('.chapter-render-feature');
      await expect(render).toBeVisible();
      await expect(render.locator('img')).toBeVisible();
      await expect(render.locator('.chapter-render-step')).toHaveCount(4);
      const layout = await page.evaluate(() => {
        const width = document.documentElement.clientWidth;
        const offenders = [...document.querySelectorAll('body *')].map(el => {
          const r = el.getBoundingClientRect();
          return {tag:el.tagName, id:el.id||'', cls:typeof el.className==='string'?el.className.slice(0,90):'', left:Math.round(r.left*100)/100, right:Math.round(r.right*100)/100, width:Math.round(r.width*100)/100};
        }).filter(x => x.right > width + 1 || x.left < -1).sort((a,b) => Math.max(Math.abs(b.right-width),Math.abs(b.left)) - Math.max(Math.abs(a.right-width),Math.abs(a.left))).slice(0,8);
        return {
          overflowX: document.documentElement.scrollWidth - width,
          width,
          offenders
        };
      });
      expect(layout.overflowX, JSON.stringify(layout)).toBeLessThanOrEqual(1);
    }
    await context.close();
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
