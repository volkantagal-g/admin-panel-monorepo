import moment from 'moment-timezone';

import {
  Creators,
  defaultCurrentPage,
  Types,
  defaultRowsPerPage,
  defaultDomainType,
  defaultDates,
} from '@app/pages/MarketOrder/OrderFilter/redux/actions';

const { startDate, endDate } = defaultDates;
describe('Order filter actions', () => {
  describe('action-creator #setSelectedCity', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setSelectedCity();
      const expectedAction = { type: Types.SET_SELECTED_CITY, city: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('action-creator #setWarehouse', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.setWarehouse();
      const expectedAction = { type: Types.SET_WAREHOUSE, warehouse: null };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #getFilteredOrdersRequest', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.getFilteredOrdersRequest();
      const expectedAction = {
        type: Types.GET_FILTERED_ORDERS_REQUEST,
        domainType: null,
        offset: defaultCurrentPage,
        limit: defaultRowsPerPage,
        city: null,
        warehouse: null,
        client: null,
        statuses: null,
        errorCode: null,
        deviceTypes: null,
        createdAtStart: moment(startDate).startOf('day').toISOString(),
        createdAtEnd: moment(endDate).endOf('day').toISOString(),
        referenceId: null,
        integrationType: null,
        isFresh: null,
        excludedIntegrationTypes: null,
        initialStatusForSuccessDuration: null,
        minDuration: null,
        maxDuration: null,
        isSlottedDelivery: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #initPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.initPage();
      const expectedAction = { type: Types.INIT_PAGE, initialDomainType: defaultDomainType };
      expect(receivedAction).toEqual(expectedAction);
    });
  });

  describe('action-creator #destroyPage', () => {
    it('receivedAction should equal to expectedAction (without args)', () => {
      const receivedAction = Creators.destroyPage();
      const expectedAction = { type: Types.DESTROY_PAGE };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
});
