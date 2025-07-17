import { Row, Col, Alert, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const WaybillsInfoCard = ({ waybillsInfo }) => {
  const classes = useStyles();
  const { t } = useTranslation('ddsObjectionDetailPage');
  const { shippingDate, receivingStartDate, receivingEndDate, receivingDuration, acceptableShippingDate, threshold } = waybillsInfo;

  return (
    <Card title={t('WAYBILLS.TITLE')} className={classes.root}>
      <Row gutter={[8, 8]}>
        <Col md={12} sm={12} xs={24}>
          <strong>{t('WAYBILLS.SHIPPING_DATE')}</strong>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <div>{shippingDate}</div>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <strong>{t('WAYBILLS.RECEIVING_START')}</strong>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <div>{receivingStartDate}</div>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <strong>{t('WAYBILLS.RECEIVING_END')}</strong>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <div>{receivingEndDate}</div>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <strong>{t('WAYBILLS.RECEIVING_DURATION')}</strong>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <div>{receivingDuration}</div>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <strong>{t('WAYBILLS.ACCEPTABLE_SHIPPING_DATE')}</strong>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <div>{acceptableShippingDate}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert type="error" message={t('WAYBILLS.INFO', { threshold })} />
        </Col>
      </Row>
    </Card>
  );
};

export default WaybillsInfoCard;
