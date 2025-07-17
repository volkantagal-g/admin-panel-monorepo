import { testSaga } from 'redux-saga-test-plan';

import { Creators, Types } from '@app/pages/Fleet/VehicleConstraint/New/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  createVehicleConstraintRequest,
  watchCreateVehicleConstraintRequest,
  getVehicleConstraintsRequest,
  watchGetVehicleConstraintsRequest,
} from '@app/pages/Fleet/VehicleConstraint/New/redux/saga';
import { createVehicleConstraint, getAllVehicleConstraints } from '@shared/api/fleet';

describe('Fleet/VehicleConstraint/New', () => {
  describe('saga #createVehicleConstraintRequest', () => {
    const params = {
      name: 'fakeName',
      vehicleType: 'fakeType',
      constraints: 'fakeConstraints',
    };
    const createVehicleConstraintParams = {
      name: params.name,
      type: params.vehicleType,
      constraints: params.constraints,
    };
    it('should call createVehicleConstraint (success)', () => {
      testSaga(createVehicleConstraintRequest, params)
        .next()
        .call(createVehicleConstraint, createVehicleConstraintParams)
        .next()
        .put(Creators.createVehicleConstraintSuccess())
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call createVehicleConstraint (failure)', () => {
      const error = new Error('fake error');
      testSaga(createVehicleConstraintRequest, params)
        .next()
        .call(createVehicleConstraint, createVehicleConstraintParams)
        .next()
        .throw(error)
        .put(Creators.createVehicleConstraintFailure())
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #getVehicleConstraintsRequest', () => {
    const response = { vehicleConstraints: [{ id: 'fakeId', name: 'fakeName' }] };
    it('should call getAllVehicleConstraints (success)', () => {
      testSaga(getVehicleConstraintsRequest)
        .next()
        .call(getAllVehicleConstraints, {})
        .next(response)
        .put(Creators.getVehicleConstraintsSuccess({ data: response.vehicleConstraints }))
        .next()
        .isDone();
    });

    it('should call getAllVehicleConstraints (failure)', () => {
      const error = new Error('fake error');
      testSaga(getVehicleConstraintsRequest)
        .next()
        .call(getAllVehicleConstraints, {})
        .next(response)
        .throw(error)
        .put(Creators.getVehicleConstraintsFailure())
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchCreateVehicleConstraintRequest', () => {
    it('should call createVehicleConstraintRequest', () => {
      testSaga(watchCreateVehicleConstraintRequest)
        .next()
        .takeLatest(Types.CREATE_VEHICLE_CONSTRAINT_REQUEST, createVehicleConstraintRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetVehicleConstraintsRequest', () => {
    it('should call getVehicleConstraintsRequest', () => {
      testSaga(watchGetVehicleConstraintsRequest)
        .next()
        .takeLatest(Types.GET_VEHICLE_CONSTRAINTS_REQUEST, getVehicleConstraintsRequest)
        .next()
        .isDone();
    });
  });
});
