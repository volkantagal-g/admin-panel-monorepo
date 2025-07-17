import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.SELECT.BUSINESS_PARTNERS}_`;

export const {
  Types,
  Creators,
} = createActions({
  getBusinessPartnersRequest: { filters: {} },
  getBusinessPartnersSuccess: { data: [] },
  getBusinessPartnersFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
