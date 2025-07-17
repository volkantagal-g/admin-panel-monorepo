import { memo, useEffect, useMemo } from 'react';
import { Form, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { useFormik } from 'formik';

import { FILTER_FORM } from '@app/pages/Client/Detail/components/MarketOrderTable/Filter/filterFormConstants';
import { Creators } from '@app/pages/Client/Detail/redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import ColumnFieldWrapper from '@shared/shared/forms/ColumnFieldWrapper';
import { getLangKey } from '@shared/i18n';

const OrdersHistoryFilter = ({ filters }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');
  const cities = useSelector(getCitiesSelector.getData);

  const setFilters = data => {
    dispatch(Creators.updateOrdersHistoryFiltersRequest({ data }));
  };

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  const initialValues = useMemo(() => {
    return {
      ...filters,
      dateRange: [filters?.createdAtStart, filters?.createdAtEnd],
    };
  }, [filters]);

  const formik = useFormik({ enableReinitialize: true, initialValues });

  const { values, setFieldValue } = formik;

  const handleCityChange = selectedCityId => {
    setFieldValue('city', selectedCityId);
    setFilters({ ...filters, city: selectedCityId });
  };

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
      setFilters({ ...filters, [fieldName]: selectedItems });
    };
  };
  const handleDateChange = debounce((dates, fieldName) => {
    if (!dates) return;
    setFieldValue(fieldName, dates);
    const [createdAtStart, createdAtEnd] = dates;
    setFilters({
      ...filters,
      createdAtStart: createdAtStart?.startOf('day'),
      createdAtEnd: createdAtEnd?.endOf('day'),
    });
  }, 1000);

  const langKey = getLangKey();

  const { CITY, DOMAIN_TYPE, STATUS, DATE_RANGE } = useMemo(
    () => FILTER_FORM({ t, langKey, cities, filters }),
    [t, langKey, filters, cities],
  );

  return (
    <Form
      form={form}
      initialValues={initialValues}
      className="ant-advanced-search-form"
      layout="vertical"
      data-testid="order-history-filter"
    >
      <Row gutter={24}>
        <ColumnFieldWrapper
          value={values[DATE_RANGE.name]}
          onChange={date => handleDateChange(date, DATE_RANGE.name)}
          {...DATE_RANGE}
        />
        <ColumnFieldWrapper
          value={values[DOMAIN_TYPE.name]}
          onChange={handleSelectChange(DOMAIN_TYPE.name)}
          {...DOMAIN_TYPE}
        />
        <ColumnFieldWrapper
          value={values[CITY.name]}
          onChange={handleCityChange}
          {...CITY}
        />
        <ColumnFieldWrapper
          value={values[STATUS.name]}
          onChange={handleSelectChange(STATUS.name)}
          {...STATUS}
        />
      </Row>
    </Form>
  );
};

export default memo(OrdersHistoryFilter);
