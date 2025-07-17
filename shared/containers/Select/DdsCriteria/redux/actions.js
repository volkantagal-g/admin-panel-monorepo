import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.DDS_CRITERIA}_`;

export const { Types, Creators } = createActions({
  getDdsCriteriaRequest: {},
  getDdsCriteriaSuccess: { data: [] },
  getDdsCriteriaFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
