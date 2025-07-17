import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col, Row, Switch, Select, Button } from 'antd';

import Restaurant
  from '@app/pages/PushNotification/New/components/ControllerForm/components/CityControllerForm/TargetDomainSpecificFields/RestaurantTarget/Restaurant';
import { convertSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { chainRestaurantsSelector, restaurantsByNameSelector } from '@app/pages/PushNotification/New/redux/selectors';
import { Creators } from '@app/pages/PushNotification/New/redux/actions';
import { rules } from '@shared/utils/marketing/formUtils';

const RestaurantTarget = ({ form, restaurantsFormName, chain, promoId, notificationType, domainType }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');

  const chainFormName = [...restaurantsFormName, 'chain'];
  const chainNameFormName = [...restaurantsFormName, 'chainName'];
  const targetRestaurantsFormName = [...restaurantsFormName, 'targetRestaurants'];

  const chainRestaurantList = useSelector(chainRestaurantsSelector.getData);
  const isChainRestaurantPending = useSelector(chainRestaurantsSelector.getIsPending);

  const restaurantList = useSelector(restaurantsByNameSelector.getData);
  const isRestaurantListPending = useSelector(restaurantsByNameSelector.getIsPending);

  const { chainNameRule } = rules;

  const searchChainRestaurant = searchString => {
    if (searchString.length >= 3) {
      dispatch(Creators.getChainRestaurantsRequest({ searchString }));
    }
  };

  return (
    <>
      <Row gutter={24} className="mt-3 mt-md-0">
        <Col md={12} xs={24}>
          <Form.Item name={chainFormName} label={t('CHAIN_RESTAURANT')} valuePropName="checked">
            <Switch
              onChange={() => {
                form.setFieldsValue({ controls: { locationBasedControl: { restaurants: { targetRestaurants: [], chainName: null } } } });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      {chain && (
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Form.Item hasFeedback name={chainNameFormName} label={t('CHAIN_RESTAURANT')} rules={chainNameRule}>
              <Select
                className="w-100"
                onChange={restaurantId => {
                  form.setFieldsValue({ controls: { locationBasedControl: { restaurants: { targetRestaurants: [] } } } });
                  dispatch(Creators.getChainRestaurantBranchesRequest({ chainRestaurantId: restaurantId }));
                }}
                loading={isChainRestaurantPending}
                showSearch
                notFoundContent={(
                  <div className="text-center my-3">{t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}</div>
                )}
                filterOption={getSelectFilterOption}
                options={convertSelectOptions(chainRestaurantList, { valueKey: 'id', labelKey: 'name' })}
                onSearch={debounce(searchChainRestaurant, DEFAULT_DEBOUNCE_MS)}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={24}>

        <Restaurant
          form={form}
          targetRestaurantsFormName={targetRestaurantsFormName}
          promoId={promoId}
          isChain={chain}
          restaurantList={restaurantList}
          isRestaurantListPending={isRestaurantListPending}
          notificationType={notificationType}
          domainType={domainType}
        />

        {chain && (
          <Col md={5} xs={24}>
            <Button
              className="w-100"
              disabled={!chainRestaurantList.length || !restaurantList.length}
              onClick={() => {
                form.setFieldsValue(
                  {
                    controls:
                      { locationBasedControl: { restaurants: { targetRestaurants: restaurantList.map(restaurant => restaurant.value) } } },
                  },
                );
              }}
            >
              {t('BRING_ALL_CHAIN_RESTAURANTS')}
            </Button>
          </Col>
        )}

      </Row>
    </>
  );
};

export default memo(RestaurantTarget);
