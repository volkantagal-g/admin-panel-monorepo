import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Divider } from 'antd';

import { getMarketProductGroupSelector } from '../../redux/selectors';

import AntCard from '@shared/components/UI/AntCard';
import { formatDate } from '@shared/utils/dateHelper';

const AdditionalInfo = () => {
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);

  const { t } = useTranslation('marketProductGroupPage');
  return (
    <AntCard bordered={false} title={t('ADDITIONAL_INFO')}>
      <Divider className="mt-2 mb-2" />
      <Row>
        <Col flex="1 1">
          {t('CREATED_AT')}
        </Col>
        <Col flex="0 1 100px" align="right">
          {formatDate(marketProductGroup?.createdAt)}
        </Col>
      </Row>
      <Divider className="mt-2 mb-2" />
      <Row>
        <Col flex="1 1">
          {t('PRODUCT_COUNT')}
        </Col>
        <Col flex="0 1 100px" align="right">
          {marketProductGroup?.productCount}
        </Col>
      </Row>
    </AntCard>
  );
};

export default AdditionalInfo;
