import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import get from 'lodash/get';
import { Col, Form, Input, InputNumber, Modal, Row } from 'antd';

import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { validate } from '@shared/yup';

import SegmentTypeSelect from '../SegmentTypeSelect';
import ClientListTemplateSelect from '../ClientListTemplateSelect';
import IntervalTypeSelect from '../IntervalTypeSelect';
import { getInitialValues, validationSchema } from './formHelper';
import { Creators } from '../../redux/actions';

function NewAutoSegmentModal(props) {
  const { t } = useTranslation('autoSegmentListPage');
  const dispatch = useDispatch();
  const { isNewAutoSegmentModalVisible, setIsNewAutoSegmentModalVisible } = props;

  const [form] = Form.useForm();

  const formik = useFormik({
    initialValues: getInitialValues(),
    validate: validate(validationSchema),
    onSubmit: values => {
      const payload = { ...values };
      dispatch(Creators.createAutoSegmentRequest({ payload }));
      handleOnCancel();
    },
  });

  const { handleSubmit, handleChange, errors, values, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <Modal
      title={t('NEW_AUTO_SEGMENT_MODAL_TITLE')}
      visible={isNewAutoSegmentModalVisible}
      onOk={handleSubmit}
      onCancel={handleOnCancel}
    >
      <Form
        form={form}
        id="new-auto-segment"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'name')}
              validateStatus={get(errors, 'name') ? 'error' : 'success'}
              name="name"
              label={t('SEGMENT_NAME')}
            >
              <Input value={values.name} onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'type')}
              validateStatus={get(errors, 'type') ? 'error' : 'success'}
              name="type"
              label={t('SEGMENT_TYPE')}
            >
              <SegmentTypeSelect
                value={values.type}
                onChange={segmentType => setFieldValue('type', segmentType)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <MultiLanguageInput
              label={t('DESCRIPTION')}
              fieldPath={['description']}
              formik={formik}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'interval')}
              validateStatus={get(errors, 'interval') ? 'error' : 'success'}
              name="interval"
              label={t('INTERVAL')}
            >
              <div className="d-flex">
                <InputNumber
                  value={values.interval}
                  min={0}
                  onChange={interval => setFieldValue('interval', interval)}
                />
                <IntervalTypeSelect
                  value={values.intervalType}
                  onChange={intervalType => setFieldValue('intervalType', intervalType)}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'clientList')}
              validateStatus={get(errors, 'clientList') ? 'error' : 'success'}
              name="clientList"
              label={t('CLIENT_LIST_TEMPLATE')}
            >
              <ClientListTemplateSelect
                value={values.clientList}
                onChange={clientList => setFieldValue('clientList', clientList)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );

  function handleOnCancel() {
    formik.resetForm();
    form.resetFields();
    setIsNewAutoSegmentModalVisible();
  }
}

export default NewAutoSegmentModal;
