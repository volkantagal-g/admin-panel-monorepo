import { testSaga } from 'redux-saga-test-plan';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  getCourierBusyOptions,
  setCourierFree,
  setCourierBusy,
  setCourierActive,
  setCourierDeactive,
  restartCourierMDU,
  sendNotification,
  releaseCourier as releaseCourierApi,
  setWarehouseToCourier as setWarehouseToCourierApi,
  setDomainType as setDomainTypeApi,
  setIsLoginDisabled as setIsLoginDisabledApi,
  setEmploymentType,
  setAvailableVehicleTypes,
  getOrderList as getOrderListApi,
  getCourierTasksByCourierId,
  resetCourierPassword,
} from '@shared/api/courier';
import { getCourierWithPersonDetails } from '@shared/api/courierHandler';
import {
  getCourierBusyOptionsRequest,
  getCourierRequest,
  getCourierTasksRequest,
  getOrderListRequest,
  getStatusLogsRequest,
  refreshGetCourierRequest,
  refreshGetCourierTasksRequest,
  releaseCourierRequest,
  removeCourierFromSystemRequest,
  restartCourierMduRequest,
  sendCheckServicesNotificationRequest,
  sendNotificationMessageRequest,
  sendPullAppsNotificationRequest,
  sendStartServicesNotificationRequest,
  setAvailableVehicleTypesRequest,
  setCourierActivateRequest,
  setCourierBusyRequest,
  setCourierDeactivateRequest,
  setCourierFreeRequest,
  setDomainTypeRequest,
  setEmploymentTypeRequest,
  setIsLoginDisabledRequest,
  setWarehouseToCourierRequest,
  resetCourierPasswordRequest,
  watchGetCourierBusyOptionsRequest,
  watchGetCourierRequest,
  watchGetCourierTasksRequest,
  watchGetOrderListRequest,
  watchGetStatusLogsRequest,
  watchReleaseCourierRequest,
  watchRemoveCourierFromSystemRequest,
  watchRestartCourierMduRequest,
  watchSendCheckServicesNotificationRequest,
  watchSendNotificationMessageRequest,
  watchSendPullAppsNotificationRequest,
  watchSendStartServicesNotificationRequest,
  watchSetAvailableVehicleTypesRequest,
  watchSetCourierActivateRequest,
  watchSetCourierBusyRequest,
  watchSetCourierDeactivateRequest,
  watchSetCourierFreeRequest,
  watchSetDomainTypeRequest,
  watchSetEmploymentTypeRequest,
  watchSetIsLoginDisabledRequest,
  watchSetWarehouseToCourier,
  watchResetCourierPasswordRequest,
} from '@app/pages/Courier/Detail/redux/sagas';
import { Creators, Types } from '@app/pages/Courier/Detail/redux/actions';
import { getOrderListMock } from '@shared/api/courier/index.mock.data';
import { courierDetailMock } from '@shared/api/courierHandler/index.mock.data';
import { COURIER_BUSY_OPTIONS_END_SHIFT, COURIER_DETAIL_REQUEST_FIELDS } from '../constants';
import { getRefreshInterval } from '../utils';

describe('Courier/Detail', () => {
  const error = new Error('404');
  describe('saga #refreshGetCourierRequest', () => {
    it('should call getCourier (success)', () => {
      const id = 'courierId';
      const hasFinanceEmployeeRole = false;
      testSaga(refreshGetCourierRequest, { id, hasFinanceEmployeeRole })
        .next()
        .call(getCourierWithPersonDetails, { id, fields: COURIER_DETAIL_REQUEST_FIELDS })
        .next(courierDetailMock)
        .put(Creators.getCourierSuccess({ data: courierDetailMock }))
        .next()
        .isDone();
    });
  });

  describe('saga #getCourierRequest', () => {
    it('should call refreshGetCourierRequest (success)', () => {
      const id = 'courierId';
      const hasFinanceEmployeeRole = false;
      testSaga(getCourierRequest, { id, hasFinanceEmployeeRole })
        .next()
        .call(refreshGetCourierRequest, { id, hasFinanceEmployeeRole })
        .next()
        .call(refreshGetCourierRequest, { id, hasFinanceEmployeeRole })
        .next()
        .delay(getRefreshInterval())
        .next()
        .isDone();
    });

    it('should call refreshGetCourierRequest (failure)', () => {
      const id = 'courierId';
      const hasFinanceEmployeeRole = false;
      testSaga(getCourierRequest, { id, hasFinanceEmployeeRole })
        .next()
        .call(refreshGetCourierRequest, { id, hasFinanceEmployeeRole })
        .next()
        .throw(error)
        .put(Creators.getCourierFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #releaseCourierRequest', () => {
    it('should call releaseCourierApi (success)', () => {
      const courierId = 'courierId';
      const warehouseId = 'warehouseId';
      testSaga(releaseCourierRequest, { courierId, warehouseId })
        .next()
        .call(releaseCourierApi, { courierId, warehouseId })
        .next()
        .call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS })
        .next(courierDetailMock)
        .put(Creators.releaseCourierSuccess())
        .next()
        .put(Creators.getCourierSuccess({ data: courierDetailMock }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call releaseCourierApi (failure)', () => {
      const courierId = 'courierId';
      const warehouseId = 'warehouseId';
      testSaga(releaseCourierRequest, { courierId, warehouseId })
        .next()
        .call(releaseCourierApi, { courierId, warehouseId })
        .next()
        .throw(error)
        .put(Creators.releaseCourierFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #getCourierBusyOptionsRequest', () => {
    it('should call getCourierBusyOptions (success)', () => {
      const options = { busyOptions: ['option1', 'option2'] };
      testSaga(getCourierBusyOptionsRequest)
        .next()
        .call(getCourierBusyOptions)
        .next(options)
        .put(Creators.getCourierBusyOptionsSuccess({ data: options.busyOptions }))
        .next()
        .isDone();
    });

    it('should call getCourierBusyOptions (failure)', () => {
      testSaga(getCourierBusyOptionsRequest)
        .next()
        .call(getCourierBusyOptions)
        .next({})
        .throw(error)
        .put(Creators.getCourierBusyOptionsFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setCourierFreeRequest', () => {
    it('should call setCourierFree (success)', () => {
      const id = 'courierId';
      testSaga(setCourierFreeRequest, { id })
        .next()
        .call(setCourierFree, { id })
        .next()
        .put(Creators.setCourierFreeSuccess())
        .next()
        .isDone();
    });

    it('should call setCourierFree (failure)', () => {
      const id = 'courierId';
      testSaga(setCourierFreeRequest, { id })
        .next()
        .call(setCourierFree, { id })
        .next()
        .throw(error)
        .put(Creators.setCourierFreeFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setCourierBusyRequest', () => {
    const id = 'courierId';
    const reason = 'busy reason';
    it('should call setCourierBusy (success)', () => {
      testSaga(setCourierBusyRequest, { id, reason })
        .next()
        .call(setCourierBusy, { id, reason })
        .next()
        .put(Creators.setCourierBusySuccess())
        .next()
        .isDone();
    });

    it('should call setCourierBusy (failure)', () => {
      testSaga(setCourierBusyRequest, { id, reason })
        .next()
        .call(setCourierBusy, { id, reason })
        .next()
        .throw(error)
        .put(Creators.setCourierBusyFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setCourierActivateRequest', () => {
    const id = 'courierId';
    it('should call setCourierActive (success)', () => {
      testSaga(setCourierActivateRequest, { id })
        .next()
        .call(setCourierActive, { id })
        .next()
        .put(Creators.setCourierActivateSuccess())
        .next()
        .isDone();
    });

    it('should call setCourierActive (success)', () => {
      testSaga(setCourierActivateRequest, { id })
        .next()
        .call(setCourierActive, { id })
        .next()
        .throw(error)
        .put(Creators.setCourierActivateFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setCourierDeactivateRequest', () => {
    const id = 'courierId';
    it('should call setCourierDeactive (success)', () => {
      testSaga(setCourierDeactivateRequest, { id })
        .next()
        .call(setCourierDeactive, { id })
        .next()
        .put(Creators.setCourierDeactivateSuccess())
        .next()
        .isDone();
    });

    it('should call setCourierDeactive (success)', () => {
      testSaga(setCourierDeactivateRequest, { id })
        .next()
        .call(setCourierDeactive, { id })
        .next()
        .throw(error)
        .put(Creators.setCourierDeactivateFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #restartCourierMduRequest', () => {
    const id = 'courierId';
    it('should call restartCourierMDU (success)', () => {
      testSaga(restartCourierMduRequest, { id })
        .next()
        .call(restartCourierMDU, { id })
        .next()
        .put(Creators.restartCourierMduSuccess())
        .next()
        .isDone();
    });

    it('should call restartCourierMDU (success)', () => {
      testSaga(restartCourierMduRequest, { id })
        .next()
        .call(restartCourierMDU, { id })
        .next()
        .throw(error)
        .put(Creators.restartCourierMduFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #resetCourierPasswordRequest', () => {
    const courierId = 'courierId';
    it('should call resetCourierPassword (success)', () => {
      testSaga(resetCourierPasswordRequest, { courierId })
        .next()
        .call(resetCourierPassword, { courierId })
        .next({})
        .put(Creators.resetCourierPasswordSuccess())
        .next()
        .isDone();
    });

    it('should call resetCourierPassword (fail)', () => {
      testSaga(resetCourierPasswordRequest, { courierId })
        .next()
        .call(resetCourierPassword, { courierId })
        .next()
        .throw(error)
        .put(Creators.resetCourierPasswordFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #sendPullAppsNotificationRequest', () => {
    const id = 'courierId';
    it('should call restartCourierMDU (success)', () => {
      testSaga(sendPullAppsNotificationRequest, { id })
        .next()
        .call(sendNotification, { id, isSendDeviceInfo: true })
        .next()
        .put(Creators.sendPullAppsNotificationSuccess())
        .next()
        .isDone();
    });

    it('should call restartCourierMDU (success)', () => {
      testSaga(sendPullAppsNotificationRequest, { id })
        .next()
        .call(sendNotification, { id, isSendDeviceInfo: true })
        .next()
        .throw(error)
        .put(Creators.sendPullAppsNotificationFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #sendCheckServicesNotificationRequest', () => {
    const id = 'courierId';
    it('should call restartCourierMDU (success)', () => {
      testSaga(sendCheckServicesNotificationRequest, { id })
        .next()
        .call(sendNotification, { id, isCheckServices: true })
        .next()
        .put(Creators.sendCheckServicesNotificationSuccess())
        .next()
        .isDone();
    });

    it('should call restartCourierMDU (success)', () => {
      testSaga(sendCheckServicesNotificationRequest, { id })
        .next()
        .call(sendNotification, { id, isCheckServices: true })
        .next()
        .throw(error)
        .put(Creators.sendCheckServicesNotificationFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setWarehouseToCourierRequest', () => {
    const courierId = 'courierId';
    const warehouseId = 'warehouseId';
    const warehouseFranchiseId = 'warehouseFranchiseId';
    const currentMarketEmployer = 'employer';
    const workStatus = 'workStatus';

    it('should call setWarehouseToCourierApi (success)', () => {
      testSaga(setWarehouseToCourierRequest, { courierId, warehouseId, warehouseFranchiseId, currentMarketEmployer, workStatus })
        .next()
        .call(setWarehouseToCourierApi, { courierId, warehouseId, warehouseFranchiseId, currentMarketEmployer, workStatus })
        .next()
        .call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS })
        .next(courierDetailMock)
        .put(Creators.setWarehouseToCourierSuccess())
        .next()
        .put(Creators.getCourierSuccess({ data: courierDetailMock }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call setWarehouseToCourierApi (failure)', () => {
      testSaga(setWarehouseToCourierRequest, { courierId, warehouseId, warehouseFranchiseId, currentMarketEmployer, workStatus })
        .next()
        .call(setWarehouseToCourierApi, { courierId, warehouseId, warehouseFranchiseId, currentMarketEmployer, workStatus })
        .next()
        .throw(error)
        .put(Creators.setWarehouseToCourierFailure({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setDomainTypeRequest', () => {
    const courierId = 'courierId';
    const domainTypes = ['domain1', 'domain2'];

    it('should call setDomainTypeApi (success)', () => {
      testSaga(setDomainTypeRequest, { courierId, domainTypes })
        .next()
        .call(setDomainTypeApi, { courierId, domainTypes })
        .next()
        .call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS })
        .next(courierDetailMock)
        .put(Creators.setDomainTypeSuccess())
        .next()
        .put(Creators.getCourierSuccess({ data: courierDetailMock }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call setDomainTypeApi (failure)', () => {
      testSaga(setDomainTypeRequest, { courierId, domainTypes })
        .next()
        .call(setDomainTypeApi, { courierId, domainTypes })
        .next()
        .throw(error)
        .put(Creators.setDomainTypeFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #sendStartServicesNotificationRequest', () => {
    const id = 'id';

    it('should call sendNotification (success)', () => {
      testSaga(sendStartServicesNotificationRequest, { id })
        .next()
        .call(sendNotification, { id, isStartServices: true })
        .next()
        .put(Creators.sendStartServicesNotificationSuccess())
        .next()
        .isDone();
    });

    it('should call sendNotification (failure)', () => {
      testSaga(sendStartServicesNotificationRequest, { id })
        .next()
        .call(sendNotification, { id, isStartServices: true })
        .next()
        .throw(error)
        .put(Creators.sendStartServicesNotificationFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setAvailableVehicleTypesRequest', () => {
    const courierId = 'courierId';
    const availableVehicleTypes = ['VehicleType1', 'VehicleType2'];

    it('should call setAvailableVehicleTypes (success)', () => {
      testSaga(setAvailableVehicleTypesRequest, { courierId, availableVehicleTypes })
        .next()
        .call(setAvailableVehicleTypes, { courierId, availableVehicleTypes })
        .next()
        .call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS })
        .next(courierDetailMock)
        .put(Creators.setAvailableVehicleTypesSuccess())
        .next()
        .put(Creators.getCourierSuccess({ data: courierDetailMock }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call setAvailableVehicleTypes (failure)', () => {
      testSaga(setAvailableVehicleTypesRequest, { courierId, availableVehicleTypes })
        .next()
        .call(setAvailableVehicleTypes, { courierId, availableVehicleTypes })
        .next()
        .throw(error)
        .put(Creators.setAvailableVehicleTypesFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #removeCourierFromSystemRequest', () => {
    const id = 'id';

    it('should call setCourierBusy (success)', () => {
      testSaga(removeCourierFromSystemRequest, { id })
        .next()
        .call(setCourierBusy, { id, reason: COURIER_BUSY_OPTIONS_END_SHIFT })
        .next()
        .put(Creators.removeCourierFromSystemSuccess())
        .next()
        .isDone();
    });

    it('should call setCourierBusy (failure)', () => {
      testSaga(removeCourierFromSystemRequest, { id })
        .next()
        .call(setCourierBusy, { id, reason: COURIER_BUSY_OPTIONS_END_SHIFT })
        .next()
        .throw(error)
        .put(Creators.removeCourierFromSystemFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setEmploymentTypeRequest', () => {
    const courierId = 'courierId';
    const employmentType = 'employmentType';

    it('should call setEmploymentType (success)', () => {
      testSaga(setEmploymentTypeRequest, { courierId, employmentType })
        .next()
        .call(setEmploymentType, { courierId, employmentType })
        .next()
        .call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS })
        .next(courierDetailMock)
        .put(Creators.setEmploymentTypeSuccess())
        .next()
        .put(Creators.getCourierSuccess({ data: courierDetailMock }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call setEmploymentType (failure)', () => {
      testSaga(setEmploymentTypeRequest, { courierId, employmentType })
        .next()
        .call(setEmploymentType, { courierId, employmentType })
        .next()
        .throw(error)
        .put(Creators.setEmploymentTypeFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #sendNotificatioMessageRequest', () => {
    const id = 'id';
    const title = 'title';
    const message = 'message';

    it('should call sendNotification (success)', () => {
      testSaga(sendNotificationMessageRequest, { id, title, message })
        .next()
        .call(sendNotification, { id, title, message })
        .next()
        .put(Creators.sendNotificationMessageSuccess())
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call sendNotification (failure)', () => {
      testSaga(sendNotificationMessageRequest, { id, title, message })
        .next()
        .call(sendNotification, { id, title, message })
        .next()
        .throw(error)
        .put(Creators.sendNotificationMessageFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #setIsLoginDisabledRequest', () => {
    const courierId = 'courierId';
    const isLoginDisabled = false;

    it('should call setIsLoginDisabledApi (success)', () => {
      testSaga(setIsLoginDisabledRequest, { courierId, isLoginDisabled })
        .next()
        .call(setIsLoginDisabledApi, { courierId, isLoginDisabled })
        .next()
        .call(getCourierWithPersonDetails, { id: courierId, fields: COURIER_DETAIL_REQUEST_FIELDS })
        .next(courierDetailMock)
        .put(Creators.setIsLoginDisabledSuccess())
        .next()
        .put(Creators.getCourierSuccess({ data: courierDetailMock }))
        .next()
        .put(ToastCreators.success())
        .next()
        .isDone();
    });

    it('should call setIsLoginDisabledApi (failure)', () => {
      testSaga(setIsLoginDisabledRequest, { courierId, isLoginDisabled })
        .next()
        .call(setIsLoginDisabledApi, { courierId, isLoginDisabled })
        .next()
        .throw(error)
        .put(Creators.setIsLoginDisabledFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #refreshGetCourierTasksRequest', () => {
    const courierId = 'courierId';

    it('should call getCourierTasksByCourierId', () => {
      testSaga(refreshGetCourierTasksRequest, { courierId })
        .next()
        .call(getCourierTasksByCourierId, { courierId })
        .next(getOrderListMock.orders[0])
        .put(Creators.getCourierTasksSuccess({ data: getOrderListMock.orders[0] }))
        .next()
        .isDone();
    });
  });

  describe('saga #getCourierTasksRequest', () => {
    const courierId = 'courierId';

    it('should call refreshGetCourierTasksRequest (success)', () => {
      testSaga(getCourierTasksRequest, { courierId })
        .next()
        .call(refreshGetCourierTasksRequest, { courierId })
        .next()
        .delay(getRefreshInterval())
        .next()
        .call(refreshGetCourierTasksRequest, { courierId })
        .next()
        .isDone();
    });

    it('should call refreshGetCourierTasksRequest (failure)', () => {
      testSaga(getCourierTasksRequest, { courierId })
        .next()
        .call(refreshGetCourierTasksRequest, { courierId })
        .next()
        .throw(error)
        .put(Creators.getCourierTasksFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  describe('saga #getOrderListRequest', () => {
    const courierId = 'courierId';
    const domainType = 'domainType';
    const limit = 'limit';
    const offset = 'offset';

    it('should call #getOrderListApi (success)', () => {
      testSaga(getOrderListRequest, { courierId, domainType, limit, offset })
        .next()
        .call(getOrderListApi, { courierId, domainType, limit, offset })
        .next(getOrderListMock)
        .put(Creators.getOrderListSuccess({ data: getOrderListMock.orders }))
        .next()
        .isDone();
    });

    it('should call #getOrderListApi (failure)', () => {
      testSaga(getOrderListRequest, { courierId, domainType, limit, offset })
        .next()
        .call(getOrderListApi, { courierId, domainType, limit, offset })
        .next({})
        .throw(error)
        .put(Creators.getOrderListFailure({ error }))
        .next()
        .put(ToastCreators.error({ error }))
        .next()
        .isDone();
    });
  });

  // TODO: update this test, this is failing because of cancel token
  // describe('saga #getStatusLogsRequest', () => {
  //   const courierId = 'courierId';
  //   const startDate = '2022-07-30T21:04:59.326Z';
  //   const endDate = '2022-07-30T21:05:09.558Z';

  //   it('should call getCourierStatusLogsApi (success)', () => {
  //     const batchData = setDiffForLogs({ logDiff: courierStatusLogsMock, endDate });
  //     const { CancelToken } = axios;
  //     const cancelSource = CancelToken.source();
  //     testSaga(getStatusLogsRequest, { courierId, startDate, endDate })
  //       .next()
  //       .call(getCourierStatusLogsApi, { cancelSource, courierId, startDate, endDate })
  //       .next(courierStatusLogsMock)
  //       .put(Creators.getStatusLogsSuccess({ data: courierStatusLogsMock, batchData }))
  //       .next()
  //       .isDone();
  //   });

  //   it('should call getCourierStatusLogsApi (failure)', () => {
  //     const { CancelToken } = axios;
  //     const cancelSource = CancelToken.source();
  //     testSaga(getStatusLogsRequest, { courierId, startDate, endDate })
  //       .next()
  //       .call(getCourierStatusLogsApi, { cancelSource, courierId, startDate, endDate })
  //       .next()
  //       .throw(error)
  //       .put(Creators.getStatusLogsFailure({ error }))
  //       .next()
  //       .put(ToastCreators.error({ error }))
  //       .next()
  //       .isDone();
  //   });
  // });

  describe('saga #watchGetCourierRequest', () => {
    it('should call getCourierRequest', () => {
      testSaga(watchGetCourierRequest)
        .next()
        .takeLatest(Types.GET_COURIER_REQUEST, getCourierRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchReleaseCourierRequest', () => {
    it('should call releaseCourierRequest', () => {
      testSaga(watchReleaseCourierRequest)
        .next()
        .takeLatest(Types.RELEASE_COURIER_REQUEST, releaseCourierRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetCourierBusyOptionsRequest', () => {
    it('should call watchGetCourierRequest', () => {
      testSaga(watchGetCourierBusyOptionsRequest)
        .next()
        .takeLatest(Types.GET_COURIER_BUSY_OPTIONS_REQUEST, getCourierBusyOptionsRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetCourierFreeRequest', () => {
    it('should call watchGetCourierRequest', () => {
      testSaga(watchSetCourierFreeRequest)
        .next()
        .takeLatest(Types.SET_COURIER_FREE_REQUEST, setCourierFreeRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetCourierBusyRequest', () => {
    it('should call watchSetCourierBusyRequest', () => {
      testSaga(watchSetCourierBusyRequest)
        .next()
        .takeLatest(Types.SET_COURIER_BUSY_REQUEST, setCourierBusyRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetCourierActivateRequest', () => {
    it('should call watchSetCourierActivateRequest', () => {
      testSaga(watchSetCourierActivateRequest)
        .next()
        .takeLatest(Types.SET_COURIER_ACTIVATE_REQUEST, setCourierActivateRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetCourierDeactivateRequest', () => {
    it('should call watchSetCourierDeactivateRequest', () => {
      testSaga(watchSetCourierDeactivateRequest)
        .next()
        .takeLatest(Types.SET_COURIER_DEACTIVATE_REQUEST, setCourierDeactivateRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchRestartCourierMduRequest', () => {
    it('should call watchRestartCourierMduRequest', () => {
      testSaga(watchRestartCourierMduRequest)
        .next()
        .takeLatest(Types.RESTART_COURIER_MDU_REQUEST, restartCourierMduRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSendPullAppsNotificationRequest', () => {
    it('should call watchSendPullAppsNotificationRequest', () => {
      testSaga(watchSendPullAppsNotificationRequest)
        .next()
        .takeLatest(Types.SEND_PULL_APPS_NOTIFICATION_REQUEST, sendPullAppsNotificationRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSendCheckServicesNotificationRequest', () => {
    it('should call watchSendCheckServicesNotificationRequest', () => {
      testSaga(watchSendCheckServicesNotificationRequest)
        .next()
        .takeLatest(Types.SEND_CHECK_SERVICES_NOTIFICATION_REQUEST, sendCheckServicesNotificationRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSendStartServicesNotificationRequest', () => {
    it('should call watchSendStartServicesNotificationRequest', () => {
      testSaga(watchSendStartServicesNotificationRequest)
        .next()
        .takeLatest(Types.SEND_START_SERVICES_NOTIFICATION_REQUEST, sendStartServicesNotificationRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchRemoveCourierFromSystemRequest', () => {
    it('should call watchRemoveCourierFromSystemRequest', () => {
      testSaga(watchRemoveCourierFromSystemRequest)
        .next()
        .takeLatest(Types.REMOVE_COURIER_FROM_SYSTEM_REQUEST, removeCourierFromSystemRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSendNotificationMessageRequest', () => {
    it('should call watchSendNotificationMessageRequest', () => {
      testSaga(watchSendNotificationMessageRequest)
        .next()
        .takeLatest(Types.SEND_NOTIFICATION_MESSAGE_REQUEST, sendNotificationMessageRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetWarehouseToCourier', () => {
    it('should call watchSetWarehouseToCourier', () => {
      testSaga(watchSetWarehouseToCourier)
        .next()
        .takeLatest(Types.SET_WAREHOUSE_TO_COURIER_REQUEST, setWarehouseToCourierRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetDomainTypeRequest', () => {
    it('should call watchSetDomainTypeRequest', () => {
      testSaga(watchSetDomainTypeRequest)
        .next()
        .takeLatest(Types.SET_DOMAIN_TYPE_REQUEST, setDomainTypeRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetAvailableVehicleTypesRequest', () => {
    it('should call watchSetAvailableVehicleTypesRequest', () => {
      testSaga(watchSetAvailableVehicleTypesRequest)
        .next()
        .takeLatest(Types.SET_AVAILABLE_VEHICLE_TYPES_REQUEST, setAvailableVehicleTypesRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetEmploymentTypeRequest', () => {
    it('should call watchSetEmploymentTypeRequest', () => {
      testSaga(watchSetEmploymentTypeRequest)
        .next()
        .takeLatest(Types.SET_EMPLOYMENT_TYPE_REQUEST, setEmploymentTypeRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchSetIsLoginDisabledRequest', () => {
    it('should call watchSetIsLoginDisabledRequest', () => {
      testSaga(watchSetIsLoginDisabledRequest)
        .next()
        .takeLatest(Types.SET_IS_LOGIN_DISABLED_REQUEST, setIsLoginDisabledRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetOrderListRequest', () => {
    it('should call watchGetOrderListRequest', () => {
      testSaga(watchGetOrderListRequest)
        .next()
        .takeLatest(Types.GET_ORDER_LIST_REQUEST, getOrderListRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetStatusLogsRequest', () => {
    it('should call watchGetStatusLogsRequest', () => {
      testSaga(watchGetStatusLogsRequest)
        .next()
        .takeLatest(Types.GET_STATUS_LOGS_REQUEST, getStatusLogsRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchResetCourierPasswordRequest', () => {
    it('should call watchResetCourierPasswordRequest', () => {
      testSaga(watchResetCourierPasswordRequest)
        .next()
        .takeLatest(Types.RESET_COURIER_PASSWORD_REQUEST, resetCourierPasswordRequest)
        .next()
        .isDone();
    });
  });

  describe('saga #watchGetCourierTasksRequest', () => {
    it('should call watchGetCourierTasksRequest', () => {
      testSaga(watchGetCourierTasksRequest)
        .next()
        .takeLatest(Types.GET_COURIER_TASKS_REQUEST, getCourierTasksRequest)
        .next()
        .isDone();
    });
  });
});
