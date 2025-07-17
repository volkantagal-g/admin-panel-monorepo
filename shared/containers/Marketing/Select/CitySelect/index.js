import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';
import { Button } from 'antd';
import { get } from 'lodash';
import { TableOutlined, ClearOutlined } from '@ant-design/icons';

import { Creators } from '@shared/containers/Marketing/Select/CitySelect/redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/CitySelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/CitySelect/redux/reducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getLangKey } from '@shared/i18n';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const convertCityOptions = cities => {
  return cities.map(city => {
    return {
      value: get(city, '_id'),
      label: get(city, `name.${getLangKey()}`),
    };
  });
};

const CitySelect = ({ form, fieldName, disabled, onChange, rules, removeAll = true, selectAll = true, onReset, onSelectAll }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getData || []);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending || []);

  useEffect(() => {
    dispatch(Creators.initContainer());
    const countryId = getSelectedCountry()?._id;
    dispatch(CommonCreators.getCitiesRequest({ countryId }));
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  return (
    <>
      <AntSelectWithCsvImport
        className="w-100"
        label={t('CITIES')}
        rule={rules}
        name={fieldName}
        disabled={disabled || isCitiesPending}
        loading={isCitiesPending}
        form={form}
        btnLabel={t('CSV_UPLOAD')}
        labelInValue={false}
        options={convertCityOptions(cities)}
        onChange={onChange}
        placeholder={`${t('CITIES')}`}
        pairValueOptions
        maxTagCount={3}
      />
      {selectAll && (
        <Button
          onClick={() => {
            if (cities.length) {
              form.setFields([{ name: fieldName, value: cities.map(city => city?._id) }]);
            }
            if (onSelectAll) {
              onSelectAll(cities.map(city => city?._id));
            }
          }}
          disabled={disabled}
          aria-label={t('SELECT_ALL')}
        ><TableOutlined className="mr-2" />{t('SELECT_ALL')}
        </Button>
      )}
      {removeAll && (
        <Button
          onClick={() => {
            if (cities.length) {
              form.setFields([{ name: fieldName, value: [] }]);
            }
            if (onReset) {
              onReset();
            }
          }}
          disabled={disabled}
          aria-label={t('REMOVE_ALL')}
          className="ml-2"
        ><ClearOutlined className="mr-2" />{t('REMOVE_ALL')}
        </Button>
      )}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.CITY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CitySelect);
