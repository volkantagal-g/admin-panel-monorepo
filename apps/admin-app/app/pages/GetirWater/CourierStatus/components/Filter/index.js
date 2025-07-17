import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Collapse, Space, Select, Typography, Button } from 'antd';

import { waterCourierStatuses } from '@shared/shared/constantValues';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { selectOptionsSearch, convertSelectOptions, convertConstantValuesToSelectOptions } from '@shared/utils/common';

import useStyles from './styles';

import { Creators } from '../../redux/actions';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['getirWater', 'global']);

  const [filters, setFilters] = useState({
    warehouseIds: undefined,
    status: undefined,
    lastBusyOptionIds: undefined,
  });

  const [filterWarehouses, setFilterWarehouses] = useState([]);

  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousePending = useSelector(getWarehousesSelector.getIsPending);

  const waterStatusesSelectOptions = convertConstantValuesToSelectOptions(waterCourierStatuses);

  useEffect(() => {
    dispatch(CommonCreators.getWarehousesRequest({ domainTypes: [4] }));
    dispatch(Creators.getBusyReasonsRequest());
  }, [dispatch]);

  useEffect(() => {
    const options = convertSelectOptions(warehouses, { valueKey: '_id', labelKey: 'name' });
    setFilterWarehouses(options);
  }, [warehouses]);

  const handleWarehouseChange = warehouseIds => {
    setFilters({ ...filters, warehouseIds });
  };

  const handleStatusChange = status => {
    setFilters({ ...filters, status });
  };

  const getFilterValues = () => {
    dispatch(Creators.getCouriersRequest({ ...filters }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('COURIER_STATUS.FILTER.WAREHOUSE')}</Text>
                  <Select
                    placeholder={t('COURIER_STATUS.FILTER.WAREHOUSE_DESC')}
                    className={classes.filterSelect}
                    options={filterWarehouses}
                    showSearch
                    filterOption={selectOptionsSearch}
                    loading={isWarehousePending}
                    onChange={handleWarehouseChange}
                    mode="multiple"
                  />
                </Col>
                <Col span={8}>
                  <Text>{t('COURIER_STATUS.FILTER.STATUS')}</Text>
                  <Select
                    placeholder={t('COURIER_STATUS.FILTER.STATUS_DESC')}
                    className={classes.filterSelect}
                    options={waterStatusesSelectOptions}
                    onChange={handleStatusChange}
                    allowClear
                    mode="multiple"
                  />
                </Col>
              </Row>
              <Row justify="end">
                <Button type="primary" onClick={getFilterValues}>
                  {t('SEARCH')}
                </Button>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
