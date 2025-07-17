import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Input, Typography, Select } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import RequiredMark from '@app/pages/Fleet/TMS/sharedComponents/RequiredMark';
import { tmsVehicleSelector } from '../../redux/selectors';
import FormActions from '../FormActions';
import VehicleDocuments from '../VehicleDocuments';
import { formValidationRules, activenessSelectOptions } from './helpers';
import { ROUTE } from '@app/routes';

const DetailForm = ({ onFormSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation('tmsPage');
  const navigate = useNavigate();

  const vehicle = useSelector(tmsVehicleSelector.getData);

  const handleFormReset = () => {
    form.resetFields();
    setIsEditing(false);
    navigate(ROUTE.TMS_LIST.path);
  };

  const initialValues = useMemo(() => {
    return {
      ...vehicle,
      vehicleDocuments: vehicle?.vehicleDocuments?.map(doc => {
        return {
          ...doc,
          startDate: moment(doc.startDate),
          endDate: moment(doc.endDate),
        };
      }),
    };
  }, [vehicle]);

  useEffect(() => {
    const section = document.getElementsByTagName('section')[1];
    section.style.overflowX = 'hidden';

    return () => {
      section.style = {};
    };
  }, []);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleFormSubmission = values => {
    onFormSubmit(values);
    setIsEditing(false);
  };

  return (
    <Form
      className="w-100"
      scrollToFirstError
      form={form}
      name="editTmsVehicleForm"
      onReset={handleFormReset}
      onFinish={handleFormSubmission}
      initialValues={initialValues}
      labelCol={{ flex: '120px' }}
      labelAlign="left"
    >
      <AntCard
        title={t('global:PAGE_TITLE.FLEET.TMS.DETAIL')}
        footer={
          <FormActions isEditing={isEditing} setIsEditing={setIsEditing} />
        }
        className="p-2"
      >
        {vehicle && (
          <>
            <Row gutter={[24]}>
              <Col xs={12}>
                <RequiredMark />
                <Typography.Text>{t('tmsPage:VEHICLE_ID')}</Typography.Text>
                <Form.Item name="_id">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <RequiredMark />
                <Typography.Text>{t('tmsPage:DINCER_ID')}</Typography.Text>
                <Form.Item name="dincerId">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <RequiredMark />
                <Typography.Text>{t('tmsPage:VEHICLE_TYPE')}</Typography.Text>
                <Form.Item name="type">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <RequiredMark />
                <Typography.Text>{t('tmsPage:PLATE')}</Typography.Text>
                <Form.Item name="plate">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Typography.Text>{t('tmsPage:VEHICLE_CLASS')}</Typography.Text>
                <Form.Item name="vehicleClass">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Typography.Text>{t('tmsPage:BRAND')}</Typography.Text>
                <Form.Item name="brand">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Typography.Text>{t('tmsPage:MODEL_YEAR')}</Typography.Text>
                <Form.Item name="modelYear">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <RequiredMark />
                <Typography.Text>{t('tmsPage:ACTIVENESS')}</Typography.Text>
                <Form.Item name="active" rules={formValidationRules.required}>
                  <Select
                    disabled={!isEditing}
                    options={activenessSelectOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <RequiredMark />
                <Typography.Text>
                  {t('tmsPage:VOLUME_CAPACITY')}
                </Typography.Text>
                <Form.Item
                  name="volumeCapacity"
                  rules={formValidationRules.required}
                >
                  <Input type="number" min={0} disabled={!isEditing} />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <RequiredMark />
                <Typography.Text>
                  {t('tmsPage:PALLET_CAPACITY')}
                </Typography.Text>
                <Form.Item
                  name="palletCapacity"
                  rules={formValidationRules.required}
                >
                  <Input type="number" min={0} disabled={!isEditing} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[12, 6]}>
              <VehicleDocuments isEditing={isEditing} />
            </Row>
          </>
        )}
      </AntCard>
    </Form>
  );
};

export default DetailForm;
