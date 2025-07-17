import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FRANCHISE_REQUEST.LIST}_`;

export const { Types, Creators } = createActions(
  {
    getFranchiseRequestListColumnsRequest: { formName: undefined, formType: undefined },
    getFranchiseRequestListColumnsSuccess: { data: null },
    getFranchiseRequestListColumnsFailure: { error: null },
    getFranchiseRequestListRequest: {
      startDate: undefined,
      endDate: undefined,
      limit: undefined,
      offset: undefined,
    },
    getFranchiseRequestListSuccess: { data: null, total: 0 },
    getFranchiseRequestListFailure: null,
    getFranchiseRequestEnumsRequest: { countryCode: undefined },
    getFranchiseRequestEnumsSuccess: { data: {} },
    getFranchiseRequestEnumsFailure: null,
    getFranchiseRequestListReportRequest: {
      startDate: undefined,
      endDate: undefined,
    },
    getFranchiseRequestListReportSuccess: null,
    getFranchiseRequestListReportFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
