import { Types, Creators } from '@app/pages/Courier/Detail/redux/actions';

describe('Courier/Detail', () => {
  describe('action-creator #getCourierRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierRequest({});
      const expectedAction = { type: Types.GET_COURIER_REQUEST, id: null, hasFinanceEmployeeRole: false };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierSuccess({});
      const expectedAction = { type: Types.GET_COURIER_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierFailure({});
      const expectedAction = { type: Types.GET_COURIER_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #releaseCourierRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.releaseCourierRequest({});
      const expectedAction = { type: Types.RELEASE_COURIER_REQUEST, courierId: null, warehouseId: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #releaseCourierSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.releaseCourierSuccess({});
      const expectedAction = { type: Types.RELEASE_COURIER_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #releaseCourierFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.releaseCourierFailure({});
      const expectedAction = { type: Types.RELEASE_COURIER_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierBusyOptionsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierBusyOptionsRequest({});
      const expectedAction = { type: Types.GET_COURIER_BUSY_OPTIONS_REQUEST };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierBusyOptionsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierBusyOptionsSuccess({});
      const expectedAction = { type: Types.GET_COURIER_BUSY_OPTIONS_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierBusyOptionsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierBusyOptionsFailure({});
      const expectedAction = { type: Types.GET_COURIER_BUSY_OPTIONS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierFreeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierFreeRequest({});
      const expectedAction = { type: Types.SET_COURIER_FREE_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierFreeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierFreeSuccess({});
      const expectedAction = { type: Types.SET_COURIER_FREE_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierFreeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierFreeFailure({});
      const expectedAction = { type: Types.SET_COURIER_FREE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierBusyRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierBusyRequest({});
      const expectedAction = { type: Types.SET_COURIER_BUSY_REQUEST, id: null, reason: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierBusySuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierBusySuccess({});
      const expectedAction = { type: Types.SET_COURIER_BUSY_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierBusyFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierBusyFailure({});
      const expectedAction = { type: Types.SET_COURIER_BUSY_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierActivateRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierActivateRequest({});
      const expectedAction = { type: Types.SET_COURIER_ACTIVATE_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierActivateSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierActivateSuccess({});
      const expectedAction = { type: Types.SET_COURIER_ACTIVATE_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierActivateFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierActivateFailure({});
      const expectedAction = { type: Types.SET_COURIER_ACTIVATE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierDeactivateRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierDeactivateRequest({});
      const expectedAction = { type: Types.SET_COURIER_DEACTIVATE_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierDeactivateSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierDeactivateSuccess({});
      const expectedAction = { type: Types.SET_COURIER_DEACTIVATE_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setCourierDeactivateFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setCourierDeactivateFailure({});
      const expectedAction = { type: Types.SET_COURIER_DEACTIVATE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #restartCourierMduRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.restartCourierMduRequest({});
      const expectedAction = { type: Types.RESTART_COURIER_MDU_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #restartCourierMduSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.restartCourierMduSuccess({});
      const expectedAction = { type: Types.RESTART_COURIER_MDU_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #restartCourierMduFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.restartCourierMduFailure({});
      const expectedAction = { type: Types.RESTART_COURIER_MDU_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendPullAppsNotificationRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendPullAppsNotificationRequest({});
      const expectedAction = { type: Types.SEND_PULL_APPS_NOTIFICATION_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendPullAppsNotificationSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendPullAppsNotificationSuccess({});
      const expectedAction = { type: Types.SEND_PULL_APPS_NOTIFICATION_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendPullAppsNotificationFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendPullAppsNotificationFailure({});
      const expectedAction = { type: Types.SEND_PULL_APPS_NOTIFICATION_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendCheckServicesNotificationRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendCheckServicesNotificationRequest({});
      const expectedAction = { type: Types.SEND_CHECK_SERVICES_NOTIFICATION_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendCheckServicesNotificationSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendCheckServicesNotificationSuccess({});
      const expectedAction = { type: Types.SEND_CHECK_SERVICES_NOTIFICATION_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendCheckServicesNotificationFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendCheckServicesNotificationFailure({});
      const expectedAction = { type: Types.SEND_CHECK_SERVICES_NOTIFICATION_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendStartServicesNotificationRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendStartServicesNotificationRequest({});
      const expectedAction = { type: Types.SEND_START_SERVICES_NOTIFICATION_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendStartServicesNotificationSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendStartServicesNotificationSuccess({});
      const expectedAction = { type: Types.SEND_START_SERVICES_NOTIFICATION_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendStartServicesNotificationFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendStartServicesNotificationFailure({});
      const expectedAction = { type: Types.SEND_START_SERVICES_NOTIFICATION_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #removeCourierFromSystemRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.removeCourierFromSystemRequest({});
      const expectedAction = { type: Types.REMOVE_COURIER_FROM_SYSTEM_REQUEST, id: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #removeCourierFromSystemSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.removeCourierFromSystemSuccess({});
      const expectedAction = { type: Types.REMOVE_COURIER_FROM_SYSTEM_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #removeCourierFromSystemFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.removeCourierFromSystemFailure({});
      const expectedAction = { type: Types.REMOVE_COURIER_FROM_SYSTEM_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendNotificationMessageRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendNotificationMessageRequest({});
      const expectedAction = { type: Types.SEND_NOTIFICATION_MESSAGE_REQUEST, id: null, title: '', message: '' };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendNotificationMessageSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendNotificationMessageSuccess({});
      const expectedAction = { type: Types.SEND_NOTIFICATION_MESSAGE_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #sendNotificationMessageFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.sendNotificationMessageFailure({});
      const expectedAction = { type: Types.SEND_NOTIFICATION_MESSAGE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setWarehouseToCourierRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setWarehouseToCourierRequest({});
      const expectedAction = {
        type: Types.SET_WAREHOUSE_TO_COURIER_REQUEST,
        courierId: null,
        warehouseId: null,
        warehouseFranchiseId: null,
        currentMarketEmployer: {},
        workStatus: null,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setWarehouseToCourierSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setWarehouseToCourierSuccess({});
      const expectedAction = {
        type: Types.SET_WAREHOUSE_TO_COURIER_SUCCESS,
        data: {},
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setWarehouseToCourierFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setWarehouseToCourierFailure({});
      const expectedAction = { type: Types.SET_WAREHOUSE_TO_COURIER_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setDomainTypeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setDomainTypeRequest({});
      const expectedAction = { type: Types.SET_DOMAIN_TYPE_REQUEST, courierId: null, domainTypes: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setDomainTypeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setDomainTypeSuccess({});
      const expectedAction = { type: Types.SET_DOMAIN_TYPE_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setDomainTypeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setDomainTypeFailure({});
      const expectedAction = { type: Types.SET_DOMAIN_TYPE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setAvailableVehicleTypesRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setAvailableVehicleTypesRequest({});
      const expectedAction = { type: Types.SET_AVAILABLE_VEHICLE_TYPES_REQUEST, courierId: null, availableVehicleTypes: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setAvailableVehicleTypesSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setAvailableVehicleTypesSuccess({});
      const expectedAction = { type: Types.SET_AVAILABLE_VEHICLE_TYPES_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setAvailableVehicleTypesFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setAvailableVehicleTypesFailure({});
      const expectedAction = { type: Types.SET_AVAILABLE_VEHICLE_TYPES_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setEmploymentTypeRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setEmploymentTypeRequest({});
      const expectedAction = { type: Types.SET_EMPLOYMENT_TYPE_REQUEST, courierId: null, employmentType: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setEmploymentTypeSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setEmploymentTypeSuccess({});
      const expectedAction = { type: Types.SET_EMPLOYMENT_TYPE_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setEmploymentTypeFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setEmploymentTypeFailure({});
      const expectedAction = { type: Types.SET_EMPLOYMENT_TYPE_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setIsLoginDisabledRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setIsLoginDisabledRequest({});
      const expectedAction = { type: Types.SET_IS_LOGIN_DISABLED_REQUEST, courierId: null, isLoginDisabled: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setIsLoginDisabledSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setIsLoginDisabledSuccess({});
      const expectedAction = { type: Types.SET_IS_LOGIN_DISABLED_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #setIsLoginDisabledFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setIsLoginDisabledFailure({});
      const expectedAction = { type: Types.SET_IS_LOGIN_DISABLED_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getOrderListRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getOrderListRequest({});
      const expectedAction = { type: Types.GET_ORDER_LIST_REQUEST, courierId: null, domainType: null, limit: 10, offset: 0 };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getOrderListSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getOrderListSuccess({});
      const expectedAction = { type: Types.GET_ORDER_LIST_SUCCESS, data: [], count: 0 };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getOrderListFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getOrderListFailure({});
      const expectedAction = { type: Types.GET_ORDER_LIST_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getStatusLogsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getStatusLogsRequest({});
      const expectedAction = { type: Types.GET_STATUS_LOGS_REQUEST, courierId: null, startDate: null, endDate: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getStatusLogsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getStatusLogsSuccess({});
      const expectedAction = { type: Types.GET_STATUS_LOGS_SUCCESS, data: [], batchData: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getStatusLogsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getStatusLogsFailure({});
      const expectedAction = { type: Types.GET_STATUS_LOGS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierTasksRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierTasksRequest({});
      const expectedAction = { type: Types.GET_COURIER_TASKS_REQUEST, courierId: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierTasksSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierTasksSuccess({});
      const expectedAction = { type: Types.GET_COURIER_TASKS_SUCCESS, data: [] };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierTasksFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierTasksFailure({});
      const expectedAction = { type: Types.GET_COURIER_TASKS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierLogsRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierLogsRequest({});
      const expectedAction = { type: Types.GET_COURIER_LOGS_REQUEST, courierId: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierLogsSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierLogsSuccess({});
      const expectedAction = { type: Types.GET_COURIER_LOGS_SUCCESS };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getCourierLogsFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getCourierLogsFailure({});
      const expectedAction = { type: Types.GET_COURIER_LOGS_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #resetCourierPasswordRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.resetCourierPasswordRequest({});
      const expectedAction = { type: Types.RESET_COURIER_PASSWORD_REQUEST, courierId: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #resetCourierPasswordSuccess', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.resetCourierPasswordSuccess({});
      const expectedAction = { type: Types.RESET_COURIER_PASSWORD_SUCCESS, data: {} };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #resetCourierPasswordFailure', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.resetCourierPasswordFailure({});
      const expectedAction = { type: Types.RESET_COURIER_PASSWORD_FAILURE, error: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
