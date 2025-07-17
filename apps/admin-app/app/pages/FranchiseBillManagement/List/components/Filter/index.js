import { useState } from 'react';
import { Col, Row, DatePicker, Button, Typography, Collapse, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLocalDateFormat } from '@shared/utils/localization';
import SelectFranchise from '@shared/containers/Select/Franchise';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import SelectDomainType from '@shared/containers/Select/DomainType';
import { domainTypesForBillList } from '../../constants';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = ({ filters, isPending, handleSubmit, domainTypes, setDomainTypes }) => {
  const classes = useStyles();
  const { t } = useTranslation('franchiseBillManagementPage');

  const { selectedFranchiseId, selectedWarehouseIds, selectedRequestTimeRange } = filters;

  const [franchiseId, setFranchiseId] = useState(selectedFranchiseId);
  const [warehouseIds, setWarehouseIds] = useState(selectedWarehouseIds);
  const [requestTimeRange, setRequestTimeRange] = useState(selectedRequestTimeRange);

  const handleSelectedFranchise = franchise => {
    setFranchiseId(franchise);
    setWarehouseIds(!franchise && []);
  };

  const handleSelectedWarehouse = warehouse => {
    setWarehouseIds(warehouse);
  };

  const handleSelectedDomainType = types => {
    setDomainTypes(types);
  };

  const handleSelectedRequestTimeRange = requestedTimeRange => {
    setRequestTimeRange(requestedTimeRange);
  };

  const submitButtonClick = () => {
    handleSubmit({
      selectedFranchiseId: franchiseId,
      selectedWarehouseIds: warehouseIds,
      selectedDomainTypes: domainTypes,
      selectedRequestTimeRange: requestTimeRange,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.wrapper}>
              <Row gutter={[8, 8]}>
                <Col md={12} sm={12} xs={24}>
                  <Text>{t('DATE')}</Text>
                  <RangePicker
                    className={classes.wrapper}
                    value={requestTimeRange}
                    onChange={handleSelectedRequestTimeRange}
                    format={getLocalDateFormat()}
                    allowClear={false}
                    disabled={isPending}
                  />
                </Col>
                <Col md={12} sm={12} xs={24}>
                  <Text>{t('FRANCHISE')}</Text>
                  <SelectFranchise
                    disabled={isPending}
                    value={franchiseId}
                    onChange={handleSelectedFranchise}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col md={12} sm={12} xs={24}>
                  <Text>{t('WAREHOUSE')}</Text>
                  <SelectWarehouse
                    isMultiple
                    franchiseIds={franchiseId?.length && [franchiseId]}
                    isDisabled={isPending}
                    value={warehouseIds}
                    onChange={handleSelectedWarehouse}
                  />
                </Col>
                <Col md={12} sm={12} xs={24}>
                  <Text>{t('DOMAIN_TYPE')}</Text>
                  <SelectDomainType
                    mode="multiple"
                    value={domainTypes}
                    isDisabled={isPending}
                    onChange={handleSelectedDomainType}
                    domainTypes={domainTypesForBillList}
                  />
                </Col>
              </Row>
              <Row>
                <div className={classes.buttonWrapper}>
                  <Button type="primary" onClick={submitButtonClick}>
                    {t('BRING')}
                  </Button>
                </div>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
