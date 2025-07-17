import { Col, Form, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { basketAmountDetailsSelector } from '../../redux/selectors';
import {
  domainTypes as getirDomainTypes,
  warehouseStateTypes,
  warehouseStatuses,
  warehouseTypes,
} from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { Card, Select, TextInput } from '@shared/components/GUI';

const WarehouseGeneralInfo = () => {
  const { t } = useTranslation('basketConfigPage');
  const { warehouse = {} } =
    useSelector(basketAmountDetailsSelector.getData) || {};
  const {
    _id,
    name,
    city,
    warehouseType,
    state,
    status,
    region,
    domainTypes,
    address,
  } = warehouse;
  const domainTypeNames = domainTypes?.map(
    type => getirDomainTypes[type]?.[getLangKey()],
  );
  return (
    <Card
      title={t('global:GENERAL_INFO')}
      data-testid="basket-config-warehouse-details-info"
    >
      <Form layout="vertical">
        <Row gutter={[8, 8]} className="h-100">
          <Col xs={24} md={8}>
            <TextInput value={_id} disabled label={t('WAREHOUSE_ID')} />
          </Col>
          <Col xs={24} md={8}>
            <TextInput value={name} disabled label={t('WAREHOUSE_NAME')} />
          </Col>
          <Col xs={24} md={8}>
            <TextInput
              value={warehouseTypes[warehouseType]?.[getLangKey()]}
              disabled
              label={t('WAREHOUSE_TYPE')}
            />
          </Col>
          <Col xs={24} md={8}>
            <TextInput
              value={warehouseStateTypes[state]?.[getLangKey()]}
              disabled
              label={t('global:WAREHOUSE_STATE')}
            />
          </Col>
          <Col xs={24} md={8}>
            <TextInput
              value={warehouseStatuses[status]?.[getLangKey()]}
              disabled
              label={t('global:WAREHOUSE_STATUS')}
            />
          </Col>
          <Col xs={24} md={8}>
            <TextInput
              value={region?.name?.[getLangKey()]}
              disabled
              label={t('global:REGION')}
            />
          </Col>
          <Col xs={24} md={8}>
            <TextInput
              value={city?.name?.[getLangKey()]}
              disabled
              label={t('global:CITY')}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              value={domainTypeNames}
              mode="multiple"
              disabled
              label={t('global:DOMAIN_TYPE')}
            />
          </Col>
          <Col xs={24} md={8}>
            <TextInput value={address} disabled label={t('global:ADDRESS')} />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default WarehouseGeneralInfo;
