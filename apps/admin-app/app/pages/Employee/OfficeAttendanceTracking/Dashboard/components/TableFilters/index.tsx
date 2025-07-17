import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Button, Tooltip } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';

import moment from 'moment';

import { usePermission } from '@shared/hooks';
import SelectEmployee from '@shared/containers/Select/Employee';
import permKey from '@shared/shared/permKey.json';
import { isScreenSizeLarge } from '@shared/utils/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import {
  dataUpdateDatesSelector,
  filtersSelector,
  officeAttendanceTrackingFetchAndExportEmployeeStatsToCSVSelector,
} from '../../redux/selectors';
import { CSV_DOWNLOAD_MAX_DATE_INTERVAL_IN_DAYS, MIN_SEARCH_TERM_LENGTH } from '../../../constants';
import {
  validationSchema,
  initialValues,
  manipulateValuesBeforeSubmit,
  getEmployeeDailyStatStatusOptions,
  getDailyStatsInviteStatusOptions,
  getPermitTypeOptions,
} from './formHelper';
import useStyles from './styles';
import { Creators } from '../../redux/actions';

type EmployeeOfficeAttendanceTrackingDashboardTableFiltersPropsType = {
  onSubmit?: Function;
  onChange?: Function;
  isSingleDay: boolean;
};

const EmployeeOfficeAttendanceTrackingDashboardTableFilters = (
  {
    onSubmit,
    onChange,
    isSingleDay,
  }: EmployeeOfficeAttendanceTrackingDashboardTableFiltersPropsType,
) => {
  const { t } = useTranslation(['officeAttendanceTracking', 'employeePage', 'global']);
  const isLargeScreen: boolean = isScreenSizeLarge();
  const buttonSize: string = isLargeScreen ? 'large' : 'default';
  const selectComponentSize = isLargeScreen ? 'large' : 'middle';
  const classes = useStyles({ theme: { isLargeScreen } });
  const { Can } = usePermission();
  const dispatch = useDispatch();

  const fetchAndExportEmployeeStatsToCSVIsPending = useSelector(officeAttendanceTrackingFetchAndExportEmployeeStatsToCSVSelector.getIsPending);
  const dataUpdateDates = useSelector(dataUpdateDatesSelector.getData);
  const commonFilters = useSelector(filtersSelector.getCommonFilters);

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => onSubmit?.(manipulateValuesBeforeSubmit(values)),
  });
  const { handleSubmit, values, setFieldValue } = formik;

  const getHandleChangeForSelectComp = (fieldName: string) => {
    return (newValue: string | undefined) => {
      setFieldValue(fieldName, newValue);
      onChange?.(manipulateValuesBeforeSubmit({
        ...values,
        [fieldName]: newValue,
      }));
    };
  };

  const employeeDailyStatsStatusOptions = useMemo(() => {
    return getEmployeeDailyStatStatusOptions({ t });
  }, [t]);

  const dailyStatsInviteStatusOptions = useMemo(() => {
    return getDailyStatsInviteStatusOptions({ t });
  }, [t]);

  const permitTypeOptions = useMemo(() => {
    return getPermitTypeOptions({ t });
  }, [t]);

  const handleExportCSVOnClick = (): void => {
    const dayDifferenceBetweenDates = moment.utc(commonFilters?.endDay).diff(moment.utc(commonFilters?.startDay), 'days');
    if (dayDifferenceBetweenDates > CSV_DOWNLOAD_MAX_DATE_INTERVAL_IN_DAYS) {
      dispatch(ToastCreators.error({ message: t('officeAttendanceTracking:DAY_LIMITATION_FOR_CSV_DOWNLOAD') }));
      return;
    }
    dispatch(Creators.fetchAndExportEmployeeStatsToCSVRequest({}));
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
    >
      <Row gutter={[4, 4]}>
        {
          isSingleDay && (
            <Col xs={24} sm={12} md={8} lg={4}>
              <Form.Item className="mb-0">
                <Select
                  value={values.status}
                  options={employeeDailyStatsStatusOptions}
                  onChange={getHandleChangeForSelectComp('status')}
                  placeholder={t('officeAttendanceTracking:EMPLOYEE_DAILY_STAT_STATUS')}
                  allowClear
                  size={selectComponentSize}
                />
              </Form.Item>
            </Col>
          )
        }
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item className="mb-0">
            <SelectEmployee
              value={values.employee}
              onChange={getHandleChangeForSelectComp('employee')}
              placeholder={t('employeePage:EMPLOYEE')}
              size={buttonSize}
              isShowDefaultSelectableListDropdown={false}
              minCharacterToSearch={MIN_SEARCH_TERM_LENGTH}
              customNotFoundContent={t('employeePage:TYPE_AT_LEAST_X_CHARACTER', { min: MIN_SEARCH_TERM_LENGTH })}
              isClearOptionsAfterDropdownClose
              labelInValue
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Form.Item className="mb-0">
            <SelectEmployee
              value={values.lineManager}
              onChange={getHandleChangeForSelectComp('lineManager')}
              placeholder={t('employeePage:SUPERVISOR')}
              size={buttonSize}
              isShowDefaultSelectableListDropdown={false}
              minCharacterToSearch={MIN_SEARCH_TERM_LENGTH}
              customNotFoundContent={t('employeePage:TYPE_AT_LEAST_X_CHARACTER', { min: MIN_SEARCH_TERM_LENGTH })}
              isClearOptionsAfterDropdownClose
              labelInValue
            />
          </Form.Item>
        </Col>
        {
          isSingleDay && (
            <Col xs={24} sm={12} md={8} lg={4}>
              <Form.Item className="mb-0">
                <Select
                  /* @ts-ignore */
                  value={values.leaveType}
                  options={permitTypeOptions}
                  onChange={getHandleChangeForSelectComp('leaveType')}
                  placeholder={t('employeePage:PERMIT_TYPE')}
                  allowClear
                  size={selectComponentSize}
                />
              </Form.Item>
            </Col>
          )
        }
        {
          isSingleDay && (
            <Col xs={24} sm={12} md={8} lg={3}>
              <Form.Item className="mb-0">
                <Select
                  value={values.inviteStatus}
                  options={dailyStatsInviteStatusOptions}
                  onChange={getHandleChangeForSelectComp('inviteStatus')}
                  placeholder={t('officeAttendanceTracking:INVITED')}
                  allowClear
                  size={selectComponentSize}
                />
              </Form.Item>
            </Col>
          )
        }
        <Can permKey={permKey.PAGE_EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD_COMPONENT_CSV_EXPORT}>
          <Col xs={24} sm={12} md={8} lg={1}>
            <Tooltip title={t('officeAttendanceTracking:TOOLTIP:DOWNLOAD_CSV_WITH_FILTERS')}>
              <Button
                icon={<CloudDownloadOutlined className={classes.exportBtn} />}
                onClick={handleExportCSVOnClick}
                disabled={fetchAndExportEmployeeStatsToCSVIsPending}
                type="text"
              />
            </Tooltip>
          </Col>
        </Can>
        &nbsp;
        <div className={classes.lastUpdateDatesWrapper}>
          {
            commonFilters?.office && dataUpdateDates?.lastTransactionDateOfOffice && (
              <p>
                {t('officeAttendanceTracking:LAST_DATA_UPDATE_TIME')}: {dataUpdateDates?.lastTransactionDateOfOffice}
              </p>
            )
          }
        </div>
      </Row>
    </Form>
  );
};

EmployeeOfficeAttendanceTrackingDashboardTableFilters.defaultProps = {
  onSubmit: () => { },
  onChange: () => { },
};

export default EmployeeOfficeAttendanceTrackingDashboardTableFilters;
