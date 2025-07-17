import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import moment from 'moment';
import { Col, DatePicker, Form, Row, Select } from 'antd';

import history from '@shared/utils/history';
import { ROUTE } from '@app/routes';
import SelectEmployee from '@shared/containers/Select/Employee';

import { Creators } from '../../redux/actions';
import { officeAttendanceTrackingEmployeeAttendanceSelector } from '../../redux/selectors';
import { getEmployeeDailyStatStatusOptions, initialValues } from './formHelper';
import { MIN_SEARCH_TERM_LENGTH } from '../../../constants';

function Filters() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['officeAttendanceTracking', 'employeePage', 'global']);

  const isPending = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getDailyStatsIsPending);
  const employee = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getEmployee);

  const employeeDailyStatsStatusOptions = useMemo(() => getEmployeeDailyStatStatusOptions({ t }), [t]);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues,
    onSubmit: () => { },
  });

  const { values, setValues } = formik;

  return (
    <Form form={form} className="mb-2">
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item className="mb-0">
            <DatePicker.RangePicker
              value={[values.startDate as moment.Moment, values.endDate as moment.Moment]}
              className="w-100"
              onOpenChange={(openStatus: boolean) => {
                if (!openStatus) {
                  dispatch(Creators.setDateRangeFilter({
                    startDate: values.startDate,
                    endDate: values.endDate,
                  }));
                }
              }}
              onChange={handleRangePickerOnChange}
              disabled={isPending}
              allowClear={false}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={4} lg={3}>
          <Form.Item className="mb-0">
            <Select
              value={values.status}
              options={employeeDailyStatsStatusOptions}
              onChange={handleEmployeeDailyStatusOnChange}
              placeholder={t('officeAttendanceTracking:EMPLOYEE_DAILY_STAT_STATUS')}
              allowClear
              disabled={isPending}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item className="mb-0">
            <SelectEmployee
              onChange={handleEmployeeSelectOnChange}
              placeholder={t('employeePage:EMPLOYEE')}
              disabled={isPending}
              isShowDefaultSelectableListDropdown={false}
              minCharacterToSearch={MIN_SEARCH_TERM_LENGTH}
              customNotFoundContent={t('employeePage:TYPE_AT_LEAST_X_CHARACTER', { min: MIN_SEARCH_TERM_LENGTH })}
              isClearOptionsAfterDropdownClose
              allowClear={false}
              value={employee?.fullName}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  function handleRangePickerOnChange(dateRange: RangePickerProps.moment) {
    if (dateRange) {
      const startDate = moment(dateRange?.[0]).startOf('day');
      const endDate = moment(dateRange?.[1]).endOf('day');
      setValues({ ...values, startDate, endDate });
    }
  }

  function handleEmployeeDailyStatusOnChange(status: string | undefined) {
    setValues({ ...values, status });
    dispatch(Creators.setStatusFilter({ status }));
  }

  function handleEmployeeSelectOnChange(employeeId: string | undefined) {
    if (employeeId) {
      setValues({ ...values, employee: employee?.fullName });
      const { path } = ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS;
      history.push(path.replace(':employeeId', employeeId));
    }
  }
}

export default Filters;
