import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  deleteTmsVehicle,
  vehicleListRequest,
  watchVehicleDelete,
  watchVehicleListRequest,
} from '@app/pages/Fleet/TMS/List/redux/saga';
import { Types, Creators } from '@app/pages/Fleet/TMS/List/redux/action';
import { tmsDelete, tmsFilter } from '@shared/api/fleet';
import vehicleListRequestParams from '@app/pages/Fleet/TMS/List/utils';

describe('Fleet/TMS/List', () => {
  describe('saga #vehicleListRequest', () => {
    const reqParameters = {
      limit: 10,
      offset: 0,
    };
    it('should call tmsFilter (success)', () => {
      const res = {
        tmsVehicles: [
          {
            _id: '63da3125dc24c5f529aa3a48',
            plate: 'TEST12378',
            vehicleClass: 'MOTOR',
            type: 'Test',
            brand: 'Honda',
            modelYear: 2022,
            volumeCapacity: 0,
            palletCapacity: 100,
            active: true,
            vehicleDocuments: [
              {
                type: 'test123',
                number: 12,
                startDate: '2024-02-14T06:35:25.000Z',
                endDate: '2023-03-01T14:29:07.000Z',
              },
            ],
            dincerId: 'ABC123',
          },
        ],
      };
      testSaga(vehicleListRequest, reqParameters)
        .next()
        .call(tmsFilter, vehicleListRequestParams(reqParameters))
        .next(res)
        .put(Creators.getVehicleListSuccess({ data: res }))
        .next()
        .isDone();
    });

    it('should call tmsFilter (failure)', () => {
      const error = new Error('fake error');
      testSaga(vehicleListRequest, reqParameters)
        .next()
        .call(tmsFilter, vehicleListRequestParams(reqParameters))
        .next()
        .throw(error)
        .put(Creators.getVehicleListFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #deleteTmsVehicle', () => {
    const reqParams = { id: 'fakeId' };
    it('should call tmsDelete (success)', () => {
      const res = { success: true };
      testSaga(deleteTmsVehicle, reqParams)
        .next()
        .call(tmsDelete, reqParams)
        .next(res)
        .put(Creators.deleteVehicleSuccess({ data: res }))
        .next()
        .isDone();
    });

    it('should call tmsDelete (failure)', () => {
      const fakeError = new Error('fakeError');
      testSaga(deleteTmsVehicle, reqParams)
        .next()
        .call(tmsDelete, reqParams)
        .next()
        .throw(fakeError)
        .put(Creators.deleteVehicleFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchVehicleListRequest', () => {
    it('should call vehicleListRequest', () => {
      testSaga(watchVehicleListRequest)
        .next()
        .takeLatest(Types.GET_VEHICLE_LIST, vehicleListRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchVehicleDelete', () => {
    it('should call deleteTmsVehicle', () => {
      testSaga(watchVehicleDelete)
        .next()
        .takeLatest(Types.DELETE_VEHICLE, deleteTmsVehicle)
        .next()
        .isDone();
    });
  });
});
