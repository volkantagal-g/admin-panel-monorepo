import { useEffect, useState } from 'react';
import { Row, Col, Space, Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { defaultValues } from './formHelper';
import { ROUTE } from '@app/routes';

import createCampaignBody from '../../../utils/createCampaignBody';
import { Creators } from '../../redux/actions';
import { createSegmentSelector } from '../../redux/selectors';

import GeneralInfo from './GeneralInfo';
import PromoDetail from './PromoDetail';
import Filter from './Filter';
import BannerDetail from './BannerDetail';
import DateInformation from './DateInformation';
import AvailableTimes from './AvailableTimes';
import Segment from './Segment';
import useStyles from './styles';
import ButtonAction from './ButtonAction';

const segmentTypes = {
  INCLUDE: 2,
  EXCLUDE: 3,
};

const CampaignNewForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterCampaignsPage');
  const classes = useStyles();
  const [form] = Form.useForm();

  const [promoType, setPromoType] = useState(defaultValues.promoType);
  const [segmentType, setSegmentType] = useState(undefined);
  const [availableTimes, setAvailableTimes] = useState([]);

  const createdSegmentId = useSelector(createSegmentSelector.getData);

  useEffect(() => {
    if (createdSegmentId) {
      const { segmentId } = createdSegmentId;
      if (segmentType === segmentTypes.INCLUDE) {
        form.setFieldsValue({ includeSegments: [segmentId] });

        return;
      }
      if (segmentType === segmentTypes.EXCLUDE) {
        form.setFieldsValue({ excludeSegments: [segmentId] });
      }
    }
  }, [createdSegmentId, form, segmentType]);

  const onFinish = values => {
    const data = createCampaignBody(values, availableTimes, null, false);
    dispatch(Creators.createCampaignRequest({ data }));
  };

  const handleValuesChange = changedValues => {
    if (_.get(changedValues, 'promoType')) {
      setPromoType(form.getFieldValue('promoType'));
    }
    if (_.get(changedValues, 'segmentType')) {
      setSegmentType(_.get(changedValues, 'segmentType'));
    }
  };

  const handleAvailableTimes = times => {
    setAvailableTimes(times);
  };

  return (
    <Form
      id="campaign-new"
      onFinish={onFinish}
      layout="vertical"
      form={form}
      initialValues={defaultValues}
      onValuesChange={handleValuesChange}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <GeneralInfo form={form} />
        </Col>
        <Col span={24}>
          <PromoDetail form={form} promoType={promoType} />
        </Col>
        <Col span={24}>
          <Filter form={form} />
        </Col>
        <Col span={12}>
          <Segment />
        </Col>
        <Col span={12}>
          <DateInformation />
        </Col>
        <Col span={24}>
          <ButtonAction />
        </Col>
        <Col span={24}>
          <BannerDetail />
        </Col>
        <Col span={24}>
          <AvailableTimes getAvailableTimes={handleAvailableTimes} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} className={classes.colWrapper}>
          <Space size="small">
            <Link to={ROUTE.GETIR_WATER_CAMPAIGN_NEW.path}>
              <Button>{t('CANCEL')}</Button>
            </Link>
            <Button type="primary" htmlType="submit">
              {t('SAVE')}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default CampaignNewForm;
