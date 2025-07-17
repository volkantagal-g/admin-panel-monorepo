import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  init: {},
  getPlanogramSizeListRequest: {},
  getPlanogramSizeListSuccess: { data: [] },
  getPlanogramSizeListFailure: { error: null },
  getPlanogramDemographyListRequest: {},
  getPlanogramDemographyListSuccess: { data: [] },
  getPlanogramDemographyListFailure: { error: null },
}, { prefix: `${REDUX_KEY.PLANOGRAM.PLANOGRAM_COMMON}_` });
