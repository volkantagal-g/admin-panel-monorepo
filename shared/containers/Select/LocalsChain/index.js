import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { getLocalsChainSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const SelectLocalsChain = ({
  mode,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const localsChain = useSelector(getLocalsChainSelector.getData);
  const isPending = useSelector(getLocalsChainSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getLocalsChainsRequest());
  }, [dispatch]);

  const localsChainOptions = useMemo(
    () => localsChain?.map(item => {
      return {
        value: item?._id,
        label: item?.name,
      };
    }),
    [localsChain],
  );

  return (
    <Select
      disabled={isPending}
      placeholder={t('global:CHAIN')}
      value={value}
      onChange={onChange}
      options={localsChainOptions}
      suffixIcon={isPending && <LoadingOutlined spin />}
      mode={mode}
      filterOption={false}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.LOCALS_CHAIN;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectLocalsChain);
