import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';

import { Creators } from '@shared/containers/Marketing/Select/ArtisanCuisineTypeSelect/redux/actions';
import saga from '@shared/containers/Marketing/Select/ArtisanCuisineTypeSelect/redux/saga';
import reducer from '@shared/containers/Marketing/Select/ArtisanCuisineTypeSelect/redux/reducer';
import { artisanCuisineTypeSelector } from '@shared/containers/Marketing/Select/ArtisanCuisineTypeSelect/redux/selectors';
import { getSelectFilterOption } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { getLangKey } from '@shared/i18n';

export const convertArtisanCuisineTypesOptions = types => {
  return types?.map(item => ({
    value: item?.id,
    label: item?.name[getLangKey()],
  }));
};

const ArtisanCuisineTypeSelect = ({ fieldName, disabled, onChange, rules }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(artisanCuisineTypeSelector.getIsPending);
  const artisanCuisineTypes = useSelector(artisanCuisineTypeSelector.getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getArtisanCuisineTypesRequest());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  return (
    <Form.Item
      name={fieldName}
      label={t('MERCHANT_TYPES')}
      className="d-inline"
      rules={rules}
    >
      <Select
        options={convertArtisanCuisineTypesOptions(artisanCuisineTypes)}
        placeholder={`${t('MERCHANT_TYPES')}`}
        onChange={onChange}
        disabled={isPending || disabled}
        suffixIcon={isPending && <LoadingOutlined spin />}
        allowClear
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.ARTISAN_CUISINE_TYPE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ArtisanCuisineTypeSelect);
