import { Page, Route } from '@playwright/test';

import { getWarehousesMockOptions, getFilteredWarehousesMockOptions } from '@app/api/warehouse/index.mock.handler';

export async function mockApi({
  pageInstance,
  path,
  successData,
  errorData,
}:
 {
  pageInstance: Page,
  path: string | RegExp,
  successData?: any,
  errorData?: any,
 }) {
  await pageInstance.route(path, async (route: Route) => {
    await route.fulfill({
      status: successData != null ? 200 : 400,
      contentType: 'application/json',
      body: JSON.stringify(successData || errorData),
    });
  });
}

export async function mockWarehouses(pageInstance: Page) {
  await pageInstance.route(`**${getFilteredWarehousesMockOptions.url}`, async (route: Route) => {
    const requestBodyAsString = route.request().postData();
    const requestBody = JSON.parse(requestBodyAsString as string);

    const response = getFilteredWarehousesMockOptions.handler({ body: requestBody });
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response.data || {}),
    });
  });
}

export async function mockWarehousesWithoutFilter(pageInstance: Page) {
  await pageInstance.route(`**${getWarehousesMockOptions.url}`, async (route: Route) => {
    const responseData = { warehouses: getWarehousesMockOptions.successData };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(responseData || {}),
    });
  });
}
