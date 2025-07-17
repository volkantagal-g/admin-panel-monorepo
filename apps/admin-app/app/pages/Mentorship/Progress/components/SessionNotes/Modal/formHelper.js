import moment from 'moment';
import * as Yup from 'yup';

export const defaultValues = { note: undefined };

export const validationSchema = () => {
  return Yup.object()
    .shape({ note: Yup.string().required() });
};

export const getInitialValues = ({ date, ...rest }) => ({
  date: moment(date),
  ...rest,
});
