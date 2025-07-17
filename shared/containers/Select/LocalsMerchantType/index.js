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

import { getLocalsMerchantTypeSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getLangKey } from '@shared/i18n';

const SelectLocalsMerchantType = ({
  mode,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const localsMerchantType = useSelector(getLocalsMerchantTypeSelector.getData);
  const isPending = useSelector(getLocalsMerchantTypeSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getLocalsMerchantTypesRequest());
  }, [dispatch]);

  const localsMerchantTypeOptions = useMemo(
    () => localsMerchantType?.map(item => {
      return {
        value: item?.id,
        label: item?.name[getLangKey()],
      };
    }),
    [localsMerchantType],
  );

  return (
    <Select
      disabled={isPending}
      placeholder={t('global:MERCHANT_TYPE')}
      value={value}
      onChange={onChange}
      options={localsMerchantTypeOptions}
      suffixIcon={isPending && <LoadingOutlined spin />}
      mode={mode}
      filterOption={false}
      showSearch
      allowClear
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.LOCALS_MERCHANT_TYPE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectLocalsMerchantType);
