import moment from 'moment';

import CourierStatus from '.';
import { filterCouriers } from './utils/filterCourier';

import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import {
  expectToHavePageHeaderText,
  expectTableToHaveColumnNames,
} from '@test/publicUtils/assertions';

const pageUrl = '/getirWater/courierStatus';

describe('Courier Status Page', () => {
  it('should be rendered without error', async () => {
    const { container } = await renderPage({
      pagePermKey: permKey.PAGE_GETIR_WATER_COURIER_STATUS,
      pageComponent: CourierStatus,
      pageUrl,
    });

    expectToHavePageHeaderText('Getir Water Courier Status');
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const vendorInformationTableContainer = container.querySelector('.ant-table-container');
    expectTableToHaveColumnNames(vendorInformationTableContainer, [
      'Courier',
      'Warehouse',
      'Status',
      'Status Reason',
      'Last Status Update',
    ]);
  });

  it('should be doesnt display inactive courier', async () => {
    const statusLastChangedAt = moment();

    const courierData = [
      {
        name: 'test1',
        isActivated: false,
        statusLastChangedAt,
        isLoggedIn: true,
      },
      {
        name: 'test2',
        isActivated: true,
        statusLastChangedAt,
        isLoggedIn: true,
      },
      {
        name: 'test3',
        isActivated: true,
        statusLastChangedAt,
        isLoggedIn: true,
      },
    ];

    const filteredCouriers = filterCouriers(courierData, []);
    expect(filteredCouriers).toHaveLength(2);
  });
});
