const { test, expect } = require('@playwright/test');

import { goToHome, setLang, showOptions } from './utils/app.utils';

test.describe('Zonemaster test FR16 - [The advanced view should have a text describing what undelegated means]', () => {
  test.beforeEach(async ({ page }) => {
    await goToHome(page);
    await setLang(page, 'en');
    await showOptions(page);
  });

  test('should have a link to the proper faq answer', async ({ page }) => {
    const alert = page.locator('#advanced-options aside .alert');
    await expect(alert).toBeVisible();
    await expect(alert.locator('a')).toHaveAttribute('routerlink', '/faq');
    await expect(alert.locator('a')).toHaveAttribute('fragment', 'what-is-an-undelegated-domain-test');
  });

  test('should have a description text in multi languages', async ({ page }) => {
    const testSuite = [
      { lang: 'en', text: 'undelegated' },
      { lang: 'fr', text: 'non délégué' },
      { lang: 'sv', text: 'odelegerat domäntest' },
    ];

    for (const {lang, text} of testSuite) {
      await setLang(page, lang);
      await showOptions(page);
      await expect(page.locator('#advanced-options aside .alert a')).toContainText(text);
    }
  });
});
