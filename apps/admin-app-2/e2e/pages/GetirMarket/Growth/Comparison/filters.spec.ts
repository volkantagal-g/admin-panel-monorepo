import { test, expect } from './_fixture';

test.describe('GetirMarket Growth Comparison Page', () => {
  test('should have basic features working', async ({ getirMarketGrowthComparisonPage }) => {
    const { domainTypeSelect } = getirMarketGrowthComparisonPage;
    await expect(domainTypeSelect).toBeVisible();

    const { citySelect } = getirMarketGrowthComparisonPage;
    await expect(citySelect).toBeVisible();

    const { integrationTypeSelect } = getirMarketGrowthComparisonPage;
    await expect(integrationTypeSelect).toBeVisible();

    const { warehouseSelect } = getirMarketGrowthComparisonPage;
    await expect(warehouseSelect).toBeVisible();

    const { todayButton } = getirMarketGrowthComparisonPage;
    await expect(todayButton).toBeVisible();
    await expect(todayButton).toBeEnabled();
  });
});
