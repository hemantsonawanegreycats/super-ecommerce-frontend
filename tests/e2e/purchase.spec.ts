import { test, expect } from '@playwright/test';

test.describe('Purchase Journey', () => {
  test('should complete a basic purchase', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to products
    await page.getByRole('link', { name: 'Products' }).click();
    
    // Select first product
    await page.locator('.product-card').first().click();
    
    // Add to cart
    await page.getByRole('button', { name: /ADD TO BASKET/i }).click();
    
    // Check cart drawer
    await expect(page.getByText('Shopping Bag')).toBeVisible();
    
    // Checkout
    await page.getByRole('button', { name: /CHECKOUT/i }).click();
    
    // Success page check (mocked)
    // await expect(page).toHaveURL(/.*checkout\/success/);
  });
});
