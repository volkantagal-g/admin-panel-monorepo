import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, DatePicker, Select } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';

import { isScreenSizeLarge } from '@shared/utils/common';
import AntRadioGroup from '@shared/components/UI/AntRadioGroup';
import SelectEmployee from '@shared/containers/Select/Employee';

import {
  DEFAULT_OFFICE_SELECTION,
  initialTablePagination,
  MIN_SEARCH_TERM_LENGTH,
  PredefinedDateFilterIntervals,
} from '../../../constants';
import { Creators } from '../../redux/actions';
import {
  validationSchema,
  initialValues,
  getDateIntervalOptions,
  manipulateValuesBeforeSubmit,
  ValuesType,
} from './formHelper';
import useStyles from './styles';
import { getTrackingEnabledOfficesSelector } from '../../redux/selectors';
import SelectBusinessUnit from '@app/pages/Employee/components/Select/BusinessUnit';
import SelectDepartment from '@shared/containers/Select/Department';
import { DEPARTMENT_LEVELS } from '@app/pages/Employee/constants';

const { RangePicker } = DatePicker;

type EmployeeOfficeAttendanceTrackingDashboardCommonFiltersPropsType = {
  onChange: Function;
};

// in order not to create a new reference
const SELECT_DEPARTMENT_FILTERS = {
  fields: ['_id', 'name'],
  isActive: true,
  levels: [DEPARTMENT_LEVELS.MAIN_DEPARTMENT],
};

const EmployeeOfficeAttendanceTrackingDashboardCommonFilters = ({ onChange }: EmployeeOfficeAttendanceTrackingDashboardCommonFiltersPropsType) => {
  const [dateInterval, setDateInterval] = useState<PredefinedDateFilterIntervals | undefined>(PredefinedDateFilterIntervals.TODAY);
  const { t } = useTranslation(['officeAttendanceTracking', 'employeePage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.getTrackingEnabledOfficesRequest());
  }, [dispatch]);

  const trackingEnabledOffices = useSelector(getTrackingEnabledOfficesSelector.getData);
  const trackingEnabledOfficesIsPending = useSelector(getTrackingEnabledOfficesSelector.getIsPending);

  const trackingEnabledOfficesOptions = useMemo(() => (
    trackingEnabledOffices?.map(({ officeId, officeName }: { officeId: string; officeName: string }) => ({ value: officeId, label: officeName }))
  ), [trackingEnabledOffices]);

  const handleOnChange = (values: ValuesType & { changedField?: string}): void => {
    const manipulatedValues = manipulateValuesBeforeSubmit(values);
    const newIsToday: boolean = manipulatedValues.endDay === moment.utc(moment().startOf('day').format('YYYY-MM-DD')).toISOString();
    const newIsSingleDay: boolean = manipulatedValues.startDay === manipulatedValues.endDay;

    dispatch(Creators.setFilters({
      filters: {
        commonFilters: manipulatedValues,
        isSingleDay: newIsSingleDay,
        isToday: newIsToday,
        tablePagination: initialTablePagination,
      },
    }));
    onChange?.({ values: manipulatedValues, newIsToday, newIsSingleDay, changedField: values.changedField });
  };

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (): void => {},
  });
  const { values, setFieldValue, setValues } = formik;
  const isLargeScreen = isScreenSizeLarge();
  const buttonSize: string = isLargeScreen ? 'large' : 'default';
  const componentSize = isLargeScreen ? 'large' : 'middle';

  const disabledDate = (current: moment.Moment): boolean => {
    return current && current > moment().endOf('day');
  };

  const handleDateIntervalChange = (newDateInterval: PredefinedDateFilterIntervals) => {
    setDateInterval(newDateInterval);
    let newValues = { ...values };
    if (newDateInterval === PredefinedDateFilterIntervals.TODAY) {
      newValues = {
        ...values,
        startDay: moment().startOf('day'),
        endDay: moment().startOf('day'),
      };
    }
    else if (newDateInterval === PredefinedDateFilterIntervals.YESTERDAY) {
      newValues = {
        ...values,
        startDay: moment().startOf('day').subtract(1, 'day'),
        endDay: moment().startOf('day').subtract(1, 'day'),
      };
    }
    else if (newDateInterval === PredefinedDateFilterIntervals.LAST_7_DAYS) {
      newValues = {
        ...values,
        startDay: moment().startOf('day').subtract(7, 'day'),
        endDay: moment().startOf('day').subtract(1, 'day'),
      };
    }
    setValues(newValues);
    handleOnChange(newValues);
  };

  const handleCalendarChange = (dateRange: any) => {
    if (dateRange?.[0] && dateRange?.[1]) {
      const startDay = moment(dateRange[0]).startOf('day');
      const endDay = moment(dateRange[1]).startOf('day');
      const newValues = { ...values, startDay, endDay };
      setValues(newValues);
      handleOnChange(newValues);

      if (startDay.isSame(endDay)) {
        if (startDay.isSame(moment().startOf('day'))) {
          setDateInterval(PredefinedDateFilterIntervals.TODAY);
        }
        else if (startDay.isSame(moment().startOf('day').subtract(1, 'day'))) {
          setDateInterval(PredefinedDateFilterIntervals.YESTERDAY);
        }
        else {
          setDateInterval(undefined);
        }
      }
      else if (
        startDay.isSame(moment().startOf('day').subtract(7, 'days'))
        && endDay.isSame(moment().startOf('day').subtract(1, 'days'))
      ) {
        setDateInterval(PredefinedDateFilterIntervals.LAST_7_DAYS);
      }
      else {
        setDateInterval(undefined);
      }
    }
  };

  const handleSelectOptionChange = (fieldName: string): (value: any) => void => {
    return (selectedItem: any): void => {
      const tempSelectedItem = selectedItem;

      setFieldValue(fieldName, tempSelectedItem);

      if (fieldName === 'businessUnit') {
        setFieldValue('department', []);
        handleOnChange({ ...values, [fieldName]: tempSelectedItem, department: undefined, changedField: fieldName });
      }
      else {
        handleOnChange({ ...values, [fieldName]: tempSelectedItem, changedField: fieldName });
      }
    };
  };

  const dateIntervalOptions = getDateIntervalOptions({ t });

  return (
    <Form form={form}>
      <Row gutter={[5, 5]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          <Form.Item className="mb-0">
            <RangePicker
              value={[values.startDay as moment.Moment, values.endDay as moment.Moment]}
              // we actually don't want to clear but it is the only way
              // to select a start date gt end date while selecting a new range
              // however it shows a clear icon but we don't set the values when cleared
              // since we have to have a date
              allowClear
              disabledDate={disabledDate}
              className="w-100"
              onCalendarChange={handleCalendarChange}
              size={componentSize}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          <Form.Item className="mb-0">
            <AntRadioGroup
              options={dateIntervalOptions}
              onChange={(e: { target: { value: PredefinedDateFilterIntervals } }) => handleDateIntervalChange(e.target.value)}
              value={dateInterval}
              fullWidth
              optionType="button"
              size={buttonSize}
              customClassNames={[classes.predefinedDateSelectionWrapper]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          <Form.Item className="mb-0">
            <SelectEmployee
              value={values.topManager}
              onChange={handleSelectOptionChange('topManager')}
              placeholder={t('officeAttendanceTracking:PH_TOP_MANAGER_SELECTION')}
              size={componentSize}
              isShowDefaultSelectableListDropdown={false}
              minCharacterToSearch={MIN_SEARCH_TERM_LENGTH}
              customNotFoundContent={t('employeePage:TYPE_AT_LEAST_X_CHARACTER', { min: MIN_SEARCH_TERM_LENGTH })}
              isClearOptionsAfterDropdownClose
              labelInValue
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          <Form.Item className="mb-0">
            <Select
              size={componentSize}
              value={values.office}
              defaultValue={DEFAULT_OFFICE_SELECTION.GETIR_ISTANBUL}
              onChange={handleSelectOptionChange('office')}
              options={trackingEnabledOfficesOptions}
              loading={trackingEnabledOfficesIsPending}
              placeholder={t('global:EMPLOYEE_SELECT_LOCATION')}
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          <Form.Item className="mb-0">
            <SelectBusinessUnit
              placeholder={t('officeAttendanceTracking:PH_BUSINESS_UNIT_SELECTION')}
              value={values.businessUnit}
              size={componentSize}
              allowClear
              onChange={handleSelectOptionChange('businessUnit')}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={4}>
          <Form.Item className="mb-0">
            <SelectDepartment
              value={values.department}
              size={componentSize}
              filters={SELECT_DEPARTMENT_FILTERS}
              allowClear
              onChange={handleSelectOptionChange('department')}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EmployeeOfficeAttendanceTrackingDashboardCommonFilters;
