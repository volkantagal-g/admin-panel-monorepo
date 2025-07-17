import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import RequiredMark from '@app/pages/Fleet/TMS/sharedComponents/RequiredMark';
import { activenessSelectOptions, formValidationRules } from '@app/pages/Fleet/TMS/Detail/components/DetailForm/helpers';
import VehicleDocuments from '@app/pages/Fleet/TMS/New/components/VehicleDocuments';

const CreateTmsVehicleForm = ({ onFormSubmit }) => {
  const { t } = useTranslation('tmsPage');
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(true);
  const [form] = Form.useForm();

  const initialValues = {
    plate: '',
    vehicleClass: '',
    type: '',
    brand: '',
    modelYear: '',
    active: true,
    volumeCapacity: 0,
    palletCapacity: 0,
    dincerId: '',
    vehicleDocuments: [],
  };

  const handleFormSubmission = formValues => {
    const values = {
      ...formValues,
      vehicleDocuments: formValues.vehicleDocuments.map(doc => {
        return {
          ...doc,
          startDate: doc.startDate.format(),
          endDate: doc.endDate.format(),
        };
      }),
    };

    onFormSubmit(values);
  };

  const handleCreateButtonDisableStatus = (_, allValues) => {
    const { plate, vehicleClass, type } = allValues;

    if (plate.length > 0 && vehicleClass.length > 0 && type.length > 0) setIsCreateButtonDisabled(false);
    else setIsCreateButtonDisabled(true);
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmission}
      name="createTmsVehicleForm"
      scrollToFirstError
      initialValues={initialValues}
      onValuesChange={handleCreateButtonDisableStatus}
    >
      <AntCard
        title={t('global:PAGE_TITLE.FLEET.TMS.NEW')}
        className="p-2"
        footer={(
          <Button
            htmlType="submit"
            type="primary"
            disabled={isCreateButtonDisabled}
          >{t('global:CREATE')}
          </Button>
        )}
      >
        <Row gutter={24}>
          <Col xs={12}>
            <RequiredMark />
            <Typography.Text>{t('tmsPage:PLATE')}</Typography.Text>
            <Form.Item name="plate" required rules={formValidationRules.required}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <RequiredMark />
            <Typography.Text>{t('tmsPage:VEHICLE_CLASS')}</Typography.Text>
            <Form.Item name="vehicleClass" required rules={formValidationRules.required}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <RequiredMark />
            <Typography.Text>{t('tmsPage:VEHICLE_TYPE')}</Typography.Text>
            <Form.Item name="type" required rules={formValidationRules.required}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Typography.Text>{t('tmsPage:BRAND')}</Typography.Text>
            <Form.Item name="brand">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Typography.Text>{t('tmsPage:MODEL_YEAR')}</Typography.Text>
            <Form.Item name="modelYear">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <RequiredMark />
            <Typography.Text>{t('tmsPage:ACTIVENESS')}</Typography.Text>
            <Form.Item name="active" required rules={formValidationRules.required}>
              <Select
                options={activenessSelectOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <RequiredMark />
            <Typography.Text>{t('tmsPage:VOLUME_CAPACITY')}</Typography.Text>
            <Form.Item name="volumeCapacity" required>
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <RequiredMark />
            <Typography.Text>{t('tmsPage:PALLET_CAPACITY')}</Typography.Text>
            <Form.Item name="palletCapacity" required>
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Typography.Text>{t('tmsPage:DINCER_ID')}</Typography.Text>
            <Form.Item name="dincerId" required>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 6]}>
          <VehicleDocuments />
        </Row>
      </AntCard>
    </Form>
  );
};

export default CreateTmsVehicleForm;
