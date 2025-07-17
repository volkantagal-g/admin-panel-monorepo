import { testSaga } from 'redux-saga-test-plan';

import {
  vehicleListRequest,
  vehicleTypeListRequest,
  watchVehicleListRequest,
  watchVehicleTypeListRequest,
} from '@app/pages/Fleet/Vehicle/List/redux/saga';
import { Creators, Types } from '@app/pages/Fleet/Vehicle/List/redux/action';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterVehicleListV2, filterVehicleConstraints } from '@shared/api/fleet';

describe('Fleet/Vehicle/List', () => {
  describe('saga #filterVehicleList', () => {
    const vehicleList = [{
      ownershipType: 1,
      plate: '34sino34',
      status: 1000,
      tags: [],
      type: 300,
    }];

    const vehicleType = [{
      status: 100,
      type: 300,
      updatedAt: '2019-10-18T21:22:42.215Z',
      _id: '5daa2d2251cb0b0c4c22fced',
    }];
    const vehicleAvailableStatus = 1000;
    const requestVehicleBody = { vehicleConstraintId: 'requestParam', plate: 'mp', limit: 10, offset: 0, statuses: vehicleAvailableStatus };
    const apiParamsVehicle = {
      vehicleConstraintIds: ['requestParam'],
      plate: 'mp',
      limit: 10,
      offset: 0,
      statuses: [vehicleAvailableStatus],
      populate: ['warehouse', 'franchise'],
    };

    it('should call the filterVehicleList (success)', () => {
      testSaga(vehicleListRequest, requestVehicleBody)
        .next()
        .call(filterVehicleListV2, apiParamsVehicle)
        .next(vehicleList)
        .put(Creators.getVehicleListSuccess({ data: vehicleList }))
        .next()
        .isDone();
    });

    it('should call the filterVehicleList (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(vehicleListRequest, requestVehicleBody)
        .next()
        .call(filterVehicleListV2, apiParamsVehicle)
        .next(vehicleList)
        .throw(fakeError)
        .put(Creators.getVehicleListFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    it('should call the filterVehicleType (success)', () => {
      testSaga(vehicleTypeListRequest, { statuses: 200, types: 300 })
        .next()
        .call(filterVehicleConstraints, { status: 200, type: 300 })
        .next(vehicleType)
        .put(Creators.getVehicleTypeListSuccess({ data: vehicleType }))
        .next()
        .isDone();
    });

    it('should call the filterVehicleType (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(vehicleTypeListRequest, { statuses: 200, types: 300 })
        .next()
        .call(filterVehicleConstraints, { status: 200, type: 300 })
        .next(vehicleType)
        .throw(fakeError)
        .put(Creators.getVehicleTypeListFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    describe('saga #watchVehicleListRequest', () => {
      it('should call the watchVehicleListRequest', () => {
        testSaga(watchVehicleListRequest)
          .next()
          .takeLatest(Types.GET_VEHICLE_LIST, vehicleListRequest)
          .next()
          .isDone();
      });
    });

    describe('saga #watchVehicleTypeListRequest', () => {
      it('should call the watchVehicleTypeListRequest', () => {
        testSaga(watchVehicleTypeListRequest)
          .next()
          .takeLatest(Types.GET_VEHICLE_TYPE_LIST, vehicleTypeListRequest)
          .next()
          .isDone();
      });
    });
  });
});
