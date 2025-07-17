import { useTranslation } from 'react-i18next';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, Tag } from 'antd';

import { getSelectFilterOption } from '@shared/utils/common';

import { Neighborhood, SelectNeighborhoodProps } from '@app/pages/WarehouseProposal/interfaces';

import { neighborhoodsSelector } from '@app/pages/WarehouseProposal/components/SelectNeighborhood/redux/selector';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage } from '@shared/hooks';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.WAREHOUSE_PROPOSAL.SELECT.NEIGHBORHOOD;

const SelectNeighborhood: React.FC<SelectNeighborhoodProps> = ({
  value,
  onChangeCallback,
  disabled,
  errors = {},
  touched = {},
  district,
}) => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const { t } = useTranslation('warehouseProposalPage');

  const neighborhoods = useSelector(neighborhoodsSelector.getNeighborhoodData) as Neighborhood[];
  const isNeighborhoodsPending = useSelector(neighborhoodsSelector.getNeighborhoodIsPending);

  useEffect(() => {
    if (district) {
      dispatch(Creators.getNeighborhoodsRequest({ district }));
    }
  }, [dispatch, district]);

  const neighborhoodOptions = useMemo(
    () => neighborhoods?.map(n => {
      return { value: n.id, label: n.name };
    }),
    [neighborhoods],
  );

  return (
    <Form.Item
      help={touched?.neighborhood && errors?.neighborhood}
      validateStatus={touched?.neighborhood && errors?.neighborhood ? 'error' : 'success'}
      label={t('global:NEIGHBORHOOD')}
      valuePropName="values"
    >
      <Select
        loading={isNeighborhoodsPending}
        value={value}
        options={neighborhoodOptions}
        onChange={onChangeCallback}
        disabled={disabled || isNeighborhoodsPending}
        placeholder={t('global:NEIGHBORHOOD')}
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

export default SelectNeighborhood;
