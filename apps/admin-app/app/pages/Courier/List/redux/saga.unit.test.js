import { testSaga } from 'redux-saga-test-plan';

import { filterCourier as filterCouriersApi } from '@shared/api/courierHandler';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getCourierList, watchGetCourierListRequest } from '@app/pages/Courier/List/redux/saga';
import { Creators, Types } from '@app/pages/Courier/List/redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';
import { formatCourierListParams } from '../utils';

describe('Courier/List', () => {
  describe('saga #getCourierList', () => {
    const mockData = {
      couriers: [
        {
          status: 200,
          isActivated: true,
          _id: '587c9e24a1a56d0004072d82',
          name: 'Fatih Sarıca',
          gsm: '5498140045',
          isLoggedIn: false,
        },
        {
          status: 200,
          isActivated: false,
          _id: '58844a968dbd4e00043503cb',
          name: 'Şahin Kara',
          gsm: '5315700443',
          isLoggedIn: false,
        },
        {
          status: 200,
          isActivated: false,
          _id: '5894abaafcc97e0004bc99de',
          name: 'Rıdvan Kara',
          gsm: '5498060436',
          isLoggedIn: false,
        },
      ],
      totalCount: 3,
    };
    it('should call filterCouriersApi (success)', () => {
      const pagination = { currentPage: 1, rowsPerPage: 10 };
      const filters = {};
      const { limit, offset } = getLimitAndOffset(pagination);
      const reqParams = formatCourierListParams(filters);
      testSaga(getCourierList, { filters, pagination })
        .next()
        .call(filterCouriersApi, { limit, offset, reqParams })
        .next(mockData)
        .put(
          Creators.getCourierListSuccess({
            data: mockData.couriers,
            totalCount: mockData.totalCount,
          }),
        )
        .next()
        .isDone();
    });

    it('should call getCourierListApi (failure)', () => {
      const pagination = { currentPage: 1, rowsPerPage: 10 };
      const filters = {};
      const { limit, offset } = getLimitAndOffset(pagination);
      const reqParams = formatCourierListParams(filters);
      const error = new Error('fake error');
      testSaga(getCourierList, { filters, pagination })
        .next()
        .call(filterCouriersApi, { limit, offset, reqParams })
        .next({})
        .throw(error)
        .put(Creators.getCourierListFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetCourierListRequest', () => {
    it('should call the #watchGetCourierListRequest', () => {
      testSaga(watchGetCourierListRequest)
        .next()
        .takeLatest(Types.GET_COURIER_LIST_REQUEST, getCourierList)
        .next()
        .isDone();
    });
  });
});
