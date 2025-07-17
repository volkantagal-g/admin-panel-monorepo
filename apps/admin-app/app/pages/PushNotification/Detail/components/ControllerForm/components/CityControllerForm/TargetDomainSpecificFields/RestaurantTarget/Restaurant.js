import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { debounce } from 'lodash';

import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { restaurantListSelector } from '@app/pages/PushNotification/Detail/redux/selectors';
import { convertSelectOptions } from '@shared/utils/common';

const Restaurant = ({
  form, targetRestaurantsFormName, isChain, isFormEditable,
  restaurantList, isRestaurantListPending,
}) => {
  const { t } = useTranslation('marketing');

  const selectedRestaurants = useSelector(restaurantListSelector.getSelectedRestaurants);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRestaurants?.length) {
      form.setFieldsValue(
        {
          controls:
            { locationBasedControl: { restaurants: { targetRestaurants: selectedRestaurants.map(restaurant => restaurant.value) } } },
        },
      );
    }
  }, [form, selectedRestaurants]);

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
        disabled={!isFormEditable || (isChain && !form.getFieldValue('controls')?.locationBasedControl?.restaurants?.chainName)}
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
