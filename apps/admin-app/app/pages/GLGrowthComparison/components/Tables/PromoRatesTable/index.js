import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Space } from 'antd';
import { debounce } from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { constantRules } from './config';
import { promoUsageDataSelector, requestedDateSelector } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';

const RightElement = () => {
  const { t } = useTranslation('glGrowthComparisonPage');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const dispatch = useDispatch();
  const handleMinOrderCountChange = val => {
    dispatch(Creators.setMinOrderCount({ data: val }));
  };

  const handleMaxOrderCountChange = val => {
    dispatch(Creators.setMaxOrderCount({ data: val }));
  };

  // debounce the table update
  const handleMinDebounced = useCallback(debounce(handleMinOrderCountChange, DEFAULT_DEBOUNCE_MS), []);
  const handleMaxDebounced = useCallback(debounce(handleMaxOrderCountChange, DEFAULT_DEBOUNCE_MS), []);

  return (
    <Space>
      <Input
        placeholder={`${t('MINIMUM')} #`}
        type="number"
        value={min}
        onChange={e => {
          const val = e.target.value;
          setMin(val);
          handleMinDebounced(val);
        }}
      />
      <Input
        placeholder={`${t('MAXIMUM')} #`}
        type="number"
        value={max}
        onChange={e => {
          const val = e.target.value;
          setMax(val);
          handleMaxDebounced(val);
        }}
      />
    </Space>
  );
};

const PromoRatesTable = () => {
  const { t } = useTranslation('glGrowthComparisonPage');
  const promoRatesData = useSelector(promoUsageDataSelector.getData);
  const promoRatesDataIsPending = useSelector(promoUsageDataSelector.getIsPending);
  const requestedDate1 = useSelector(requestedDateSelector.getSelectedDate1);
  const requestedDate2 = useSelector(requestedDateSelector.getSelectedDate2);

  return (
    <AntTable
      title={t('PROMO_RATES')}
      rightElement={<RightElement />}
      data={promoRatesData}
      columns={constantRules(requestedDate1, requestedDate2, t)}
      loading={promoRatesDataIsPending}
    />
  );
};

export default PromoRatesTable;
