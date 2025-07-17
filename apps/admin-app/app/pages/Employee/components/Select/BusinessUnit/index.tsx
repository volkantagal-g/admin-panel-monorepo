import React, {
  useEffect,
  useCallback,
  useState,
  ReactElement,
} from 'react';
import { useDispatch } from 'react-redux';
import { Select, Spin } from 'antd';

import { convertSelectOptions } from '@shared/utils/common';
import { t } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { IBusinessUnit } from '../../../types';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import useStyles from './styles';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_FIELDS, DEFAULT_LIMIT, DEFAULT_OFFSET } from './constants';

import { ISelectBusinessUnitProps, ISelectOption } from './types';

const reduxKey: string = REDUX_KEY.EMPLOYEE.SELECT.BUSINESS_UNIT;

const SelectBusinessUnit: React.FC<ISelectBusinessUnitProps> = ({
  size,
  mode,
  value,
  onChange = () => {},
  disabled = false,
  allowClear = false,
  labelInValue = false,
  optionFilterProp = 'value',
  placeholder,
  onBlur,
  onSearch = () => {},
  isFetchOptionsOnLoad,
  initialSearchTerm,
  className,
}): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useInjectSaga({ key: reduxKey, saga });

  const [businessUnitSelectOptions, setBusinessUnitSelectOptions] = useState<ISelectOption[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const getBusinessUnitsRequest = useCallback(({ name = '', isActive = true }: { name: string | undefined, isActive?: boolean }): void => {
    setIsPending(true);
    setBusinessUnitSelectOptions([]);
    dispatch(Creators.getBusinessUnitsRequest({
      filters: {
        ...(name ? { searchTerm: name } : undefined),
        limit: DEFAULT_LIMIT,
        offset: DEFAULT_OFFSET,
        fields: DEFAULT_FIELDS,
        isActive,
      },
      onSuccess: (businessUnits: IBusinessUnit[]): void => {
        setBusinessUnitSelectOptions(convertSelectOptions(businessUnits, { isTranslation: true, isData: true }));
        setIsPending(false);
      },
      onError: (): void => {
        setIsPending(false);
      },
    }));
  }, [dispatch]);

  const handleSearch = (name: string | undefined): void => {
    const tempName = (name?.trim().length || 0);
    if (tempName === 0 || tempName >= 2) {
      getBusinessUnitsRequest({ name });
      onSearch?.(name as string);
    }
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({
    callback: handleSearch,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const handleDropdownVisibleChange = (isVisible: boolean): void => {
    if (isVisible && !businessUnitSelectOptions?.length) {
      getBusinessUnitsRequest({ name: undefined });
    }
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (isFetchOptionsOnLoad) {
      getBusinessUnitsRequest({ name: initialSearchTerm });
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, initialSearchTerm, isFetchOptionsOnLoad, getBusinessUnitsRequest]);

  return (
    <Select
      size={size}
      {...(mode ? { mode } : undefined)}
      value={value}
      options={businessUnitSelectOptions}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      loading={isPending}
      placeholder={placeholder || t('employeePage:SELECT_BUSINESS_UNIT')}
      notFoundContent={isPending ? <Spin size="small" /> : null}
      className={className ? `${className} ${classes.wrapper}` : classes.wrapper}
      optionFilterProp={optionFilterProp}
      onBlur={onBlur}
      labelInValue={labelInValue}
      filterOption={false}
      onSearch={debouncedHandleSearch}
      showSearch
    />
  );
};

SelectBusinessUnit.displayName = 'SelectBusinessUnit';

export default SelectBusinessUnit;
