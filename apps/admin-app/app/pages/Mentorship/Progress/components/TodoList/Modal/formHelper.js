import moment from 'moment';
import * as Yup from 'yup';

export const defaultValues = {
  todo: undefined,
  deadline: undefined,
  isCompleted: false,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      todo: Yup.string().required(),
      deadline: Yup.date().required(),
      isCompleted: Yup.bool(),
    });
};

export const getInitialValues = ({ deadline, completedDate, ...rest }) => ({
  deadline: moment(deadline),
  ...(completedDate ? { isCompleted: moment(completedDate).isValid() } : undefined),
  ...rest,
});
