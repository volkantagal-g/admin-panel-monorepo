import { testSaga } from 'redux-saga-test-plan';

import { deleteGetirJobsClient, getClientLoyaltyStamps, getFinanceOrders, getGetirJobsClientStatus, getGetirTableOrders } from '@shared/api/clientDetail';
import {
  getClientLoyaltyStampsRequest,
  getClientGetirTableOrdersRequest,
  watchGetClientGetirTableOrdersRequest,
  watchGetClientLoyaltyStampsRequest,
  watchGetClientRequest,
  getClientRequest,
  watchGetClientFinanceOrdersRequest,
  getClientFinanceOrdersRequest,
  getClientStatusGetirJobsRequest,
  watchGetClientGetirJobsRequest,
  deleteClientGetirJobsRequest,
  watchDeleteClientGetirJobsRequest,
} from '@app/pages/Client/Detail/redux/saga';
import { Creators, Types } from '@app/pages/Client/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

describe('ClientDetail - saga', () => {
  describe('saga #getClientRequest', () => {
    it('should call the getClientRequest (success)', () => {
      testSaga(watchGetClientRequest)
        .next()
        .takeLatest(
          Types.GET_CLIENT_REQUEST,
          getClientRequest,
        )
        .next()
        .isDone();
    });
  });

  describe('saga #getClientLoyaltyStampsRequest', () => {
    const fakeRequestData = { clientId: '5e69d9d2a2f6560007900e9e' };
    const fakeResponseData = {
      stampCount: 5,
      stamps: [{ type: 'virtual', restaurant: null }],
    };

    it('should call the getClientLoyaltyStampsRequest (success)', () => {
      testSaga(getClientLoyaltyStampsRequest, fakeRequestData)
        .next()
        .call(getClientLoyaltyStamps, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getClientLoyaltyStampsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getClientLoyaltyStampsRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getClientLoyaltyStampsRequest, fakeRequestData)
        .next()
        .call(getClientLoyaltyStamps, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getClientLoyaltyStampsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetClientLoyaltyStampsRequest', () => {
    it('should call the watchGetClientLoyaltyStampsRequest', () => {
      testSaga(watchGetClientLoyaltyStampsRequest)
        .next()
        .takeLatest(
          Types.GET_CLIENT_LOYALTY_STAMPS_REQUEST,
          getClientLoyaltyStampsRequest,
        )
        .next()
        .isDone();
    });
  });

  describe('saga #getClientGetirTableOrdersRequest', () => {
    const fakeRequestData = { clientId: '5e69d9d2a2f6560007900e9e', pageSize: 20, pageIndex: 1 };
    const fakeResponseData = {
      result: {
        pagination: {
          perPage: 20,
          page: 1,
          total: 1,
          totalPage: 1,
        },
        data: [
          {
            orderId: 'fd5d8592-4b34-4482-b222-4af01775d4d0',
            restaurantName: 'Quick Pizza (Güzelyurt Mah.)',
            discountCode: '467417',
            status: 'Pending',
            discountValue: 0.19,
            processDate: '2022-12-27T16:56:36Z',
          },
        ],
      },
      messages: null,
    };

    it('should call the getClientGetirTableOrdersRequest (success)', () => {
      testSaga(getClientGetirTableOrdersRequest, fakeRequestData)
        .next()
        .call(getGetirTableOrders, fakeRequestData)
        .next(fakeResponseData)
        .put(Creators.getClientGetirTableOrdersSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getClientGetirTableOrdersRequest (failure)', () => {
      const fakeError = new Error('404 Not Found');
      testSaga(getClientGetirTableOrdersRequest, fakeRequestData)
        .next()
        .call(getGetirTableOrders, fakeRequestData)
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getClientGetirTableOrdersFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetClientGetirTableOrdersRequest', () => {
    it('should call the watchGetClientGetirTableOrdersRequest', () => {
      testSaga(watchGetClientGetirTableOrdersRequest)
        .next()
        .takeLatest(
          Types.GET_CLIENT_GETIR_TABLE_ORDERS_REQUEST,
          getClientGetirTableOrdersRequest,
        )
        .next()
        .isDone();
    });
  });

  describe('GetClientFinanceOrdersRequest', () => {
    const fakeRequestData = { clientId: '639836d7d5463042132cdc16', size: 5, page: 1 };
    const fakeResponseData = {
      data: {
        orders: [
          {
            orderId: '63d3ea13a73cbe5b2daee466',
            vendorId: 1,
            vendorStatus: '300',
            checkoutDate: '2023-01-27T15:13:24.913732Z',
          },
          {
            orderId: '63ca9e3b3d2b057bef49a53d',
            vendorId: 1,
            vendorStatus: '900',
            checkoutDate: '2023-01-20T13:59:24.503952Z',
          },
        ],
        pageCount: 10,
      },
      success: true,
      error: null,
    };

    it('should call the getClientFinanceOrdersRequest (success)', () => {
      testSaga(getClientFinanceOrdersRequest, fakeRequestData)
        .next()
        .call(getFinanceOrders, {
          ...fakeRequestData,
          page: fakeRequestData.page - 1,
        })
        .next(fakeResponseData)
        .put(Creators.getClientFinanceOrdersSuccess({
          data: fakeResponseData.data.orders,
          totalCount: fakeResponseData.data.totalCount,
        }))
        .next()
        .isDone();
    });

    it('should call the getClientFinanceOrdersRequest (failure)', () => {
      const fakeError = new Error('"params.clientId" failed custom validation because Must be a valid ObjectId');

      testSaga(getClientFinanceOrdersRequest, fakeRequestData)
        .next()
        .call(getFinanceOrders, {
          ...fakeRequestData,
          page: fakeRequestData.page - 1,
        })
        .next(fakeResponseData)
        .throw(fakeError)
        .put(Creators.getClientFinanceOrdersFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    it('should call the watchGetClientFinanceOrdersRequest', () => {
      testSaga(watchGetClientFinanceOrdersRequest)
        .next()
        .takeLatest(
          Types.GET_CLIENT_FINANCE_ORDERS_REQUEST,
          getClientFinanceOrdersRequest,
        )
        .next()
        .isDone();
    });
  });

  describe('GetClientStatusGetirJobsRequest', () => {
    const clientId = '639836d7d5463042132cdc16';
    const fakeRequestData = { clientId };
    const fakeResponseData = { isExist: true };

    it('should call the getClientStatusGetirJobsRequest (success)', () => {
      testSaga(getClientStatusGetirJobsRequest, fakeRequestData)
        .next()
        .call(getGetirJobsClientStatus, clientId)
        .next({ data: fakeResponseData })
        .put(Creators.getClientStatusGetirJobsSuccess({ data: fakeResponseData }))
        .next()
        .isDone();
    });

    it('should call the getClientStatusGetirJobsRequest (failure)', () => {
      const fakeError = new Error('Client Not Found');

      testSaga(getClientStatusGetirJobsRequest, fakeRequestData)
        .next()
        .call(getGetirJobsClientStatus, clientId)
        .throw(fakeError)
        .put(Creators.getClientStatusGetirJobsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    it('should call the watchGetClientGetirJobsRequest', () => {
      testSaga(watchGetClientGetirJobsRequest)
        .next()
        .takeLatest(
          Types.GET_CLIENT_STATUS_GETIR_JOBS_REQUEST,
          getClientStatusGetirJobsRequest,
        )
        .next()
        .isDone();
    });
  });

  describe('DeleteClientGetirJobsRequest', () => {
    const clientId = '639836d7d5463042132cdc16';
    const fakeRequestData = { clientId, onSuccess: () => null };
    const fakeResponseData = { success: true };

    it('should call the deleteClientGetirJobsRequest (success)', () => {
      testSaga(deleteClientGetirJobsRequest, fakeRequestData)
        .next()
        .call(deleteGetirJobsClient, clientId)
        .next({ data: fakeResponseData })
        .put(Creators.deleteClientGetirJobsSuccess({ data: fakeResponseData }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call the deleteClientGetirJobsRequest (failure)', () => {
      const fakeError = new Error('Client Not Found');

      testSaga(deleteClientGetirJobsRequest, fakeRequestData)
        .next()
        .call(deleteGetirJobsClient, clientId)
        .throw(fakeError)
        .put(Creators.deleteClientGetirJobsFailure({ error: fakeError }))
        .next()
        .put(ToastCreators.error({ error: fakeError }))
        .next()
        .isDone();
    });

    it('should call the watchDeleteClientGetirJobsRequest', () => {
      testSaga(watchDeleteClientGetirJobsRequest)
        .next()
        .takeLatest(
          Types.DELETE_CLIENT_GETIR_JOBS_REQUEST,
          deleteClientGetirJobsRequest,
        )
        .next()
        .isDone();
    });
  });
});
