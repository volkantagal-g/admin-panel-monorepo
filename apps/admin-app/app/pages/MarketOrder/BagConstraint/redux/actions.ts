import { createActions } from 'reduxsauce';

import {
  PRODUCT_MASTER_CATEGORY_LEVEL,
  REDUX_KEY,
} from '@shared/shared/constants';

const prefix = `${REDUX_KEY.BAG_CONSTRAINTS}_`;

export const { Types, Creators } = createActions(
  {
    getBagConstraintsRequest: {},
    getBagConstraintsSuccess: { data: [] as any },
    getBagConstraintsFailure: { error: null },
    setSelectedBagConstraint: { bagConstraint: {} },
    getBagExclusionsRequest: {},
    getBagExclusionsSuccess: { data: [] as any },
    getBagExclusionsFailure: { error: null },
    getMasterCategoriesRequest: { level: PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY },
    getMasterCategoriesSuccess: { data: [] as any },
    getMasterCategoriesFailure: { error: null },
    createBagConstraintRequest: {
      left: null,
      right: null,
      match: true,
      isActive: true,
      description: '',
      version: 'v2',
    },
    createBagConstraintSuccess: { data: null },
    createBagConstraintFailure: { error: null },
    updateBagConstraintRequest: {
      left: null,
      right: null,
      match: true,
      isActive: true,
      description: '',
      _id: '',
      version: 'v2',
      onSuccess: null,
    },
    updateBagConstraintSuccess: { data: null },
    updateBagConstraintFailure: { error: null },
    initPage: () => ({ type: `${prefix}INIT_PAGE` }),
    destroyPage: null,
  },
  { prefix },
);
