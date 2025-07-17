import { testSaga } from 'redux-saga-test-plan';

import { Creators } from './actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { createFranchiseAreaRequest } from './sagas';
import { getFranchiseAreas } from '@shared/api/marketFranchise/index.mock.data';
import { createFranchiseArea } from '@shared/api/marketFranchise';

describe('Franchise Detail', () => {
  describe('create Franchise area sagas', () => {
    const body = {
      areaName: 'Area 1',
      franchiseId: '63721c7a94106f66da67007f',
    };
    const mockResponse = getFranchiseAreas[0];
    const errMessage = '404 Not Found';

    it('should create area (success)', () => {
      testSaga(createFranchiseAreaRequest, body)
        .next()
        .call(createFranchiseArea, body)
        .next({ ...mockResponse })
        .put(Creators.createFranchiseAreaSuccess({ data: mockResponse }))
        .next()
        .put(ToastCreators.success({ message: 'Success' }))
        .next()
        .isDone();
    });
    it('should create area (failure)', () => {
      testSaga(createFranchiseAreaRequest, body)
        .next()
        .call(createFranchiseArea, body)
        .throw({ message: errMessage })
        .put(Creators.createFranchiseAreaFailure())
        .next()
        .put(ToastCreators.error({ error: { message: errMessage } }))
        .next()
        .isDone();
    });
  });
});
