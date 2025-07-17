import { Collapse, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useStyles from '../styles';
import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';

const { Panel } = Collapse;
const { Text } = Typography;
const TransactionDetail = ({ transactionDetail }) => {
  const classes = useStyles();
  const { t } = useTranslation(['global', 'paymentEventPage']);

  return (
    <Collapse defaultActiveKey={['4']}>
      <Panel header={t('paymentEventPage:TRANSACTION_DETAIL')} key="4">
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentEventPage:TRANSACTION_ID')} </Text>
          <RedirectText
            text={transactionDetail?.transactionId}
            to={`/payment/transactions/detail/${transactionDetail?.transactionId}`}
            permKey={permKey.PAGE_PAYMENT_TRANSACTION_DETAIL}
            target="_blank"
            isIconVisible
          />
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentEventPage:MODE')} </Text>
          <Text> {transactionDetail?.mode} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('paymentEventPage:MERCHANT_REFERENCE')} </Text>
          <Text> {transactionDetail?.merchantReference} </Text>
        </div>
        <div className={classes.itemRow}>
          <Text type="secondary">{t('global:LOCATION')} </Text>
          <Text> {transactionDetail?.location} </Text>
        </div>
        {
          transactionDetail?.installmentCount && (
          <div className={classes.itemRow}>
            <Text type="secondary">{t('paymentEventPage:INSTALLMENT_COUNT')} </Text>
            <Text> {transactionDetail?.installmentCount} </Text>
          </div>
          )
        }
      </Panel>
    </Collapse>
  );
};

TransactionDetail.prototype = {
  transactionDetail: PropTypes.shape({
    transactionId: PropTypes.string,
    mode: PropTypes.string,
    merchantReference: PropTypes.string,
    location: PropTypes.string,
    installmentCount: PropTypes.number,
  }),

};

PropTypes.defaultProps = {
  transactionDetail: {
    transactionId: '',
    mode: '',
    merchantReference: '',
    location: '',
    installmentCount: 0,
  },
};

export default TransactionDetail;
