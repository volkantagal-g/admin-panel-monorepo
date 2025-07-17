import * as Yup from 'yup';
import moment from 'moment';

import { DEFAULT_OFFICE_SELECTION, PredefinedDateFilterIntervals } from '../../../constants';

export function validationSchema() {
  return Yup.object()
    .shape({
      startDay: Yup.date().required(),
      endDay: Yup.date().required(),
      office: Yup.string().optional(),
      businessUnit: Yup.string().optional(),
      department: Yup.string().optional(),
    });
}
export type ValuesType = {
  startDay: moment.Moment | string;
  endDay: moment.Moment | string;
  topManager?: string;
  office?: string;
  businessUnit?: string;
  department?: string[];
};

export const initialValues: ValuesType = {
  startDay: moment().startOf('day'),
  endDay: moment().startOf('day'),
  office: DEFAULT_OFFICE_SELECTION.GETIR_ISTANBUL,
  topManager: undefined,
  businessUnit: undefined,
  department: undefined,
};

export const getDateIntervalOptions = ({ t }: { t: Function; }) => {
  return Object.keys(PredefinedDateFilterIntervals).map(key => ({
    value: key,
    label: t(`officeAttendanceTracking:DATE_FILTER_INTERVALS.${key}`) as string,
  }));
};

export const manipulateValuesBeforeSubmit = (values: ValuesType): ValuesType => {
  return {
    ...values,
    startDay: moment.utc(moment(values.startDay).format('YYYY-MM-DD')).startOf('day').toISOString(),
    endDay: moment.utc(moment(values.endDay).format('YYYY-MM-DD')).startOf('day').toISOString(),
    // @ts-ignore
    topManager: values.topManager?.value,
  };
};
