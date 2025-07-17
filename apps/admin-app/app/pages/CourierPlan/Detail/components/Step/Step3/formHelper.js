import moment from 'moment';
import * as Yup from 'yup';

import { defaultSchema } from '../CommonForm/formHelper';

const now = moment();

export const defaultValues = {
  fileList: [],
  finalFileList: [],
  capDateRange: [now, now],
};

export const validationSchema = Yup.object().shape({
  ...defaultSchema,
  capDateRange: Yup.array().of(Yup.date()),
});
