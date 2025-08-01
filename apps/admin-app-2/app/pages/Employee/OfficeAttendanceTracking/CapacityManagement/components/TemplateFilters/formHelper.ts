import * as Yup from 'yup';
import moment from 'moment';
import { clone } from 'lodash';

export function validationSchema() {
  return Yup.object()
    .shape({
      startDay: Yup.date().required(),
      endDay: Yup.date().required(),
      officeId: Yup.string().optional(),
      businessUnitId: Yup.string().optional(),
      departmentId: Yup.string().optional(),
    });
}

export type ValuesType = {
  startDay: moment.Moment | string;
  endDay: moment.Moment | string;
  officeId?: string;
  businessUnit?: string;
  department?: string;
};

export const initialValues: ValuesType = {
  startDay: moment().startOf('day'),
  endDay: moment().startOf('day'),
  officeId: undefined,
  businessUnit: undefined,
  department: undefined,
};

export const manipulateValuesBeforeSubmit = values => {
  const manupulatedObj = clone(values);
  delete manupulatedObj?.startDay;
  delete manupulatedObj?.endDay;
  return { ...manupulatedObj };
};
