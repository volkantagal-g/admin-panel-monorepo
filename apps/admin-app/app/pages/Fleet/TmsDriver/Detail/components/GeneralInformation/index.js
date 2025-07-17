import { useTranslation } from 'react-i18next';
import { Row, Col, Input, Tag } from 'antd';

import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { Title } from '@app/pages/Person/Request/Detail/components';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { getStatusColor } from '@app/pages/MarketOrder/OrderDetail/components/BatchedOrderList/utils';
import { getLangKey } from '@shared/i18n';
import { courierStatuses } from '@shared/shared/constantValues';

const GeneralInformation = ({ name, gsm, username, createdAt, status, isLoggedIn, isActivated, personalGsm }) => {
  const { t } = useTranslation(['personPage', 'courierPage', 'global']);

  return (
    <AntCard title={t('courierPage:GENERAL_INFORMATION')} data-testid="general-information-card">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <span>{t('NAME')}</span>
          <Input
            className="w-100"
            value={name}
            disabled
          />
        </Col>
        <Col span={24}>
          <span>{t('GSM')}</span>
          <Input
            className="w-100"
            value={gsm}
            disabled
          />
        </Col>
        <Col span={24}>
          <span>{t('PERSONAL_GSM')}</span>
          <Input
            className="w-100"
            value={personalGsm}
            disabled
          />
        </Col>
        <Col span={24}>
          <span>{t('USERNAME')}</span>
          <Input
            className="w-100"
            value={username}
            disabled
          />
        </Col>
      </Row>
      <Row className="mt-4" gutter={[12, 12]}>
        <Col span={24}>
          <Title>{t('CREATED_AT')}:</Title>
          {moment(createdAt).format(getLocalDateTimeFormat())}
        </Col>
        <Col span={24}>
          <Title>{t('ACTIVENESS')}:</Title>
          <Tag color={isActivated ? 'green' : 'red'}>{isActivated ? t('ACTIVE') : t('INACTIVE')}</Tag>
        </Col>
        <Col span={24}>
          <Title>{t('courierPage:IS_LOGGED_IN')}:</Title>
          <Tag color={isLoggedIn ? 'green' : 'red'}>{isLoggedIn ? t('YES') : t('NO')}</Tag>
        </Col>
        <Col span={24}>
          <Title>{t('STATUS')}:</Title>
          <Tag color={getStatusColor(status)}>{courierStatuses[status]?.[getLangKey()]}</Tag>
        </Col>
      </Row>
    </AntCard>
  );
};

export default GeneralInformation;
