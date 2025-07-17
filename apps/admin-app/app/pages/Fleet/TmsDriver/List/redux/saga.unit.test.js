import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Types, Creators } from '@app/pages/Fleet/TmsDriver/List/redux/actions';
import {
  filterTmsDriversRequest,
  watchFilterTmsDriversRequest,
} from '@app/pages/Fleet/TmsDriver/List/redux/saga';
import { filterTmsDrivers } from '@shared/api/fleet';
import { LIST_PAGE_FIELDS } from '../constants';

describe('Fleet/TmsDriver/List', () => {
  describe('saga #filterTmsDriversRequest', () => {
    const mockResponse = {
      couriers: [
        {
          _id: '63973e4887aeabcf2e9351fa',
          name: 'Sedat Maraz',
          isActivated: true,
          isLoggedIn: true,
          gsm: '5555555555',
          status: 700,
        },
        {
          _id: '63a590b53ac613813d2d91a1',
          name: 'Safak TMS',
          isActivated: true,
          isLoggedIn: true,
          gsm: '5555555542',
          status: 200,
        },
        {
          _id: '63a591273ac613813d2d91a2',
          name: 'Suleyman TMS',
          isActivated: true,
          isLoggedIn: true,
          gsm: '5555553242',
          status: 900,
        },
        {
          _id: '63a59c4d3ac613813d2d91a3',
          name: 'Mustafa TMS',
          isActivated: true,
          isLoggedIn: false,
          gsm: '5555555542',
          status: 200,
        },
        {
          _id: '63b3fdaf86f58055cee63443',
          name: 'new courier1',
          isActivated: true,
          status: 200,
        },
        {
          _id: '63b3fe7786f58055cee63447',
          name: 'new courier1',
          isActivated: true,
          status: 200,
        },
        {
          _id: '63b3ff0486f58055cee6344d',
          name: 'new courier1',
          isActivated: true,
          status: 200,
        },
        {
          _id: '63b3ff3786f58055cee6344f',
          name: 'new courier1',
          isActivated: true,
          status: 200,
        },
        {
          _id: '63b403e50487f9df5ddbb482',
          name: 'new courier1',
          isActivated: true,
          status: 200,
        },
        {
          _id: '63b404820487f9df5ddbb484',
          name: 'new courier1',
          isActivated: true,
          status: 200,
        },
      ],
      totalCount: 21,
    };
    const currentPage = 1;
    const rowsPerPage = 25;
    const filters = {
      isLoggedIn: false,
      isActivated: true,
      statuses: [200],
    };
    it('should call filterTmsDrivers (success)', () => {
      testSaga(filterTmsDriversRequest, { currentPage, rowsPerPage, filters })
        .next()
        .call(filterTmsDrivers, {
          limit: rowsPerPage,
          offset: 0,
          ...filters,
          fields: LIST_PAGE_FIELDS,
        })
        .next(mockResponse)
        .put(
          Creators.filterTmsDriversSuccess({
            data: mockResponse.couriers,
            totalCount: mockResponse.totalCount,
          }),
        )
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });
    it('should call filterTmsDrivers (failure)', () => {
      const fakeError = new Error('fake error');
      testSaga(filterTmsDriversRequest, { currentPage, rowsPerPage, filters })
        .next()
        .call(filterTmsDrivers, {
          limit: rowsPerPage,
          offset: 0,
          ...filters,
          fields: LIST_PAGE_FIELDS,
        })
        .next(mockResponse)
        .throw(fakeError)
        .put(Creators.filterTmsDriversFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchFilterTmsDriversRequest', () => {
    it('should call filterTmsDriversRequest', () => {
      testSaga(watchFilterTmsDriversRequest)
        .next()
        .takeLatest(Types.FILTER_TMS_DRIVERS_REQUEST, filterTmsDriversRequest)
        .next()
        .isDone();
    });
  });
});
