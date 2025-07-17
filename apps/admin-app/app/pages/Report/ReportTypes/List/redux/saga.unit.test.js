import { testSaga } from 'redux-saga-test-plan';

import {
  getReportTypesRequest,
  watchReportTypesRequest,
  getAllReportTagsRequest,
  watchAllReportTagsRequest,
} from '@app/pages/Report/ReportTypes/List/redux/saga';
import { Creators, Types } from '@app/pages/Report/ReportTypes/List/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getReportTypes, getReportTags } from '@shared/api/report';

describe('Report/ReportTypes/List', () => {
  describe('saga #getReportTypesRequest', () => {
    const fakeResponseData = [];

    it('should call the getReportTypesRequest (success)', () => {
      testSaga(getReportTypesRequest, { fields: { permittedUsers: 0, __v: 0, parameters: 0 } })
        .next()
        .call(getReportTypes, { fields: { permittedUsers: 0, __v: 0, parameters: 0 } })
        .next(fakeResponseData)
        .put(Creators.getReportTypesSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getReportTypesRequest (failure)', () => {
      const fakeError = new Error('something went wrong');
      testSaga(getReportTypesRequest, { fields: { permittedUsers: 0, __v: 0, parameters: 0 } })
        .next()
        .call(getReportTypes, { fields: { permittedUsers: 0, __v: 0, parameters: 0 } })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getReportTypesFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #getAllReportTagsRequest', () => {
    const fakeResponseData = [];

    it('should call the getAllReportTagsRequest (success)', () => {
      testSaga(getAllReportTagsRequest, { data: {} })
        .next()
        .call(getReportTags, {})
        .next(fakeResponseData)
        .put(Creators.getAllReportTagsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getAllReportTagsRequest (failure)', () => {
      const fakeError = new Error('something went wrong');
      testSaga(getAllReportTagsRequest, { data: {} })
        .next()
        .call(getReportTags, {})
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getAllReportTagsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetReportTypesRequest', () => {
    it('should call the watchGetReportTypesRequest', () => {
      testSaga(watchReportTypesRequest)
        .next()
        .takeLatest(Types.GET_REPORT_TYPES_REQUEST, getReportTypesRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchAllReportTagsRequest', () => {
    it('should call the watchAllReportTagsRequest', () => {
      testSaga(watchAllReportTagsRequest)
        .next()
        .takeLatest(Types.GET_ALL_REPORT_TAGS_REQUEST, getAllReportTagsRequest)
        .next()
        .isDone();
    });
  });
});
