import { Col, DatePicker, Input, Row, Typography, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';

import SelectTaskKPI from '../../../components/SelectTaskKPI';

const { RangePicker } = DatePicker;

const Filter = ({ handleSubmission }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('courierGamificationPage');
  const isPending = false;
  const { Text } = Typography;

  const handleFormValues = () => {
    let date = [];
    if (form.getFieldValue('date')) {
      date = form.getFieldValue('date');
    }

    let tmpTitle;
    if (form.getFieldValue('title') !== '') {
      tmpTitle = form.getFieldValue('title');
    }

    handleSubmission({
      title: tmpTitle,
      kpi: form.getFieldValue('kpiName'),
      startDate: date[0]?.startOf('day'),
      endDate: date[1]?.endOf('day'),
    });
  };

  const handleKpiChange = value => {
    form.setFieldsValue({ kpiName: value });
  };

  return (
    <Form form={form} onFinish={handleFormValues}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={8} md={8}>
              <Text>{t('LIST.TASK_TITLE')}</Text>
              <Form.Item name="title" className="mb-0">
                <Input
                  disabled={isPending}
                  placeholder={t('LIST.TASK_TITLE')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8} md={8}>
              <Text>{t('LIST.TASK_KPI')}</Text>
              <SelectTaskKPI
                onChangeCallback={handleKpiChange}
              />
            </Col>
            <Col xs={24} sm={8} md={8}>
              <Text>{t('global:DATE')}</Text>
              <Form.Item name="date" className="mb-0">
                <RangePicker
                  className="w-100"
                  format={getLocalDateFormat()}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end pt-2 mb-2 mr-2">
            <Form.Item>
              <Button type="primary" loading={isPending} htmlType="submit">
                {t('global:BRING')}
              </Button>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
