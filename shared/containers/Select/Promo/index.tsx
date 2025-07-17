import { Select, SelectProps, Spin } from 'antd';
import { debounce } from 'lodash';

import { compose } from 'redux';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import { SelectPromoSlice } from '@shared/containers/Select/Promo/slice';
import { selectPromoSaga } from '@shared/containers/Select/Promo/saga';
import injectSaga from '@shared/utils/injectSaga';
import { PromoTag } from '@app/pages/Promo/components/PromoTag';
import { selectData, selectIsPending } from '@shared/containers/Select/Promo/selectors';
import { PromoTagType } from '@app/pages/Promo/types.ts';

type OmittedProps = 'notFoundContent' |
  'onSearch' |
  'filterOption' |
  'showSearch';

interface SelectPromoProps extends Omit<SelectProps, OmittedProps> {
  excludedOptions?: MongoIDType[];
  showIds?: boolean
  isParentPromo?: boolean
  isMasterPromo?: boolean
  slice: string;
  readOnly?: boolean;
  valueField?: keyof PromoTagType
}

function SelectPromoComponent({
  options,
  excludedOptions,
  loading,
  isParentPromo,
  slice,
  readOnly,
  showIds,
  isMasterPromo,
  valueField = '_id',
  ...rest
}: SelectPromoProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const promos = useSelector(selectData(slice));
  const isPending = useSelector(selectIsPending(slice));
  const [isSearchValueLongEnough, setIsSearchValueLongEnough] = useState(false);

  useLayoutEffect(() => {
    dispatch(SelectPromoSlice.actions.initPage({ slice }));
    return () => {
      dispatch(SelectPromoSlice.actions.destroyPage({ slice }));
    };
  }, [dispatch, slice]);

  const loadOptions = (searchString: string) => {
    const longEnough = searchString?.length >= 3;
    setIsSearchValueLongEnough(longEnough);
    if (longEnough) {
      dispatch(SelectPromoSlice.actions.getPromosByPromoCodeRequest({
        searchString,
        excludedOptions,
        isParentPromo,
        slice,
        isMasterPromo,
      }));
    }
  };

  const promoOptions = useMemo(() => {
    return (options ?? []).concat(promos?.map(promo => ({
      value: promo[valueField],
      label: <PromoTag promo={promo} showId={showIds} />,
    })) ?? []);
  }, [options, promos, showIds, valueField]);

  const getNotFoundContent = () => {
    if (isPending) return <Spin size="small" />;
    if (!isSearchValueLongEnough && !readOnly) return t('global:SEARCH_RESTAURANT_MIN_CHARACTER');
    return undefined;
  };

  useEffect(() => {
    if (rest.value) {
      const promoIds = Array.isArray(rest.value) ? rest.value : [rest.value];
      if (!promos?.every(promo => promoIds.includes(promo._id))) {
        dispatch(SelectPromoSlice.actions.getPromosByIdsRequest({
          promoIds,
          slice,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, rest.value, slice]);

  return (
    <Select
      notFoundContent={getNotFoundContent()}
      options={promoOptions}
      onSearch={readOnly ? undefined : debounce(loadOptions, DEFAULT_DEBOUNCE_MS)}
      filterOption={false}
      showSearch={!readOnly}
      loading={loading || isPending}
      {...rest}
    />
  );
}

const withSaga = injectSaga({ key: SelectPromoSlice.reducerPath, saga: selectPromoSaga });
const withReducer = injectReducer({ key: SelectPromoSlice.reducerPath, reducer: SelectPromoSlice.reducer });

export const SelectPromo = compose(withReducer, withSaga)(SelectPromoComponent) as typeof SelectPromoComponent;
