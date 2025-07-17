import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Checkbox, Col, DatePicker, Form, Row } from 'antd';

import { useEffect } from 'react';

import { EMPLOYMENT_STATUSES } from '@app/pages/Employee/constants';
import { getLimitAndOffset } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import { filtersSelector, logsSelector } from '../../redux/selectors';

// Components
import SelectEmployee from '@shared/containers/Select/Employee';
import SelectUser from '@shared/containers/Select/User';
import SelectFieldPath from '../FieldPathSelect';

import useParentStyle from '../../styles';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants';

export default function Filter() {
  const { t } = useTranslation(['employeeLogsPage', 'global']);
  const dispatch = useDispatch();
  const parentClasses = useParentStyle();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();

  const filters = useSelector(filtersSelector.getFilters);
  const pagination = useSelector(filtersSelector.getPagination);
  const isPending = useSelector(logsSelector.getIsPending);

  const employeeId = searchParams.get('employee');

  useEffect(() => {
    if (employeeId) {
      dispatch(Creators.setFilters({ filterData: { employeeId } }));
    }
  }, [dispatch, employeeId]);

  const handleChangeSelectEmployee = (employee: string) => {
    dispatch(Creators.setFilters({ filterData: { employeeId: employee || undefined } }));
    if (employee) {
      searchParams.set('employee', employee);
    }
    else {
      searchParams.delete('employee');
    }
    setSearchParams(searchParams);
  };

  return (
    <Card
      className={[
        parentClasses.cardContainer,
        parentClasses.filterCardContainer,
      ].join(' ')}
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        initialValues={filters}
      >
        <Row gutter={[4, 4]}>
          {/* Date Range */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item className="mb-0">
              <DatePicker.RangePicker
                value={filters?.dateRange}
                allowClear={false}
                className="w-100"
                disabledDate={getDisabledDates}
                onChange={(dateRange: any) => {
                  dispatch(Creators.setFilters({ filterData: { dateRange } }));
                }}
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          {/* Employee */}
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item className="mb-0">
              <SelectEmployee
                value={filters?.employeeId || employeeId}
                isFetchOptionsOnLoad
                allowClear
                shouldPopulateInitialValues
                placeholder={t('employeeLogsPage:FILTERS.EMPLOYEE')}
                onChange={handleChangeSelectEmployee}
                disabled={isPending}
                filters={{
                  employmentStatuses: [
                    EMPLOYMENT_STATUSES.PENDING_HIRE,
                    EMPLOYMENT_STATUSES.WORKING,
                    EMPLOYMENT_STATUSES.ON_LEAVE,
                    EMPLOYMENT_STATUSES.NOT_WORKING,
                    EMPLOYMENT_STATUSES.WITHDRAWN,
                  ],
                }}
              />
            </Form.Item>
          </Col>
          {/* ActionBy */}
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item className="mb-0">
              {/* @ts-ignore */}
              <SelectUser
                value={filters?.actionById}
                // isFetchOptionsOnLoad
                allowClear
                placeholder={t('employeeLogsPage:FILTERS.ACTION_BY')}
                onChange={(actionById: string | undefined) => {
                  dispatch(Creators.setFilters({ filterData: { actionById: actionById || undefined } }));
                }}
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          {/* FieldPath */}
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item className="mb-0">
              <SelectFieldPath
                allowClear
                onChange={({ fieldPath, changeModel }: { fieldPath: string, changeModel: string }) => {
                  const manipulatedValue = fieldPath?.includes('_') ? fieldPath.replace('_', '.') : fieldPath;
                  dispatch(Creators.setFilters({ filterData: { fieldPath: manipulatedValue || undefined, changeModel: changeModel || undefined } }));
                }}
                disabled={isPending}
              />
            </Form.Item>
          </Col>
          {/* Show Integration Logs  */}
          <Col xs={24} sm={12} md={8} lg={4}>
            <Form.Item
              className="mb-0"
              valuePropName="checked"
            >
              <Checkbox
                checked={filters?.showIntegrityLogs}
                onChange={event => {
                  dispatch(Creators.setFilters({ filterData: { showIntegrityLogs: event.target.checked } }));
                }}
                disabled={isPending}
              >
                {t('employeeLogsPage:FILTERS.SHOW_INTEGRATION_LOGS')}
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[4, 4]} justify="end">
          <Col>
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isPending}
              >
                {t('global:FILTER')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  function handleFormSubmit() {
    const paginationData = { currentPage: DEFAULT_PAGE, rowsPerPage: pagination?.rowsPerPage || DEFAULT_PAGE_SIZE };
    dispatch(Creators.setPagination({ paginationData }));
    dispatch(Creators.filterEmployeeLogsRequest({
      filters: {
        ...filters,
        ...getLimitAndOffset(paginationData),
      },
    }));
  }

  function getDisabledDates(current: moment.Moment) {
    const startDate = filters?.dateRange[0];
    const endDate = filters?.dateRange[1];
    if (!startDate || !endDate) return false;

    // Start date seçildiyse, bitiş tarihi 1 ay sonrası olmalı
    const maxEndDate = moment(startDate).add(1, 'month');
    const minStartDate = moment(endDate).subtract(1, 'month');

    // End date seçildiyse, başlangıç tarihi 1 ay öncesi olmalı
    if (current.isBefore(minStartDate, 'day') || current.isAfter(maxEndDate, 'day')) {
      return true;
    }

    return false;
  }
}
