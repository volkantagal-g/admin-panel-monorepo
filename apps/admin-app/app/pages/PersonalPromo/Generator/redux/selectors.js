import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.PERSONAL_PROMO.GENERATOR;

export const createPersonalPromosBulkSelector = {
  getIsPending: state => state?.[reduxKey]?.createPersonalPromosBulk?.isPending,
  getData: state => state?.[reduxKey]?.createPersonalPromosBulk?.data,
};

export const getDepartmentsSelector = {
  getIsPending: state => state?.[reduxKey]?.getDepartments?.isPending,
  getData: state => state?.[reduxKey]?.getDepartments?.data,
};
