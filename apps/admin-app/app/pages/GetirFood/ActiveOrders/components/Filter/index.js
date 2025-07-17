import { useCallback, useMemo } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Typography,
  Spin,
  Button,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { debounce, isString } from 'lodash';

import TagOption from '../TagOption';
import { getLangKey } from '@shared/i18n';
import {
  PLATFORM_TYPES,
  FOOD_DELIVERY_TYPES,
  COURIER_TYPES,
  COURIER_TRACKABILITY_TYPES,
} from '@shared/shared/constants';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import {
  paymentMethodsSelector,
  restaurantsSelector,
  filtersSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import useStyles from './styles';
import { searchSelectOption } from '@app/pages/GetirFood/ActiveOrders/utils';

const { Panel } = Collapse;
const { Text } = Typography;

const Filter = () => {
  const { t } = useTranslation(['foodOrderActivePage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const DEFAULT_SELECT_MS = 100;

  const cities = useSelector(getCitiesSelector.getData);
  const cityList = cities.map(tag => {
    return TagOption(tag._id, tag.name[getLangKey()]);
  });
  // main
  const paymentTypes = useSelector(paymentMethodsSelector.getPaymentMethods);

  const selectedCity = useSelector(filtersSelector.getCity);
  const newPagination = useSelector(filtersSelector.getPagination);
  const foodRestaurants = useSelector(restaurantsSelector.getRestaurantsByName);
  const foodRestaurantsPending = useSelector(restaurantsSelector.getRestaurantsByNameIsPending);

  const deliveryTypesList = FOOD_DELIVERY_TYPES.map(tag => {
    const tagText = t(`global:FOOD_DELIVERY_TYPES.${tag}`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const platformTypesList = PLATFORM_TYPES.map(tag => {
    const tagText = t(`global:CHANNEL_PLATFORM.${tag}`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const courierList = COURIER_TYPES.map(tag => {
    const tagText = t(`global:COURIER_TYPES.${tag}`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const courierIsRDUList = COURIER_TRACKABILITY_TYPES.map(tag => {
    const tagText = t(`FILTER.${tag}_COURIER`);
    const customValue = tag.toString();
    return TagOption(customValue, tagText);
  });

  const restaurants = foodRestaurants.map(tag => {
    return TagOption(tag.id, tag.name);
  });

  const paymentTypeList = paymentTypes.map(tag => {
    return TagOption(tag.id, tag.name[getLangKey()]);
  });

  // handle restaurant search
  const handleRestaurantsSearch = useMemo(() => debounce(keyword => {
    if (!isString(keyword) || keyword.length < 2) {
      return dispatch(ToastCreators.error({ message: t('ERROR.SEARCH_MIN_2_CHARS') }));
    }
    return dispatch(Creators.getRestaurantsByNameRequest({ name: keyword, cityIds: selectedCity }));
  }, 600), [dispatch, selectedCity, t]);

  const restaurantsSearch = useCallback(keyword => {
    handleRestaurantsSearch(keyword);
  }, [handleRestaurantsSearch]);

  // handle restaurants change
  const debouncedRestaurantsSelect = useMemo(() => debounce(restaurantsValue => dispatch(
    Creators.setRestaurants({ restaurantsValue }),
  ), DEFAULT_SELECT_MS), [dispatch]);

  const restaurantsSelect = useCallback(restaurantsValue => {
    debouncedRestaurantsSelect(restaurantsValue);
  }, [debouncedRestaurantsSelect]);

  // handle city change
  const debouncedCitySelect = useMemo(() => debounce(city => dispatch(Creators.setCity({ city })), DEFAULT_SELECT_MS), [dispatch]);

  const citySelect = useCallback(city => {
    debouncedCitySelect(city);
  }, [debouncedCitySelect]);

  // handle courierType select
  const debouncedCourierTypeSelect = useMemo(() => debounce(couriers => dispatch(Creators.setCourierTypes({ couriers })), DEFAULT_SELECT_MS), [dispatch]);

  const courierTypeSelect = useCallback(couriers => {
    debouncedCourierTypeSelect(couriers);
  }, [debouncedCourierTypeSelect]);

  // handle deliveryTypeSelect
  const debouncedDeliveryTypeSelect = useMemo(() => debounce(deliveryValue => dispatch(
    Creators.setDeliveryType({ deliveryValue }),
  ), DEFAULT_SELECT_MS), [dispatch]);

  const deliveryTypeSelect = useCallback(deliveryValue => {
    debouncedDeliveryTypeSelect(deliveryValue);
  }, [debouncedDeliveryTypeSelect]);

  // handle platform select
  const debouncedPlatformTypeSelect = useMemo(() => debounce(platformValue => dispatch(
    Creators.setPlatformType({ platformValue }),
  ), DEFAULT_SELECT_MS), [dispatch]);

  const platformTypeSelect = useCallback(platformValue => {
    debouncedPlatformTypeSelect(platformValue);
  }, [debouncedPlatformTypeSelect]);

  // handle paymentTypes select
  const debouncedPaymentTypeSelect = (
    useMemo(() => debounce(pTypes => dispatch(Creators.setPaymentTypes({ paymentTypes: pTypes })), DEFAULT_SELECT_MS), [dispatch])
  );

  const paymentTypeSelect = useCallback(pTypes => {
    debouncedPaymentTypeSelect(pTypes);
  }, [debouncedPaymentTypeSelect]);

  const courierTrackabilityTypeSelect = useCallback(isRDU => {
    dispatch(Creators.setIsRDU({ isRDU }));
  }, [dispatch]);

  const applyFilters = () => {
    dispatch(Creators.setPagination({
      pagination: {
        currentPage: 1,
        rowsPerPage: newPagination.rowsPerPage,
      },
    }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['PAGE_GETIR_FOOD_ACTIVE_ORDERS_FILTER_DEFAULT_TAB']}>
          <Panel header={t('global:FILTER')} key="PAGE_GETIR_FOOD_ACTIVE_ORDERS_FILTER_DEFAULT_TAB">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.RESTAURANTS.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.RESTAURANTS.DESC')}
                    className={classes.filterSelect}
                    onSearch={restaurantsSearch}
                    notFoundContent={foodRestaurantsPending ? <Spin size="small" /> : null}
                    onChange={restaurantsSelect}
                    showArrow
                    allowClear
                    filterOption={false}
                    showSearch
                  >
                    {restaurants}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
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
                <Col span={8}>
                  <Text>{t('FILTER.COURIER_TYPE.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.COURIER_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={courierTypeSelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showArrow={false}
                  >
                    {courierList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.DELIVERY_TYPE.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.DELIVERY_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={deliveryTypeSelect}
                    showArrow
                    allowClear
                  >
                    {deliveryTypesList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.PLATFORM.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.PLATFORM.DESC')}
                    className={classes.filterSelect}
                    onChange={platformTypeSelect}
                    showArrow
                    allowClear
                  >
                    {platformTypesList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.PAYMENT_METHOD.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.PAYMENT_METHOD.DESC')}
                    className={classes.filterSelect}
                    onChange={paymentTypeSelect}
                    filterOption={(inputValue, option) => searchSelectOption({ inputValue, option })}
                    showArrow={false}
                  >
                    {paymentTypeList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.COURIER_TRACKABILITY.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.COURIER_TRACKABILITY.DESC')}
                    className={classes.filterSelect}
                    onChange={courierTrackabilityTypeSelect}
                    showArrow
                    allowClear
                  >
                    {courierIsRDUList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]} justify="end">
                <Col>
                  <Space size="small">
                    <Button type="primary" onClick={applyFilters}>
                      {t('global:FILTER')}
                    </Button>
                  </Space>
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
