import { useEffect, useCallback, useState } from 'react';
import { Modal, Button, Popconfirm, Row, Col, Form, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { DatePickerWrapper, InputWrapper } from '@shared/components/UI/Form';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { validate } from '@shared/yup';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { AntFileUploadField } from '@app/pages/MarketFranchise/Detail/components/CrisesManagement/components/Upload';
import { crisisCardSelector } from '@app/pages/MarketFranchise/Detail/redux/selectors';
import { addThumbUrlToFiles } from '@app/pages/MarketFranchise/Detail/components/CrisesManagement/utils';
import { Creators } from '@app/pages/MarketFranchise/Detail/redux/actions';
import SelectCrisisTopic from '@shared/containers/Select/CrisisTopic';
import { defaultValues, validationSchema } from './formHelper';
import useStyles from './styles';

const { Text } = Typography;
const { Item, useForm } = Form;

const UpdateCardModal = ({
  isVisible,
  onClose,
  isPending,
  cardId,
}) => {
  const { t } = useTranslation('marketFranchisePage');
  const [form] = useForm();
  const dispatch = useDispatch();
  const { Can } = usePermission();
  const classes = useStyles();

  const isSuccess = useSelector(crisisCardSelector.getIsSuccess);
  const modalPending = useSelector(crisisCardSelector.getIsPending);
  const cardData = useSelector(crisisCardSelector.getData);

  const [formValues, setFormValues] = useState(defaultValues);

  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.updateCrisisCardRequest({ requestBody: { ...values, _id: cardId } }));
    },
  });

  const { handleSubmit, values, touched, errors, setFieldValue, resetForm, setValues, dirty } = formik;

  const handleClose = useCallback(() => {
    onClose();
    resetForm();
    form.resetFields();
  }, [onClose, form, resetForm]);

  useEffect(() => {
    if (cardId) {
      dispatch(Creators.getCrisisCardRequest({ cardId }));
    }
  }, [cardId, dispatch]);

  useEffect(() => {
    const { files = [], topicId, notes, date, fullName } = cardData;
    const formattedDate = date ? moment(date) : '';
    const formattedFileList = addThumbUrlToFiles(files);
    form.setFieldsValue({ date: formattedDate, files: formattedFileList, notes, fullName, topicId });
    setFormValues({ files: formattedFileList, notes, date: formattedDate, topicId });
  }, [cardData, form, setValues]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  return (
    <Modal
      key="updateCrisisCardModal"
      visible={isVisible}
      title={t('EDIT_CARD')}
      footer={[
        <Button key="back" onClick={handleClose}>
          {t('CANCEL')}
        </Button>,
        <Can key="PAGE_MARKET_FRANCHISE_DETAIL_UPDATE_CRISIS_CARD_MODAL" permKey={permKey.PAGE_MARKET_FRANCHISE_DETAIL_UPDATE_CRISIS_CARD_MODAL}>
          <Popconfirm
            title={t('COMMON_CONFIRM_TEXT')}
            okText={t('OK')}
            cancelText={t('CANCEL')}
            onConfirm={() => handleSubmit()}
            onCancel={handleClose}
            disabled={isPending || modalPending || !dirty}
            key="submit"
          >
            <Button
              type="submit"
              disabled={isPending || modalPending || !dirty}
              loading={isPending || modalPending}
              className={classes.okButton}
            >
              {t('OK')}
            </Button>
          </Popconfirm>
        </Can>,
      ]}
      onCancel={handleClose}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={24} xs={24}>
            <DatePickerWrapper
              selectKey="date"
              label={t('DATE')}
              disabled
              format="DD/MM/YYYY"
              value={values?.date}
            />
          </Col>
          <Col lg={24} xs={24}>
            <InputWrapper
              inputKey="fullName"
              label={t('USER')}
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
              <AntTextArea
                value={values?.notes}
                onChange={e => setFieldValue('notes', e.target.value)}
                disabled={isPending}
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

export default UpdateCardModal;
