import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {
  Cascader,
  Spin,
} from 'antd';
import { useDispatch } from 'react-redux';

import { t } from '@shared/i18n';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import useStyles from './styles';
import {
  DEFAULT_FIELDS,
  DEFAULT_IS_ACTIVE,
  DEFAULT_SUB_LEVELS,
} from './constants';
import {
  DEFAULT_DEBOUNCE_MS,
  REDUX_KEY,
} from '@shared/shared/constants';
import { getFormattedDepartmentDSelectOptions } from './utils';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DepartmentLevel as DepartmentLevelType, IDepartment } from '@app/pages/Employee/types';
import { DEPARTMENT_LEVEL_ORDERS_BY_LEVEL, DEPARTMENT_LEVEL_ORDERS_BY_ORDER } from '@app/pages/Employee/constants';
import {
  ISelectDepartmentProps,
  ICascaderOption,
  IParsedReturnValue,
  SelectDepartmentRef,
} from './types';

const reduxKey = REDUX_KEY.EMPLOYEE.SELECT.DEPARTMENT;

const SelectDepartment = forwardRef<SelectDepartmentRef, ISelectDepartmentProps>(({
  size,
  value,
  defaultValue = [],
  onChange = () => {},
  disabled,
  allowClear,
  isReturnParsedValue = false,
  filters = {},
  placeholder = '',
  isFetchOptionsOnLoad = false,
  initialSearchTerm = '',
  minSelectedLevel,
  className,
  showLastSucceededSelect = true,
}, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useInjectSaga({
    key: reduxKey,
    saga,
  });

  const [selectedDepartment, setSelectedDepartment] = useState<ICascaderOption['value'][]>([]);
  const [departments, setDepartments] = useState<ICascaderOption[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    fields = DEFAULT_FIELDS,
    isActive = DEFAULT_IS_ACTIVE,
    levels = DEFAULT_SUB_LEVELS,
  } = filters || {} as ISelectDepartmentProps['filters'];

  const getDepartmentsRequest = useCallback(({ name = '' }: { name: string }): void => {
    setIsPending(true);
    dispatch(Creators.getDepartmentsRequest({
      filters: {
        ...(name && { name }),
        fields,
        isActive,
        levels,
      },
      onSuccess: (result: IDepartment[]): void => {
        setDepartments(getFormattedDepartmentDSelectOptions(result));
        setIsPending(false);
      },
      onError: (): void => {
        setDepartments(prevState => (prevState.length > 0 ? [] : prevState));
        setIsPending(false);
      },
    }));
  }, [dispatch, fields, isActive, levels]);

  const handleDropdownVisibleChange = (isVisible: boolean) => {
    if (isVisible && !departments?.length) {
      getDepartmentsRequest({ name: '' });
    }
  };

  const handleChange = (selectedValue: ICascaderOption['value'][], selectedValuePure: ICascaderOption[]): void => {
    if (!minSelectedLevel || (minSelectedLevel && selectedValue.length && selectedValue.length >= minSelectedLevel)) {
      if (isReturnParsedValue) {
        const parsedValue: IParsedReturnValue = {
          department: undefined,
          subDepartments: {},
        };
        if (Array.isArray(selectedValue)) {
          selectedValue.forEach((item, index) => {
            if (index === 0) {
              parsedValue.department = item;
            }
            else {
              parsedValue.subDepartments[DEPARTMENT_LEVEL_ORDERS_BY_ORDER[index.toString()]] = item;
            }
          });
        }
        onChange?.(parsedValue, { parsedValue, selectedValue, selectedValuePure });
      }
      else {
        onChange?.(selectedValue, { selectedValue, selectedValuePure });
      }

      setSelectedDepartment(selectedValue);
    }
  };

  const getSelectedValue = (): string[] | undefined => {
    if (isReturnParsedValue && value) {
      const valueArr: string[] = [];
      if ('department' in value && value.department) {
        valueArr.push(value.department);
      }
      if ('subDepartments' in value && value.subDepartments) {
        Object.entries(value.subDepartments).forEach(([key, val]: [DepartmentLevelType, MongoIDType]) => {
          valueArr[DEPARTMENT_LEVEL_ORDERS_BY_LEVEL[key]] = val;
        });
      }

      return valueArr;
    }

    if (showLastSucceededSelect) {
      return value as string[] || selectedDepartment;
    }

    return value ? value as string[] : undefined;
  };

  const handleSearch = (name: string) => {
    if (name?.trim().length >= 3) {
      getDepartmentsRequest({ name });
    }
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({
    callback: handleSearch,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  useImperativeHandle(ref, () => ({ clearSelection: () => setSelectedDepartment([]) }));

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (isFetchOptionsOnLoad) {
      getDepartmentsRequest({ name: initialSearchTerm });
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [
    dispatch,
    fields,
    initialSearchTerm,
    isActive,
    isFetchOptionsOnLoad,
    levels,
    getDepartmentsRequest,
  ]);

  return (
    <div id="department" className={classes.root}>
      <Cascader
        size={size}
        {...(defaultValue ? { defaultValue } : undefined)}
        value={getSelectedValue()}
        options={departments}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        // @ts-ignore
        onChange={handleChange}
        allowClear={allowClear}
        disabled={disabled}
        loading={isPending}
        placeholder={placeholder || t('global:EMPLOYEE_SELECT_DEPARTMENT')}
        notFoundContent={isPending ? <Spin size="small" /> : undefined}
        className={className ? `${classes.wrapper} ${className}` : classes.wrapper}
        multiple={false}
        getPopupContainer={() => document.getElementById('department') as HTMLElement}
        changeOnSelect
        showSearch
        onSearch={debouncedHandleSearch}
      />
    </div>
  );
});

SelectDepartment.displayName = 'SelectDepartment';

export default SelectDepartment;
