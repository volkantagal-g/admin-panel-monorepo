import { Col, Collapse, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useStyles from '../styles';

const { Text } = Typography;
const { Panel } = Collapse;
const Payment = ({ payment }) => {
  const classes = useStyles();
  const { t } = useTranslation(['global', 'paymentEventPage']);

  return (
    <Collapse defaultActiveKey={['2']}>
      <Panel header={t('paymentEventPage:CURRENCY')} key="2">
        <Row gutter={12}>
          <Col span={12}>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.SYMBOL')} </Text>
              <Text> {payment.currency?.symbol} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.CODE_NAME')} </Text>
              <Text> {payment.currency?.codeName} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.CODE_ALPHA2')} </Text>
              <Text> {payment.currency?.codeAlpha2} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.CODE_ALPHA3')} </Text>
              <Text> {payment.currency?.codeAlpha3} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.CODE_NUMERIC')} </Text>
              <Text> {payment.currency?.codeNumeric} </Text>
            </div>
          </Col>
          <Col span={12}>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.SUFFIX_SYMBOL')} </Text>
              <Text> {payment.currency?.suffixSymbol} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.PREFIX_SYMBOL')} </Text>
              <Text> {payment.currency?.prefixSymbol} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.PRECISION')} </Text>
              <Text> {payment.currency?.precision} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.THOUSAND_SEPARATOR')} </Text>
              <Text> {payment.currency?.thousandSeparator} </Text>
            </div>
            <div className={classes.itemRow}>
              <Text type="secondary">{t('global:CURRENCY_DETAIL.DECIMAL_SEPARATOR')} </Text>
              <Text> {payment.currency?.decimalSeparator} </Text>
            </div>
          </Col>
        </Row>

      </Panel>
    </Collapse>
  );
};

Payment.prototype = {
  payment: PropTypes.shape({
    provider: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      symbol: PropTypes.string,
      codeName: PropTypes.string,
      codeAlpha2: PropTypes.string,
      codeAlpha3: PropTypes.string,
      codeNumeric: PropTypes.string,
      suffixSymbol: PropTypes.string,
      prefixSymbol: PropTypes.string,
      precision: PropTypes.number,
      thousandSeparator: PropTypes.string,
      decimalSeparator: PropTypes.string,
    }),
  }).isRequired,
};

PropTypes.defaultProps = {
  payment: {
    provider: '',
    method: '',
    updatedAt: '',
    currency: {
      symbol: '',
      codeName: '',
      codeAlpha2: '',
      codeAlpha3: '',
      codeNumeric: '',
      suffixSymbol: '',
      prefixSymbol: '',
      precision: 0,
      thousandSeparator: '',
      decimalSeparator: '',
    },
  },
};

export default Payment;
