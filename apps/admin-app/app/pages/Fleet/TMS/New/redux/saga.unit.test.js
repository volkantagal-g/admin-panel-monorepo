import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  createTmsVehicleRequest,
  watchCreateTmsVehicleRequest,
} from '@app/pages/Fleet/TMS/New/redux/saga';
import { Types, Creators } from '@app/pages/Fleet/TMS/New/redux/actions';
import { createTmsVehicle } from '@shared/api/fleet';

describe('Fleet/TMS/New', () => {
  describe('saga #createTmsVehicleRequest', () => {
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
    const formValues = {
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
    const payload = { formValues };
    const response = { tmsVehicle };

    it('should call createTmsVehicle (success)', () => {
      testSaga(createTmsVehicleRequest, payload)
        .next()
        .call(createTmsVehicle, payload)
        .next(response)
        .put(Creators.createTmsVehicleSuccess({ data: tmsVehicle }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call createTmsVehicle (failure)', () => {
      const fakeError = new Error('fake error');

      testSaga(createTmsVehicleRequest, payload)
        .next()
        .call(createTmsVehicle, payload)
        .next(response)
        .throw(fakeError)
        .put(Creators.createTmsVehicleFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchCreateTmsVehicleRequest', () => {
    it('should call createTmsVehicleRequest', () => {
      testSaga(watchCreateTmsVehicleRequest)
        .next()
        .takeLatest(Types.CREATE_TMS_VEHICLE_REQUEST, createTmsVehicleRequest)
        .next()
        .isDone();
    });
  });
});
