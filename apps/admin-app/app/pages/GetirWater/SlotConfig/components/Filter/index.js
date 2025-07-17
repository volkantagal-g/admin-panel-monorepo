import { useCallback, useMemo, useState } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Typography,
  DatePicker,
  Button,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import moment from 'moment';

import AntSelect from '@shared/components/UI/AntSelect';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import { getWarehouseOptions } from '@shared/utils/formHelper';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = () => {
  const { t } = useTranslation(['getirWaterSlotConfigPage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const DEFAULT_SELECT_MS = 100;
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isPending = useSelector(getWarehousesSelector.getIsPending);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const warehouseOptions = useMemo(() => {
    return getWarehouseOptions(warehouses.filter(warehouse => warehouse.domainTypes.includes(GETIR_DOMAIN_TYPES.VOYAGER)));
  }, [warehouses]);

  const debouncedWarehouseSelect = (
    useMemo(() => debounce(warehouse => dispatch(Creators.setWarehouse({ warehouse })), DEFAULT_SELECT_MS), [dispatch])
  );

  const warehouseSelect = useCallback(warehouse => {
    setSelectedWarehouse(warehouse);
    debouncedWarehouseSelect(warehouse);
  }, [debouncedWarehouseSelect]);

  const disabledDate = current => {
    return current && current < moment().subtract(1, 'days').endOf('day');
  };

  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={5}>
                  <Text>{t('global:WAREHOUSE')}</Text>
                  <AntSelect
                    placeholder={t('FILTER.WAREHOUSE_DESC')}
                    className={classes.filterSelect}
                    onChange={warehouseSelect}
                    disabled={isPending}
                    showArrow
                    allowClear
                    options={warehouseOptions}
                    showSearch
                    filterOption={getSelectFilterOption}
                  />
                </Col>
                <Col span={5}>
                  <Text>{t('global:DATE')}</Text>
                  <DatePicker
                    onChange={onChange}
                    style={{ width: '100%' }}
                    placeholder={t('FILTER.SELECT_SLOT_DATE')}
                    disabledDate={disabledDate}
                  />
                </Col>
                <Col span={3} className={classes.applyFilter}>
                  <Button
                    className={classes.buttonFilter}
                    onClick={() => dispatch(Creators.getWarehouseSlotDataRequest({ id: selectedWarehouse, date: selectedDate }))}
                  >
                    {t('FILTER.APPLY')}
                  </Button>
                </Col>
              </Row>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
