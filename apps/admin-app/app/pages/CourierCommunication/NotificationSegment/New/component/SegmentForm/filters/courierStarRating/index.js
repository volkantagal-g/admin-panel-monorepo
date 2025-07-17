import { Collapse, Row, Col, Rate } from 'antd';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const CourierStarRating = ({ getRating, prevData }) => {
  const { t } = useTranslation(['courierSegment', 'global']);
  const [rate, setRate] = useState(prevData?.rating || 0);

  const handleRateChange = value => {
    setRate(value);
  };

  useMemo(() => {
    getRating({ courierStarRating: { rating: rate } });
  }, [getRating, rate]);

  return (
    <Collapse>
      <Collapse.Panel header={t('COURIER_STAR_RATING')}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12}>
            <span>{t('COURIER_RATING')}</span>
            <Rate
              allowHalf
              defaultValue={rate}
              onChange={handleRateChange}
            />
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
};

export default CourierStarRating;
