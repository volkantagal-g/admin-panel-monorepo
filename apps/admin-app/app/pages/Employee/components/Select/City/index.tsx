import React, {
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Select, Spin } from 'antd';

import { convertSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { t } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import useStyles from './styles';

import { ISelectCityProps, ISelectOption } from './types';

const reduxKey = REDUX_KEY.EMPLOYEE.SELECT.CITY;

const SelectCity = ({
  mode,
  value,
  onChange = () => {},
  disabled = false,
  allowClear = false,
  labelInValue = false,
  placeholder,
  country,
  className,
}: ISelectCityProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useInjectSaga({ key: reduxKey, saga });

  const [citySelectOptions, setCitySelectOptions] = useState<ISelectOption[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

  const getCitiesRequest = useCallback(({ countryId }: { countryId: MongoIDType }): void => {
    setIsPending(true);
    dispatch(Creators.getCitiesRequest({
      filters: { countryId },
      onSuccess: (cities: ICity[]): void => {
        setCitySelectOptions(convertSelectOptions(cities, { valueKey: 'id', isTranslation: true, isData: true }));
        setIsPending(false);
      },
      onError: (): void => {
        setCitySelectOptions([]);
        setIsPending(false);
      },
    }));
  }, [dispatch]);

  const handleDropdownVisibleChange = (isVisible: boolean): void => {
    if (isVisible && !citySelectOptions?.length && country) {
      getCitiesRequest({ countryId: country });
    }
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (country) {
      getCitiesRequest({ countryId: country });
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, country, getCitiesRequest]);

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      value={value}
      options={citySelectOptions}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      loading={isPending}
      placeholder={placeholder || t('global:SELECT_CITY')}
      notFoundContent={isPending ? <Spin size="small" /> : undefined}
      className={className ? `${className} ${classes.wrapper}` : className}
      labelInValue={labelInValue}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default SelectCity;
