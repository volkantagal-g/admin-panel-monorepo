import { testSaga } from 'redux-saga-test-plan';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getPersonList as getPersonListApi, getPersonListExcel as getPersonListExcelApi } from '@shared/api/person';
import { personListExcelRequest, personListRequest, watchPersonListExcelRequest, watchPersonListRequest } from './saga';

describe('Person List Management', () => {
  describe('personListRequest sagas', () => {
    const body = {
      limit: 10,
      offset: 0,
      query: { isActivated: true },
      sort: { createdAt: -1 },
      fields: 'name isReservable isActivated personalGsm gsm trainings picURL homeAddress',
    };
    const data = { people: [], total: 0 };

    it('should person list (success)', () => {
      testSaga(personListRequest, body)
        .next()
        .call(getPersonListApi, body)
        .next({ ...data })
        .put(Creators.getPersonListSuccess({ ...data }))
        .next()
        .isDone();
    });
    it('should person list (failure)', () => {
      const fakeError = new Error('API Error');
      testSaga(personListRequest, body)
        .next()
        .call(getPersonListApi, body)
        .throw(fakeError)
        .put(Creators.getPersonListFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
    it('should watch personListRequest', () => {
      testSaga(watchPersonListRequest)
        .next()
        .takeLatest(Types.GET_PERSON_LIST_REQUEST, personListRequest)
        .next()
        .isDone();
    });
  });

  describe('personListExcelRequest sagas', () => {
    const body = {
      query: { isActivated: true },
      sort: { createdAt: -1 },
      fields: 'name isReservable isActivated personalGsm gsm trainings picURL homeAddress',
    };
    const data = { url: '' };

    it('should person list excel (success)', () => {
      testSaga(personListExcelRequest, body)
        .next()
        .call(getPersonListExcelApi, body)
        .next({ ...data })
        .put(Creators.getPersonListExcelSuccess())
        .next()
        .isDone();
    });
    it('should person list excel (failure)', () => {
      const fakeError = new Error('API Error');
      testSaga(personListExcelRequest, body)
        .next()
        .call(getPersonListExcelApi, body)
        .throw(fakeError)
        .put(Creators.getPersonListExcelFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
    it('should watch personListExcelRequest', () => {
      testSaga(watchPersonListExcelRequest)
        .next()
        .takeLatest(Types.GET_PERSON_LIST_EXCEL_REQUEST, personListExcelRequest)
        .next()
        .isDone();
    });
  });
});
