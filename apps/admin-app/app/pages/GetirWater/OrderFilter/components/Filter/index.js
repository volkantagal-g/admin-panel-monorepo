import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Collapse, Space, Select, Typography, Button, DatePicker, Input } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { createSelectOption } from '@app/pages/GetirWater/utils';
import { getSelectFilterOption } from '@shared/utils/common';

import { brandsSelector, vendorsSelector, paymentMethodsSelector, filterSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

import useStyles from './styles';
import { FILTER_FORM, findOrderStatusValues } from './filterFormConstants';

const { Panel } = Collapse;
const { Text } = Typography;
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const Filter = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation(['getirWaterOrderFilter', 'global']);
  const cities = useSelector(getCitiesSelector.getData);
  const brands = useSelector(brandsSelector.getBrands);
  const vendors = useSelector(vendorsSelector.getVendors);
  const paymentMethods = useSelector(paymentMethodsSelector.getPaymentMethods);
  const filters = useSelector(filterSelector.getFilters);

  const brandList = createSelectOption(brands, 'id', 'brandName');
  const vendorList = createSelectOption(vendors, 'id', 'vendorName');
  const paymentMethodsList = createSelectOption(paymentMethods, 'type', 'name', true);
  const cityList = cities.map(city => {
    return ({
      value: city._id,
      label: city.name[getLangKey()],
    });
  });

  const langKey = getLangKey();

  const filterForm = FILTER_FORM({ t, langKey });

  const updateFilters = (value, fieldName, isNumber) => {
    dispatch(Creators.setFilters({ value, fieldName, isNumber }));
  };

  const handleFieldChange = (value, fieldName, isNumber = false) => {
    updateFilters(value, fieldName, isNumber);
  };

  const handleDateChange = dates => {
    if (dates) {
      const [startDate, endDate] = dates;
      handleFieldChange(moment(startDate).startOf('day'), 'startDate');
      handleFieldChange(moment(endDate).endOf('day'), 'endDate');

      return;
    }
    handleFieldChange(null, 'startDate');
    handleFieldChange(null, 'endDate');
  };

  const handleSearchOnClick = () => {
    const statusValues = findOrderStatusValues(filters.status);
    const data = _.omit(filters, ['status']);

    dispatch(
      Creators.filterOrdersRequest({
        data: {
          ...data,
          ...statusValues,
        },
      }),
    );
  };

  const handleClearOnClick = () => {
    dispatch(Creators.resetFilters({}));
    dispatch(
      Creators.filterOrdersRequest({
        data: {
          page: 1,
          count: 10,
        },
      }),
    );
  };

  return (
    <Row gutter={[8, 8]} data-testid="orderFilter">
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('global:FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Row gutter={[8, 8]}>
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                  <Text>{t('global:DATE')}</Text>
                  <RangePicker
                    className={classes.filterSelect}
                    value={[filters.startDate, filters.endDate]}
                    onChange={handleDateChange}
                    format={dateFormat}
                    data-testid="dateRangePicker"
                  />
                </Col>
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
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
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                  <Text>{t('FILTER.VENDOR.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.VENDOR.DESC')}
                    className={classes.filterSelect}
                    options={vendorList}
                    onChange={e => handleFieldChange(e, 'vendorId')}
                    value={filters.vendorId}
                    allowClear
                    showSearch
                    filterOption={getSelectFilterOption}
                  />
                </Col>
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                  <Text>{t('FILTER.STATUS.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.STATUS.DESC')}
                    className={classes.filterSelect}
                    options={filterForm.STATUS.options}
                    onChange={e => handleFieldChange(e, 'status')}
                    value={filters.status}
                    allowClear
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                  <Text>{t('FILTER.TIME_TYPE.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.TIME_TYPE.DESC')}
                    className={classes.filterSelect}
                    options={filterForm.TIME_TYPE.options}
                    onChange={e => handleFieldChange(e, 'timeType', true)}
                    value={filters.timeType}
                    allowClear
                  />
                </Col>
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
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
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                  <Text>{t('FILTER.PAYMENT_METHOD.TITLE')}</Text>
                  <Select
                    placeholder={t('FILTER.PAYMENT_METHOD.DESC')}
                    className={classes.filterSelect}
                    options={paymentMethodsList}
                    onChange={e => handleFieldChange(e, 'paymentMethod', true)}
                    value={filters.paymentMethod}
                    allowClear
                  />
                </Col>
                <Col lg={{ span: 6 }} xs={{ span: 12 }}>
                  <Text>{t('FILTER.CONFIRMATION_CODE.TITLE')}</Text>
                  <Input
                    placeholder={t('FILTER.CONFIRMATION_CODE.DESC')}
                    className={classes.filterSelect}
                    onChange={e => handleFieldChange(e.target.value, 'confirmationCode')}
                    value={filters.confirmationCode}
                  />
                </Col>
              </Row>
              <Row gutter={[8, 8]} justify="end">
                <Col span={24} className={classes.actionButtonsWrapper}>
                  <Space size="small">
                    <Button onClick={handleClearOnClick}>{t('global:CLEAR')}</Button>
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
