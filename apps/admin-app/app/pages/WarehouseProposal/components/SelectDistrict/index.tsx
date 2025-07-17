import { useTranslation } from 'react-i18next';
import { useMemo, useEffect } from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { Form, Select } from 'antd';

import { districtsSelector } from '@app/pages/WarehouseProposal/components/SelectDistrict/redux/selector';
import { getSelectFilterOption } from '@shared/utils/common';
import { District, SelectDistrictProps } from '@app/pages/WarehouseProposal/interfaces';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage } from '@shared/hooks';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.SELECT.DISTRICT;

const SelectDistrict: React.FC<SelectDistrictProps> = ({
  value,
  onChangeCallback,
  disabled,
  errors = {},
  touched = {},
  city,
}) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation('warehouseProposalPage');

  const districts = useSelector(districtsSelector.getDistrictData) as District[];
  const isDistrictsPending = useSelector(districtsSelector.getDistrictIsPending);

  useEffect(() => {
    if (city) {
      dispatch(Creators.getDistrictsRequest({ city }));
    }
  }, [dispatch, city]);

  const districtOptions = useMemo(
    () => districts?.map(district => {
      return { value: district.id, label: district.name };
    }),
    [districts],
  );

  return (
    <Form.Item
      help={touched?.city && errors?.city}
      validateStatus={touched?.city && errors?.city ? 'error' : 'success'}
      label={t('global:DISTRICT')}
    >
      <Select
        loading={isDistrictsPending}
        value={value}
        options={districtOptions}
        onChange={onChangeCallback}
        disabled={disabled || isDistrictsPending}
        placeholder={t('global:DISTRICT')}
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

export default SelectDistrict;
