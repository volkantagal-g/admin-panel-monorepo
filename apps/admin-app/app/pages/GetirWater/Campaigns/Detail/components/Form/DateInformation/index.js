import { Form, Row, Col, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import moment from 'moment-timezone';

import AntCard from '@shared/components/UI/AntCard';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Campaigns/utils/createCardActionButtons';
import { Creators } from '../../../redux/actions';

import { validationSchema } from '../formHelper';
import createCampaignBody from '@app/pages/GetirWater/Campaigns/utils/createCampaignBody';

const DateInformation = ({ values, availableTimes }) => {
  const [dateForm] = Form.useForm();
  const { id } = useParams();
  const { t } = useTranslation('getirWaterCampaignsPage');
  const dispatch = useDispatch();

  useEffect(() => {
    dateForm.setFieldsValue({
      startDate: moment(values.validFrom),
      endDate: moment(values.validUntil),
    });
  }, [values, dateForm]);

  const onFinishDate = formValues => {
    const resultData = createCampaignBody(formValues, availableTimes, 'dateInfo');
    dispatch(
      Creators.updateCampaignRequest({
        data: { dateSection: resultData },
        campaignId: id,
      }),
    );
  };

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.DATE_INFO.TITLE', 'edit-date-info');

  return (
    <Form id="edit-date-info" onFinish={onFinishDate} layout="vertical" form={dateForm}>
      <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name="startDate" label={t('FORM.DATE_INFO.START_DATE.TITLE')} rules={validationSchema.startDate}>
              <DatePicker className="w-100" showTime disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name="endDate" label={t('FORM.DATE_INFO.END_DATE.TITLE')} rules={validationSchema.endDate}>
              <DatePicker className="w-100" showTime disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default DateInformation;
