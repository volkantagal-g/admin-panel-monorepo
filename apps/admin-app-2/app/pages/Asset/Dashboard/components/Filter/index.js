import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Select, Button } from 'antd';

import { useFormik } from 'formik';

import { useEffect, useState } from 'react';

import useStyles from './styles';

import { formatFiltersBeforeSubmit, getInitialValues } from './filterHelper';
import { IT_ASSET_TYPE_OPTIONS, ASSET_COUNTRY_OPTIONS, SELECT_ALL_OPTION_VALUE, ASSET_RENTAL_OPTIONS } from '@app/pages/Asset/constants';

const { Item } = Form;
const { Option } = Select;

const Filter = ({ filters, onFiltersChange }) => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation(['assetPage', 'global']);
  const [deviceTypeOptions, setDeviceTypeOptions] = useState(IT_ASSET_TYPE_OPTIONS(t));
  const [countryOptions, setCountryOptions] = useState(ASSET_COUNTRY_OPTIONS(t));
  const [rentalOptions, setRentalOptions] = useState(ASSET_RENTAL_OPTIONS(t));

  const formik = useFormik({
    initialValues: getInitialValues(filters),
    enableReinitialize: true,
    onSubmit: values => {
      onFiltersChange(formatFiltersBeforeSubmit(values));
    },
  });

  const { handleSubmit, values, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    setDeviceTypeOptions(IT_ASSET_TYPE_OPTIONS(t));
    setCountryOptions(ASSET_COUNTRY_OPTIONS(t));
    setRentalOptions(ASSET_RENTAL_OPTIONS(t));
  }, [t]);

  const fieldNameAndOptionsMap = {
    deviceType: deviceTypeOptions,
    country: countryOptions,
    rental: rentalOptions,
  };

  const handleMultiSelectFiltersChange = fieldName => selectedOptions => {
    const currentOptions = fieldNameAndOptionsMap[fieldName];
    if (selectedOptions.includes(SELECT_ALL_OPTION_VALUE)) {
      setFieldValue(fieldName, currentOptions.map(({ value }) => value));
    }
    else {
      setFieldValue(fieldName, selectedOptions);
    }
  };

  return (

    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row gutter={[8, 8]}>
        <Col lg={{ span: 6 }} xs={{ span: 12 }}>
          <Item
            className={classes.formItem}
            name={['country']}
            label={t('COUNTRY')}
          >
            <Select
              showSearch
              filterOption
              optionFilterProp="children"
              value={values.country}
              placeholder={t('COUNTRY')}
              onChange={handleMultiSelectFiltersChange('country')}
              allowClear
              mode="multiple"
              className={classes.slectHeight}
            >
              <Option key={SELECT_ALL_OPTION_VALUE} value={SELECT_ALL_OPTION_VALUE}>
                {t('SELECT_ALL')}
              </Option>
              {countryOptions.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>
        <Col lg={{ span: 6 }} xs={{ span: 12 }}>
          <Item className={classes.formItem} label={t('DEVICE_TYPE')}>
            <Select
              showSearch
              filterOption
              optionFilterProp="children"
              value={values.deviceType}
              placeholder={t('DEVICE_TYPE')}
              onChange={handleMultiSelectFiltersChange('deviceType')}
              allowClear
              mode="multiple"
              className={classes.slectHeight}
            >
              <Option key={SELECT_ALL_OPTION_VALUE} value={SELECT_ALL_OPTION_VALUE}>
                {t('SELECT_ALL')}
              </Option>
              {deviceTypeOptions.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>
        <Col lg={{ span: 6 }} xs={{ span: 12 }}>
          <Item
            className={classes.formItem}
            name={['rental']}
            label={t('IT_ASSET_DASHBOARD.RENTAL_FILTER')}
          >
            <Select
              showSearch
              filterOption
              optionFilterProp="children"
              value={values.rental}
              placeholder={t('IT_ASSET_DASHBOARD.RENTAL_FILTER')}
              onChange={handleMultiSelectFiltersChange('rental')}
              allowClear
              mode="multiple"
              className={classes.slectHeight}
            >
              <Option key={SELECT_ALL_OPTION_VALUE} value={SELECT_ALL_OPTION_VALUE}>
                {t('SELECT_ALL')}
              </Option>
              {rentalOptions.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>
        <Col lg={{ span: 6 }} xs={{ span: 12 }}>
          <Item className={classes.filterButton}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
            >{t('global:FILTER')}
            </Button>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
