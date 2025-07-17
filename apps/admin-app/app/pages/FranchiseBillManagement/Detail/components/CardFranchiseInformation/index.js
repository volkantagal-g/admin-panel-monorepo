import { Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';

const { Text } = Typography;

const CardFranchiseInformation = ({ billData }) => {
  const { t } = useTranslation('franchiseBillManagementPage');

  const { franchise, warehouse } = billData;

  return (
    <AntCard
      bordered={false}
      title={t('FRANCHISE_WAREHOUSE_INFORMATION')}
    >
      <Row gutter={[8, 8]}>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('FRANCHISE')}</Text>
          <SelectFranchise
            value={franchise}
            disabled
            showArrow={false}
            onChange={() => { }}
          />
        </Col>
        <Col md={12} sm={12} xs={24}>
          <Text>{t('WAREHOUSE')}</Text>
          <SelectWarehouse
            value={warehouse}
            isDisabled
            showArrow={false}
            onChange={() => { }}
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default CardFranchiseInformation;
