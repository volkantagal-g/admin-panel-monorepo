import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { SelectItem } from '@shared/components/UI/FormElements';

import { selectOptionsSearch } from '@shared/utils/common';
import { Creators as PlanogramCreators } from '@shared/redux/actions/planogram';
import { demographyListSelector } from '@shared/redux/selectors/planogram';

const SelectDemographyList = ({
  isDisabled,
  ...otherProps
}) => {
  const { t } = useTranslation('planogramPage');
  const dispatch = useDispatch();
  const data = useSelector(demographyListSelector.getData);
  const isPending = useSelector(demographyListSelector.getIsPending);

  useEffect(() => {
    dispatch(PlanogramCreators.getPlanogramDemographyListRequest());
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
      name="demography"
      label={t('DEMOGRAPHY')}
      mode="multiple"
      placeholder={t('DEMOGRAPHY')}
      allowClear
      filterOption={selectOptionsSearch}
      disabled={isDisabled || isPending}
    />
  );
};

export default SelectDemographyList;
