import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Collapse, Statistic, Row, Select, Spin, Tooltip } from 'antd';
import type { countdownValueType } from 'antd/es/statistic/utils';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { InfoCircleOutlined } from '@ant-design/icons';

import {
  filtersSelector,
  orderGrowthMonitoringDataSelector,
  orderGrowthMonitoringDataWithWarehouseStatsSelector,
  refreshPageTimerSelector,
} from '@app/pages/Growth/OrderGrowthMonitoring/redux/selectors';
import { TIMER_OPTIONS, domainTypeByKeys } from '../../constants';
import { getLangKey } from '@shared/i18n';
import { convertConstantValueTranslationsToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import {
  availableDomainTypesForCountrySelector,
  getCitiesSelector,
  getFilteredWarehousesSelector,
} from '@shared/redux/selectors/common';
import { usePermission } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { WarehousesType } from '../../orderGrowthMonitoring';

const { Panel } = Collapse;
const { Countdown } = Statistic;

const OrderGrowthMonitoring = () => {
  const { t } = useTranslation(['orderGrowthMonitoring']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { canAccess } = usePermission();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname: url } = useLocation();

  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const isCitiesPending: boolean = useSelector(getCitiesSelector.getIsPending);
  const availableDomainTypes = useSelector(availableDomainTypesForCountrySelector.getDomainTypesV2);

  const isAvailableDomainTypesPending: boolean = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const filteredWarehouses: WarehousesType = useSelector(getFilteredWarehousesSelector.getData);
  const isWarehousesPending: boolean = useSelector(getFilteredWarehousesSelector.getIsPending);
  const orderGrowthMonitoringDataIsPending: boolean = useSelector(orderGrowthMonitoringDataSelector.getIsPending);
  const isOrderGrowthMonitoringWarehouseDataPending: boolean = useSelector(orderGrowthMonitoringDataWithWarehouseStatsSelector.getIsPending);
  const timer = useSelector(refreshPageTimerSelector.getData);
  const filters = useSelector(filtersSelector.getData);
  const deadline: countdownValueType = moment().add(timer, 'milliseconds').valueOf();

  const isDataLoading = filters?.selectedCity ? isOrderGrowthMonitoringWarehouseDataPending : orderGrowthMonitoringDataIsPending;

  const getPermittedDomainTypes = () => {
    const permittedDomainTypes: number[] = [];
    Object.entries(domainTypeByKeys).forEach(([domainType, key]) => {
      if (canAccess(key)) {
        if ((availableDomainTypes || []).includes(Number(domainType))) {
          permittedDomainTypes.push(Number(domainType));
        }
      }
    });
    return permittedDomainTypes;
  };

  const domainTypeOptions = convertConstantValueTranslationsToSelectOptions({
    constants: getPermittedDomainTypes(),
    translationBaseKey: 'global:GETIR_MARKET_DOMAIN_TYPES',
  });
  // Some user who observe the getir water domain type can change it because status of order does not change in 30 seconds
  const getTimerOptions = convertConstantValueTranslationsToSelectOptions({
    constants: TIMER_OPTIONS,
    translationBaseKey: 'orderGrowthMonitoring:REFRESH_TIME_OPTIONS',
  });
  const cityOptions = (cities || []).map((city: {_id: string, name: {tr: string, en: string}}) => ({ value: city._id, label: city.name[getLangKey()] }));

  const warehouseOptions = () => {
    return filteredWarehouses
      .filter(warehouse => warehouse?.city === filters?.selectedCity)
      .filter(warehouseByDomainTypes => warehouseByDomainTypes?.domainTypes?.some((domainType: number) => filters?.selectedDomainTypes?.includes(domainType)))
      .map(warehouse => ({ value: warehouse?._id, label: warehouse?.name }));
  };
  const onRefreshTimerChange = (value: number) => {
    dispatch(Creators.refreshPageTimer({ data: value }));
  };

  const onFinishHandler = () => {
    if (filters?.selectedCity) {
      dispatch(Creators.getOrderGrowthMonitoringWarehouseDataRequest());
    }
    else {
      dispatch(Creators.getOrderGrowthMonitoringDataRequest());
    }
  };

  const onCityChange = (value: string) => {
    if (value) {
      searchParams.set('selectedCity', value);
      navigate(`${url}?${searchParams.toString()}`);
      dispatch(Creators.setFilters({ ...filters, selectedCity: value }));
    }
    else {
      searchParams.delete('selectedCity');
      navigate(`${url}?${searchParams.toString()}`);
      dispatch(Creators.setFilters({ selectedCity: null, selectedDomainTypes: [], selectedWarehouses: [] }));
    }
  };

  const onDomainTypeChange = (value: string) => {
    if (isEmpty(value)) {
      dispatch(Creators.setFilters({ ...filters, selectedDomainTypes: [], selectedWarehouses: [] }));
    }
    else {
      dispatch(Creators.setFilters({ ...filters, selectedDomainTypes: value }));
    }
  };

  const onWarehouseChange = (value: string) => {
    dispatch(Creators.setFilters({ ...filters, selectedWarehouses: value }));
  };

  return (
    <Collapse defaultActiveKey={['orderGrowthMonitoring']}>
      <Panel key="orderGrowthMonitoring" header={t('FILTER')}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder={t('CITY')}
              onChange={onCityChange}
              options={cityOptions}
              value={filters?.selectedCity}
              showArrow
              showSearch
              filterOption={getSelectFilterOption}
              className={classes.fullWidth}
              disabled={isCitiesPending}
              allowClear
              data-testid="city"
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder={t('DOMAIN_TYPE')}
              mode="multiple"
              onChange={onDomainTypeChange}
              options={domainTypeOptions}
              value={filters?.selectedDomainTypes}
              showArrow
              showSearch
              filterOption={getSelectFilterOption}
              className={classes.fullWidth}
              disabled={isAvailableDomainTypesPending}
              allowClear
              maxTagCount={1}
              data-testid="domainType"
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            {filters?.selectedCity && (
            <Select
              placeholder={t('WAREHOUSE')}
              mode="multiple"
              maxTagCount={1}
              value={filters?.selectedWarehouses}
              onChange={onWarehouseChange}
              options={warehouseOptions()}
              showArrow
              showSearch
              filterOption={getSelectFilterOption}
              className={classes.fullWidth}
              disabled={isWarehousesPending}
              allowClear
              data-testid="warehouse"
            />
            )}
          </Col>
          <Col
            xs={24}
            sm={12}
            className={classes.timerContainer}
          >

            <Tooltip
              title={t('REFRESH_TIME_TOOLTIP')}
            >
              <InfoCircleOutlined className={classes.info} />
            </Tooltip>
            <Col>
              {!isDataLoading ? (
                <div className={classes.timer} data-testid="countdown">
                  <Countdown
                    value={deadline}
                    format="mm:ss"
                    onFinish={onFinishHandler}
                  />
                </div>
              ) : <Spin className={classes.spinner} size="default" />}
            </Col>
            <Col>
              <Select
                value={timer}
                options={getTimerOptions}
                data-testid="timer"
                placeholder={t('REFRESH_TIMER')}
                onChange={onRefreshTimerChange}
              />
            </Col>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};

export default OrderGrowthMonitoring;
