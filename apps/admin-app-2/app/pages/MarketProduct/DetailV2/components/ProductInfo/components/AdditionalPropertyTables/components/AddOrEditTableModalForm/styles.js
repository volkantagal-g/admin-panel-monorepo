import { createUseStyles } from 'react-jss';

export default createUseStyles({
  /**
   * This hides the validation error messages from an invalid form item. We need this because
   * when validation error messages are added to dom, they move their corresponding form
   * items upwards which looks bad on table cells.
   */
  noValidationErrorMessage: { '& .ant-form-item-explain': { display: 'none' } },
});
