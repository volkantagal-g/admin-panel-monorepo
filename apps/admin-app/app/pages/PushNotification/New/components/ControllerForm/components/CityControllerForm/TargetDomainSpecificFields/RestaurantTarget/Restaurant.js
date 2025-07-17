import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { debounce } from 'lodash';

import { Creators } from '@app/pages/PushNotification/New/redux/actions';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';

import { convertSelectOptions } from '@shared/utils/common';

const Restaurant = ({
  form, targetRestaurantsFormName, isChain,
  restaurantList, isRestaurantListPending,
}) => {
  const { t } = useTranslation('marketing');

  const dispatch = useDispatch();

  const searchRestaurants = searchString => {
    if (searchString.length < 3) return;
    dispatch(Creators.getRestaurantsByNameRequest({ searchString }));
  };

  return (
    <>
      {/* If not chain, search all restaurants with search string */}
      <AntSelectWithCsvImport
        className="w-100"
        label={t('FOOD_RESTAURANTS')}
        name={targetRestaurantsFormName}
        hideImport={isChain}
        onSearch={!isChain ? debounce(searchRestaurants, DEFAULT_DEBOUNCE_MS) : null}
        form={form}
        afterCsvImport={csvData => {
          dispatch(Creators.getRestaurantDetailsByIdsRequest({ restaurants: csvData, setSelectedRestaurants: true }));
        }}
        disabled={isChain && !form.getFieldValue('controls')?.locationBasedControl?.restaurants?.chainName}
        loading={isRestaurantListPending}
        btnLabel={t('CSV_UPLOAD')}
        mode="multiple"
        notFoundContent={
          !isRestaurantListPending && !isChain && <div className="text-center my-3">{t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}</div>
        }
        placeholder={isChain &&
          !form.getFieldValue('controls')?.locationBasedControl?.restaurants?.chainName ? t('CHAIN_RESTAURANT_SELECT_WARNING') : ''}
        pairValueOptions={false}
        maxTagCount={3}
        options={convertSelectOptions(restaurantList, { valueKey: 'value', labelKey: 'label', isTranslation: false })}
      />
    </>
  );
};

export default Restaurant;
