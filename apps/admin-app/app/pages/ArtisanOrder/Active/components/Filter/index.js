import { useCallback, useMemo } from 'react';
import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Typography,
  Input,
  Spin,
  Switch,
  Divider,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { debounce, isString } from 'lodash';

import TagOption from '../TagOption';
import { getLangKey } from '@shared/i18n';
import {
  artisanActiveOrderStatusesWithQueue,
  lastActivityDiff,
  courierDomainTypes,
} from '../../constants';
import {
  PLATFORM_TYPES,
  LOCALS_DELIVERY_TYPES,
  COURIER_TYPES,
} from '@shared/shared/constants';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import {
  paymentMethodsSelector,
  shopsSelector,
  filtersSelector,
  merchantTypesSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import useStyles from './styles';
import { filterOption } from '../DataTable/utils';

const { Panel } = Collapse;
const { Text } = Typography;
const { Search } = Input;

const Filter = () => {
  const { t } = useTranslation(['artisanOrderActivePage', 'global']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const DEFAULT_SELECT_MS = 100;
  const DEFAULT_TOGGLE_MS = 170;

  const cities = useSelector(getCitiesSelector.getData);
  const cityList = cities.map(tag => {
    return TagOption(tag._id, tag.name[getLangKey()]);
  });
  // main
  const paymentTypes = useSelector(paymentMethodsSelector.getPaymentMethods);
  const merchantTypes = useSelector(merchantTypesSelector.getMerchantTypes);

  const selectedCity = useSelector(filtersSelector.getCity);
  const localsShops = useSelector(shopsSelector.getShopsByName);
  const localShopsPending = useSelector(shopsSelector.getShopsByNameIsPending);

  // filter
  const searchedValue = useSelector(filtersSelector.getSearchValue);

  const deliveryTypesList = LOCALS_DELIVERY_TYPES.map(tag => {
    const tagText = t(`global:LOCALS_DELIVERY_TYPES.${tag}`);
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

  const courierDomainList = courierDomainTypes.map(tag => {
    const tagText = t(`global:COURIER_DOMAIN_TYPES.${tag.name}`);
    const customValue = tag.value.toString();
    return TagOption(customValue, tagText);
  });

  const lastActivityList = lastActivityDiff.map(tag => {
    const tagText = tag.name;
    const customValue = tag.value.toString();
    return TagOption(customValue, tagText);
  });

  const shops = localsShops.map(tag => {
    return TagOption(tag.id, tag.name);
  });

  const paymentTypeList = paymentTypes.map(tag => {
    return TagOption(tag.id, tag.name[getLangKey()]);
  });

  const orderStatusList = artisanActiveOrderStatusesWithQueue.map(tag => {
    const tagText = tag[getLangKey()];
    const customValue = tag.value.toString();
    return TagOption(customValue, tagText);
  });

  const merchantTypeList = merchantTypes.map(tag => TagOption(tag.uid, tag.name));

  // handle search value
  const handleSearchValue = useMemo(() => debounce(searchValue => {
    if (searchValue === searchedValue) {
      return;
    }
    dispatch(Creators.setSearchValue({ searchValue }));
  }, 100), [dispatch, searchedValue]);

  const searchValue = useCallback(val => {
    handleSearchValue(val);
  }, [handleSearchValue]);

  // handle locals search
  const handleLocalsSearch = useMemo(() => debounce(keyword => {
    if (!isString(keyword) || keyword.length < 2) {
      return dispatch(ToastCreators.error({ message: t('ERROR.SEARCH_MIN_2_CHARS') }));
    }
    return dispatch(Creators.getShopsByNameRequest({ name: keyword, cityIds: selectedCity }));
  }, 600), [dispatch, selectedCity, t]);

  const localsSearch = useCallback(keyword => {
    handleLocalsSearch(keyword);
  }, [handleLocalsSearch]);

  // handle locals change
  const debouncedLocalsSelect = useMemo(() => debounce(localsValue => dispatch(Creators.setLocals({ localsValue })), DEFAULT_SELECT_MS), [dispatch]);

  const localsSelect = useCallback(localsValue => {
    debouncedLocalsSelect(localsValue);
  }, [debouncedLocalsSelect]);

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
  const debouncedDeliveryTypeSelect = (
    useMemo(() => debounce(deliveryValue => dispatch(Creators.setDeliveryType({ deliveryValue })), DEFAULT_SELECT_MS), [dispatch])
  );

  const deliveryTypeSelect = useCallback(deliveryValue => {
    debouncedDeliveryTypeSelect(deliveryValue);
  }, [debouncedDeliveryTypeSelect]);

  // handle platform select
  const debouncedPlatformTypeSelect = (
    useMemo(() => debounce(platformValue => dispatch(Creators.setPlatformType({ platformValue })), DEFAULT_SELECT_MS), [dispatch])
  );

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

  // handle orderStatusSelect
  const debouncedOrderStatusSelect = (
    useMemo(() => debounce(orderStatusTypes => dispatch(Creators.setOrderStatusTypes({ orderStatusTypes })), DEFAULT_SELECT_MS), [dispatch])
  );

  const orderStatusSelect = useCallback(orderStatusTypes => {
    debouncedOrderStatusSelect(orderStatusTypes);
  }, [debouncedOrderStatusSelect]);

  // handle merchantTypeSelect
  const debouncedMerchantTypeSelect = (
    useMemo(() => debounce(mTypes => dispatch(Creators.setMerchantTypes({ merchantTypes: mTypes })), DEFAULT_SELECT_MS), [dispatch])
  );

  const merchantTypeSelect = useCallback(mTypes => {
    debouncedMerchantTypeSelect(mTypes);
  }, [debouncedMerchantTypeSelect]);

  // handle courierDomainType select
  const debouncedCourierDomainTypeSelect = (
    useMemo(() => debounce(domainType => dispatch(Creators.setCourierDomainTypes({ domainType })), DEFAULT_SELECT_MS), [dispatch])
  );

  const courierDomainTypeSelect = useCallback(domainType => {
    debouncedCourierDomainTypeSelect(domainType);
  }, [debouncedCourierDomainTypeSelect]);

  // handle lastActivity select
  const debouncedLastActivitySelect = (
    useMemo(() => debounce(lastActivity => dispatch(Creators.setLastActivity({ lastActivity })), DEFAULT_SELECT_MS), [dispatch])
  );

  const lastActivitySelect = useCallback(lastActivity => {
    debouncedLastActivitySelect(lastActivity);
  }, [debouncedLastActivitySelect]);

  // handle retail order filter toggle

  const debouncedFilterRetailOrders = (
    useMemo(() => debounce(isFilterOn => dispatch(Creators.setFilterRetailOrders({ filterRetailOrders: isFilterOn })), DEFAULT_TOGGLE_MS), [dispatch])
  );

  // handle scheduled order filter toggle

  const debouncedFilterScheduledOrders = (
    useMemo(() => debounce(isFilterOn => dispatch(Creators.setFilterScheduledOrders({ filterScheduledOrders: isFilterOn })), DEFAULT_TOGGLE_MS), [dispatch])
  );

  const filterRetailOrders = useCallback(isFilterOn => {
    debouncedFilterRetailOrders(isFilterOn);
  }, [debouncedFilterRetailOrders]);

  const filterScheduledOrders = useCallback(isFilterOn => {
    debouncedFilterScheduledOrders(isFilterOn);
  }, [debouncedFilterScheduledOrders]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.LOCALS.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.LOCALS.DESC')}
                    className={classes.filterSelect}
                    onSearch={localsSearch}
                    notFoundContent={localShopsPending ? <Spin size="small" /> : null}
                    onChange={localsSelect}
                    showArrow
                    allowClear
                    filterOption={false}
                    showSearch
                  >
                    {shops}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('global:CITY')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.CITY_DESC')}
                    className={classes.filterSelect}
                    onChange={citySelect}
                    showArrow={false}
                    allowClear
                    filterOption={(input, option) => filterOption(input, option)}
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
                    showArrow={false}
                    filterOption={(input, option) => filterOption(input, option)}
                  >
                    {courierList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
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
                    showArrow={false}
                    filterOption={(input, option) => filterOption(input, option)}
                  >
                    {paymentTypeList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.STATUS.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.STATUS.DESC')}
                    className={classes.filterSelect}
                    onChange={orderStatusSelect}
                    showArrow={false}
                    allowClear
                    filterOption={(input, option) => filterOption(input, option)}
                  >
                    {orderStatusList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.DOMAIN_TYPE.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.DOMAIN_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={courierDomainTypeSelect}
                    showArrow
                    allowClear
                  >
                    {courierDomainList}
                  </Select>
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.LAST_ACTIVITY.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.LAST_ACTIVITY.DESC')}
                    className={classes.filterSelect}
                    onChange={lastActivitySelect}
                    showArrow={false}
                    allowClear
                  >
                    {lastActivityList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.MERCHANT_TYPE.TITLE')}</Text>
                  <Select
                    mode="multiple"
                    placeholder={t('FILTER.MERCHANT_TYPE.DESC')}
                    className={classes.filterSelect}
                    onChange={merchantTypeSelect}
                    showArrow={false}
                    allowClear
                    filterOption={(input, option) => filterOption(input, option)}
                  >
                    {merchantTypeList}
                  </Select>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Text>{t('global:SEARCH')}</Text>
                  <Search
                    placeholder={t('FILTER.CUSTOMER_LOCALS_COURIER_PROMO_SEARCH')}
                    onSearch={searchValue}
                    enterButton
                    allowClear
                    data-testid="promoCodeSearchFilter"
                  />
                </Col>
              </Row>
              <Divider className={classes.divider} />
              <Row gutter={[8, 8]}>
                <Col sm={8} lg={8} xl={4}>
                  <div className={classes.filterToggle}>
                    {t('FILTER.IS_ORDER_RETAIL.TITLE')}
                    <Switch onChange={filterRetailOrders} />
                  </div>
                </Col>
                <Col sm={8} lg={8} xl={4}>
                  <div className={classes.filterToggle}>
                    {t('FILTER.IS_ORDER_SCHEDULED.TITLE')}
                    <Switch onChange={filterScheduledOrders} />
                  </div>
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
