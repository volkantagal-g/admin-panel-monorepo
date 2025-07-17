import { memo, useEffect, useMemo } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';

import { FILTER_FORM } from '@app/pages/ArtisanOrder/Filter/components/Filter/filterFormConstants';
import { Creators } from '@app/pages/ArtisanOrder/Filter/redux/actions';

import { artisanOrderRootSelector, filtersSelector } from '@app/pages/ArtisanOrder/Filter/redux/selectors';

import '@app/pages/ArtisanOrder/Filter/components/Filter/styles.css';
import { transformValuesForApi } from '@app/pages/ArtisanOrder/Filter/components/Filter/filterUtils';
import ColumnFieldWrapper from '@app/pages/ArtisanOrder/Filter/components/Filter/ColumnFieldWrapper';
import { getLangKey } from '@shared/i18n';

const ArtisanOrderFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('artisanOrderFilterPage');

  const cities = useSelector(artisanOrderRootSelector.getCities);
  const filters = useSelector(filtersSelector.getFilters);
  const paymentMethods = useSelector(artisanOrderRootSelector.getPaymentMethods);

  const formik = useFormik({
    initialValues: {},

    onSubmit: values => {
      const queryParams = transformValuesForApi(values);
      dispatch(Creators.setFilters({ data: queryParams }));
    },
  });

  const { handleSubmit, handleChange, values, setFieldValue } = formik;

  useEffect(() => {
    if (!filters.defaultStartDate) return;
    setFieldValue('startDate', filters.defaultStartDate.startOf('day'));
    setFieldValue('endDate', filters.defaultEndDate.endOf('day'));
  }, [setFieldValue, filters.defaultStartDate, filters.defaultEndDate]);

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
    };
  };

  const handleDateChange = () => {
    return dates => {
      setFieldValue('startDate', dates && dates[0] ? dates[0].startOf('day') : null);
      setFieldValue('endDate', dates && dates[1] ? dates[1].endOf('day') : null);
    };
  };

  const langKey = getLangKey();

  const {
    ARTISAN,
    STATUS,
    DELIVERY_TYPE,
    TIME_TYPE,
    PAYMENT_METHODS,
    CITY,
    PLATFORM,
    CONFIRMATION_CODE,
    START_DATE,
    CHAIN_ORDER_NUMBER,
  } = useMemo(() => FILTER_FORM({ t, langKey, cities, filters, paymentMethods }), [t, langKey, filters, cities, paymentMethods]);

  return (
    <Form
      form={form}
      initialValues={filters}
      className="ant-advanced-search-form filter-form"
      layout="vertical"
    >
      <ColumnFieldWrapper onChange={handleDateChange()} {...START_DATE} />
      <Row gutter={24}>
        <ColumnFieldWrapper value={values[ARTISAN.name]} onChange={handleSelectChange(ARTISAN.name)} {...ARTISAN} />
        <ColumnFieldWrapper value={values[STATUS.name]} onChange={handleSelectChange(STATUS.name)} {...STATUS} />
        <ColumnFieldWrapper value={values[DELIVERY_TYPE.name]} onChange={handleSelectChange(DELIVERY_TYPE.name)} {...DELIVERY_TYPE} />
        <ColumnFieldWrapper value={values[TIME_TYPE.name]} onChange={handleSelectChange(TIME_TYPE.name)} {...TIME_TYPE} />
        <ColumnFieldWrapper value={values[PAYMENT_METHODS.name]} onChange={handleSelectChange(PAYMENT_METHODS.name)} {...PAYMENT_METHODS} />
        <ColumnFieldWrapper value={values[CITY.name]} onChange={handleSelectChange(CITY.name)} {...CITY} />
        <ColumnFieldWrapper value={values[PLATFORM.name]} onChange={handleSelectChange(PLATFORM.name)} {...PLATFORM} />
        <ColumnFieldWrapper value={values[CONFIRMATION_CODE.name]} onChange={handleChange} {...CONFIRMATION_CODE} />
        <ColumnFieldWrapper value={values[CHAIN_ORDER_NUMBER.name]} onChange={handleChange} {...CHAIN_ORDER_NUMBER} />
      </Row>
      <Row>
        <Col
          span={24}
        >
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            {t('global:APPLY')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default memo(ArtisanOrderFilter);
