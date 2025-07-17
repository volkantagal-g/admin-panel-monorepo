import reducer, { INITIAL_STATE } from '@app/pages/Courier/Detail/redux/reducer';
import { Types } from '@app/pages/Courier/Detail/redux/actions';
import { getOrderListMock, courierStatusLogsMock } from '@shared/api/courier/index.mock.data';
import { courierDetailMock } from '@shared/api/courierHandler/index.mock.data';

describe('Courier/List', () => {
  it('should equal to initial state without args', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('reducer GET_COURIER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_REQUEST });
      const expectedState = { courier: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer(
        {},
        { type: Types.GET_COURIER_SUCCESS, data: courierDetailMock },
      );
      const expectedState = { courier: { isPending: false, data: courierDetailMock } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_FAILURE, error: 'error' });
      const expectedState = { courier: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RELEASE_COURIER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RELEASE_COURIER_REQUEST });
      const expectedState = { releaseCourier: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RELEASE_COURIER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RELEASE_COURIER_SUCCESS });
      const expectedState = { releaseCourier: { isPending: false, isSuccess: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RELEASE_COURIER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RELEASE_COURIER_FAILURE });
      const expectedState = { releaseCourier: { isPending: false, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_BUSY_OPTIONS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_BUSY_OPTIONS_REQUEST });
      const expectedState = { courierBusyOptions: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_BUSY_OPTIONS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const mockData = ['1', '2', '3'];
      const receivedState = reducer({}, { type: Types.GET_COURIER_BUSY_OPTIONS_SUCCESS, data: mockData });
      const expectedState = { courierBusyOptions: { isPending: false, data: mockData } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_BUSY_OPTIONS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_BUSY_OPTIONS_FAILURE, error: 'error' });
      const expectedState = { courierBusyOptions: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_FREE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_FREE_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_FREE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_FREE_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_FREE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_FREE_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_BUSY_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_BUSY_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_BUSY_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_BUSY_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_BUSY_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_BUSY_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_ACTIVATE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_ACTIVATE_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_ACTIVATE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_ACTIVATE_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_ACTIVATE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_ACTIVATE_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_DEACTIVATE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_DEACTIVATE_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_DEACTIVATE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_DEACTIVATE_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_COURIER_DEACTIVATE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_COURIER_DEACTIVATE_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RESTART_COURIER_MDU_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RESTART_COURIER_MDU_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RESTART_COURIER_MDU_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RESTART_COURIER_MDU_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RESTART_COURIER_MDU_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RESTART_COURIER_MDU_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_PULL_APPS_NOTIFICATION_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_PULL_APPS_NOTIFICATION_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_PULL_APPS_NOTIFICATION_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_PULL_APPS_NOTIFICATION_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_PULL_APPS_NOTIFICATION_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_PULL_APPS_NOTIFICATION_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_CHECK_SERVICES_NOTIFICATION_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_CHECK_SERVICES_NOTIFICATION_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_CHECK_SERVICES_NOTIFICATION_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_PULL_APPS_NOTIFICATION_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_CHECK_SERVICES_NOTIFICATION_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_CHECK_SERVICES_NOTIFICATION_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_START_SERVICES_NOTIFICATION_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_START_SERVICES_NOTIFICATION_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_START_SERVICES_NOTIFICATION_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_START_SERVICES_NOTIFICATION_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_START_SERVICES_NOTIFICATION_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_START_SERVICES_NOTIFICATION_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer REMOVE_COURIER_FROM_SYSTEM_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.REMOVE_COURIER_FROM_SYSTEM_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer REMOVE_COURIER_FROM_SYSTEM_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.REMOVE_COURIER_FROM_SYSTEM_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer REMOVE_COURIER_FROM_SYSTEM_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.REMOVE_COURIER_FROM_SYSTEM_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_NOTIFICATION_MESSAGE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_NOTIFICATION_MESSAGE_REQUEST });
      const expectedState = { courierOperation: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_NOTIFICATION_MESSAGE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_NOTIFICATION_MESSAGE_SUCCESS });
      const expectedState = { courierOperation: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SEND_NOTIFICATION_MESSAGE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SEND_NOTIFICATION_MESSAGE_FAILURE, error: 'error' });
      const expectedState = { courierOperation: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_WAREHOUSE_TO_COURIER_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_WAREHOUSE_TO_COURIER_REQUEST, error: 'error' });
      const expectedState = { setWarehouseToCourier: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_WAREHOUSE_TO_COURIER_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const mockWarehouse = {
        _id: '5dfa85fa37a8930308268ccb',
        location: {
          type: 'Point',
          coordinates: [28.980773925781232, 41.043682811777735],
          acc: -1,
          time: '2020-03-29T20:56:57.690Z',
        },
        domainTypes: [1],
        pickers: [],
        couriers: ['61d576abb8225d9ca48e36b8', '61d578c24a90159d5ecf2e33'],
        state: 200,
        status: 100,
        aggressionLevel: 1,
        name: 'test',
        shortName: 'test',
        warehouseType: 10,
        country: {
          _id: '55999ad00000010000000000',
          name: {
            de: 'Türkei',
            en: 'Turkey',
            fr: 'Turquie',
            nl: 'Turkije',
            tr: 'Türkiye',
            es: 'Turquía',
            it: 'Turchia',
            pt: 'Turquia',
            'en-US': 'Turkey',
          },
          center: {
            type: 'Point',
            coordinates: [35, 39],
            acc: -1,
            time: '2019-12-13T21:00:00.000Z',
          },
          code: {
            alpha2: 'TR',
            alpha3: 'TUR',
            numeric: 792,
          },
          currency: {
            code: {
              alpha: 'TRY',
              numeric: 949,
            },
            symbol: '₺',
            isSymbolFirst: true,
          },
          dialingCode: 90,
          timezones: [{ timezone: 'Europe/Istanbul' }],
          flag: '🇹🇷',
          defaultLanguageCode: 'tr',
          languageSortOrder: ['tr', 'en'],
          languages: {
            tr: { name: 'Türkçe' },
            en: { name: 'English' },
          },
        },
        city: {
          _id: '55999ad00000010001000000',
          country: '55999ad00000010000000000',
          name: {
            en: 'Istanbul',
            tr: 'İstanbul',
          },
          center: {
            type: 'Point',
            coordinates: [29, 41],
            acc: -1,
            time: '2019-12-13T21:00:00.000Z',
            zoomRatio: 11,
          },
          timezone: 'Europe/Istanbul',
          plate: '34',
        },
        region: {
          _id: '55999ad00000010001000002',
          country: '55999ad00000010000000000',
          city: '55999ad00000010001000000',
          name: {
            tr: 'Bakırköy',
            en: 'Bakirkoy',
          },
          oldCode: 1300,
        },
        address: 'test',
        mainStore: '5ab8a4536952590004c00053',
        franchise: '602f8fbc39501108c775b34e',
        createdAt: '2020-03-29T20:56:57.698Z',
        updatedAt: '2022-07-19T11:09:11.094Z',
        vehicleTypeWorkingHours: [
          {
            vehicleTypes: [100, 200, 300],
            startMin: 0,
            endMin: 120,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 420,
            endMin: 1440,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 1440,
            endMin: 1560,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 1860,
            endMin: 2880,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 2880,
            endMin: 3000,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 3300,
            endMin: 4320,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 4320,
            endMin: 4440,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 4740,
            endMin: 5760,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 5760,
            endMin: 5880,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 6180,
            endMin: 7200,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 7200,
            endMin: 7320,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 7620,
            endMin: 8640,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 8640,
            endMin: 8760,
          },
          {
            vehicleTypes: [100, 200, 300],
            startMin: 9060,
            endMin: 10080,
          },
          {
            vehicleTypes: [400, 500, 600, 700],
            startMin: 0,
            endMin: 10080,
          },
        ],
        warehouseGLN: 1000000000074,
        baseWorkingHourType: 1,
        countryCode: 'TR',
        mainWarehouses: ['5ab8a4536952590004c00053'],
        customAggressionLevel: 0,
        id: '5dfa85fa37a8930308268ccb',
      };
      const receivedState = reducer({}, { type: Types.SET_WAREHOUSE_TO_COURIER_SUCCESS, data: mockWarehouse });
      const expectedState = { setWarehouseToCourier: { isPending: false, isSuccess: true, data: mockWarehouse } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_WAREHOUSE_TO_COURIER_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_WAREHOUSE_TO_COURIER_FAILURE, error: 'error' });
      const expectedState = { setWarehouseToCourier: { isPending: false, isSuccess: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_DOMAIN_TYPE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_DOMAIN_TYPE_REQUEST });
      const expectedState = { setDomainType: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_DOMAIN_TYPE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_DOMAIN_TYPE_SUCCESS });
      const expectedState = { setDomainType: { isPending: false, isSuccess: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_DOMAIN_TYPE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_DOMAIN_TYPE_FAILURE, error: 'error' });
      const expectedState = { setDomainType: { isPending: false, isSuccess: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_AVAILABLE_VEHICLE_TYPES_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_AVAILABLE_VEHICLE_TYPES_REQUEST });
      const expectedState = { setAvailableVehicleTypes: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_AVAILABLE_VEHICLE_TYPES_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_AVAILABLE_VEHICLE_TYPES_SUCCESS });
      const expectedState = { setAvailableVehicleTypes: { isPending: false, isSuccess: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_AVAILABLE_VEHICLE_TYPES_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_AVAILABLE_VEHICLE_TYPES_FAILURE, error: 'error' });
      const expectedState = { setAvailableVehicleTypes: { isPending: false, isSuccess: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_EMPLOYMENT_TYPE_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_EMPLOYMENT_TYPE_REQUEST });
      const expectedState = { setEmploymentType: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_EMPLOYMENT_TYPE_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_EMPLOYMENT_TYPE_SUCCESS });
      const expectedState = { setEmploymentType: { isPending: false, isSuccess: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_EMPLOYMENT_TYPE_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_EMPLOYMENT_TYPE_FAILURE, error: 'error' });
      const expectedState = { setEmploymentType: { isPending: false, isSuccess: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_IS_LOGIN_DISABLED_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_IS_LOGIN_DISABLED_REQUEST });
      const expectedState = { setIsLoginDisabled: { isPending: true, isSuccess: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_IS_LOGIN_DISABLED_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_IS_LOGIN_DISABLED_SUCCESS });
      const expectedState = { setIsLoginDisabled: { isPending: false, isSuccess: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer SET_IS_LOGIN_DISABLED_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.SET_IS_LOGIN_DISABLED_FAILURE, error: 'error' });
      const expectedState = { setIsLoginDisabled: { isPending: false, isSuccess: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_LIST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ORDER_LIST_REQUEST });
      const expectedState = { orderList: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_LIST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ORDER_LIST_SUCCESS, data: getOrderListMock });
      const expectedState = { orderList: { isPending: false, data: getOrderListMock } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_ORDER_LIST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_ORDER_LIST_FAILURE, error: 'error' });
      const expectedState = { orderList: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_STATUS_LOGS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_STATUS_LOGS_REQUEST });
      const expectedState = { statusLogs: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_STATUS_LOGS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_STATUS_LOGS_SUCCESS, data: courierStatusLogsMock });
      const expectedState = { statusLogs: { isPending: false, data: courierStatusLogsMock } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_STATUS_LOGS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_STATUS_LOGS_FAILURE, error: 'error' });
      const expectedState = { statusLogs: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_TASKS_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_TASKS_REQUEST });
      const expectedState = { courierTasks: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_TASKS_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const mockData = ['Task1', 'Task2', 'Task3'];
      const receivedState = reducer({}, { type: Types.GET_COURIER_TASKS_SUCCESS, data: mockData });
      const expectedState = { courierTasks: { isPending: false, data: mockData } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_TASKS_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_TASKS_FAILURE, error: 'error' });
      const expectedState = { courierTasks: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_LOGS_REQUEST_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_LOGS_REQUEST });
      const expectedState = { getCourierLogs: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_LOGS_REQUEST_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_LOGS_SUCCESS });
      const expectedState = { getCourierLogs: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer GET_COURIER_LOGS_REQUEST_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.GET_COURIER_LOGS_FAILURE, error: 'error' });
      const expectedState = { getCourierLogs: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RESET_COURIER_PASSWORD_REQUEST', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RESET_COURIER_PASSWORD_REQUEST });
      const expectedState = { resetCourierPassword: { isPending: true } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RESET_COURIER_PASSWORD_SUCCESS', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RESET_COURIER_PASSWORD_SUCCESS });
      const expectedState = { resetCourierPassword: { isPending: false } };
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('reducer RESET_COURIER_PASSWORD_FAILURE', () => {
    it('receivedState should equal to expectedState', () => {
      const receivedState = reducer({}, { type: Types.RESET_COURIER_PASSWORD_FAILURE, error: 'error' });
      const expectedState = { resetCourierPassword: { isPending: false, error: 'error' } };
      expect(receivedState).toEqual(expectedState);
    });
  });
});
