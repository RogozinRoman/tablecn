import { test, expect } from '@playwright/test';

test.describe('Checking the server rendering of tables', () => {

  test('Checking Data Grid and Data Grid Live', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    await page.waitForSelector('body');

    const liveGridTab = page.getByText('Data Grid Live', { exact: false }).first();
    await expect(liveGridTab).toBeVisible({ timeout: 5000 });
    await liveGridTab.click();

    await page.waitForTimeout(1000);

    const staticGridTab = page.getByText('Data Grid', { exact: false })
      .filter({ hasNotText: 'Live' }) // Отсекаем вкладку Live, чтобы не было конфликта
      .first();

    await expect(staticGridTab).toBeVisible({ timeout: 5000 });
    await staticGridTab.click();

    // Финальная пауза перед завершением теста
    await page.waitForTimeout(1000);
  });
});