import { Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const OrderInfoCard = ({ orderInfo }) => {
  const classes = useStyles();
  const { t } = useTranslation('ddsObjectionDetailPage');
  const { isMissingProduct, productFullName, feedback = {} } = orderInfo;

  return (
    <Card title={t('ORDER.TITLE')} className={classes.root}>
      <Row gutter={[8, 8]}>
        {
          isMissingProduct && (
            <>
              <Col md={12} sm={12} xs={12}>
                <strong>{t('ORDER.PRODUCT_NAME')}</strong>
              </Col>
              <Col md={12} sm={12} xs={12}>
                <div>{productFullName}</div>
              </Col>
            </>
          )
        }
        <Col md={12} sm={12} xs={12}>
          <strong>{t('ORDER.DESCRIPTION')}</strong>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <div>{feedback?.note}</div>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <strong>{t('ORDER.REASON')}</strong>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <div>{feedback?.reasonText}</div>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderInfoCard;
