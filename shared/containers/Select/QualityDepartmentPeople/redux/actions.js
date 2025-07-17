import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.QUALITY_DEPARTMENT_PEOPLE}_`;

export const { Types, Creators } = createActions({
  getQualityDepartmentPeopleRequest: { },
  getQualityDepartmentPeopleSuccess: { data: [] },
  getQualityDepartmentPeopleFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
