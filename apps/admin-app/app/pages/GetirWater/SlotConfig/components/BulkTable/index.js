import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Row, Col, Button, Typography } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';

import useStyles from './styles';
import { generateColumns } from './config';
import {
  getBulkSlotDataSelector,
  filtersSelector,
  inputClearTriggerSelector,
  updateBulkSlotDataSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const { Text } = Typography;

const BulkTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [t] = useTranslation('getirWaterSlotConfigPage');

  const isSlotDataPending = useSelector(getBulkSlotDataSelector.getIsPending);
  const isUpdatePending = useSelector(updateBulkSlotDataSelector.getIsPending);

  const { SLOT_HOURS } = useSelector(getBulkSlotDataSelector.getData) || {};
  const selectedDateRange = useSelector(filtersSelector.getDateRange);
  const selectedWarehouses = useSelector(filtersSelector.getWarehouses);
  const inputClearTrigger = useSelector(inputClearTriggerSelector.getTrigger);

  const [tableColumns, setTableColumns] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = useCallback((value, key) => {
    if ((value || value === 0) && +(value) >= 0) {
      setInputValues({
        ...inputValues,
        [key]: value,
      });
    }
    else {
      const newInputValues = { ...inputValues };
      delete newInputValues[key];
      setInputValues(newInputValues);
    }
  }, [inputValues]);

  const arrangedData = useMemo(() => {
    if (!isEmpty(SLOT_HOURS)) {
      return Object.values(SLOT_HOURS);
    }
    return [];
  }, [SLOT_HOURS]);

  const arrageSubmitData = useMemo(() => {
    if (!isEmpty(SLOT_HOURS)) {
      const slotArray = Object.keys(inputValues).map(key => ({
        slot: key,
        cap: inputValues[key] ? +inputValues[key] : 0,
      }));

      return {
        startDate: moment(selectedDateRange[0]).format('YYYY-MM-DD'),
        endDate: moment(selectedDateRange[1]).format('YYYY-MM-DD'),
        warehouseIds: selectedWarehouses,
        slot: slotArray,
      };
    }
    return null;
  }, [inputValues, selectedDateRange, selectedWarehouses, SLOT_HOURS]);

  const handleSubmit = () => {
    dispatch(Creators.updateBulkSlotCapacitiesRequest({ body: arrageSubmitData }));
    dispatch(Creators.triggerInputClear());
  };

  useEffect(() => {
    if (!isSlotDataPending) {
      setTableColumns(generateColumns({ t, handleInputChange }));
    }
  }, [isSlotDataPending, t, handleInputChange, dispatch]);

  useEffect(() => {
    if (inputClearTrigger > 0) {
      setInputValues({});
    }
  }, [inputClearTrigger]);

  return (
    <Row gutter={[8, 8]}>
      <Row className={classes.infoWrapper}>
        <Col span={12} className={classes.infoText}>
          <Text>
            <InfoCircleOutlined className={classes.infoIcon} /> {t('BULK_SLOT_UPDATE_INFO')}
          </Text>
        </Col>
        <Col span={12} className={classes.updateSlotCapacityBtn}>
          <Button
            onClick={handleSubmit}
            className={classes.buttonFilter}
          >
            {t('FILTER.UPDATE_SLOT_CAPACITY')}
          </Button>
        </Col>
      </Row>
      <Col span={24}>
        <Table
          key={inputClearTrigger}
          dataSource={arrangedData}
          columns={tableColumns}
          className={classes.tableWrapper}
          rowKey="id"
          loading={isSlotDataPending || isUpdatePending}
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

export default BulkTable;
