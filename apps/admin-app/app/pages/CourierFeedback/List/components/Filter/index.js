import { useEffect, useMemo } from 'react';
import {
  Row, Col, Collapse, Typography, Select, Button, Input,
  DatePicker,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { Creators } from '../../redux/actions';
import { courierFeedbackOptionsSelector } from '../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { domainTypes } from '@shared/shared/constantValues';
import { formatFilterValues } from '../utils';

const Filter = ({ filters, onFilterChange, onBringClick }) => {
  const { t } = useTranslation(['global', 'courierFeedbackPage']);
  const dispatch = useDispatch();
  const langKey = getLangKey();
  const domainTypesSelectOptions = convertConstantValuesToSelectOptions(domainTypes);

  const { _id } = useSelector(getSelectedCountryV2);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const feedbackOptions = useSelector(courierFeedbackOptionsSelector.getData);
  const isFeedbackOptionsPending = useSelector(courierFeedbackOptionsSelector.getIsPending);

  const handleBringClick = () => {
    const formattedFilters = formatFilterValues(filters);

    onBringClick(formattedFilters);
  };

  useEffect(() => {
    dispatch(CommonCreators.getWarehousesRequest({ countryId: _id }));
    dispatch(Creators.getFeedbackOptionsRequest({ feedbackType: 1 }));
  }, [dispatch, _id]);

  const typeSelectOptions = useMemo(() => {
    if (feedbackOptions) {
      return feedbackOptions.map(option => ({ label: option.name[langKey], value: option._id }));
    }

    return [];
  }, [feedbackOptions, langKey]);

  return (
    <Row gutter={[8, 8]}>
      <Col xs={24}>
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header={t('FILTER')} key="1">
            <Row className="w-100 mb-2" gutter={[8, 8]}>
              <Col xs={24} md={12}>
                <Typography.Text>{t('WAREHOUSE')}</Typography.Text>
                <Select
                  options={warehouses.map(warehouse => ({ label: warehouse.name, value: warehouse._id }))}
                  loading={isWarehousesPending}
                  disabled={isWarehousesPending}
                  className="w-100"
                  onChange={newWarehouseId => onFilterChange(oldFilters => ({ ...oldFilters, warehouse: newWarehouseId }))}
                  value={filters.warehouse}
                  allowClear
                  showSearch
                  filterOption={getSelectFilterOption}
                />
              </Col>
              <Col xs={24} md={12}>
                <Typography.Text>{t('COURIER_NAME')}</Typography.Text>
                <Input
                  placeholder={t('NAME')}
                  value={filters.courierName}
                  onChange={e => onFilterChange(oldFilters => ({ ...oldFilters, courierName: e.target.value }))}
                />
              </Col>
              <Col xs={24} md={12}>
                <Typography.Text>{t('courierFeedbackPage:START_DATE_AND_END_DATE')}</Typography.Text>
                <DatePicker.RangePicker
                  value={filters.dateRange}
                  onChange={value => onFilterChange(oldFilters => ({ ...oldFilters, dateRange: value }))}
                  className="w-100"
                  disabledDate={current => current > moment()}
                />
              </Col>
              <Col xs={24} md={12}>
                <Typography.Text>{t('courierFeedbackPage:OPTION')}</Typography.Text>
                <Select
                  value={filters.feedbackOption}
                  options={typeSelectOptions}
                  onChange={newType => onFilterChange(oldFilters => ({ ...oldFilters, feedbackOption: newType }))}
                  className="w-100"
                  loading={isFeedbackOptionsPending}
                  disabled={isFeedbackOptionsPending}
                  allowClear
                />
              </Col>
              <Col xs={24} md={12}>
                <Typography.Text>{t('DOMAIN_TYPE')}</Typography.Text>
                <Select
                  value={filters.domainType}
                  options={domainTypesSelectOptions}
                  onChange={newType => onFilterChange(oldFilters => ({ ...oldFilters, domainType: newType }))}
                  className="w-100"
                  mode="multiple"
                  allowClear
                  showSearch={false}
                />
              </Col>
            </Row>
            <Row justify="end" className="pr-2">
              <Button
                type="primary"
                htmlType="button"
                onClick={handleBringClick}
                disabled={isWarehousesPending || isFeedbackOptionsPending}
              >{t('BRING')}
              </Button>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
