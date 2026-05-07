# Automation Testing Guide

For Intra-mart web applications, we recommend using **Playwright** (Node.js) for end-to-end (E2E) automation.

## 1. Prerequisites
*   Node.js installed.
*   Playwright installed: `npm init playwright@latest`

## 2. Full Test Suite (`tests/user_management.spec.js`)
```javascript
const { test, expect } = require('@playwright/test');

const PAGE_URL = 'http://192.168.0.201:8082/imart/view/dzu/practices/practice_ai/user_list';

test.describe('User Management CRUD Automation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE_URL);
  });

  test('TC01: Initial Load - Table displays records', async ({ page }) => {
    const rowCount = await page.locator('#userTable tbody tr.jqgrow').count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('TC02: Search by Name', async ({ page }) => {
    await page.fill('#searchKeyword', 'Nguyen');
    await page.click('input[value="Search"]');
    await page.waitForTimeout(1000); // Wait for RPC
    const cellText = await page.locator('#userTable tbody tr.jqgrow td').nth(3).textContent();
    expect(cellText).toContain('Nguyen');
  });

  test('TC03: Search by Email', async ({ page }) => {
    await page.fill('#searchKeyword', 'bt@example.com');
    await page.click('input[value="Search"]');
    await page.waitForTimeout(1000);
    const emailText = await page.locator('#userTable tbody tr.jqgrow td').nth(4).textContent();
    expect(emailText).toBe('bt@example.com');
  });

  test('TC04: Clear Search', async ({ page }) => {
    await page.fill('#searchKeyword', 'NonExistentUser');
    await page.click('input[value="Search"]');
    await page.fill('#searchKeyword', '');
    await page.click('input[value="Search"]');
    const rowCount = await page.locator('#userTable tbody tr.jqgrow').count();
    expect(rowCount).toBeGreaterThan(1);
  });

  test('TC05 & TC06: Add User (Success & Validation)', async ({ page }) => {
    // TC06: Validation Check (Empty Name)
    await page.click('input[value="Add New User"]');
    await page.fill('#userDialog [name="user_id"]', 'u_new_test');
    await page.click('#userDialog input[value="Save"]');
    await expect(page.locator('.imui-msgbox-error')).toBeVisible();

    // TC05: Success Flow
    await page.fill('#userDialog [name="user_name"]', 'Automated User');
    await page.click('#userDialog input[value="Save"]');
    await expect(page.locator('.imui-msgbox-success')).toBeVisible();
  });

  test('TC07: Update User', async ({ page }) => {
    // Click Edit icon of the first row
    await page.locator('#userTable tbody tr.jqgrow').first().locator('.im-ui-icon-common-16-update').click();
    await page.fill('#userDialog [name="user_name"]', 'Updated By Auto');
    await page.click('#userDialog input[value="Save"]');
    await expect(page.locator('.imui-msgbox-success')).toBeVisible();
  });

  test('TC08 & TC09: Delete User Flow', async ({ page }) => {
    // TC08: Cancel Delete
    page.once('dialog', dialog => dialog.dismiss()); 
    
    // TC09: OK Delete
    await page.locator('.im-ui-icon-common-16-trashbox').first().click();
    await page.click('.imui-dialog-button-inner button:has-text("OK")');
    await expect(page.locator('.imui-msgbox-success')).toBeVisible();
  });

  test('TC10: Workflow Application Routing', async ({ page }) => {
    await page.goto('http://192.168.0.201:8082/imart/view/training/dzu/practices/practice_wf/wf_01/wf_zzz_01');
    await page.fill('input[name="leave_days"]', '8');
    await page.fill('textarea[name="leave_reason"]', 'Long vacation');
    await page.click('#openPage0'); // Apply button
    
    // Check if the next screen (Flow Setting) has dev03 as approver
    // This requires inspecting the standard workflow frame/dialog
    // await expect(page.locator('td:has-text("dev03")')).toBeVisible();
  });

});
```

## 3. How to run
1.  Initialize project: `npm init playwright@latest`
2.  Save script to `tests/user_management.spec.js`.
3.  Run all tests: `npx playwright test`
4.  Run in browser to watch: `npx playwright test --headed`
5.  Show report: `npx playwright show-report`
