import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.EMPLOYEE.SELECT.BUSINESS_PARTNERS;

export const getBusinessPartnersSelector = {
  getData: (state: { [x: string]: { businessPartners: { data: any; }; }; }) => state[reducerKey]?.businessPartners?.data,
  getIsPending: (state: { [x: string]: { businessPartners: { isPending: any; }; }; }) => state[reducerKey]?.businessPartners?.isPending,
};
