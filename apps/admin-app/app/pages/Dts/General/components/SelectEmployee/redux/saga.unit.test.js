import { testSaga } from 'redux-saga-test-plan';

import { getPersonList as getPersonListApi } from '@shared/api/person';

import { Creators, Types } from './actions';
import {
  getEmployeeRequest,
  watchEmployeeRequest,
} from './saga';

describe('Select Employee Component', () => {
  describe('Select Employee sagas', () => {
    const name = 'Test Name';
    const body = {
      fields: 'name',
      query: { name, isActivated: true },
    };
    const data = [
      {
        _id: '59bb92b9b4ff44c3e6841c87',
        name: 'Random Person',
        isActivated: true,
      },
    ];
    it('should employee request (success)', () => {
      testSaga(getEmployeeRequest, { name })
        .next()
        .call(getPersonListApi, { ...body })
        .next(data)
        .put(Creators.getEmployeeSuccess({ data }))
        .next()
        .isDone();
    });
    it('should throw arrow when it fails', () => {
      const fakeError = new Error('API Error');
      testSaga(getEmployeeRequest, { name })
        .next()
        .call(getPersonListApi, { ...body })
        .throw(fakeError)
        .put(Creators.getEmployeeFailure({ error: fakeError }))
        .next()
        .isDone();
    });
    it('should watch getEmployeeRequest', () => {
      testSaga(watchEmployeeRequest)
        .next()
        .takeLatest(Types.GET_EMPLOYEE_REQUEST, getEmployeeRequest)
        .next()
        .isDone();
    });
  });
});
