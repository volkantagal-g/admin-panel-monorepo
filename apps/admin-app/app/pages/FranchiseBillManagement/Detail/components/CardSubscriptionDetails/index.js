import { Row, Col, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { isNull } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { formatDate } from '@shared/utils/dateHelper';
import { getLocalDateFormat } from '@shared/utils/localization';

const { Text } = Typography;

const CardSubscriptionDetails = ({ billData }) => {
  const { t } = useTranslation('franchiseBillManagementPage');

  const { subscriptionDetails } = billData;

  return (
    <AntCard
      bordered={false}
      title={t('SUBSCRIPTION_DETAILS')}
    >
      <Row gutter={[8, 8]}>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('PROVIDER')}</Text>
          <Input
            value={subscriptionDetails?.provider?.name}
            placeholder={t('PROVIDER')}
            disabled
          />
        </Col>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('SUBSCRIPTION_DESCRIPTION')}</Text>
          <Input
            value={subscriptionDetails?.description?.name}
            placeholder={t('SUBSCRIPTION_DESCRIPTION')}
            disabled
          />
        </Col>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('SUBSCRIPTION_MODEL')}</Text>
          <Input
            value={subscriptionDetails?.model?.name}
            placeholder={t('SUBSCRIPTION_MODEL')}
            disabled
          />
        </Col>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('CONTRACT_POWER')}</Text>
          <Input
            value={subscriptionDetails?.power}
            placeholder={t('CONTRACT_POWER')}
            disabled
          />
        </Col>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('SUBSCRIPTION_START_DATE')}</Text>
          <Input
            value={formatDate(subscriptionDetails?.startDate, getLocalDateFormat())}
            placeholder={t('SUBSCRIPTION_START_DATE')}
            disabled
          />
        </Col>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('SUBSCRIPTION_END_DATE')}</Text>
          <Input
            value={isNull(subscriptionDetails?.endDate) ? t('NO_END_DATE') : formatDate(subscriptionDetails?.endDate, getLocalDateFormat())}
            placeholder={t('SUBSCRIPTION_END_DATE')}
            disabled
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default CardSubscriptionDetails;
