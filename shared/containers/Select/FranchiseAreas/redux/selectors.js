import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.FRANCHISES_AREAS;

export const getFranchisesAreasSelector = {
  getData: state => state[reducerKey]?.franchisesAreas.data,
  getIsPending: state => state[reducerKey]?.franchisesAreas.isPending,
};
