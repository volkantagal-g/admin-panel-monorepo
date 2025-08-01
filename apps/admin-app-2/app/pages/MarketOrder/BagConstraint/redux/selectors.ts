import { REDUX_KEY } from '@shared/shared/constants';
import { ReducerAPIState } from '@shared/types/reducerAPIState';

const reducerKey = REDUX_KEY.BAG_CONSTRAINTS;

type State = {
  [key: string]: ReducerAPIState;
};

export const bagConstraintsSelector = {
  getData: (state: State) => state[reducerKey]?.getBagConstraints?.data,
  getIsPending: (state: State) => state[reducerKey].getBagConstraints?.isPending,
};

export const bagConstraintSelector = {
  getData: (state: State) => state[reducerKey]?.getBagConstraint?.data,
  getCreateIsPending: (state: State) => state[reducerKey]?.createBagConstraint?.isPending,
  getUpdateIsPending: (state: State) => state[reducerKey]?.updateBagConstraint?.isPending,
};

export const masterCategoriesSelector = {
  getData: (state: State) => state[reducerKey]?.getMasterCategories?.data,
  getIsPending: (state: State) => state[reducerKey]?.getMasterCategories?.isPending,
};
