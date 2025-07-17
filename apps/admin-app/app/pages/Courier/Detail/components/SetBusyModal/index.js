import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';

import { Creators } from '../../redux/actions';
import { courierBusyOptionsSelector, courierOperationSelector } from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import { SelectWrapper } from '@shared/components/UI/Form';
import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';

const SetCourierBusyModal = ({ isModalVisible, setIsModalVisible, courierDetail }) => {
  const { t } = useTranslation('courierPage');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const busyOptionsData = useSelector(courierBusyOptionsSelector.getData);
  const isPending = useSelector(courierOperationSelector.getIsPending);

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: true,
    onSubmit: ({ reasonId }) => {
      dispatch(Creators.setCourierBusyRequest({ id: courierDetail._id, reason: reasonId }));
    },
  });

  const {
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  } = formik;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBusyReasonChange = reasonId => {
    setFieldValue('reasonId', reasonId);
  };

  const getFooterActions = () => {
    return [
      <Button onClick={handleCancel}>{t('button:CANCEL')}</Button>,
      <Button type="primary" form="set-courier-status-busy" htmlType="submit" disabled={isPending}>
        {t('button:SAVE')}
      </Button>,
    ];
  };

  return (
    <Modal
      title={t('SET_COURIER_STATUS_BUSY_TITLE')}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={getFooterActions()}
    >
      <Form
        form={form}
        id="set-courier-status-busy"
        onFinish={handleSubmit}
      >
        <SelectWrapper
          selectKey="reasonId"
          placeholder={t('BUSY_REASON')}
          value={values.reasonId}
          optionsData={busyOptionsData}
          optionLabelProp={`messages.${getLangKey()}`}
          optionValueProp="_id"
          onChangeCallback={handleBusyReasonChange}
          hasError={get(errors, 'reasonId')}
          isTouched={get(touched, 'reasonId')}
        />
      </Form>
    </Modal>
  );
};

export default SetCourierBusyModal;
