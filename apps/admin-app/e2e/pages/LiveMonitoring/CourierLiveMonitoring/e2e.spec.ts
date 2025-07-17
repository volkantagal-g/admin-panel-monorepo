import { test, expect } from './_fixture';
import { TEST_TAG } from '../../../../internals/constants/testTag';
import {
  expectSelectItemAndWaitForToBeSelected,
  expectSidebarMenuToHave,
  expectTableCellNotToHaveSorter,
  expectTableHeaderToBeSorted,
  expectTableSortersCountToBe,
  getInputByPlaceholder,
  waitForAsyncSelectListToLoad,
  waitForSelectToBeCleared,
} from '@e2e/common/assertions';
import { getClearButtonOfSelect, getTableHeaderColumnTitles } from '@e2e/common/locators';
import { SQUAD_BRANCH_NAME_TO_TAG } from 'internals/constants/squadShortNames';
import { CourierLiveMonitoring } from './_page';

const TIMEOUT_MS = 4000;

test.describe(`${SQUAD_BRANCH_NAME_TO_TAG.ZEUS} - Courier Status Monitoring`, () => {
  test(`features should work correctly ${TEST_TAG.SMOKE}`, async ({ courierLiveMonitoringPage: currentPage }) => {
    await expectSidebarMenuToHave({
      instance: currentPage.page,
      menuGroupName: 'Business Monitoring',
      // different short naming on management section
      menuItemsArr: ['Growth', 'Courier Status Monitoring'],
    });

    const {
      domainTypeSelect,
      citySelect,
      warehouseSelect,
      vehicleTypeSelect,
      filterContainer,
      courierStatusTable,
      tableBody,
    } = currentPage;
    await getInputByPlaceholder({ containerInstance: filterContainer, placeholder: 'City' });
    await getInputByPlaceholder({ containerInstance: filterContainer, placeholder: 'Vehicle' });
    await getInputByPlaceholder({ containerInstance: filterContainer, placeholder: 'Warehouse' });
    await getInputByPlaceholder({ containerInstance: filterContainer, placeholder: 'Domain Type' });

    // Don't forget to add new vehicle types to the list
    const vehicleTypes = ['On Foot', 'E-Bicycle', 'Van', 'MiTu', 'Moto', 'Moto (50cc)', 'E-Moto', 'Test'];

    const expectedTableTitles = [
      'Cities',
      'Planned',
      'Realized',
      'Idle',
      'On order',
      'Returning',
      'Busy',
      'Utilization',
      'Diff. in Courier Plan',
    ];

    await expectTableSortersCountToBe({ table: courierStatusTable, sortCount: 8 });

    await expect(async () => {
      const tableTitles = await getTableHeaderColumnTitles({ containerElement: courierStatusTable });
      expect(expectedTableTitles).toEqual(tableTitles);
    }).toPass({ timeout: TIMEOUT_MS });

    for (const vehicleType of vehicleTypes) {
      await waitForAsyncSelectListToLoad({
        pageInstance: currentPage.page,
        inputElem: vehicleTypeSelect,
        text: vehicleType,
        exactMatch: true,
      });
    }

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: domainTypeSelect,
      search: 'Getir10',
    });

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: vehicleTypeSelect,
      search: 'Van',
    });

    // When city is selected, go to this url /courierStatusMonitoring?selectedCity...
    // warehouse filter should be enabled

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: citySelect,
      search: 'Istanbul',
    });
    const courierLiveMonitoringWarehousePage = new CourierLiveMonitoring(currentPage.page);
    await courierLiveMonitoringWarehousePage.page.waitForURL('**/courierStatusMonitoring?selectedCity=**');
    await expect(warehouseSelect).toBeEnabled();

    await expectSelectItemAndWaitForToBeSelected({
      pageInstance: currentPage.page,
      selectElem: warehouseSelect,
      search: 'Ortaköy',
    });

    // if warehouse is selected, display only selected warehouse's data
    await expect(tableBody).toContainText('Ortaköy');
    await expect(tableBody).not.toContainText('Maslak');

    const popupPromise = currentPage.page.waitForEvent('popup');
    await currentPage.page.locator('a', { hasText: 'Ortaköy' }).click();
    const popup = await popupPromise;
    await expect(popup.getByText('Warehouse Detail')).toBeVisible();
    await popup.close();
  });
});
