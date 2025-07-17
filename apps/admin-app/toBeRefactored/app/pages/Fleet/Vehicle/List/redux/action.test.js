/* eslint-disable */
import { describe, it, expect } from '@jest/globals';

import { Creators, Types } from '@app/pages/Fleet/Vehicle/List/redux/action';

describe('Fleet/Vehicle/List', () => {
    describe('action-creator #getVehicleList', () => {
        it('receivedAction should equal to expectedAction (without args)', () => {
          const receivedAction = Creators.getVehicleList({});
          const expectedAction = { type: Types.GET_VEHICLE_LIST, warehouse: '', franchise: '', status: [], plate: '', vehicleConstraintId: ''};
          expect(receivedAction).toEqual(expectedAction);
        });
      });
})
