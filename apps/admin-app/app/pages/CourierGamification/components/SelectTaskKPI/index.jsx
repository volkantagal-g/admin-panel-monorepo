import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Select } from 'antd';

import _ from 'lodash';

import { useInitAndDestroyPage } from '@shared/hooks';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { mapKpiNamesToTranslateKeys } from '../../constant';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { courierGamificationKPISelector } from './redux/selectors';
import { Creators } from './redux/actions';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.SELECT_KPI;

const SelectTaskKPI = ({
  value,
  onChangeCallback,
  disabled,
  fieldName,
  errors = {},
  touched = {},
  isConditions = false,
}) => {
  const { t } = useTranslation('courierGamificationPage');
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const kpis = useSelector(courierGamificationKPISelector.getData);
  const isPending = useSelector(courierGamificationKPISelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getCourierGamificationKpiRequest());
  }, [dispatch]);

  const getOptions = () => (kpis || []).map(k => ({
    value: k.key,
    label: t(`courierGamificationPage:SELECT_KPI_TYPE.${mapKpiNamesToTranslateKeys(k.key)}`),
  }))
    .filter(k => !isConditions || k.value === 'orderCount');

  return (
    <Form.Item
      name={fieldName}
      help={_.get(touched, fieldName) && _.get(errors, fieldName)}
      validateStatus={_.get(touched, fieldName) && _.get(errors, fieldName) ? 'error' : 'success'}
    >
      <Select
        allowClear
        value={value}
        defaultValue={value}
        options={getOptions()}
        onChange={onChangeCallback}
        disabled={disabled || isPending}
        placeholder={t('KPI')}
      />
    </Form.Item>
  );
};

export default SelectTaskKPI;
