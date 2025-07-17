import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { forEach } from 'lodash';

import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { formWarehousesSelector } from '@app/pages/Stock/Transfer/Auto/redux/selectors';
import { Creators } from '@app/pages/Stock/Transfer/Auto/redux/actions';
import { generateColumns } from './config';

const PARAMS_DEFAULT_VALUES = {
  STOCK_DAY: 21,
  IGNORE_CURRENT_STOCK: false,
  DEMAND_MULTIPLIER: 7,
};
const { Panel } = Collapse;

const RegularWarehouseTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('stockTransferAuto');
  const warehouses = useSelector(getWarehousesSelector.getData);
  const formWarehouseList = useSelector(formWarehousesSelector.getFormWarehouses);

  const [warehouseList, setWarehouseList] = useState([]);

  useEffect(() => {
    const filteredWarehouses = warehouses
      .filter(warehouse => formWarehouseList.includes(warehouse._id))
      .map(wrappedWarehouse => ({
        ...wrappedWarehouse,
        stockDay: PARAMS_DEFAULT_VALUES.STOCK_DAY,
        ignoreStock: PARAMS_DEFAULT_VALUES.IGNORE_CURRENT_STOCK,
        growRate: PARAMS_DEFAULT_VALUES.DEMAND_MULTIPLIER,
      }));
    setWarehouseList(filteredWarehouses);
  }, [warehouses, formWarehouseList]);

  useEffect(() => {
    const wrappedWarehousesParams = {};
    const filteredWarehouses = warehouseList.filter(wrappedCategory => wrappedCategory.itemParamEnabled);
    forEach(filteredWarehouses, warehouse => {
      wrappedWarehousesParams[warehouse._id] = {
        name: warehouse.name,
        isSelected: false,
        stockDay: warehouse.stockDay,
        ignoreStock: warehouse.ignoreStock,
        growRate: warehouse.growRate,
      };
    });
    dispatch(Creators.setRegularWarehouses({ data: wrappedWarehousesParams }));
  }, [dispatch, warehouseList]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse accordion>
          <Panel header={t('REGULAR_WAREHOUSE')} key="1">
            <Table
              dataSource={warehouseList}
              columns={generateColumns(t, warehouseList, setWarehouseList)}
              bordered
              scroll={{ x: 'max-content' }}
              size="small"
              pagination={false}
            />
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default RegularWarehouseTable;
