import { useCallback, useEffect } from 'react';
import { Modal, Button, Popconfirm, Row, Col, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import { validate } from '@shared/yup';
import { getUser } from '@shared/redux/selectors/auth';
import { crisisCardSelector } from '@app/pages/MarketFranchise/Detail/redux/selectors';
import { Creators } from '@app/pages/MarketFranchise/Detail/redux/actions';
import { DatePickerWrapper, InputWrapper } from '@shared/components/UI/Form';
import SelectCrisisTopic from '@shared/containers/Select/CrisisTopic';
import { defaultValues, validationSchema } from './formHelper';
import { AntFileUploadField } from '../Upload/index';

const { TextArea } = Input;
const { Text } = Typography;
const { Item } = Form;

const NewCardModal = ({
  isVisible,
  onClose,
  isPending,
}) => {
  const { t } = useTranslation('marketFranchisePage');
  const dispatch = useDispatch();
  const user = getUser();

  const isSuccess = useSelector(crisisCardSelector.getIsSuccess);
  const modalPending = useSelector(crisisCardSelector.getIsPending);

  const { id } = useParams();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.createNewCrisisCardRequest({ requestBody: { ...values, franchiseId: id } }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, resetForm } = formik;

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
    dispatch(Creators.createNewCrisisCardModalClose());
  }, [onClose, resetForm, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  return (
    <Modal
      visible={isVisible}
      title={t('NEW_CARD_CREATION')}
      footer={[
        <Button key="back" onClick={handleClose}>
          {t('CANCEL')}
        </Button>,
        <Popconfirm
          title={t('COMMON_CONFIRM_TEXT')}
          okText={t('OK')}
          cancelText={t('CANCEL')}
          onConfirm={() => handleSubmit()}
          onCancel={handleClose}
          key="submit"
        >
          <Button
            type="submit"
            disabled={isPending || modalPending}
            loading={isPending || modalPending}
          >
            {t('OK')}
          </Button>
        </Popconfirm>,
      ]}
      onCancel={handleClose}
      destroyOnClose
    >
      <Form>
        <Row gutter={[16, 16]}>
          <Col lg={24} xs={24}>
            <Text>{t('DATE')}</Text>
            <DatePickerWrapper
              selectKey="date"
              value={values?.date}
              hasError={errors.date}
              isTouched={touched.date}
              onChangeCallback={value => setFieldValue('date', value)}
              format="DD/MM/YYYY"
              disabled={isPending || modalPending}
            />
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('USER')}</Text>
            <InputWrapper
              value={user.name}
              disabled
            />
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('TOPIC')}</Text>
            <Item
              help={touched.topicId && errors.topicId}
              validateStatus={touched.topicId && errors.topicId ? 'error' : 'success'}
            >
              <SelectCrisisTopic
                value={values?.topicId}
                onChange={value => setFieldValue('topicId', value)}
                allowClear={false}
                disabled={isPending || modalPending}
              />
            </Item>
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('NOTES')}</Text>
            <Item
              help={touched.notes && errors.notes}
              validateStatus={touched.notes && errors.notes ? 'error' : 'success'}
            >
              <TextArea
                value={values?.notes}
                onChange={e => setFieldValue('notes', e.target.value)}
                disabled={isPending || modalPending}
              />
            </Item>
          </Col>
          <Col lg={24} xs={24}>
            <Text>{t('UPLOAD')}</Text>
            <AntFileUploadField
              formik={formik}
              name="files"
              value={values?.files}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewCardModal;
