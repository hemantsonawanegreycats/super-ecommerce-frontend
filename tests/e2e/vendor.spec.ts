import { test, expect } from '@playwright/test';

test.describe('Vendor Management', () => {
  test('should allow vendor to switch stores', async ({ page }) => {
    await page.goto('/vendor/dashboard');
    
    // Open store switcher
    await page.getByRole('button', { name: /Switch Store/i }).click();
    
    // Select another store
    await page.getByText('Organic Emporium').click();
    
    // Verify context change
    await expect(page.getByText('Organic Emporium')).toBeVisible();
  });
});
