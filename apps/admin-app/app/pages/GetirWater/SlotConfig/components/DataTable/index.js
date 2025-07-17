/* eslint-disable camelcase */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Row, Col, Button } from 'antd';
import { isEmpty, cloneDeep } from 'lodash';

import useStyles from './styles';
import { generateColumns } from './config';
import { warehouseSlotDataSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const DataTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [t] = useTranslation('getirWaterSlotConfigPage');

  const isSlotDataPending = useSelector(warehouseSlotDataSelector.getIsPending);

  const { date, warehouse_id, slot } = useSelector(warehouseSlotDataSelector.getData) || [];

  const [tableColumns, setTableColumns] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = useCallback((value, key) => {
    if (+(value) >= 0) {
      setInputValues({
        ...inputValues,
        [key]: value,
      });
    }
  }, [inputValues]);

  const arrangedData = useMemo(() => {
    if (!isEmpty(slot)) {
      return Object.values(slot);
    }
    return [];
  }, [slot]);

  const arrageSubmitData = useMemo(() => {
    const tempData = cloneDeep(slot);
    if (!isEmpty(slot)) {
      Object.entries(inputValues).forEach(([key, value]) => {
        if (tempData[key]) {
          tempData[key].cap = +value;
        }
      });
      return {
        date,
        warehouse_id,
        slot: tempData,
      };
    }
    return null;
  }, [date, inputValues, slot, warehouse_id]);

  const handleSubmit = () => {
    dispatch(Creators.updateSlotCapacityRequest({ body: arrageSubmitData }));
  };

  useEffect(() => {
    if (!isSlotDataPending) {
      setTableColumns(generateColumns({ t, handleInputChange }));
    }
  }, [isSlotDataPending, t, handleInputChange, dispatch]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24} className={classes.updateSlotCapacityBtn}>
        <Button
          onClick={handleSubmit}
          className={classes.buttonFilter}
        >
          {t('FILTER.UPDATE_SLOT_CAPACITY')}
        </Button>
      </Col>
      <Col span={24}>
        <Table
          dataSource={arrangedData}
          columns={tableColumns}
          className={classes.tableWrapper}
          rowKey="id"
          loading={isSlotDataPending}
          scroll={{ x: 'max-content' }}
          sortDirections={['descend', 'ascend']}
          size="small"
          pagination={{
            total: arrangedData.length,
            defaultPageSize: 100,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Col>
    </Row>
  );
};

export default DataTable;
