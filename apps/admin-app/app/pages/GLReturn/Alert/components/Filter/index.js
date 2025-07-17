import { useCallback, useMemo } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import TagOption from '../TagOption';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import { ALERT_TYPES } from '../../constants';
import { filtersSelector } from '../../redux/selectors';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = () => {
  const { t } = useTranslation(['glReturnAlertPage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const DEFAULT_SELECT_MS = 100;

  const cities = useSelector(getCitiesSelector.getData);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isPending = useSelector(getWarehousesSelector.getIsPending);
  const selectedCity = useSelector(filtersSelector.getCity);

  const cityList = cities.map(tag => {
    return TagOption(tag._id, tag.name[getLangKey()]);
  });

  const warehouseList = warehouses.map(tag => {
    if (selectedCity) {
      return (tag.acceptReturns && tag.city._id === selectedCity) ? TagOption(tag._id, tag.name) : null;
    }
    return tag.acceptReturns ? TagOption(tag._id, tag.name) : null;
  });

  const alertTypeList = ALERT_TYPES.map(tag => {
    const tagText = tag[getLangKey()];
    const customValue = tag.value;
    return TagOption(customValue, tagText);
  });

  const debouncedCitySelect = (
    useMemo(() => debounce(city => dispatch(Creators.setCity({ city })), DEFAULT_SELECT_MS), [dispatch])
  );

  const debouncedWarehouseSelect = (
    useMemo(() => debounce(warehouse => dispatch(Creators.setWarehouse({ warehouse })), DEFAULT_SELECT_MS), [dispatch])
  );

  const debouncedAlertTypeSelect = (
    useMemo(() => debounce(alertMessage => dispatch(Creators.setAlertType({ alertMessage })), DEFAULT_SELECT_MS), [dispatch])
  );

  const citySelect = useCallback(city => {
    debouncedCitySelect(city);
  }, [debouncedCitySelect]);

  const warehouseSelect = useCallback(warehouse => {
    debouncedWarehouseSelect(warehouse);
  }, [debouncedWarehouseSelect]);

  const alertTypeSelect = useCallback(alertMessage => {
    debouncedAlertTypeSelect(alertMessage);
  }, [debouncedAlertTypeSelect]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={5}>
                  <Text>{t('global:CITY')}</Text>
                  <Select
                    placeholder={t('FILTER.CITY_DESC')}
                    className={classes.filterSelect}
                    onChange={citySelect}
                    showArrow
                    allowClear
                  >
                    {cityList}
                  </Select>
                </Col>
                <Col span={5}>
                  <Text>{t('global:WAREHOUSE')}</Text>
                  <Select
                    placeholder={t('FILTER.WAREHOUSE_DESC')}
                    className={classes.filterSelect}
                    onChange={warehouseSelect}
                    disabled={isPending}
                    showArrow
                    allowClear
                  >
                    {warehouseList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.ALERT_TYPE.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.ALERT_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={alertTypeSelect}
                    showArrow
                    allowClear
                  >
                    {alertTypeList}
                  </Select>
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
