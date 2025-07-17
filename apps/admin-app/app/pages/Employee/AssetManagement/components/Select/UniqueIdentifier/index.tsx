import React, {
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Select, Spin } from 'antd';

import { useSearchParams } from 'react-router-dom';

import { convertSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import useStyles from './styles';

import { ISelectUniqueIdentifierProps, ISelectOption } from './types';

const reduxKey = REDUX_KEY.SELECT.UNIQUE_IDENTIFIER;

const UniqueIdentifier = ({
  mode,
  value,
  onChange = () => {},
  disabled = false,
  allowClear = false,
  labelInValue = false,
  placeholder,
  className,
  assetTypeId,
}: ISelectUniqueIdentifierProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectSaga({ key: reduxKey, saga });

  const [uniqueIdentifierSelectOptions, setUniqueIdentifierSelectOptions] = useState<ISelectOption[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const assetId = searchParams.get('assetId');
  const [selectedUniqueIdentifier, setSelectedUniqueIdentifier] = useState<ISelectOption | null>(null);

  const getUniqueIdentifiersRequest = useCallback((): void => {
    setIsPending(true);
    dispatch(Creators.getUniqueIdentifierRequest({
      filters: { assetTypeId },
      onSuccess: (assets: Asset[]): void => {
        setUniqueIdentifierSelectOptions(assets?.length ? convertSelectOptions(assets, { labelKey: 'uniqueIdentifier' }) : []);
        setIsPending(false);
      },
      onError: (): void => {
        setUniqueIdentifierSelectOptions([]);
        setIsPending(false);
      },
    }));
  }, [dispatch, assetTypeId]);

  useEffect(() => {
    dispatch(Creators.initContainer());
    if (assetTypeId) {
      getUniqueIdentifiersRequest();
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, assetTypeId, getUniqueIdentifiersRequest]);

  useEffect(() => {
    if (assetId) {
      const selectedOption = uniqueIdentifierSelectOptions.find((option: ISelectOption) => option.value === assetId);
      if (selectedOption) {
        setSelectedUniqueIdentifier(selectedOption);
      }
      else {
        setSelectedUniqueIdentifier(null);
      }
    }
  }, [assetId, uniqueIdentifierSelectOptions]);

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      value={selectedUniqueIdentifier}
      options={uniqueIdentifierSelectOptions}
      onChange={selectedValue => {
        setSelectedUniqueIdentifier(selectedValue);
        if (selectedValue) {
          // @ts-ignore
          searchParams.set('assetId', selectedValue);
        }
        else {
          searchParams.delete('assetId');
        }
        setSearchParams(searchParams);
      }}
      allowClear={allowClear}
      disabled={disabled || isPending}
      loading={isPending}
      placeholder={placeholder}
      notFoundContent={isPending ? <Spin size="small" /> : undefined}
      className={className ? `${className} ${classes.wrapper}` : className}
      labelInValue={labelInValue}
      filterOption={getSelectFilterOption}
      showSearch
    />
  );
};

export default UniqueIdentifier;
