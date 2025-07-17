import { testSaga } from 'redux-saga-test-plan';

import {
  watchUpdateVehicleRequest,
  updateVehicleRequest,
  vehicleDetailsRequest,
  watchVehicleDetailsRequest,
  createVehicleType,
  watchVehicleTypeRequest,
  getVehicleLogsRequest,
  watchGetVehicleLogsRequest,
} from '@app/pages/Fleet/Vehicle/Details/redux/saga';
import { Creators, Types } from '@app/pages/Fleet/Vehicle/Details/redux/action';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { filterVehicleConstraints, updateVehicle, vehicleDetails, getVehicleLogs } from '@shared/api/fleet';

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
  id: '61a8aadd355088239a51c7a1',
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

const id = '61a8aadd355088239a51c7a1';

const vehicleConstraints = [{
  _id: '5daa2daa51cb0b0c4c22fcef',
  status: 100,
  name: 'FiorinoTest1',
  type: 400,
  nameDescription: {
    en: 'Car',
    tr: 'Araba',
    nl: 'Auto',
    de: 'Auto',
    fr: 'Voiture',
    es: 'Coche',
    it: 'Auto',
    pt: 'Automóvel',
    'en-US': 'Car',
  },
  constraints: {
    selectionPriority: 1000,
    polygonType: 0,
    distance: 99999,
    duration: 999991,
    weight: 6880001,
    volume: 25000001,
    longestEdge: 2501,
    prohibitedProducts: [],
    batch: true,
    batchTaskLimit: 2,
    batchCostPerDistance: 100,
    batchCostPerDuration: 100,
    queue: true,
    queueMultiplier: 0,
    tags: [],
    volumes: [],
    limitedProducts: [],
  },
  createdAt: '2019-10-18T21:24:58.311Z',
  updatedAt: '2023-03-21T05:41:39.952Z',
  country: '55999ad00000010000000000',
}];

const vehicleLogs = [{ id: 123 }];

describe('Fleet/Vehicle/Details', () => {
  describe('saga #updateVehicleRequest', () => {
    it('should call updateVehicle (success)', () => {
      testSaga(updateVehicleRequest, vehicleData)
        .next()
        .call(updateVehicle, { id, formValues: createdData })
        .next(createdData)
        .put(Creators.updateVehicleRequestSuccess({ data: createdData }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the updateVehicle (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(updateVehicleRequest, vehicleData)
        .next()
        .call(updateVehicle, { id, formValues: createdData })
        .next(createdData)
        .throw(fakeError)
        .put(Creators.updateVehicleRequestFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    describe('saga #watchVehicleUpdateRequest', () => {
      it('should call the watchVehicleTypeListRequest', () => {
        testSaga(watchUpdateVehicleRequest)
          .next()
          .takeLatest(Types.UPDATE_VEHICLE_REQUEST, updateVehicleRequest)
          .next()
          .isDone();
      });
    });
  });

  describe('saga #vehicleDetailsRequest', () => {
    it('should call vehicleDetails (success)', () => {
      testSaga(vehicleDetailsRequest, { vehicleId: id })
        .next()
        .call(vehicleDetails, { vehicleId: id })
        .next(vehicleData)
        .put(Creators.getVehicleDetailsSuccess({ data: vehicleData }))
        .next()
        .isDone();
    });

    it('should call vehicleDetails (failure)', () => {
      const fakeError = new Error('fakeError');
      testSaga(vehicleDetailsRequest, { vehicleId: id })
        .next()
        .call(vehicleDetails, { vehicleId: id })
        .next()
        .throw(fakeError)
        .put(Creators.getVehicleDetailsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchVehicleDetailsRequest', () => {
    it('should call vehicleDetailsRequest', () => {
      testSaga(watchVehicleDetailsRequest)
        .next()
        .takeLatest(Types.GET_VEHICLE_DETAILS, vehicleDetailsRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #createVehicleType', () => {
    it('should call filterVehicleConstraints (success)', () => {
      testSaga(createVehicleType)
        .next()
        .call(filterVehicleConstraints, {})
        .next(vehicleConstraints)
        .put(Creators.getVehicleTypeSuccess({ data: vehicleConstraints }))
        .next()
        .isDone();
    });

    it('should call filterVehicleConstrains (failure)', () => {
      const error = new Error('fake error');
      testSaga(createVehicleType)
        .next()
        .call(filterVehicleConstraints, {})
        .next()
        .throw(error)
        .put(Creators.getVehicleTypeFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchVehicleTypeRequest', () => {
    testSaga(watchVehicleTypeRequest)
      .next()
      .takeLatest(Types.GET_VEHICLE_TYPE, createVehicleType)
      .next()
      .isDone();
  });

  it('should call the getVehicleLogs (success)', () => {
    testSaga(getVehicleLogsRequest, { body: null })
      .next()
      .call(getVehicleLogs, { body: null })
      .next(vehicleLogs)
      .put(Creators.getVehicleLogsSuccess({ data: vehicleLogs }))
      .next()
      .isDone();
  });

  it('should call the getVehicleLogs (failure)', () => {
    const fakeError = new Error('404 Not Found');
    testSaga(getVehicleLogsRequest, { body: null })
      .next()
      .call(getVehicleLogs, { body: null })
      .next(vehicleLogs)
      .throw(fakeError)
      .put(Creators.getVehicleLogsFailure({ error: fakeError }))
      .next()
      .put(ToastCreators.error({ error: fakeError }))
      .next()
      .isDone();
  });

  describe('saga #watchGetVehicleLogsRequest', () => {
    it('should call the watchGetVehicleLogsRequest', () => {
      testSaga(watchGetVehicleLogsRequest)
        .next()
        .takeLatest(Types.GET_VEHICLE_LOGS_REQUEST, getVehicleLogsRequest)
        .next()
        .isDone();
    });
  });
});
