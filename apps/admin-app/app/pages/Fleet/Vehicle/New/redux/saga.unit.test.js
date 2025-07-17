import { testSaga } from 'redux-saga-test-plan';

import {
  watchVehicleTypeRequest,
  createVehicleType,
  vehicleRequest,
} from '@app/pages/Fleet/Vehicle/New/redux/saga';
import { Creators, Types } from '@app/pages/Fleet/Vehicle/New/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createVehicle, filterVehicleConstraints } from '@shared/api/fleet';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';

const vehicleData = {
  plate: 'ABC',
  constraintId: '5daa2d2251cb0b0c4c22fced',
  warehouse: '5daa2d2251cb0b0c4c22fcfg',
  franchise: '5daa2d2251cb0b0c4c22fcpq',
  city: 'Istanbul',
  firstRegistrationDate: '12-12-2022',
  registrationDate: '12-12-2022',
  inspectionValidityDate: '12-12-2022',
  tags: ['Dominor100'],
  ownershipType: 1,
};

const createdData = {
  plate: 'ABC',
  constraintId: '5daa2d2251cb0b0c4c22fced',
  warehouse: '5daa2d2251cb0b0c4c22fcfg',
  franchise: '5daa2d2251cb0b0c4c22fcpq',
  city: 'Istanbul',
  licence: {
    firstRegistrationDate: '12-12-2022',
    registrationDate: '12-12-2022',
    inspectionValidityDate: '12-12-2022',
  },
  tags: ['Dominor100'],
  ownershipType: 1,
};

describe('Fleet/Vehicle/New', () => {
  describe('saga #CreateVehicle', () => {
    const vehicleType = [{
      status: 100,
      type: 300,
      updatedAt: '2019-10-18T21:22:42.215Z',
      _id: '5daa2d2251cb0b0c4c22fced',
    }];

    it('should call createVehicle (success)', () => {
      testSaga(vehicleRequest, vehicleData)
        .next()
        .call(createVehicle, createdData)
        .next([])
        .put(Creators.createVehicleRequestSuccess({ }))
        .next()
        .put(ToastCreators.success())
        .next()
        .call(history.push, ROUTE.VEHICLE_LIST.path)
        .next()
        .isDone();
    });

    it('should call createVehicle (success) with no redirection and clear form', () => {
      testSaga(vehicleRequest, { ...vehicleData, isCreatingAnotherVehicle: true })
        .next()
        .call(createVehicle, createdData)
        .next([])
        .put(Creators.createVehicleRequestSuccess({ }))
        .next()
        .put(ToastCreators.success())
        .next()
        .call(history.replace, {
          pathname: ROUTE.VEHICLE_NEW.path,
          search: '?clearForm=true',
        })
        .next()
        .isDone();
    });

    it('should call the VehicleType (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(vehicleRequest, vehicleData)
        .next()
        .call(createVehicle, createdData)
        .next(vehicleType)
        .throw(fakeError)
        .put(Creators.createVehicleRequestFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    it('should call the VehicleType (success)', () => {
      testSaga(createVehicleType, {})
        .next()
        .call(filterVehicleConstraints, {})
        .next(vehicleType)
        .put(Creators.getVehicleTypeSuccess({ data: vehicleType }))
        .next()
        .isDone();
    });

    it('should call the VehicleType (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(createVehicleType, { })
        .next()
        .call(filterVehicleConstraints, { })
        .next(vehicleType)
        .throw(fakeError)
        .put(Creators.getVehicleTypeFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    describe('saga #watchVehicleTypeListRequest', () => {
      it('should call the watchVehicleTypeListRequest', () => {
        testSaga(watchVehicleTypeRequest)
          .next()
          .takeLatest(Types.GET_VEHICLE_TYPE, createVehicleType)
          .next()
          .isDone();
      });
    });
  });
});
