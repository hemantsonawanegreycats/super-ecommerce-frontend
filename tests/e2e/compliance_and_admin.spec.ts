import { test, expect } from '@playwright/test';

test('Auth Flow: Signup & Login', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: /Sign in/i }).click();
  await expect(page).toHaveURL(/.*dashboard/);
});

test('Admin Intelligence', async ({ page }) => {
  await page.goto('/admin/analytics');
  await expect(page.getByText('Global Revenue')).toBeVisible();
  await expect(page.locator('canvas')).toBeVisible(); // Recharts
});

test('GDPR Export Flow', async ({ page }) => {
  await page.goto('/account/privacy/export');
  await page.getByRole('button', { name: /GENERATE DATA EXPORT/i }).click();
  await expect(page.getByText('Your data export is complete')).toBeVisible();
});
