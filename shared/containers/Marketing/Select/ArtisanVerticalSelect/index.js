import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';

import { artisanVerticalSelector } from '@shared/containers/Marketing/Select/ArtisanVerticalSelect/redux/selectors';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/ArtisanVerticalSelect/redux/actions';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/ArtisanVerticalSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/ArtisanVerticalSelect/redux/reducer';

export const convertArtisanVerticalsOptions = localVerticals => {
  return localVerticals?.map(item => ({
    value: String(item?.id),
    label: item?.title,
  }));
};

const ArtisanVerticalSelect = ({ fieldName, disabled, onChange, rules, mode }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(artisanVerticalSelector.getIsPending);
  const artisanVerticals = useSelector(artisanVerticalSelector.getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getArtisanVerticalsRequest());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  return (
    <Form.Item
      name={fieldName}
      label={t('ARTISAN_VERTICALS')}
      className="d-inline"
      rules={rules}
    >
      <Select
        mode={mode}
        suffixIcon={isPending && <LoadingOutlined spin />}
        onChange={onChange}
        placeholder={`${t('ARTISAN_VERTICALS')}`}
        disabled={isPending || disabled}
        options={convertArtisanVerticalsOptions(artisanVerticals)}
        autoComplete="off"
        allowClear
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.ARTISAN_VERTICAL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ArtisanVerticalSelect);
