import { testSaga } from 'redux-saga-test-plan';

import {
  updateVehicleConstraintRequest,
  watchUpdateVehicleConstraintRequest,
  changeVehicleConstraintActivenessRequest,
  watchChangeVehicleConstraintActivenessRequest,
  getVehicleConstraintRequest,
  watchGetVehicleConstraintRequest,
} from '@app/pages/Fleet/VehicleConstraint/Detail/redux/saga';
import { Creators, Types } from '@app/pages/Fleet/VehicleConstraint/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { activateVehicleConstraint, getVehicleConstraintsById, inactivateVehicleConstraint, updateVehicleConstraint } from '@shared/api/fleet';

describe('Fleet/VehicleConstraint/Detail', () => {
  describe('saga #getVehicleConstraintRequest', () => {
    const params = { vehicleConstraintId: 'fakeId' };
    it('should call getVehicleConstraintById (success)', () => {
      const response = { vehicleConstraint: { id: 'fakeId', name: 'fake-name' } };
      testSaga(getVehicleConstraintRequest, params)
        .next()
        .call(getVehicleConstraintsById, params)
        .next(response)
        .put(Creators.getVehicleConstraintSuccess({ data: response.vehicleConstraint }))
        .next()
        .isDone();
    });

    it('should call getVehicleConstraintById (failure)', () => {
      const error = new Error('fake error');
      const response = { vehicleConstraint: { id: 'fakeId', name: 'fake-name' } };
      testSaga(getVehicleConstraintRequest, params)
        .next()
        .call(getVehicleConstraintsById, params)
        .next(response)
        .throw(error)
        .put(Creators.getVehicleConstraintFailure())
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #updateVehicleConstraintRequest', () => {
    const params = {
      vehicleConstraintId: 'fakeId',
      name: 'fakeName',
      vehicleType: 'fakeType',
      constraints: 'fakeConstraints',
    };
    const updateVehicleConstraintParams = {
      vehicleConstraintId: params.vehicleConstraintId,
      name: params.name,
      type: params.vehicleType,
      constraints: params.constraints,
    };
    it('should call updateVehicleConstraint (success)', () => {
      testSaga(updateVehicleConstraintRequest, params)
        .next()
        .call(updateVehicleConstraint, updateVehicleConstraintParams)
        .next()
        .put(Creators.updateVehicleConstraintSuccess())
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call updateVehicleConstraint (failure)', () => {
      const error = new Error('fake error');
      testSaga(updateVehicleConstraintRequest, params)
        .next()
        .call(updateVehicleConstraint, updateVehicleConstraintParams)
        .next()
        .throw(error)
        .put(Creators.updateVehicleConstraintFailure())
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #changeVehicleConstraintActivenessRequest', () => {
    describe('change activeness with newActivenessStatus equals to true', () => {
      const id = 'fakeId';
      const params = { id, newActivenessStatus: true };
      it('should call activateVehicleConstraint (success)', () => {
        testSaga(changeVehicleConstraintActivenessRequest, params)
          .next()
          .call(activateVehicleConstraint, { id })
          .next()
          .call(getVehicleConstraintRequest, { vehicleConstraintId: id })
          .next()
          .put(Creators.changeVehicleConstraintActivenessSuccess())
          .next()
          .put(ToastCreators.success())
          .next()
          .isDone();
      });

      it('should call activateVehicleConstraint (failure)', () => {
        const error = new Error('fake error');
        testSaga(changeVehicleConstraintActivenessRequest, params)
          .next()
          .call(activateVehicleConstraint, { id })
          .next()
          .throw(error)
          .put(Creators.changeVehicleConstraintActivenessFailure({ error }))
          .next()
          .put(ToastCreators.error({ error }))
          .next()
          .isDone();
      });
    });

    describe('change activeness with newActivenessStatus equals to false', () => {
      const id = 'fakeId';
      const params = { id, newActivenessStatus: false };
      it('should call inactivateVehicleConstraint (success)', () => {
        testSaga(changeVehicleConstraintActivenessRequest, params)
          .next()
          .call(inactivateVehicleConstraint, { id })
          .next()
          .call(getVehicleConstraintRequest, { vehicleConstraintId: id })
          .next()
          .put(Creators.changeVehicleConstraintActivenessSuccess())
          .next()
          .put(ToastCreators.success())
          .next()
          .isDone();
      });

      it('should call inactivateVehicleConstraint (failure)', () => {
        const error = new Error('fake error');
        testSaga(changeVehicleConstraintActivenessRequest, params)
          .next()
          .call(inactivateVehicleConstraint, { id })
          .next()
          .throw(error)
          .put(Creators.changeVehicleConstraintActivenessFailure({ error }))
          .next()
          .put(ToastCreators.error({ error }))
          .next()
          .isDone();
      });
    });
  });

  describe('saga #watchGetVehicleConstraintRequest', () => {
    it('should call getVehicleConstraintRequest (success)', () => {
      testSaga(watchGetVehicleConstraintRequest)
        .next()
        .takeLatest(Types.GET_VEHICLE_CONSTRAINT_REQUEST, getVehicleConstraintRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchUpdateVehicleConstraintRequest', () => {
    it('should call updateVehicleConstraintRequest (success)', () => {
      testSaga(watchUpdateVehicleConstraintRequest)
        .next()
        .takeLatest(Types.UPDATE_VEHICLE_CONSTRAINT_REQUEST, updateVehicleConstraintRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchChangeVehicleConstraintActivenessRequest', () => {
    it('should call changeVehicleConstraintActivenessRequest (success)', () => {
      testSaga(watchChangeVehicleConstraintActivenessRequest)
        .next()
        .takeLatest(Types.CHANGE_VEHICLE_CONSTRAINT_ACTIVENESS_REQUEST, changeVehicleConstraintActivenessRequest)
        .next()
        .isDone();
    });
  });
});
