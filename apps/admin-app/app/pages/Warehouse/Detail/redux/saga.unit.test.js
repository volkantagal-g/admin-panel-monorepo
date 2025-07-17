import { testSaga } from 'redux-saga-test-plan';

import { Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { assignFranchiseAreaRequest, updateTransferReceivingRequest, warehousesFilterRequest } from './sagas';
import { assignFranchiseArea, getFilteredWarehouses, updateTransferReceiving } from '@shared/api/warehouse';
import { mockedWarehouses } from '@shared/api/warehouse/index.mock.data';

describe('Warehouse Detail', () => {
  describe('assign franchise area sagas', () => {
    const body = {
      warehouseId: '63721ecafcbcaf01c64e0adf',
      franchiseAreaId: '65e8759f24261f849875765a',
    };
    const mockResponse = mockedWarehouses[0];
    const errMessage = '404 Not Found';

    it('should assign area (success)', () => {
      testSaga(assignFranchiseAreaRequest, body)
        .next()
        .call(assignFranchiseArea, body)
        .next({ ...mockResponse })
        .put(Creators.assignFranchiseAreaSuccess({ data: mockResponse }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });
    it('should assign area (failure)', () => {
      testSaga(assignFranchiseAreaRequest, body)
        .next()
        .call(assignFranchiseArea, body)
        .throw({ message: errMessage })
        .put(Creators.assignFranchiseAreaFailure({ message: errMessage }))
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
  describe('Transfer Receiving update sagas', () => {
    const body = { id: '5db9759777a0c71180d7694c', updateData: { timezone: 'Europe/Istanbul', timeWindows: [], transferType: 'cold' } };
    const mockResponse = {
      ...mockedWarehouses[0],
      transferReceivingWindows: {
        cold: {
          timezone: 'Europe/Istanbul',
          availableTimes: [],
        },
      },
    };

    it('should Update Transfer Receiving (success)', () => {
      testSaga(updateTransferReceivingRequest, body)
        .next()
        .call(updateTransferReceiving, body)
        .next({ ...mockResponse })
        .put(Creators.updateTransferReceivingSuccess({ data: mockResponse.transferReceivingWindows }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });
  });
  describe('Warehouses Filter Request sagas', () => {
    const body = { name: 'test', fields: 'name transferReceivingWindows' };
    const mockResponse = {
      totalCount: 1,
      warehouses: [{
        id: mockedWarehouses[0].id,
        _id: mockedWarehouses[0]._id,
        name: mockedWarehouses[0].name,
        transferReceivingWindows: {
          cold: {
            timezone: 'Europe/Istanbul',
            availableTimes: [],
          },
        },
      }],
    };

    it('should Warehouses Filter Request (success)', () => {
      testSaga(warehousesFilterRequest, body)
        .next()
        .call(getFilteredWarehouses, body)
        .next(mockResponse)
        .put(Creators.getWarehousesFilterSuccess({ ...mockResponse }))
        .next()
        .isDone();
    });
  });
});
