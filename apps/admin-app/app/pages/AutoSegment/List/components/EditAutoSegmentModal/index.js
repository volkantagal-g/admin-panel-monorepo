import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { autoSegmentTemplateSelector } from '../../redux/selectors';
import SegmentStatusSelect from '../SegmentStatusSelect';
import VersionTable from '../VersionTable';

function EditAutoSegmentModal(props) {
  const { autoSegment, isEditAutoSegmentModalVisible, setIsEditAutoSegmentModalVisible } = props;
  const { t } = useTranslation('autoSegmentListPage');
  const dispatch = useDispatch();

  const autoSegmentTemplate = useSelector(autoSegmentTemplateSelector.getData);
  const isAutoSegmentTemplatePending = useSelector(autoSegmentTemplateSelector.getIsPending);

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(autoSegmentTemplate),
    validate: validate(validationSchema),
    onSubmit: values => {
      const {
        status,
        description,
        interval,
        intervalType,
        clientList,
      } = values;
      dispatch(Creators.updateAutoSegmentRequest({
        id: autoSegmentTemplate._id,
        updateData: {
          status,
          description,
          interval,
          intervalType,
          clientList,
        },
      }));
      handleOnCancel();
    },
  });

  const { handleSubmit, errors, values, setFieldValue } = formik;

  useEffect(() => {
    if (autoSegment?._id) {
      dispatch(Creators.getAutoSegmentTemplateRequest({ id: autoSegment._id }));
    }
  }, [dispatch, autoSegment]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  return (
    <Modal
      title={t('EDIT_AUTO_SEGMENT_MODAL_TITLE')}
      visible={isEditAutoSegmentModalVisible}
      onOk={handleSubmit}
      onCancel={handleOnCancel}
    >
      <Form
        form={form}
        id="edit-auto-segment"
        onFinish={handleSubmit}
        layout="vertical"
        disabled={isAutoSegmentTemplatePending}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="segment"
              label={t('SEGMENT')}
            >
              <Input value={values.segment} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="name"
              label={t('SEGMENT_NAME')}
            >
              <Input value={values.name} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="type"
              label={t('SEGMENT_TYPE')}
            >
              <SegmentTypeSelect value={values.type} isDisabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={get(errors, 'status')}
              validateStatus={get(errors, 'status') ? 'error' : 'success'}
              name="status"
              label={t('STATUS')}
            >
              <SegmentStatusSelect
                value={values.status}
                onChange={segmentStatus => setFieldValue('status', segmentStatus)}
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
              name="clientCount"
              label={t('CLIENT_COUNT')}
            >
              <Input value={values.clientCount} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="lastCalculationDate"
              label={t('LAST_CALCULATION_DATE')}
            >
              <Input value={values.lastCalculationDate} disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="createdAt"
              label={t('CREATED_AT')}
            >
              <Input value={values.createdAt} disabled />
            </Form.Item>
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
              name="versionInfo"
              label={t('VERSION_INFO')}
            >
              <VersionTable
                data={values.actions}
                activeVersion={values.version}
                handleOnActivateClick={handleOnActivateClick}
              />
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
                initialValue={autoSegmentTemplate?.clientList}
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
    setIsEditAutoSegmentModalVisible();
  }

  function handleOnActivateClick(selectedVersion) {
    if (selectedVersion?.clientList?._id) {
      dispatch(Creators.activateAutoSegmentTemplateVersionRequest({
        id: autoSegmentTemplate._id,
        updateData: { clientList: selectedVersion.clientList._id },
      }));
      handleOnCancel();
    }
  }
}

export default EditAutoSegmentModal;
