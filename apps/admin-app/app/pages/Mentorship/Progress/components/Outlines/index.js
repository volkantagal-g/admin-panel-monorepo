import { useMemo, useState } from 'react';
import { Form } from 'antd';
import { get } from 'lodash';
import { useFormik } from 'formik';
import { EditFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { EditSaveCancelButtons, TextEditor } from '@shared/components/GUI';
import { canSubmit } from '@shared/utils/formHelper';
import { getInitialValues } from './formHelper';
import Card from '../Card';
import useStyles from './styles';

const Outlines = ({ data, onSubmit, isPending, disabled }) => {
  const classes = useStyles();
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialValues = useMemo(() => getInitialValues(data), [data]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      onSubmit(values);
      setIsFormEditable(false);
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleAddOrEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  return (
    <Card title={t('OUTLINES')}>
      <Form form={form} id="mentorship-progress-outlines" onFinish={handleSubmit} layout="vertical">
        <TextEditor
          name="outlines"
          className={classes.textEditor}
          value={get(values, 'outlines')}
          onChange={value => {
            setFieldValue('outlines', value);
          }}
          disabled={!isFormEditable || disabled}
          errors={errors}
        />

        {!disabled && (
        <EditSaveCancelButtons
          editButtonProps={{
            size: 'small',
            color: 'secondary',
            className: 'w-100',
            icon: <EditFilled />,
          }}
          containerClassName={null}
          disabled={!canBeSubmittable}
          form="mentorship-progress-outlines"
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isPending}
          onCancelClick={handleCancelClick}
          onEditClick={handleAddOrEditClick}
        />
        )}
      </Form>
    </Card>
  );
};

export default Outlines;
