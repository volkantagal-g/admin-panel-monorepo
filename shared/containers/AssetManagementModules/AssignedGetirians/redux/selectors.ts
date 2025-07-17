import moment from 'moment';

import { REDUX_KEY } from '@shared/shared/constants';
import { POSITION_LEVELS } from '@app/pages/Employee/constants.ts';

const reducerKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.ASSIGNED_GETIRIANS;

export const assigneesSelector = {
  getData: (state: any) => state[reducerKey]?.assignees?.data?.map((data: any) => {
    return {
      ...data,
      estimatedReturnDate: data?.estimatedReturnDate ? moment(data.estimatedReturnDate) : undefined,
      assignDate: data?.assignDate ? moment(data.assignDate) : undefined,
      createdAt: data?.createdAt ? moment(data.createdAt) : undefined,
      employee: {
        ...data.employee,
        positionLevel: Object.values(POSITION_LEVELS)?.includes(data.employee?.positionLevel) ? data.employee?.positionLevel : undefined,
        personalGSMText: (data.employee?.personalGSM?.dialCode && data.employee?.personalGSM?.number)
          ? `(${data.employee?.personalGSM?.dialCode}) ${data.employee?.personalGSM?.number}`
          : undefined,
      },
    };
  }),
  getIsPending: (state: any) => state[reducerKey]?.assignees.isPending,
};

export const updateAssetHistorySelector = { getIsPending: (state: any) => state[reducerKey]?.updateAssetHistory.isPending };
