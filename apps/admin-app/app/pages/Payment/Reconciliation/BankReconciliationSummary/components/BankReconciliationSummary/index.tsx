import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Card, Col, Row, Skeleton, Typography } from 'antd';

import { bankReconciliationSummarySelector } from '../../redux/selectors';
import { DataType } from '../../redux/reducer';

type InfoCardProps = {
  title?: string;
  value?: number;
  isAmountData?: boolean;
  bgColor: string;
  key: number;
};

const { Text } = Typography;

const InfoCard = ({ title, value, isAmountData, bgColor, key }: InfoCardProps) => {
  const bankReconciliationSummaryIsPending = useSelector(
    bankReconciliationSummarySelector.getIsPending,
  );

  const [formattedNumber] = value?.toLocaleString().split('.') || [0];

  const currency = useSelector(bankReconciliationSummarySelector.getCurrency);
  const appliedBgColor = value ? bgColor : 'unset';

  let valueWithCurrency = '-';
  if (currency && formattedNumber) valueWithCurrency = `${currency} ${formattedNumber}`;
  return (
    <Col md={6} xs={12} key={key}>
      <Skeleton loading={bankReconciliationSummaryIsPending} active>
        <Card size="small" bodyStyle={{ backgroundColor: appliedBgColor }} title={title} headStyle={{ minHeight: 40 }}>
          <Text strong> {isAmountData ? valueWithCurrency : value} </Text>
        </Card>
      </Skeleton>
    </Col>
  );
};

InfoCard.propTypes = { value: PropTypes.number, bgColor: PropTypes.string };

InfoCard.defaultProps = { title: '', value: 0, isAmountData: true, bgColor: 'white' };

const BankReconciliationSummary = () => {
  const { t } = useTranslation(['bankReconciliationSummaryPage', 'global']);

  const bankReconciliationSummaryData: DataType | null = useSelector(
    bankReconciliationSummarySelector.getData,
  );

  const isOrderCountMatch = bankReconciliationSummaryData?.domainSummary?.orderCount === bankReconciliationSummaryData?.posSummary?.orderCount;
  const isPaymentAmountMatch = bankReconciliationSummaryData?.domainSummary?.paymentAmount === bankReconciliationSummaryData?.posSummary?.paymentAmount;
  const isRefundAmountMatch = bankReconciliationSummaryData?.domainSummary?.refundAmount === bankReconciliationSummaryData?.posSummary?.refundAmount;
  const isNetAmountMatch = bankReconciliationSummaryData?.domainSummary?.netAmount === bankReconciliationSummaryData?.posSummary?.netAmount;

  const bgColors = {
    matchedValues: 'rgb(0 128 0 / 50%)',
    notMatchValues: 'rgb(255 0 0 / 50%)',
  };

  const domainData: InfoCardProps[] = [
    {
      title: t('bankReconciliationSummaryPage:ORDER_COUNT'),
      isAmountData: false,
      value: bankReconciliationSummaryData?.domainSummary?.orderCount,
      bgColor: isOrderCountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 1,
    },
    {
      title: t('bankReconciliationSummaryPage:PAYMENT_AMOUNT'),
      value: bankReconciliationSummaryData?.domainSummary?.paymentAmount,
      bgColor: isPaymentAmountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 2,

    },
    {
      title: t('bankReconciliationSummaryPage:REFUND_AMOUNT'),
      value: bankReconciliationSummaryData?.domainSummary?.refundAmount,
      bgColor: isRefundAmountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 3,

    },
    {
      title: t('bankReconciliationSummaryPage:NET_AMOUNT'),
      value: bankReconciliationSummaryData?.domainSummary?.netAmount,
      bgColor: isNetAmountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 4,
    },
  ];

  const posData: InfoCardProps[] = [
    {
      title: t('bankReconciliationSummaryPage:ORDER_COUNT'),
      isAmountData: false,
      value: bankReconciliationSummaryData?.posSummary?.orderCount,
      bgColor: isOrderCountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 5,
    },
    {
      title: t('bankReconciliationSummaryPage:PAYMENT_AMOUNT'),
      value: bankReconciliationSummaryData?.posSummary?.paymentAmount,
      bgColor: isPaymentAmountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 6,
    },
    {
      title: t('bankReconciliationSummaryPage:REFUND_AMOUNT'),
      value: bankReconciliationSummaryData?.posSummary?.refundAmount,
      bgColor: isRefundAmountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 7,
    },
    {
      title: t('bankReconciliationSummaryPage:NET_AMOUNT'),
      value: bankReconciliationSummaryData?.posSummary?.netAmount,
      bgColor: isNetAmountMatch ? bgColors.matchedValues : bgColors.notMatchValues,
      key: 8,
    },
  ];

  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title={bankReconciliationSummaryData?.domainSummary?.title}
            className="mt-4"
          >
            <Row gutter={[16, 16]}>
              {domainData.map((data: InfoCardProps) => <InfoCard {...data} />)}
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={bankReconciliationSummaryData?.posSummary?.title}
            className="mt-4"
          >
            <Row gutter={[16, 16]}>
              {posData.map((data: InfoCardProps) => <InfoCard {...data} />)}
            </Row>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default BankReconciliationSummary;
