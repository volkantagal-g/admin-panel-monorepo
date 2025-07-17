import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';

import { campaignDetailSelector } from '../../redux/selectors';
import GeneralInfo from './GeneralInfo';
import PromoDetail from './PromoDetail';
import Filter from './Filter';
import BannerDetail from './BannerDetail';
import DateInformation from './DateInformation';
import AvailableTimes from './AvailableTimes';
import Segment from './Segment';
import ButtonAction from './ButtonAction';

const CampaignEditForm = () => {
  const [promoType, setPromoType] = useState(undefined);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [segmentType, setSegmentType] = useState();

  const data = useSelector(campaignDetailSelector.getData);

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
  });

  const { values } = formik;

  useEffect(() => {
    setPromoType(_.get(values, 'promoType', undefined));
  }, [values]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <GeneralInfo values={values} setPromoType={setPromoType} availableTimes={availableTimes} />
      </Col>
      <Col span={24}>
        <PromoDetail availableTimes={availableTimes} values={values} promoType={promoType} />
      </Col>
      <Col span={24}>
        <Filter values={values} segmentType={segmentType} availableTimes={availableTimes} />
      </Col>
      <Col span={12}>
        <Segment segmentType={segmentType} setSegmentType={setSegmentType} />
      </Col>
      <Col span={12}>
        <DateInformation values={values} availableTimes={availableTimes} />
      </Col>
      <Col span={24}>
        <ButtonAction values={values} availableTimes={availableTimes} />
      </Col>
      <Col span={24}>
        <BannerDetail values={values} availableTimes={availableTimes} />
      </Col>
      <Col span={24}>
        <AvailableTimes values={values} setAvailableTimes={setAvailableTimes} />
      </Col>
    </Row>
  );
};

export default CampaignEditForm;
