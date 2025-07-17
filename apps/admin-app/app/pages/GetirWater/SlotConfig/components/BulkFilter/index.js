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
import { getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import { getWarehouseOptions, getCityOptions } from '@shared/utils/formHelper';
import { filtersSelector } from '../../redux/selectors';

const { Panel } = Collapse;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const BulkFilter = () => {
  const { t } = useTranslation(['getirWaterSlotConfigPage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const DEFAULT_SELECT_MS = 100;
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isPending = useSelector(getWarehousesSelector.getIsPending);
  const dateRangeData = useSelector(filtersSelector.getDateRange);
  const cities = useSelector(getCitiesSelector.getData);

  const [selectedCity, setSelectedCity] = useState(null);

  const warehouseOptions = useMemo(() => {
    const filteredWarehouses = warehouses.filter(warehouse => (
      warehouse.domainTypes.includes(GETIR_DOMAIN_TYPES.VOYAGER) &&
      warehouse.city._id === selectedCity
    ));
    return getWarehouseOptions(filteredWarehouses);
  }, [warehouses, selectedCity]);

  const cityOptions = useMemo(() => {
    return getCityOptions(cities);
  }, [cities]);

  const debouncedCitySelect = useMemo(() => debounce(city => setSelectedCity(city), DEFAULT_SELECT_MS), []);

  const debouncedWarehouseSelect = useMemo(
    () => debounce(warehouseSelections => dispatch(Creators.setWarehouses({ warehouses: warehouseSelections })), DEFAULT_SELECT_MS),
    [dispatch],
  );

  const citySelect = useCallback(city => {
    debouncedCitySelect(city);
  }, [debouncedCitySelect]);

  const warehouseSelect = useCallback(warehouseSelections => {
    debouncedWarehouseSelect(warehouseSelections);
  }, [debouncedWarehouseSelect]);

  const disabledDate = current => {
    const today = moment().startOf('day');
    const thirtyDaysLater = moment().add(30, 'days').endOf('day');
    return current && (current < today || current > thirtyDaysLater);
  };

  const onChange = dates => {
    dispatch(Creators.setDates({ dateRange: dates }));
  };

  const handeApply = () => {
    dispatch(Creators.getBulkSlotDataRequest());
    dispatch(Creators.triggerInputClear());
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={5}>
                  <Text>{t('global:CITY')}</Text>
                  <AntSelect
                    placeholder={t('FILTER.CITY_DESC')}
                    className={classes.filterSelect}
                    onChange={citySelect}
                    showArrow={false}
                    options={cityOptions}
                    allowClear
                    showSearch
                    filterOption={getSelectFilterOption}
                  />
                </Col>
                <Col span={5}>
                  <Text>{t('global:WAREHOUSE')}</Text>
                  <AntSelect
                    mode="multiple"
                    placeholder={t('FILTER.WAREHOUSE_DESC')}
                    className={classes.filterSelect}
                    onChange={warehouseSelect}
                    disabled={isPending || !selectedCity}
                    showArrow={false}
                    allowClear
                    options={warehouseOptions}
                    showSearch
                    filterOption={getSelectFilterOption}
                  />
                </Col>
                <Col span={5}>
                  <Text>{t('global:DATE')}</Text>
                  <RangePicker
                    value={dateRangeData}
                    onChange={onChange}
                    style={{ width: '100%' }}
                    placeholder={t('FILTER.SELECT_SLOT_DATE')}
                    disabledDate={disabledDate}
                  />
                </Col>
                <Col span={3} className={classes.applyFilter}>
                  <Button
                    className={classes.buttonFilter}
                    onClick={handeApply}
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

export default BulkFilter;
