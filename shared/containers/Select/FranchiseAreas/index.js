import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { Select } from 'antd';

import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { t } from '@shared/i18n';
import { Creators } from './redux/actions';
import { getFranchisesSelector } from '../Franchise/redux/selectors';
import { getFranchisesAreasSelector } from './redux/selectors';
import { convertSelectOptions } from '@shared/utils/common';

const reduxKey = REDUX_KEY.SELECT.FRANCHISES_AREAS;

const SelectFranchisesAreas = ({
  value,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  franchiseIds,
  ...props
}) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const franchises = useSelector(getFranchisesSelector.getData);
  const isFranchisesPending = useSelector(getFranchisesSelector.getIsPending);
  const franchisesAreas = useSelector(getFranchisesAreasSelector.getData);
  const isFranchisesAreasPending = useSelector(getFranchisesAreasSelector.getIsPending);
  const isPending = isFranchisesAreasPending || isFranchisesPending;

  useEffect(() => {
    dispatch(Creators.initContainer());

    if (franchises?.length) {
      dispatch(Creators.getFranchisesAreasRequest({ franchiseIds: franchises.map(fr => fr._id) }));
    }

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, franchises]);

  const franchiseAreaOptions = useMemo(() => {
    let filteredFranchiseAreas = franchisesAreas;
    if (franchiseIds?.length && franchisesAreas?.length) {
      filteredFranchiseAreas = franchisesAreas.filter(area => franchiseIds.includes(area.franchise));
    }
    return convertSelectOptions(filteredFranchiseAreas, { valueKey: '_id', labelKey: 'name' });
  }, [franchisesAreas, franchiseIds]);

  return (
    <Select
      value={value}
      options={franchiseAreaOptions}
      onChange={onChange}
      placeholder={t('global:SELECT.FRANCHISE_AREAS')}
      disabled={disabled}
      loading={isPending}
      allowClear={allowClear}
      showArrow={showArrow}
      {...props}
    />
  );
};

export default SelectFranchisesAreas;
