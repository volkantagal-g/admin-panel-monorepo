import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin, Typography } from 'antd';

import { t } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';
import { DEFAULT_FIELDS, DEFAULT_LIMIT, DEFAULT_OFFSET, DEFAULT_EMPLOYMENT_STATUSES } from '@shared/containers/Select/Employee/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { getEmployeesSelector } from './redux/selectors';

const reduxKey = REDUX_KEY.SELECT.EMPLOYEE;

const { Option } = Select;

type PropsTypes = {
  mode?: 'multiple' | 'tags';
  value?: string;
  defaultValue?: string;
  onChange?: (value: any, option: any) => void;
  disabled?: boolean;
  allowClear?: boolean;
  showArrow?: boolean;
  filters?: {
    fields?: string;
    limit?: number;
    offset?: number;
    employmentStatuses?: [number];
  };
  placeholder?: string;
  isFetchOptionsOnLoad?: boolean;
  isShowDefaultSelectableListDropdown?: boolean;
  isClearOptionsAfterDropdownClose?: boolean;
  minCharacterToSearch?: number;
  customNotFoundContent?: React.ReactNode | string;
  initialSearchTerm?: string;
  onSearch?: Function;
  [x: string]: any;
}

const SelectEmployee = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  filters = {},
  placeholder,
  isFetchOptionsOnLoad = false,
  isShowDefaultSelectableListDropdown = true,
  isClearOptionsAfterDropdownClose = false,
  customNotFoundContent,
  minCharacterToSearch,
  initialSearchTerm,
  onSearch,
  showDefaultOptions,
  shouldPopulateInitialValues = false,
  ...otherProps
}: PropsTypes) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  const [isInitialPopulationDone, setIsInitialPopulationDone] = useState(false);

  const employees = useSelector(getEmployeesSelector.getData);
  const isPending = useSelector(getEmployeesSelector.getIsPending);
  const {
    fields = DEFAULT_FIELDS,
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
    employmentStatuses = DEFAULT_EMPLOYMENT_STATUSES,
  } = filters;

  const employeeSelectOptions = useMemo(() => {
    return employees?.map((employee: any) => (
      <Option value={employee._id} key={employee._id}>
        <div className="d-flex justify-content-between">
          <Typography.Text>{employee.fullName}</Typography.Text>
          <Typography.Text type="secondary" className={classes.workEmail}>{employee.workEmail}</Typography.Text>
        </div>
      </Option>
    ));
  }, [employees, classes]);

  const employmentStatusArrayAsString = JSON.stringify(employmentStatuses);

  useEffect(() => {
    if (
      value &&
      shouldPopulateInitialValues &&
      !isFetchOptionsOnLoad &&
      !isInitialPopulationDone &&
      !otherProps.labelInValue &&
      !employees.some((employee: any) => employee._id === value)
    ) {
      dispatch(Creators.getEmployeesRequest({ filters: { employeeIds: Array.isArray(value) ? value : [value], fields } }));
      setIsInitialPopulationDone(true);
    }
  }, [dispatch, value, shouldPopulateInitialValues, isInitialPopulationDone, isFetchOptionsOnLoad, employees, fields, otherProps.labelInValue]);

  useEffect(() => {
    dispatch(Creators.initContainer());

    if (isFetchOptionsOnLoad) {
      dispatch(Creators.getEmployeesRequest({
        filters: {
          ...(initialSearchTerm ? { name: initialSearchTerm } : undefined),
          fields,
          limit,
          offset,
          employmentStatuses,
          shouldPopulateInitialValues: shouldPopulateInitialValues && !!value && !otherProps.labelInValue,
          initialEmployeeIdValues: Array.isArray(value) ? value : [value],
        },
      }));
      setIsInitialPopulationDone(true);
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
    // Since the filters.employmentStatus object is an object, we need to stringify it to compare the changes.
    // Otherwise, the useEffect will be triggered every time the filters object is changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fields, initialSearchTerm, isFetchOptionsOnLoad, employmentStatusArrayAsString, limit, offset]);

  const getEmployeesRequest = (name?: string) => {
    dispatch(Creators.getEmployeesRequest({
      filters: {
        ...(name ? { name } : undefined),
        fields,
        limit,
        offset,
        employmentStatuses,
      },
    }));
  };

  const handleSearch = (name: string) => {
    if (name?.trim().length >= (minCharacterToSearch || 3)) {
      getEmployeesRequest(name);
      if (onSearch) onSearch(name);
    }
  };
  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const handleDropdownVisibleChange = (isVisible: boolean) => {
    if (isShowDefaultSelectableListDropdown && isVisible && !employees?.length) {
      getEmployeesRequest();
    }
    if (!isVisible && isClearOptionsAfterDropdownClose) {
      dispatch(Creators.clearEmployees());
    }
    // if the dropdown is visible and the default options are shown, fetch the default options
    if (isVisible && showDefaultOptions) {
      getEmployeesRequest();
    }
  };

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      filterOption={false}
      onSearch={debouncedHandleSearch}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      loading={isPending}
      placeholder={(placeholder || t('global:SELECT_EMPLOYEE'))}
      notFoundContent={isPending ? <Spin size="small" /> : customNotFoundContent}
      showArrow={showArrow}
      showSearch
      className={classes.wrapper}
      {...otherProps}
    >{employeeSelectOptions}
    </Select>
  );
};

SelectEmployee.defaultProps = {
  mode: undefined,
  value: undefined,
  defaultValue: undefined,
  onChange: () => { },
  disabled: false,
  allowClear: true,
  showArrow: true,
  filters: {},
  placeholder: undefined,
  isFetchOptionsOnLoad: false,
  isShowDefaultSelectableListDropdown: true,
  isClearOptionsAfterDropdownClose: false,
  customNotFoundContent: undefined,
  minCharacterToSearch: 3,
  initialSearchTerm: undefined,
  onSearch: () => { },
};

export default SelectEmployee;
