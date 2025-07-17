import moment from 'moment';
import * as Yup from 'yup';

import {
  MAX_FILE_COUNT,
  DATA_TTP_TYPE,
  OPTIMAL_TTP_TYPE,
  PLAN_TYPES,
} from '@app/pages/CourierPlan/constants';

const now = moment();

export const defaultValues = {
  ttpRefStartDate: [now, now],
  maxTtp: 0,
  minTtp: 0,
  expandFactor: 1,
  buffer1: 1,
  buffer2: 1,
  useSameAllDay: false,
  ttpType: DATA_TTP_TYPE,
  fileList: [],
  finalFileList: [],
  planType: PLAN_TYPES[0],
};

export const validationSchema = () => Yup.object().shape({
  ttpRefStartDate: Yup.array().required(),
  maxTtp: Yup.number().when('ttpType', {
    is: DATA_TTP_TYPE,
    then: Yup.number().required(),
  }),
  minTtp: Yup.number().when('ttpType', {
    is: DATA_TTP_TYPE,
    then: Yup.number().required(),
  }),
  planType: Yup.number().when('ttpType', {
    is: OPTIMAL_TTP_TYPE,
    then: Yup.number().required(),
  }),
  expandFactor: Yup.number().required(),
  useSameAllDay: Yup.boolean(),
  ttpType: Yup.number(),
  fileList: Yup.array().max(MAX_FILE_COUNT),
  finalFileList: Yup.array().max(MAX_FILE_COUNT),
});
