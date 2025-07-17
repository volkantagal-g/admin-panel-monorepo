import React, {
  useEffect,
  useCallback,
  useState,
  ReactElement,
} from 'react';
import { useDispatch } from 'react-redux';
import { Select, Spin } from 'antd';
import { get } from 'lodash';

import { convertSelectOptions } from '@shared/utils/common';
import { getLangKey, t } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ILocation } from '../../../types';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import useStyles from './styles';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_FIELDS, DEFAULT_LIMIT, DEFAULT_OFFSET } from './constants';

import { ISelectLocationProps, ISelectOption } from './types';

const reduxKey = REDUX_KEY.EMPLOYEE.SELECT.LOCATION;

const SelectLocation: React.FC<ISelectLocationProps> = ({
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

  const [locationSelectOptions, setLocationSelectOptions] = useState<ISelectOption[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const getLocationsRequest = useCallback(({ name = '' }: { name: string | undefined }): void => {
    setIsPending(true);
    setLocationSelectOptions([]);
    dispatch(Creators.getLocationsRequest({
      filters: {
        ...(name ? { searchTerm: name } : undefined),
        limit: DEFAULT_LIMIT,
        offset: DEFAULT_OFFSET,
        fields: DEFAULT_FIELDS,
      },
      onSuccess: (locations: ILocation[]): void => {
        setLocationSelectOptions(convertSelectOptions(locations, {
          isData: true,
          // @ts-ignore
          labelBuilder: (location: ILocation): string => (
            `${get(location, ['name', getLangKey()], '-')}, (${t(`employeePage:LOCATION_TYPES.${location.type}`)})`
          ),
        }));
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
      getLocationsRequest({ name });
      onSearch?.(name as string);
    }
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({
    callback: handleSearch,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const handleDropdownVisibleChange = (isVisible: boolean): void => {
    if (isVisible && !locationSelectOptions?.length) {
      getLocationsRequest({ name: undefined });
    }
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (isFetchOptionsOnLoad) {
      getLocationsRequest({ name: initialSearchTerm });
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, initialSearchTerm, isFetchOptionsOnLoad, getLocationsRequest]);

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      value={value}
      options={locationSelectOptions}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      allowClear={allowClear}
      onClear={() => getLocationsRequest({ name: '' })}
      disabled={disabled}
      loading={isPending}
      placeholder={placeholder || t('global:EMPLOYEE_SELECT_LOCATION')}
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

SelectLocation.displayName = 'SelectLocation';

export default SelectLocation;
