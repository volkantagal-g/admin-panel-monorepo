import { Fragment } from 'react';
import { Row, Col, Button, Card } from 'antd';
import { useTranslation } from 'react-i18next';

import StatusCard from '../StatusCard';
import useStyles from './styles';

const LogInfoCard = ({ logInfo, status }) => {
  const classes = useStyles();
  const { t } = useTranslation('ddsObjectionDetailPage');

  const { criterionName, warehouseName, pickerName, transferId, recordDate, orderId, palletId } = logInfo;

  return (
    <Card title={t('INFO.TITLE')} className={classes.root}>
      <Row gutter={[8, 8]}>
        <Col md={12} sm={12} xs={12}>
          <strong>{t('INFO.REASON')}</strong>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <div>{criterionName}</div>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <strong>{t('WAREHOUSE')}</strong>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <div>{warehouseName}</div>
        </Col>
        {
          pickerName &&
          (
            <Fragment key="pickerName">
              <Col md={12} sm={12} xs={12}>
                <strong>{t('INFO.PICKER_NAME')}</strong>
              </Col>
              <Col md={12} sm={12} xs={12}>
                <div>{pickerName}</div>
              </Col>
            </Fragment>
          )
        }
        {
          transferId &&
          (
            <Fragment key="transferId">
              <Col md={12} sm={12} xs={12}>
                <strong>{t('INFO.TRANSFER_ID')}</strong>
              </Col>
              <Col md={12} sm={12} xs={12}>
                <div>{transferId}</div>
              </Col>
            </Fragment>
          )
        }
        {
          palletId &&
          (
            <Fragment key="palletId">
              <Col md={12} sm={12} xs={12}>
                <strong>{t('Pallet ID')}</strong>
              </Col>
              <Col md={12} sm={12} xs={12}>
                <div>{palletId}</div>
              </Col>
            </Fragment>
          )
        }
        <Col md={12} sm={12} xs={12}>
          <strong>{t('INFO.DATE')}</strong>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <div>{recordDate}</div>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <strong>{t('global:STATUS')}</strong>
        </Col>
        <Col md={12} sm={12} xs={12}>
          <StatusCard status={status} />
        </Col>

      </Row>
      {
        orderId && (
          <Row justify="end">
            <Button
              size="small"
              type="primary"
              href={`/marketOrder/detail/${orderId}`}
            >
              {t('ORDER.DETAIL')}
            </Button>
          </Row>
        )
      }
    </Card>
  );
};

export default LogInfoCard;
