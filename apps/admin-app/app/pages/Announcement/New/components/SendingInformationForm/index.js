import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker, Row, Col, Form } from 'antd';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@shared/utils/marketing/formUtils';

const SendingInformationForm = () => {
  const { t } = useTranslation('marketing');

  return (
    <AntCard footer={false} bordered={false} title={t('SENDING_INFORMATION')}>
      <Row gutter={24}>
        <Col lg={12}>
          <Form.Item name="dateRange" label={t('DATE_RANGE')} rules={rules.onlyRequired}>
            <DatePicker.RangePicker
              showTime
              className="w-100"
              ranges={{
                [t('TO_END_OF_DAY')]: [moment(), moment().endOf('day')],
                [t('TO_END_OF_MONTH')]: [moment(), moment().endOf('month')],
                [t('TO_END_OF_YEAR')]: [moment(), moment().endOf('year')],
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>

  );
};

export default memo(SendingInformationForm);
