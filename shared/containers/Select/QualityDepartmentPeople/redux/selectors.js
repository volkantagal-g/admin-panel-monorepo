import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.SELECT.QUALITY_DEPARTMENT_PEOPLE;

export const getQualityDepartmentPeopleSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'qualityDepartmentPeople');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'qualityDepartmentPeople');
    return isPending;
  },
};
