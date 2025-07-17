import { testSaga } from 'redux-saga-test-plan';

import { createDtsViolation as createDtsViolationApi } from '@shared/api/dts';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createDtsRequest, watchCreateDtsRequest } from './saga';

describe('DTS NEW', () => {
  describe('Create DTS Record sagas', () => {
    const body = {
      description: 'test',
      feedbackSource: '5f7c357a5c751d4f264a8870',
      person: '63ec92e9614171b183f3aefe',
      realized: '2024-02-12T13:28:58.208Z',
      rule: '5bc5db430a39ef3359237941',
      warehouse: '5dfa4a2e17b571cea40dff89',
      files: [],
      isActive: true,
    };
    const data = { success: true };
    it('should create dts request (success)', () => {
      testSaga(createDtsRequest, body)
        .next()
        .call(createDtsViolationApi, { ...body })
        .next({ data })
        .put(Creators.createDtsSuccess())
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });
    it('should throw arrow when it fails', () => {
      const fakeError = new Error('API Error');
      testSaga(createDtsRequest, body)
        .next()
        .call(createDtsViolationApi, body)
        .throw(fakeError)
        .put(Creators.createDtsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
    it('should watch createDtsRequest', () => {
      testSaga(watchCreateDtsRequest)
        .next()
        .takeLatest(Types.CREATE_DTS_REQUEST, createDtsRequest)
        .next()
        .isDone();
    });
  });
});
