import { expect, test, type Page } from '@playwright/test';

/**
 * Covers the behaviours that only exist at runtime: which messages get avatars, whether the
 * pinned node survives re-renders, and whether the list stays pinned to the bottom as content
 * of unknown height arrives.
 */

const LIST = '.chat-message-list';
const PINNED = '.pinned';

async function gotoDemo(page: Page): Promise<void> {
  await page.goto('/components/chat-message-list');
  await expect(page.locator(LIST)).toBeVisible();
}

/**
 * Removes the smooth-scroll animation so scroll assertions are deterministic. Polling for a
 * "settled" position races the animation: sampling twice before it starts reads the old value and
 * the assertion passes for the wrong reason.
 */
async function disableSmoothScroll(page: Page): Promise<void> {
  await page
    .locator(LIST)
    .evaluate((el: HTMLElement) =>
      el.style.setProperty('--chat-message-list-scroll-behavior', 'auto')
    );
}

/** Reads scrollTop after the DOM update and the frame any autoscroll would use have passed. */
async function scrollTopAfterUpdate(page: Page): Promise<number> {
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
  return page.locator(LIST).evaluate((el) => el.scrollTop);
}

test('avatars are limited to the responder side and grouped by run', async ({ page }) => {
  await gotoDemo(page);

  // Sender messages opt out of avatars entirely — no avatar and no reserved spacer.
  await expect(page.locator('.chat-message.party-sender .avatar')).toHaveCount(0);

  // Messages 2 and 3 are a consecutive responder run: the first shows the avatar, the second
  // reserves the space so the bubbles stay aligned.
  const realAvatars = page.locator('.chat-message.party-responder .avatar:not(.reserved)');
  const reserved = page.locator('.chat-message.party-responder .avatar.reserved');

  expect(await realAvatars.count()).toBeGreaterThan(0);
  expect(await reserved.count()).toBeGreaterThan(0);
});

test('attachment content renders only under messages that have it', async ({ page }) => {
  await gotoDemo(page);

  // The snippet is available for every message, but empty results collapse without layout.
  await expect(page.locator('[data-pw="attachment"]')).toHaveCount(1);
  await expect(page.locator('.message-attachments:not(:empty)')).toHaveCount(1);
  await expect(page.locator('.message-attachments:empty').first()).toHaveCSS('display', 'none');
});

/**
 * Regression: the pinned slot must not live inside the {#each}, or a stateful widget such as an
 * embedded checkout would be torn down and rebuilt every time a message arrived.
 */
test('pinned node keeps its DOM identity as messages arrive', async ({ page }) => {
  await gotoDemo(page);

  const widget = page.locator('[data-pw="pinned-widget"]');
  await expect(widget).toBeVisible();

  // Mark the live node; a remount would discard the marker.
  await widget.evaluate((el) => el.setAttribute('data-probe', 'keep-me'));

  await page.getByRole('button', { name: 'Append message' }).click();
  await page.getByRole('button', { name: 'Append message' }).click();
  await expect(page.locator('[data-pw="appended-count"]')).toHaveText('2');

  await expect(widget).toHaveAttribute('data-probe', 'keep-me');
});

test('pinned content is excluded from the log live region', async ({ page }) => {
  await gotoDemo(page);

  await expect(page.locator(LIST)).toHaveAttribute('aria-live', 'polite');
  // Otherwise a widget's internal updates get announced as new chat messages.
  await expect(page.locator(PINNED)).toHaveAttribute('aria-live', 'off');
});

test('stays scrolled to the bottom as new messages arrive', async ({ page }) => {
  await gotoDemo(page);
  await disableSmoothScroll(page);

  for (let i = 0; i < 3; i += 1) {
    await page.getByRole('button', { name: 'Append message' }).click();
  }
  await expect(page.locator('[data-pw="appended-count"]')).toHaveText('3');

  // Guard against a vacuous pass: the list must actually be scrollable.
  const overflow = await page.locator(LIST).evaluate((el) => el.scrollHeight - el.clientHeight);
  expect(overflow).toBeGreaterThan(40);

  await scrollTopAfterUpdate(page);
  const distanceFromBottom = await page
    .locator(LIST)
    .evaluate((el) => el.scrollHeight - el.scrollTop - el.clientHeight);
  expect(distanceFromBottom).toBeLessThan(4);
});

/** The documented contract: a newly appended message re-pins the list to the latest content. */
test('a new message re-pins to the bottom even when the reader has scrolled up', async ({
  page
}) => {
  await gotoDemo(page);
  await disableSmoothScroll(page);

  // Fill the list so it is comfortably scrollable, then scroll away from the bottom.
  for (let i = 0; i < 6; i += 1) {
    await page.getByRole('button', { name: 'Append message' }).click();
  }
  await expect(page.locator('[data-pw="appended-count"]')).toHaveText('6');

  const overflow = await page.locator(LIST).evaluate((el) => el.scrollHeight - el.clientHeight);
  expect(overflow).toBeGreaterThan(80);

  await page.locator(LIST).evaluate((el) => (el.scrollTop = 0));
  expect(await scrollTopAfterUpdate(page)).toBe(0);

  await page.getByRole('button', { name: 'Append message' }).click();
  await expect(page.locator('[data-pw="appended-count"]')).toHaveText('7');

  expect(await scrollTopAfterUpdate(page)).toBeGreaterThan(80);
});
