import { testSaga } from 'redux-saga-test-plan';

import {
  vehicleConstraintListRequest,
  watchVehicleConstraintListRequest,
} from '@app/pages/Fleet/VehicleConstraint/List/redux/saga';
import { Creators, Types } from '@app/pages/Fleet/VehicleConstraint/List/redux/actions';
import { filterVehicleConstraints } from '@shared/api/fleet';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('Fleet/VehicleConstraint/List', () => {
  describe('saga #vehicleConstraintListRequest', () => {
    const params = { statuses: 'fakeStatues', types: 'fakeTypes', limit: 10, offset: 0 };
    const filterVehicleConstraintsParams = { status: params.statuses, type: params.types, limit: params.limit, offset: params.offset };
    it('should call filterVehicleConstraints (success)', () => {
      const response = { vehicleConstraints: [{ id: 'fakeId', name: 'fakeName' }], totalCount: 1 };
      testSaga(vehicleConstraintListRequest, params)
        .next()
        .call(filterVehicleConstraints, filterVehicleConstraintsParams)
        .next(response)
        .put(Creators.getVehicleConstraintListSuccess({ data: { vehicleConstraints: response.vehicleConstraints, totalCount: response.totalCount } }))
        .next()
        .isDone();
    });

    it('should call filterVehicleConstraints (failure)', () => {
      const error = new Error('fake error');
      const response = { vehicleConstraints: [{ id: 'fakeId', name: 'fakeName' }] };
      testSaga(vehicleConstraintListRequest, params)
        .next()
        .call(filterVehicleConstraints, filterVehicleConstraintsParams)
        .next(response)
        .throw(error)
        .put(Creators.getVehicleConstraintListFailure())
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchVehicleConstraintListRequest', () => {
    it('should call vehicleConstraintListRequest (success)', () => {
      testSaga(watchVehicleConstraintListRequest)
        .next()
        .takeLatest(Types.GET_VEHICLE_CONSTRAINT_LIST_REQUEST, vehicleConstraintListRequest)
        .next()
        .isDone();
    });
  });
});
