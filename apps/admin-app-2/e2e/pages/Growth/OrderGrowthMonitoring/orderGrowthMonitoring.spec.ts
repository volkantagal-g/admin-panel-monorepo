import { test, expect } from './_fixture';

test.describe('Open Order Growth Monitoring Page', () => {
  // I will update test cases after ZEUS-2713 is released
  test('should have a title', async ({ orderGrowthMonitoringPage, baseURL }) => {
    await expect(orderGrowthMonitoringPage.page.getByTitle('Order Growth Monitoring')).toBeVisible();
  });

  test('should update the countdown when the timer is changed', async ({ orderGrowthMonitoringPage }) => {
    const timerInput = orderGrowthMonitoringPage.getTimerInput();
    await timerInput.click();
    const dropdownInput = orderGrowthMonitoringPage.page.getByText('1m');
    await dropdownInput.click();
    const countdown = orderGrowthMonitoringPage.getCountdownInput();
    await expect(countdown).toBeEnabled();
  });

  test('should show the warehouse select when a city is selected', async ({ orderGrowthMonitoringPage }) => {
    const citySelect = orderGrowthMonitoringPage.getCityInput();
    await expect(citySelect.locator('input')).toBeEnabled();
    await citySelect.click();
    const dropdownInput = orderGrowthMonitoringPage.page.getByText('Istanbul');
    await dropdownInput.click();

    // add case for url change

    const domainTypeSelect = orderGrowthMonitoringPage.getDomainTypeInput();
    await domainTypeSelect.click();
    const domainTypeDropdownInput = orderGrowthMonitoringPage.page.getByText('Getir10');
    await domainTypeDropdownInput.click();

    const warehouseSelect = orderGrowthMonitoringPage.getWarehouseInput();
    await expect(warehouseSelect).toBeVisible();
    await expect(warehouseSelect.locator('input')).toBeEnabled();
    await warehouseSelect.click();
    const warehouseDropdownInput = orderGrowthMonitoringPage.page.getByText('Gaziemir');
    await warehouseDropdownInput.click();
  });
});
