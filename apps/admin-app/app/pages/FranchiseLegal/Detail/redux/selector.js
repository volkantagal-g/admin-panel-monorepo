import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_LEGAL.DETAIL;

export const getFranchiseLegalDetailSelector = {
  getTableData: state => state?.[reducerKey]?.franchiseLegalAgreement?.tableData,
  getAgreementDetailData: state => state?.[reducerKey]?.franchiseLegalAgreement?.data,
  getHistoryData: state => state?.[reducerKey]?.franchiseLegalAgreement?.historyData,
  getTotal: state => state?.[reducerKey]?.franchiseLegalAgreement?.total,
  getIsPending: state => state?.[reducerKey]?.franchiseLegalAgreement?.isPending,
  getIsTableRequestPending: state => state?.[reducerKey]?.franchiseLegalAgreement?.isTableRequestPending,
  getIsHistoryTableRequestPending: state => state?.[reducerKey]?.franchiseLegalAgreement?.isHistoryTablePending,
};
