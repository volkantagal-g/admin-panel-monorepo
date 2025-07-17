import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  tmsVehicleDetailsRequest,
  tmsVehicleUpdateRequest,
  watchGetTmsVehicleRequestRequest,
  watchTmsVehicleUpdateRequest,
} from '@app/pages/Fleet/TMS/Detail/redux/saga';
import {
  Creators,
  Types,
} from '@app/pages/Fleet/TMS/Detail/redux/actions';
import {
  getTmsVehicle,
  updateTmsVehicle,
} from '@shared/api/fleet';

describe('Fleet/TMS/Detail', () => {
  const tmsVehicle = {
    _id: '63d13befabc7470b6a5fc18d',
    plate: '80HE795',
    vehicleClass: 'NPR10LONG',
    type: 'KAMYON',
    brand: 'ISUZI',
    modelYear: 2016,
    volumeCapacity: 110,
    palletCapacity: 10,
    active: true,
    vehicleDocuments: [
      {
        type: 'Doc2',
        number: 88899922,
        startDate: '2023-01-25T00:00:00.000Z',
        endDate: '2024-01-25T00:00:00.000Z',
      },
    ],
    dincerId: '000A3F3E4B1A4B4E',
  };

  describe('saga #tmsVehicleDetailsRequest', () => {
    const payload = { vehicleId: 'vehicleId' };
    it('should call getTmsVehicle (success)', () => {
      const response = { tmsVehicle };
      testSaga(tmsVehicleDetailsRequest, payload)
        .next()
        .call(getTmsVehicle, payload)
        .next(response)
        .put(Creators.getTmsVehicleSuccess({ data: tmsVehicle }))
        .next()
        .isDone();
    });

    it('should call getTmsVehicle (failure)', () => {
      const data = { tmsVehicle };
      const fakeError = new Error('fake error');
      testSaga(tmsVehicleDetailsRequest, payload)
        .next()
        .call(getTmsVehicle, payload)
        .next(data)
        .throw(fakeError)
        .put(Creators.getTmsVehicleFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #tmsVehicleUpdateRequest', () => {
    const payload = { vehicleId: 'vehicleId', formValues: { name: '123' } };
    it('should call updateTmsVehicle (success)', () => {
      const response = { tmsVehicle };
      testSaga(tmsVehicleUpdateRequest, payload)
        .next()
        .call(updateTmsVehicle, payload)
        .next(response)
        .put(Creators.updateTmsVehicleSuccess({ data: tmsVehicle }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call updateTmsVehicle (failure)', () => {
      const data = { tmsVehicle };
      const fakeError = new Error('fake error');
      testSaga(tmsVehicleUpdateRequest, payload)
        .next()
        .call(updateTmsVehicle, payload)
        .next(data)
        .throw(fakeError)
        .put(Creators.updateTmsVehicleFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watwatchGetTmsVehicleRequestRequest', () => {
    it('should call tmsVehicleDetailsRequest', () => {
      testSaga(watchGetTmsVehicleRequestRequest)
        .next()
        .takeLatest(Types.GET_TMS_VEHICLE_REQUEST, tmsVehicleDetailsRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchTmsVehicleUpdateRequest', () => {
    it('should call tmsVehicleUpdateRequest', () => {
      testSaga(watchTmsVehicleUpdateRequest)
        .next()
        .takeLatest(Types.UPDATE_TMS_VEHICLE_REQUEST, tmsVehicleUpdateRequest)
        .next()
        .isDone();
    });
  });
});
