import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const ProgressCard = ({ progressData, title, extra }) => {
  const { t } = useTranslation(['payoutsForDomains', 'global']);
  const { Rate, EftCount, MoneyOrder, TotalAmount, TotalCount } = progressData;
  return (

    <Card size="small" title={title} extra={extra} headStyle={{ minHeight: 40 }}>
      <div className="d-flex justify-content-between mb-2">
        <Text type="secondary"> {t('payoutsForDomains:RATE')} </Text>
        <Text> {Rate} </Text>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Text type="secondary"> {t('payoutsForDomains:EFT_COUNT')} </Text>
        <Text> {EftCount} </Text>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Text type="secondary"> {t('payoutsForDomains:MONEY_ORDER')} </Text>
        <Text> {MoneyOrder} </Text>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Text type="secondary"> {t('payoutsForDomains:TOTAL_COUNT')} </Text>
        <Text> {TotalCount} </Text>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Text type="secondary"> {t('payoutsForDomains:TOTAL_AMOUNT')} </Text>
        <Text> {TotalAmount} </Text>
      </div>
    </Card>
  );
};

export default ProgressCard;
