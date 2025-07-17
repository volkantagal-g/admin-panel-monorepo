import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from '@app/pages/Fleet/TmsDriver/Detail/redux/actions';
import {
  getTmsDriverRequest,
  watchGetTmsDriverRequest,
} from '@app/pages/Fleet/TmsDriver/Detail/redux/saga';
import { getTmsDriverById } from '@shared/api/fleet';
import { TMS_DRIVER_FIELDS } from '@app/pages/Fleet/TmsDriver/Detail/constants';

describe('Fleet/TmsDriver/Detail', () => {
  describe('saga #getTmsDriverRequest', () => {
    const courierId = 'courierId';
    const mockResponse = {
      courier: {
        _id: '63973e4887aeabcf2e9351fa',
        name: 'Sedat Maraz',
        isActivated: true,
        isLoggedIn: true,
        gsm: '5555555555',
        status: 700,
      },
    };

    it('should call getTmsDriverById (success)', () => {
      testSaga(getTmsDriverRequest, { id: courierId })
        .next()
        .call(getTmsDriverById, { id: courierId, fields: TMS_DRIVER_FIELDS })
        .next(mockResponse)
        .put(Creators.getTmsDriverSuccess({ data: mockResponse.courier }))
        .next()
        .isDone();
    });

    it('should call getTmsDriverById (failure)', () => {
      const fakeError = new Error('fake error');
      testSaga(getTmsDriverRequest, { id: courierId })
        .next()
        .call(getTmsDriverById, { id: courierId, fields: TMS_DRIVER_FIELDS })
        .next(mockResponse)
        .throw(fakeError)
        .put(Creators.getTmsDriverFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetTmsDriverRequest', () => {
    it('should call getTmsDriverRequest', () => {
      testSaga(watchGetTmsDriverRequest)
        .next()
        .takeLatest(Types.GET_TMS_DRIVER_REQUEST, getTmsDriverRequest)
        .next()
        .isDone();
    });
  });
});
