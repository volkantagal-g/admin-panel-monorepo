import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/LocalsChainSelect/redux/actions';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/LocalsChainSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/LocalsChainSelect/redux/reducer';
import { localsChainSelector } from '@shared/containers/Marketing/Select/LocalsChainSelect/redux/selectors';

export const convertLocalsChainsOptions = chains => {
  return chains?.map(item => ({
    value: item?.id,
    label: item?.name,
  }));
};

const LocalsChainSelect = ({ fieldName, disabled, onChange, rules, preserve = true, inline }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(localsChainSelector.getIsPending);
  const localsChains = useSelector(localsChainSelector.getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getLocalsChainsRequest());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  return (
    <Form.Item
      name={fieldName}
      label={t('CHAINS')}
      className={!inline && 'd-inline'}
      rules={rules}
      preserve={preserve}
    >
      <Select
        suffixIcon={isPending && <LoadingOutlined spin />}
        onChange={onChange}
        placeholder={`${t('CHAINS')}`}
        disabled={isPending || disabled}
        options={convertLocalsChainsOptions(localsChains)}
        autoComplete="off"
        allowClear
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.LOCALS_CHAIN;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(LocalsChainSelect);
