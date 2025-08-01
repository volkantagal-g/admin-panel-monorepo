import { useMemo } from 'react';
import { Col, Row } from 'antd';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import {
  Space,
  Select,
  TextInput,
  RangePicker,
  Button,
} from '@shared/components/GUI';
import { filterSelector, marketBasketsSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import {
  deviceTypeOptions,
  domainTypeOptions,
  getInitialValues,
  statusOptions,
} from './formHelpers';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';

const BasketFilter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['marketBasketListPage', 'orderFilterPage']);
  const {
    domainType,
    selectedDateRange: { startDate, endDate },
    city,
    pagination,
    statuses,
    deviceTypes,
    clientId,
  } = useSelector(filterSelector.getFilters) ?? {};
  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isPending = useSelector(marketBasketsSelector.getIsPending);

  const cityOptions = useMemo(() => {
    return cities.map(({ _id, name }) => ({
      value: _id,
      label: name?.[getLangKey()],
    }));
  }, [cities]);

  const initialValues = useMemo(
    () => getInitialValues({
      domainType,
      startDate,
      endDate,
      pagination,
      statuses,
      city,
      deviceTypes,
      clientId,
    }),
    [
      domainType,
      startDate,
      endDate,
      pagination,
      statuses,
      city,
      deviceTypes,
      clientId,
    ],
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      const {
        date,
        deviceTypes: selectedDeviceTypes,
        statuses: selectedStatuses,
        city: cityId,
        domainType: selectedDomainType,
        clientId: clientIdValue,
        pagination: { currentPage: page, rowsPerPage: limit },
      } = values;
      const [start, end] = date;
      dispatch(Creators.getMarketBasketsRequest({
        startDateTime: moment(start).startOf('day').toISOString(),
        endDateTime: moment(end).endOf('day').toISOString(),
        cityId,
        statuses: selectedStatuses,
        clientId: clientIdValue,
        page,
        limit,
        deviceTypes: selectedDeviceTypes,
        domainType: selectedDomainType,
      }));
    },
  });

  const { values, setFieldValue, handleSubmit } = formik;

  return (
    <Space>
      <Row gutter={[24, 24]} className="my-3">
        <Col xs={24} md={8}>
          <RangePicker
            value={values.date}
            onChange={value => {
              setFieldValue('date', value);
            }}
            disabledDate={today => today && today > moment().endOf('day')}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select
            label={t('global:STATUS')}
            onChange={value => setFieldValue('statuses', value)}
            value={values.statuses}
            mode="multiple"
            allowClear
            optionsData={statusOptions}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select
            label={t('global:DOMAIN')}
            onChange={value => setFieldValue('domainType', value)}
            value={values.domainType}
            allowClear
            optionsData={domainTypeOptions}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select
            label={t('orderFilterPage:DEVICE_TYPES')}
            value={values.deviceTypes}
            mode="multiple"
            onChange={value => setFieldValue('deviceTypes', value)}
            allowClear
            optionsData={deviceTypeOptions}
          />
        </Col>
        <Col xs={24} md={8}>
          <Select
            label={t('global:CITY')}
            value={values.city}
            onChange={value => setFieldValue('city', value)}
            allowClear
            showSearch
            optionFilterProp="label"
            filterOption={getSelectFilterOption}
            optionsData={cityOptions}
            loading={isCitiesPending}
          />
        </Col>
        <Col xs={24} md={8}>
          <TextInput
            label={t('orderFilterPage:CLIENT_ID')}
            value={values.clientId}
            onChange={({ target }) => setFieldValue('clientId', target.value)}
          />
        </Col>
        <Col span={24} className="mt-1">
          <Button type="primary" disabled={isPending} size="small" onClick={handleSubmit}>{t('global:FILTER')}</Button>
        </Col>
      </Row>
    </Space>
  );
};

export default BasketFilter;
