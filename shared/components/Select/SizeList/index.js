import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { SelectItem } from '@shared/components/UI/FormElements';

import { selectOptionsSearch } from '@shared/utils/common';
import { Creators as PlanogramCreators } from '@shared/redux/actions/planogram';
import { sizeListSelector } from '@shared/redux/selectors/planogram';

const SelectSizeList = ({
  isDisabled,
  ...otherProps
}) => {
  const { t } = useTranslation('planogramPage');
  const dispatch = useDispatch();
  const data = useSelector(sizeListSelector.getData);
  const isPending = useSelector(sizeListSelector.getIsPending);

  useEffect(() => {
    dispatch(PlanogramCreators.getPlanogramSizeListRequest());
  }, [dispatch]);

  const convertDataToSelectOptions = options => {
    return options?.map(option => ({
      value: option?.id,
      label: option?.name,
    }));
  };

  const options = useMemo(() => convertDataToSelectOptions(data), [data]);

  return (
    <SelectItem
      {...otherProps}
      optionsData={options}
      name="size"
      label={t('SIZE')}
      mode="multiple"
      placeholder={t('SIZE')}
      allowClear
      filterOption={selectOptionsSearch}
      disabled={isDisabled || isPending}
    />
  );
};

export default SelectSizeList;
