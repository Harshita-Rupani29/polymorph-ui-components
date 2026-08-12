import { expect, test, type Page } from '@playwright/test';

/**
 * ChatBar's contract is geometry and lifecycle, neither of which type-checking can verify.
 * These drive the real component in a browser and assert measured positions.
 */

const BAR = '.chat-bar';
const ANCHOR = '.anchor';

async function gotoDemo(page: Page): Promise<void> {
  await page.goto('/components/chat-bar');
  await expect(page.locator(BAR)).toHaveClass(/ready/);
}

async function box(page: Page, selector: string) {
  const rect = await page.locator(selector).boundingBox();
  if (rect === null) {
    throw new Error(`Expected ${selector} to have a bounding box`);
  }
  return rect;
}

test('anchored mode matches the anchor box exactly', async ({ page }) => {
  await gotoDemo(page);

  const bar = await box(page, BAR);
  const anchor = await box(page, ANCHOR);

  expect(Math.abs(bar.x - anchor.x)).toBeLessThan(2);
  expect(Math.abs(bar.y - anchor.y)).toBeLessThan(2);
  expect(Math.abs(bar.width - anchor.width)).toBeLessThan(2);
});

test('is position:fixed so it does not scroll with the page', async ({ page }) => {
  await gotoDemo(page);
  const position = await page.locator(BAR).evaluate((el) => getComputedStyle(el).position);
  expect(position).toBe('fixed');
});

test('docking centres the bar and honours maxWidth and bottomGutter', async ({ page }) => {
  await gotoDemo(page);
  await page.getByRole('button', { name: 'Dock to viewport' }).click();
  await expect(page.locator(BAR)).toHaveClass(/docked/);
  await expect(page.locator(BAR)).not.toHaveClass(/morphing/);

  const result = await page.locator(BAR).evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      bottomGap: window.innerHeight - rect.bottom,
      centreOffset: Math.abs((rect.left + rect.right) / 2 - window.innerWidth / 2)
    };
  });

  expect(result.width).toBeCloseTo(720, 0);
  expect(result.bottomGap).toBeCloseTo(24, 0);
  expect(result.centreOffset).toBeLessThan(2);
});

test('applies a transition while morphing', async ({ page }) => {
  await gotoDemo(page);
  await page.getByRole('button', { name: 'Dock to viewport' }).click();

  const during = await page.locator(BAR).evaluate((el) => ({
    className: el.className,
    duration: getComputedStyle(el).transitionDuration
  }));

  expect(during.className).toContain('morphing');
  expect(during.duration).toContain('0.75s');
});

test('onmorphend fires once per settled placement', async ({ page }) => {
  await gotoDemo(page);

  await page.getByRole('button', { name: 'Dock to viewport' }).click();
  await expect(page.locator(BAR)).not.toHaveClass(/morphing/);
  await expect(page.getByText('morphs completed: 1')).toBeVisible();

  await page.getByRole('button', { name: 'Return to anchor' }).click();
  await expect(page.locator(BAR)).not.toHaveClass(/morphing/);
  await expect(page.getByText('morphs completed: 2')).toBeVisible();
});

/**
 * Regression: resize callbacks are suppressed during a morph, so a height change caused by the
 * morph itself was never accounted for and the docked bar settled at the wrong y.
 */
test('re-measures after the morph when its height changed', async ({ page }) => {
  await gotoDemo(page);
  await page.getByRole('button', { name: 'Dock to viewport' }).click();

  // Wait for the morph to actually be in flight rather than guessing at a delay — this is the
  // window in which resize callbacks are suppressed, which is what the regression depends on.
  await expect(page.locator(BAR)).toHaveClass(/morphing/);
  await page
    .locator(BAR)
    .evaluate((el: HTMLElement) => el.style.setProperty('--chat-bar-min-height', '160px'));

  await expect(page.locator(BAR)).not.toHaveClass(/morphing/);

  const result = await page.locator(BAR).evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return { height: rect.height, bottomGap: window.innerHeight - rect.bottom };
  });

  expect(result.height).toBeCloseTo(160, 0);
  expect(result.bottomGap).toBeCloseTo(24, 0);
});

/**
 * onmorphend documents "settled" geometry. placeNow() only writes state, so firing the callback
 * before Svelte flushed it would let a listener measure pre-correction values. The demo measures
 * the bar inside its own handler, so this asserts what a real consumer would observe.
 */
test('geometry is already final when onmorphend runs', async ({ page }) => {
  await gotoDemo(page);
  await expect(page.locator('[data-pw="settled-gap"]')).toHaveText('—');

  await page.getByRole('button', { name: 'Dock to viewport' }).click();
  await expect(page.locator(BAR)).not.toHaveClass(/morphing/);

  await expect(page.locator('[data-pw="settled-gap"]')).toHaveText('24px');
});

test('re-docks when the viewport is resized', async ({ page }) => {
  await gotoDemo(page);
  await page.getByRole('button', { name: 'Dock to viewport' }).click();
  await expect(page.locator(BAR)).not.toHaveClass(/morphing/);

  await page.setViewportSize({ width: 640, height: 720 });

  await expect
    .poll(async () =>
      page.locator(BAR).evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return Math.round(window.innerHeight - rect.bottom);
      })
    )
    .toBe(24);

  const width = await page.locator(BAR).evaluate((el) => el.getBoundingClientRect().width);
  // Narrower than maxWidth, so it falls back to viewport width minus the side gutter.
  expect(width).toBeCloseTo(640 - 32, 0);
});
