import { Page, Route } from '@playwright/test';

import { integrationTypeMockData } from '@app/api/marketConfig/index.mock.data';
import {
  getActiveOrdersExecutiveStatsManagementMock,
  getActiveOrdersForGrowthEmptyMock,
  getActiveOrdersForGrowthMock,
  getActiveOrdersForGrowthSlottedMock,
  getActiveOrdersForManagementMock,
  getActiveOrdersForOperationMock,
  getActiveOrdersPromoStatsMock,
} from '@app/api/marketOrderAnalytics/index.mock.data';

// so that we have integration type available in TR, integration type filter will be visible
export async function mockIntegrationTypeResponseForAvailable(pageInstance: Page) {
  await pageInstance.route('**/marketConfig/getConfigWKey', async (route: Route) => {
    const reqBodyStr = route.request().postData();
    const reqBody = JSON.parse(reqBodyStr || '{}') as { key: string };
    if (reqBody.key === integrationTypeMockData.key) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(integrationTypeMockData),
      });
    }
    else {
      // another config request, do not interfere
      await route.continue();
    }
  });
}

export const getActiveOrdersForManagementUrlPattern = '**/marketOrderAnalytics/getActiveOrdersForManagementV2';
export async function mockGetActiveOrdersForManagementResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersForManagementUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getActiveOrdersForManagementMock),
    });
  });
}

export const getActiveOrdersExecutiveStatsManagementUrlPattern = '**/marketOrderAnalytics/getActiveOrdersExecutiveStatsManagement';
export async function mockGetActiveOrdersExecutiveStatsManagementResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersExecutiveStatsManagementUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getActiveOrdersExecutiveStatsManagementMock),
    });
  });
}

export const getActiveOrdersForOperationUrlPattern = '**/marketOrderAnalytics/getActiveOrdersForOperation';
export async function mockGetActiveOrdersForOperationResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersForOperationUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getActiveOrdersForOperationMock),
    });
  });
}

export const getActiveOrdersForGrowthUrlPattern = '**/marketOrderAnalytics/getActiveOrdersForGrowth';
export async function mockGetActiveOrdersForGrowthResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersForGrowthUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getActiveOrdersForGrowthMock),
    });
  });
}
export async function mockGetActiveOrdersForGrowthEmptyResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersForGrowthUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getActiveOrdersForGrowthEmptyMock),
    });
  });
}
export async function mockGetActiveOrdersForGrowthSlottedResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersForGrowthUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getActiveOrdersForGrowthSlottedMock),
    });
  });
}

export const getActiveOrdersPromoStatsUrlPattern = '**/marketOrderAnalytics/getActiveOrdersPromoStats';
export async function mockGetActiveOrdersPromoStatsResponse(pageInstance: Page) {
  await pageInstance.route(getActiveOrdersPromoStatsUrlPattern, async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(getActiveOrdersPromoStatsMock),
    });
  });
}

export const getActiveOrdersForCustomerServicesUrlPattern = '**/marketOrderAnalytics/getActiveOrdersForCustomerServices';
