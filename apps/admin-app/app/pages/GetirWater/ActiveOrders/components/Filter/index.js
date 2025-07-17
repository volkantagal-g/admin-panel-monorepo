import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Row,
  Col,
  Collapse,
  Space,
  Select,
  Typography,
  Input,
  Button,
} from 'antd';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import {
  brandsSelector,
  vendorsSelector,
  paymentMethodsSelector,
  filterSelector,
} from '../../redux/selectors';
import createSelectOption from '../../../utils/createSelectOption';
import useStyles from './styles';

const { Panel } = Collapse;
const { Text } = Typography;

const MIN_SEARCH_TEXT_LENGTH = 2;

const defaultValues = {
  cityId: undefined,
  brandId: undefined,
  vendorId: undefined,
  paymentType: undefined,
  searchText: undefined,
  page: 0,
  size: 10,
};

const Filter = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(['waterOrderActivePage', 'global']);
  const cities = useSelector(getCitiesSelector.getData);
  const brands = useSelector(brandsSelector.getBrands);
  const vendors = useSelector(vendorsSelector.getVendors);
  const paymentMethods = useSelector(paymentMethodsSelector.getPaymentMethods);
  const filters = useSelector(filterSelector.getFilters);

  const [searchValue, setSearchValue] = useState(undefined);

  const cityList = cities.map(city => {
    return {
      value: city._id,
      label: city.name[getLangKey()],
    };
  });
  const brandList = createSelectOption(brands, 'id', 'brandName');
  const vendorList = createSelectOption(vendors, 'id', 'vendorName');
  const paymentMethodsList = createSelectOption(
    paymentMethods,
    'type',
    'name',
    true,
  );

  useEffect(() => {
    dispatch(Creators.getActiveOrdersRequest({ data: { ...defaultValues } }));
  }, [dispatch]);

  const handleFieldChange = (value, fieldName, isNumber = false) => {
    dispatch(Creators.setFilters({ value, fieldName, isNumber }));
  };

  const handleSearchTextChange = (value, fieldName, isNumber = false, minLength) => {
    setSearchValue(value);
    if (value.length > minLength) {
      dispatch(Creators.setFilters({ value, fieldName, isNumber }));

      return;
    }

    handleFieldChange(undefined, fieldName);
  };

  const handleSearchOnClick = () => {
    dispatch(Creators.getActiveOrdersRequest({ data: filters }));
  };

  const handleClearOnClick = () => {
    dispatch(Creators.resetFilters());
    setSearchValue(undefined);
    dispatch(Creators.getActiveOrdersRequest({ data: defaultValues }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.BRAND.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.BRAND.DESC')}
                    className={classes.filterSelect}
                    options={brandList}
                    onChange={e => handleFieldChange(e, 'brandId')}
                    value={filters.brandId}
                    allowClear
                    showSearch
                    filterOption={getSelectFilterOption}
                  />
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.VENDOR.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.VENDOR.DESC')}
                    className={classes.filterSelect}
                    onChange={e => handleFieldChange(e, 'vendorId')}
                    value={filters.vendorId}
                    options={vendorList}
                    allowClear
                    showSearch
                    filterOption={getSelectFilterOption}
                  />
                </Col>
                <Col span={8}>
                  <Text>{t('FILTER.CITY.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.CITY.DESC')}
                    className={classes.filterSelect}
                    onChange={e => handleFieldChange(e, 'cityId')}
                    value={filters.cityId}
                    allowClear
                    showSearch
                    options={cityList}
                    filterOption={getSelectFilterOption}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Text>{t('FILTER.PAYMENT_METHOD.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.PAYMENT_METHOD.DESC')}
                    className={classes.filterSelect}
                    value={filters.paymentType}
                    options={paymentMethodsList}
                    onChange={e => handleFieldChange(e, 'paymentType', true)}
                    allowClear
                  />
                </Col>
                <Col span={16}>
                  <Text>{t('FILTER.SEARCH.TITLE')}</Text>
                  <Input
                    placeholder={t('FILTER.SEARCH.DESC')}
                    onChange={e => handleSearchTextChange(e.target.value, 'searchText', false, MIN_SEARCH_TEXT_LENGTH)}
                    value={searchValue}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]} justify="end">
                <Col span={24} className={classes.actionButtonsWrapper}>
                  <Space size="small">
                    <Button onClick={handleClearOnClick}>
                      {t('global:CLEAR')}
                    </Button>
                    <Button type="primary" onClick={handleSearchOnClick}>
                      {t('global:SEARCH')}
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
