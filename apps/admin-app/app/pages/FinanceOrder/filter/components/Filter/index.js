import { Button, Col, Collapse, DatePicker, Divider, Form, Input, Row, Select } from 'antd';
import { useFormik } from 'formik';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import { FILTER_DOMAINS, FILTER_STATUSES, MAX_NAME_SURNAME_LENGTH } from '../../constants';
import { Creators } from '../../redux/actions';
import { financeOrderFilterSelector } from '../../redux/selectors';
import { getFormattedSelectOptions } from '../../utils';
import { validationSchema } from './formHelper';
import useStyles from './styles';
import { getLangKey } from '@shared/i18n';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE } from '@shared/shared/constants';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const Filter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('financeOrderFilter');
  const classes = useStyles();
  const [activeKey, setActiveKey] = useState(['1']);
  const { _id } = useSelector(getSelectedCountryV2);
  const cities = useSelector(getCitiesSelector.getData);
  const allWarehouses = useSelector(getWarehousesSelector.getData || []);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const statuses = useMemo(() => getFormattedSelectOptions(FILTER_STATUSES), []);
  const domains = useMemo(() => getFormattedSelectOptions(FILTER_DOMAINS), []);
  const isPending = useSelector(financeOrderFilterSelector.getIsPending);
  const filters = useSelector(financeOrderFilterSelector.getFilters);
  const initialValues = {
    ...filters,
    startCheckoutDate: moment(filters.startCheckoutDate),
    endCheckoutDate: moment(filters.endCheckoutDate),
  };

  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues,
    onSubmit: values => dispatch(Creators.updateFinanceOrderFilterValues(values)),
  });

  const { handleSubmit, errors, values, setFieldValue } = formik;

  const handleStatusChange = code => setFieldValue('status', code);
  const handleDomainChange = code => setFieldValue('domainTypes', code);
  const handleOrderIdChange = e => setFieldValue('orderId', e.target.value);
  const handleFullNameChange = e => setFieldValue('fullName', e.target.value);
  const handleWarehouseIdChange = e => {
    setFieldValue('warehouseId', e.target.value);
  };
  const handleWarehouseSelect = value => {
    setFieldValue('warehouseId', value);
  };
  const handleBarcodeChange = e => setFieldValue('barcode', e.target.value);
  const handleTelNoChange = e => setFieldValue('phoneNumber', e.target.value);
  const onDateRangeChange = dates => {
    const [start, end] = dates;
    setFieldValue('startCheckoutDate', start);
    setFieldValue('endCheckoutDate', end);
  };

  const cityOptions = useMemo(() => {
    return cities.map(city => ({
      value: city._id,
      label: city.name[getLangKey()],
    }));
  }, [cities]);

  const warehouseOptions = useMemo(() => {
    const filteredWarehouses = allWarehouses.filter(
      warehouse => warehouse.city?._id === values.city,
    );

    return filteredWarehouses.map(warehouse => ({
      value: warehouse._id,
      label: warehouse.name,
    }));
  }, [allWarehouses, values.city]);

  const handleCityChange = value => {
    dispatch(Creators.setSelectedCity({ city: value }));
    dispatch(Creators.setSelectedWarehouse({ warehouse: null }));
    setFieldValue('city', value);
    setFieldValue('warehouseId', null);
    if (!value) setFieldValue('warehouseSelect', null);
  };

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getWarehousesRequest({ countryId: _id, domainTypes: [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE] }));
  }, [dispatch, _id]);

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      id="finance-order-filter-form"
    >
      <Row data-testid="filter-component" gutter={[8, 8]}>
        <Col span={24}>
          <Collapse
            activeKey={activeKey}
            onChange={key => {
              setActiveKey(key);
            }}
          >
            <Panel header={t('FILTER')} key="1">
              <Row gutter={6}>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item
                    help={_.get(errors, 'domainTypes')}
                    validateStatus={
                      _.get(errors, 'domainTypes') ? 'error' : 'success'
                    }
                    label={t('DOMAIN')}
                    className={classes.formItem}
                  >
                    <Select
                      placeholder={t('DOMAIN')}
                      options={domains}
                      className={classes.fullWidth}
                      onChange={handleDomainChange}
                      value={values.domainTypes}
                      optionFilterProp="label"
                      disabled={values.barcode}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item
                    help={_.get(errors, 'status')}
                    validateStatus={
                      _.get(errors, 'status') ? 'error' : 'success'
                    }
                    label={t('STATUS')}
                    className={classes.formItem}
                  >
                    <Select
                      placeholder={t('FILTER')}
                      options={statuses}
                      className={classes.fullWidth}
                      onChange={handleStatusChange}
                      value={values.status}
                      optionFilterProp="label"
                    />
                  </Form.Item>
                </Col>
                <Col span={8} md={Date} className={classes.fullWidth}>
                  <Form.Item
                    help={_.get(errors, 'startCheckoutDate')}
                    validateStatus={
                      _.get(errors, 'startCheckoutDate') ? 'error' : 'success'
                    }
                    label={t('DATE')}
                    className={classes.formItem}
                  >
                    <RangePicker
                      defaultValue={[
                        values.startCheckoutDate,
                        values.endCheckoutDate,
                      ]}
                      onChange={onDateRangeChange}
                      className={classes.dateRangePicker}
                      format="DD.MM.YYYY"
                      inputReadOnly
                      allowClear={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={6}>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item
                    label={t('FULL_NAME')}
                    className={classes.formItem}
                  >
                    <Input
                      placeholder={t('FULL_NAME')}
                      onChange={handleFullNameChange}
                      value={values.fullName}
                      maxLength={MAX_NAME_SURNAME_LENGTH}
                      disabled={values.barcode}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item label={t('ORDER_ID')} className={classes.formItem}>
                    <Input
                      placeholder={t('ORDER_ID')}
                      onChange={handleOrderIdChange}
                      value={values.orderId}
                      disabled={values.barcode}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item label={t('BARCODE')} className={classes.formItem}>
                    <Input
                      placeholder={t('BARCODE')}
                      onChange={handleBarcodeChange}
                      value={values.barcode}
                      disabled={values.phoneNumber}
                    />
                  </Form.Item>
                </Col>

                <Col md={8} className={classes.fullWidth}>
                  <Form.Item label={t('TEL_NO')} className={classes.formItem}>
                    <Input
                      placeholder={t('TEL_NO')}
                      onChange={handleTelNoChange}
                      value={values.phoneNumber}
                      disabled={values.barcode}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row gutter={6}>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item
                    label={t('WAREHOUSE_ID')}
                    className={classes.formItem}
                    help={_.get(errors, 'warehouseId')}
                    validateStatus={_.get(errors, 'warehouseId') ? 'error' : 'success'}
                  >
                    <Input
                      placeholder={t('WAREHOUSE_ID')}
                      onChange={handleWarehouseIdChange}
                      value={values.warehouseId}
                      disabled={values.barcode}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item
                    help={_.get(errors, 'city')}
                    validateStatus={_.get(errors, 'city') ? 'error' : 'success'}
                    label={t('CITY')}
                    className={classes.formItem}
                  >
                    <Select
                      placeholder={t('CITY')}
                      options={cityOptions}
                      className={classes.fullWidth}
                      onChange={handleCityChange}
                      value={values.city}
                      optionFilterProp="label"
                      allowClear
                      showSearch
                      loading={isCitiesPending}
                      disabled={isCitiesPending}
                    />
                  </Form.Item>
                </Col>
                <Col md={8} className={classes.fullWidth}>
                  <Form.Item
                    label={t('WAREHOUSE')}
                    className={classes.formItem}
                  >
                    <Select
                      placeholder={t('SELECT_WAREHOUSE')}
                      options={warehouseOptions}
                      value={values.warehouseSelect}
                      className={classes.fullWidth}
                      onChange={handleWarehouseSelect}
                      allowClear
                      optionFilterProp="label"
                      disabled={!values.city}
                      showSearch
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col flex={1}>
                  <Button
                    key="submit"
                    type="primary"
                    form="finance-order-filter-form"
                    htmlType="submit"
                    className={classes.button}
                    loading={isPending}
                  >
                    {t('APPLY')}
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Form>
  );
};

export { Filter };
