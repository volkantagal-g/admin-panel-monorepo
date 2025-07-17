import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CUSTOMER_AGREEMENT;

export const documentTypeSelector = {
  getData: state => state[reducerKey]?.documentTypes?.data,
  getSelected: state => state[reducerKey]?.documentTypes?.selected,
  getIsPending: state => state[reducerKey]?.documentTypes?.isPending,
};

export const latestAgreementSelector = {
  getData: state => state[reducerKey]?.latestAgreement?.data,
  getIsPending: state => state[reducerKey]?.latestAgreement?.isPending,
};

export const agreementForcedSelector = { getIsPending: state => state[reducerKey]?.agreementForced?.isPending };

export const previousAgreementsSelector = {
  getData: state => state[reducerKey]?.previousAgreements?.data,
  getPagination: state => state[reducerKey]?.previousAgreements?.pagination,
  getIsPending: state => state[reducerKey]?.previousAgreements?.isPending,
};

export const uploadAgreementsSelector = {
  getData: state => state[reducerKey]?.uploadAgreements?.data,
  getFiles: state => state[reducerKey]?.uploadAgreements?.files,
  getIsPending: state => state[reducerKey]?.uploadAgreements?.isPending,
};
