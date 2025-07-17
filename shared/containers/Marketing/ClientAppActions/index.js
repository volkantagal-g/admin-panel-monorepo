import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Select } from 'antd';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { CLIENT_APP_ACTION_TYPE } from '@shared/containers/Marketing/ClientAppActions/constants';
import { clientAppActionType } from '@shared/containers/Marketing/ClientAppActions/constantValues';
import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';
import { InAppRedirectAction } from '@shared/containers/Marketing/ClientAppActions/InAppRedirectAction';
import { AnnouncementAction } from '@shared/containers/Marketing/ClientAppActions/AnnouncementAction';
import ProductAction from '@shared/containers/Marketing/ClientAppActions/ProductAction';
import CategoryAction from '@shared/containers/Marketing/ClientAppActions/CategoryAction';
import PromoAction from '@shared/containers/Marketing/ClientAppActions/PromoAction';
import RestaurantAction from '@shared/containers/Marketing/ClientAppActions/RestaurantAction';
import RestaurantPromoAction from '@shared/containers/Marketing/ClientAppActions/RestaurantPromoAction';
import LocalsShopsAction from '@shared/containers/Marketing/ClientAppActions/LocalsShopsAction';
import LocalsMerchantAction from '@shared/containers/Marketing/ClientAppActions/LocalsMerchantAction';
import ChainShopAction from '@shared/containers/Marketing/ClientAppActions/ChainShopAction';
import JobsPostDetailAction from '@shared/containers/Marketing/ClientAppActions/JobsPostDetailAction';
import ProductListAction from '@shared/containers/Marketing/ClientAppActions/ProductListAction';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/ClientAppActions/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/ClientAppActions/redux/reducer';
import { Creators } from '@shared/containers/Marketing/ClientAppActions/redux/actions';
import FoodDeepLinkAction from '@shared/containers/Marketing/ClientAppActions/FoodDeepLinkAction';
import RedirectToUrlAction from '@shared/containers/Marketing/ClientAppActions/RedirectToUrlAction';
import RedirectToGameUrlAction from '@shared/containers/Marketing/ClientAppActions/RedirectToGameUrlAction';

const ClientAppActions = ({
  parentObjLevels = [],
  inactiveActions = [],
  ownerServiceId,
  targetServiceFieldName,
  disabled,
  form,
  isActionTypeRequired = true,
  initOwnerService = true,
  dataObjName = 'data',
  onChange,
}) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const getFilteredActions = useCallback(() => {
    return Object.fromEntries(Object.entries(clientAppActionType).filter(([key]) => {
      return !inactiveActions.includes(Number(key));
    }));
  }, [inactiveActions]);

  // Sample Action: { action: { data:{} , type: 0 , ownerService: 0}
  const nestedTypeName = [...parentObjLevels, 'type'];
  const nestedDataObjName = [...parentObjLevels, dataObjName];

  useEffect(() => {
    // For now it's only work with ant.form wrapper in case of formik usage, you need to bind all form values manually
    if (initOwnerService) {
      const nestedOwnerService = [...parentObjLevels, 'ownerService'];
      form.setFields([{
        name: nestedOwnerService,
        value: ownerServiceId,
      }]);
    }
  }, [form, ownerServiceId, parentObjLevels, initOwnerService]);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Row gutter={24}>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item name={nestedTypeName} label={t('ACTION')} className="d-inline" rules={[{ required: isActionTypeRequired, message: t('error:REQUIRED') }]}>
          <Select
            allowClear={!isActionTypeRequired}
            disabled={disabled}
            options={convertConstantValuesToSelectOptions(getFilteredActions())}
            filterOption={getSelectFilterOption}
            onChange={onChange}
          />
        </Form.Item>
      </Col>

      {/* Redirect to url */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.URL && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.URL}`}>
            <RedirectToUrlAction parrentFieldName={nestedDataObjName} form={form} disabled={disabled} />
          </Col>
        )}
      </Form.Item>

      {/* Redirect to game url */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.GAME_URL && (
        <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.GAME_URL}`}>
          <RedirectToGameUrlAction parrentFieldName={nestedDataObjName} form={form} disabled={disabled} />
        </Col>
        )}
      </Form.Item>

      {/* In app redirect */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.IN_APP_REDIRECT && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.IN_APP_REDIRECT}`}>
            <InAppRedirectAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'pageId']}
              data={[]}
            />
          </Col>
        )}
      </Form.Item>

      {/* Open restaurant promo list  */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.RESTAURANT_PROMO_LIST && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.RESTAURANT_PROMO_LIST}`}>
            <RestaurantPromoAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'foodPromoId']}
              form={form}
            />
          </Col>
        )}
      </Form.Item>

      {/* Open Announcement */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.OPEN_ANNOUNCEMENT && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.OPEN_ANNOUNCEMENT}`}>
            <AnnouncementAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'announcementId']}
              form={form}
            />
          </Col>
        )}
      </Form.Item>

      {/* Show Product */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.PRODUCT && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.PRODUCT}`}>
            <ProductAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'productId']}
            />
          </Col>
        )}
      </Form.Item>

      {/* Show Multiple Product */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.MULTIPLE_PRODUCTS && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.MULTIPLE_PRODUCTS}`}>
            {/* Products list action need to be access form prop , for csv import handler */}
            <ProductListAction
              disabled={disabled}
              form={form}
              fieldName={[...nestedDataObjName, 'products']}
            />
          </Col>
        )}
      </Form.Item>

      {/* Show Categories */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.CATEGORY && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.CATEGORY}`}>
            <CategoryAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'categoryId']}
            />
          </Col>
        )}
      </Form.Item>

      {/* Get restaurants */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.RESTAURANT && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.RESTAURANT}`}>
            <RestaurantAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'restaurantId']}
            />
          </Col>
        )}
      </Form.Item>

      {/* Search */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.SEARCH && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.SEARCH}`}>
            <Form.Item
              name={[...nestedDataObjName, 'keyword']}
              label={t('SEARCH_KEYWORD')}
              className="d-inline"
              rules={rules.search}
            >
              <Input disabled={disabled} placeholder={`${t('SEARCH_KEYWORD')}`} />
            </Form.Item>
          </Col>
        )}
      </Form.Item>

      {/* Open promo  */}
      <Form.Item noStyle dependencies={[nestedTypeName, targetServiceFieldName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.PROMO && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.PROMO}`}>
            <PromoAction
              targetServiceId={getFieldValue(targetServiceFieldName)}
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'promoId']}
              form={form}
            />
          </Col>
        )}
      </Form.Item>

      {/* Shop Detail  */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.SHOP_DETAIL && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.SHOP_DETAIL}`}>
            <LocalsShopsAction
              form={form}
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'shop']}
            />
          </Col>
        )}
      </Form.Item>

      {/* Merchant List  */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.MERCHANT_LIST && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.MERCHANT_LIST}`}>
            <LocalsMerchantAction
              actionObjName={nestedDataObjName}
              filterShopsFieldName={[...nestedDataObjName, 'filterShops']}
              merchantTypesFieldName={[...nestedDataObjName, 'merchantTypes']}
              chainsFieldName={[...nestedDataObjName, 'chainId']}
              disabled={disabled}
              form={form}
            />
          </Col>
        )}
      </Form.Item>

      {/* Chain Detail  */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.CHAIN_SHOP_DETAIL && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.CHAIN_SHOP_DETAIL}`}>
            <ChainShopAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'chainId']}
            />
          </Col>
        )}
      </Form.Item>

      {/* n11 redirect url */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.N11_REDIRECT_URL && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.N11_REDIRECT_URL}`}>
            <Form.Item
              name={[...nestedDataObjName, 'url']}
              label={t('REDIRECT_URL_TYPE')}
              className="d-inline"
              rules={rules.url}
            >
              <Input disabled={disabled} placeholder={`${t('REDIRECT_URL_TYPE')}`} />
            </Form.Item>
          </Col>
        )}
      </Form.Item>

      {/* Food deep link object id */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.FOOD_DEEP_LINK && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.FOOD_DEEP_LINK}`}>
            <FoodDeepLinkAction
              disabled={disabled}
              fieldName={[...nestedDataObjName, 'foodDeepLinkId']}
              form={form}
            />
          </Col>
        )}
      </Form.Item>

      {/* Open GetirJobs Post Detail page. */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.GETIR_JOBS_POST_DETAIL && (
          <Col xs={24} lg={24} className="mt-2" role="gridcell" aria-label={`action-field-wrapper-${CLIENT_APP_ACTION_TYPE.GETIR_JOBS_POST_DETAIL}`}>
            <JobsPostDetailAction
              disabled={disabled}
              form={form}
              postIdFieldName={[...nestedDataObjName, 'jobsPostId']}
              postTypeFieldName={[...nestedDataObjName, 'jobsPostType']}
              pageIdFieldName={[...nestedDataObjName, 'pageId']}
            />
          </Col>
        )}
      </Form.Item>

      {/* Market Open Slotted */}
      {/* this component is added to send filled payload with empty object for this action {ex: {data: {}}} */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.MARKET_OPEN_SLOTTED_DELIVERY_OPTION_BOTTOM_SHEET && (
        <Col
          xs={24}
          lg={24}
          className="d-none"
          role="gridcell"
        >
          <Form.Item
            name={[...nestedDataObjName, 'pageId']}
            className="d-inline"
          >
            <Input disabled={disabled} placeholder={`${t('MARKET_OPEN_SLOTTED_DELIVERY_OPTION_BOTTOM_SHEET')}`} />
          </Form.Item>
        </Col>
        )}
      </Form.Item>

      {/* Redirect to Gfinans BNPL Communication SDK */}
      {/* this component is added to send filled payload with empty object for this action {ex: {data: {}}} */}
      <Form.Item noStyle dependencies={[nestedTypeName]}>
        {({ getFieldValue }) => getFieldValue(nestedTypeName) === CLIENT_APP_ACTION_TYPE.REDIRECT_TO_GETIRFINANCE_BNPL_COMMUNICATION_SDK && (
        <Col
          xs={24}
          lg={24}
          className="d-none"
          role="gridcell"
        >
          <Form.Item
            name={[...nestedDataObjName, 'pageId']}
            className="d-inline"
          >
            <Input disabled={disabled} placeholder={`${t('REDIRECT_TO_GETIRFINANCE_BNPL_COMMUNICATION_SDK')}`} />
          </Form.Item>
        </Col>
        )}
      </Form.Item>

    </Row>
  );
};

const reduxKey = REDUX_KEY.MARKETING.CLIENT_APP_ACTION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ClientAppActions);
