import { testSaga } from 'redux-saga-test-plan';

import { Creators, Types } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { mockedRatingOptions } from '@shared/api/marketOrderRatings/index.mock.data';
import { getRatingTagsRequest, watchGetRatingTagsRequest } from './saga';
import { getRatingTags } from '@shared/api/marketOrderRatings';

describe('OrderFilter', () => {
  describe('saga #getRatingTagsRequest', () => {
    const fakeResponseData = mockedRatingOptions;

    it('should call the getRatingTagsRequest (success)', () => {
      testSaga(getRatingTagsRequest, { domainType: '1' })
        .next()
        .call(getRatingTags, { domainType: '1' })
        .next(fakeResponseData)
        .put(
          Creators.getRatingTagsSuccess({ data: fakeResponseData }),
        )
        .next()
        .isDone();
    });

    it('should call the getRatingTagsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getRatingTagsRequest, { domainType: '1' })
        .next()
        .call(getRatingTags, { domainType: '1' })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getRatingTagsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ message: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetRatingTagsRequest', () => {
    it('should call the watchGetRatingTagsRequest', () => {
      testSaga(watchGetRatingTagsRequest)
        .next()
        .takeLatest(
          Types.GET_RATING_TAGS_REQUEST,
          getRatingTagsRequest,
        )
        .next()
        .isDone();
    });
  });
});
