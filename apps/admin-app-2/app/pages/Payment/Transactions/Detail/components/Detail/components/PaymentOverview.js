import { Col, Row, Tag, Typography } from 'antd';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import useStyles from './styles';
import { STATUS_TAG_COLOR_MAP } from '@app/pages/Payment/constants';
import PaymentProviderIcon from '@shared/components/UI/PaymentProviderIcon';
import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';

const { Title, Text } = Typography;

export const PaymentOverview = ({ financialSummary }) => {
  const classes = useStyles();
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  return (
    <div
      className={classes.paymentDetailCard}
      data-testid="payment-overview-section"
    >
      <Row justify="space-between">
        <Col md={4} xs={12}>
          <Title level={5}>
            {t('paymentTransactionPage:FILTER.TRANSACTION_ID.TITLE')}
          </Title>
          <RedirectText
            text={financialSummary?.transactionId}
            to={`/payment/transactions/detail/${financialSummary?.transactionId}`}
            permKey={permKey.PAGE_PAYMENT_TRANSACTION_DETAIL}
            target="_blank"
            isIconVisible
          />
        </Col>
        <Col md={3} xs={12}>
          <div className={classes.collapseColumn}>
            <Title level={5}>{t('global:STATUS')}</Title>
            <Tag
              className={classes.statusTag}
              color={STATUS_TAG_COLOR_MAP[financialSummary?.status]}
            >
              {financialSummary?.status}
            </Tag>
          </div>
        </Col>
        <Col md={5} xs={12}>
          <Title level={5}>
            {t('paymentTransactionPage:TABLE.COLUMNS.PROVIDER_AND_METHOD')}
          </Title>
          <PaymentProviderIcon
            paymentProvider={financialSummary?.paymentProvider}
            paymentMethod={financialSummary?.paymentMethod}
            mixed={financialSummary?.mixed}
          />
        </Col>
        <Col md={3} xs={12}>
          <div>
            <Title level={5}>
              {t('paymentTransactionPage:REQUESTED_AMOUNT')}
            </Title>
            <Text> {financialSummary?.requestedAmount} </Text>
          </div>
        </Col>
        <Col md={3} xs={12}>
          <div>
            <Title level={5}>
              {t('paymentTransactionPage:AUTHORIZED_AMOUNT')}
            </Title>
            <Text> {financialSummary?.totalAmount} </Text>
          </div>
        </Col>
        <Col md={3} xs={12}>
          <div>
            <Title level={5}>{t('paymentTransactionPage:BALANCE')}</Title>
            <Text> {financialSummary?.totalBalance} </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

PaymentOverview.propTypes = {
  financialSummary: PropTypes.shape({
    transactionId: PropTypes.string,
    status: PropTypes.string,
    requestedAmount: PropTypes.string,
    totalAmount: PropTypes.string,
    totalBalance: PropTypes.string,
  }).isRequired,
};

PropTypes.defaultProps = {
  financialSummary: {
    status: '',
    transactionId: '',
    requestedAmount: '',
    totalAmount: '',
    totalBalance: '',
  },
};
