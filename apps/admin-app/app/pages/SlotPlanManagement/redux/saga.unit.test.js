import { testSaga } from 'redux-saga-test-plan';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { deleteSlotPlans as deleteSlotPlansApi } from '@shared/api/slotPlanManagement';
import { deleteSlotPlans, watchDeleteSlotPlansRequest } from './saga';

describe('Slot Plan Management', () => {
  describe('deleteSlotPlans sagas', () => {
    const body = {
      minDate: '2024-02-05T00:00:00.000Z',
      maxDate: '2024-02-09T23:59:59.999Z',
      employeeType: 1,
      warehouseIds: [
        '6138991fffd374b8d86c5760',
      ],
    };
    const data = { success: true };

    it('should delete slot plans (success)', () => {
      testSaga(deleteSlotPlans, body)
        .next()
        .call(deleteSlotPlansApi, body)
        .next({ data })
        .put(Creators.deleteSlotPlansSuccess({ data }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });
    it('should delete slot plans (failure)', () => {
      const fakeError = new Error('API Error');
      testSaga(deleteSlotPlans, body)
        .next()
        .call(deleteSlotPlansApi, body)
        .throw(fakeError)
        .put(Creators.deleteSlotPlansFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
    it('should watch deleteSlotPlansRequest', () => {
      testSaga(watchDeleteSlotPlansRequest)
        .next()
        .takeLatest(Types.DELETE_SLOT_PLANS_REQUEST, deleteSlotPlans)
        .next()
        .isDone();
    });
  });
});
