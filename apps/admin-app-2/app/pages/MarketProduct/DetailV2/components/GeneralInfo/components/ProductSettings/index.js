import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { get, isEmpty } from 'lodash';

import {
  getMarketProductByIdSelector,
  getMarketProductFeedDataSelector,
  getMarketProductBundlesDataSelector,
  getMarketProductSlugsSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import ThirdPartyChangesModal from './ThirdPartyChangesModal';
import CopyModal from './CopyModal';
import { useEffectOnRequestFinished, usePrevious } from '@shared/hooks';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Space, Button, Switch, JsonModal } from '@shared/components/GUI';
import useStyles from './styles';
import { BUNDLE_DISPLAY_TYPE } from '@shared/shared/constants';
import useConfirmationModal from '@app/pages/MarketProduct/DetailV2/hooks/useConfirmationModal';
import BundleProductsModal from '@app/pages/MarketProduct/DetailV2/components/GeneralInfo/components/ProductSettings/BundleProductsModal';

const ProductSettings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const [isThirdPartyChangesModalVisible, setIsThirdPartyChangesModalVisible] = useState(false);
  const [isCopyModalVisible, setIsCopyModalVisible] = useState(false);
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const marketProductFeedData = useSelector(getMarketProductFeedDataSelector.getData);
  const isGetFeedDataPending = useSelector(getMarketProductFeedDataSelector.getIsPending);
  const productSlugs = useSelector(getMarketProductSlugsSelector.getData);
  const isGetSlugsPending = useSelector(getMarketProductSlugsSelector.getIsPending);
  const prevIsGetSlugsPending = usePrevious(isGetSlugsPending);
  const [isProductSlugsModalVisible, setIsProductSlugsModalVisible] = useState(false);
  const productBundlesData = useSelector(getMarketProductBundlesDataSelector.getData);
  const isProductBundlesDataPending = useSelector(getMarketProductBundlesDataSelector.getIsPending);
  const [isProductBundlesModalVisible, setIsProductBundlesModalVisible] = useState(false);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const isGetPending = useSelector(getMarketProductByIdSelector.getIsPending);
  const [showConfirmationModal, confirmationModal] = useConfirmationModal();
  const classes = useStyles();

  const handleThirdPartyModalCancel = () => {
    setIsThirdPartyChangesModalVisible(false);
  };

  const handleCopyModalCancel = () => {
    setIsCopyModalVisible(false);
  };

  useEffect(() => {
    if (!isGetFeedDataPending && !isEmpty(marketProductFeedData)) {
      setIsThirdPartyChangesModalVisible(true);
    }
  }, [isGetFeedDataPending, marketProductFeedData]);

  useEffect(() => {
    if (prevIsGetSlugsPending && !isGetSlugsPending) {
      if (isEmpty(productSlugs)) {
        dispatch(ToastCreators.error({ message: t('global:SLUG_NOT_FOUND_ERROR') }));
      }
      else {
        setIsProductSlugsModalVisible(true);
      }
    }
  }, [dispatch, isGetSlugsPending, prevIsGetSlugsPending, productSlugs, t]);

  useEffectOnRequestFinished(
    getMarketProductBundlesDataSelector,
    () => {
      if (!productBundlesData.length) {
        dispatch(ToastCreators.error({ message: t('PRODUCT_SETTINGS.BUNDLE_PRODUCTS_MODAL.NO_BUNDLE_ERROR') }));
        return;
      }

      setIsProductBundlesModalVisible(true);
    },
  );

  const handleFillingFeedData = () => {
    dispatch(Creators.getMarketProductFeedDataRequest({ productId: marketProduct._id }));
  };

  const handleProductSlugsModalCancel = () => {
    setIsProductSlugsModalVisible(false);
  };

  const handleProductBundlesModalClose = () => {
    setIsProductBundlesModalVisible(false);
  };

  const handleShowSlugsClick = () => {
    dispatch(Creators.getMarketProductSlugsRequest({ id: marketProduct._id }));
  };

  const handleShowBundlesClick = () => {
    dispatch(Creators.getMarketProductBundlesDataRequest({
      id: marketProduct._id,
      fields: 'name status',
    }));
  };

  const handleCopyClick = () => {
    setIsCopyModalVisible(true);
  };

  const handleSwitchClick = (key, currentValue, message) => {
    const body = { [key]: !currentValue };

    showConfirmationModal({
      message,
      okText: t('button:YES'),
      onOk: () => {
        dispatch(Creators.updateMarketProductRequest({
          id: get(marketProduct, '_id'),
          body,
        }));
      },
    });
  };

  const handleTypeSwitchClick = (key, newValue, message) => {
    const body = { [key]: newValue };

    showConfirmationModal({
      message,
      okText: t('button:YES'),
      onOk: () => {
        dispatch(Creators.updateMarketProductRequest({
          id: get(marketProduct, '_id'),
          body,
        }));
      },
    });
  };

  const isPending = isUpdatePending || isGetPending;
  return (
    <Space title={t('PRODUCT_SETTINGS.TITLE')}>
      <>
        <JsonModal
          title={t('PRODUCT_SLUGS_TITLE')}
          data={productSlugs}
          visible={isProductSlugsModalVisible}
          handleCancel={handleProductSlugsModalCancel}
        />
        <Row gutter={[12, 12]}>
          <Col>
            <Button
              color="secondary"
              onClick={handleCopyClick}
            >
              {t('COPY')}
            </Button>
          </Col>
          <Col>
            {marketProduct._id && (
              <Button
                color="secondary"
                onClick={handleShowSlugsClick}
              >
                {t('SLUGS')}
              </Button>
            )}
          </Col>
          <Col>
            <Button
              color="secondary"
              onClick={handleFillingFeedData}
              loading={isGetFeedDataPending}
            >
              {t('THIRD_PARTY_INFO')}
            </Button>
          </Col>
          <Col>
            <Button
              color="secondary"
              onClick={handleShowBundlesClick}
              loading={isProductBundlesDataPending}
            >
              {t('BUNDLES')}
            </Button>
          </Col>
        </Row>
        {isThirdPartyChangesModalVisible && <ThirdPartyChangesModal onCancel={handleThirdPartyModalCancel} />}
        {isCopyModalVisible && <CopyModal onCancel={handleCopyModalCancel} />}
        {isProductBundlesModalVisible && <BundleProductsModal onClose={handleProductBundlesModalClose} />}
      </>
      <>
        <p className={classes.title}>{t('MARKETING_SETTINGS')}</p>
        <Row align="middle">
          {marketProduct.isBundle && (
            <>
              <Col span={18}>{t('PRODUCT_SETTINGS.SHOW_BUNDLE_PRODUCTS')}</Col>
              <Col span={6} align="right">
                <Switch
                  checked={marketProduct.bundleDisplayType === BUNDLE_DISPLAY_TYPE.SHOW_BUNDLE_PRODUCTS}
                  onClick={() => {
                    const newDisplayType = marketProduct.bundleDisplayType === BUNDLE_DISPLAY_TYPE.SHOW_BUNDLE_PRODUCTS ?
                      BUNDLE_DISPLAY_TYPE.DONT_SHOW_BUNDLE_PRODUCTS :
                      BUNDLE_DISPLAY_TYPE.SHOW_BUNDLE_PRODUCTS;
                    handleTypeSwitchClick(
                      'bundleDisplayType',
                      newDisplayType,
                      marketProduct.bundleDisplayType === BUNDLE_DISPLAY_TYPE.SHOW_BUNDLE_PRODUCTS ?
                        t('PRODUCT_SETTINGS.SHOW_BUNDLE_PRODUCTS_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                        t('PRODUCT_SETTINGS.SHOW_BUNDLE_PRODUCTS_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
                    );
                  }}
                  checkedChildren="ON"
                  unCheckedChildren="OFF"
                  disabled={isPending}
                  data-testid="showBundleProductsSwitch"
                />
              </Col>
              <Divider className="mb-2 mt-2" />
            </>
          )}

          <Col span={18}>
            {t('PRODUCT_SETTINGS.ONLY_PROMO')}
          </Col>
          <Col span={6} align="right">
            <Switch
              checked={!!marketProduct.isOnlyPromo}
              onClick={() => {
                handleSwitchClick(
                  'isOnlyPromo',
                  marketProduct.isOnlyPromo,
                  marketProduct.isOnlyPromo ?
                    t('PRODUCT_SETTINGS.ONLY_PROMO_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                    t('PRODUCT_SETTINGS.ONLY_PROMO_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
                );
              }}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className={marketProduct.isOnlyPromo ? 'bg-success' : 'bg-danger'}
              disabled={isPending}
              data-testid="onlyPromoSwitch"
            />
          </Col>
          <Divider className="mb-2 mt-2" />
          <Col span={18}>
            {t('PRODUCT_SETTINGS.MINIMUM_BASKET_NOT_REQUIRED')}
          </Col>
          <Col span={6} align="right">
            <Switch
              checked={!!marketProduct.isMinimumBasketNonRequiredProduct}
              onClick={() => {
                handleSwitchClick(
                  'isMinimumBasketNonRequiredProduct',
                  marketProduct.isMinimumBasketNonRequiredProduct,
                  marketProduct.isMinimumBasketNonRequiredProduct ?
                    t('PRODUCT_SETTINGS.MINIMUM_BASKET_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                    t('PRODUCT_SETTINGS.MINIMUM_BASKET_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
                );
              }}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className={marketProduct.isMinimumBasketNonRequiredProduct ? 'bg-success' : 'bg-danger'}
              disabled={isPending}
              data-testid="minimumBasketSwitch"
            />
          </Col>
          <Divider className="mb-2 mt-2" />
          <Col span={18}>
            {t('PRODUCT_SETTINGS.EXCLUDED_FROM_MINIMUM_BASKET_CALCULATION')}
          </Col>
          <Col span={6} align="right">
            <Switch
              checked={!!marketProduct.isExcludedFromMinimumBasketCalculation}
              onClick={() => {
                handleSwitchClick(
                  'isExcludedFromMinimumBasketCalculation',
                  marketProduct.isExcludedFromMinimumBasketCalculation,
                  marketProduct.isExcludedFromMinimumBasketCalculation ?
                    t('PRODUCT_SETTINGS.EXCLUDED_FROM_MINIMUM_BASKET_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                    t('PRODUCT_SETTINGS.EXCLUDED_FROM_MINIMUM_BASKET_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
                );
              }}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className={marketProduct.isExcludedFromMinimumBasketCalculation ? 'bg-success' : 'bg-danger'}
              disabled={isPending}
              data-testid="minimumBasketCalculationSwitch"
            />
          </Col>
          <Divider className="mb-2 mt-2" />
          <Col span={18}>
            {t('PRODUCT_SETTINGS.DELIVERY_FEE_DISCOUNT_PRODUCT')}
          </Col>
          <Col span={6} align="right">
            <Switch
              checked={!!marketProduct.isDeliveryFeeDiscountProduct}
              onClick={() => {
                handleSwitchClick(
                  'isDeliveryFeeDiscountProduct',
                  marketProduct.isDeliveryFeeDiscountProduct,
                  marketProduct.isDeliveryFeeDiscountProduct ?
                    t('PRODUCT_SETTINGS.DELIVERY_FEE_DISCOUNT_PRODUCT_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                    t('PRODUCT_SETTINGS.DELIVERY_FEE_DISCOUNT_PRODUCT_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
                );
              }}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className={marketProduct.isDeliveryFeeDiscountProduct ? 'bg-success' : 'bg-danger'}
              disabled={isPending}
              data-testid="deliveryFeeDiscountSwitch"
            />
          </Col>
          <Divider className="mb-2 mt-2" />
          <Col span={18}>
            {t('PRODUCT_SETTINGS.SHOW_LOCATION_FREE')}
          </Col>
          <Col span={6} align="right">
            <Switch
              checked={!!marketProduct.isPublic}
              onClick={() => {
                handleSwitchClick(
                  'isPublic',
                  marketProduct.isPublic,
                  marketProduct.isPublic ?
                    t('PRODUCT_SETTINGS.SHOW_LOCATION_FREE_CONFIRMATION_MODAL.MESSAGE_NEGATIVE') :
                    t('PRODUCT_SETTINGS.SHOW_LOCATION_FREE_CONFIRMATION_MODAL.MESSAGE_POSITIVE'),
                );
              }}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className={marketProduct.isPublic ? 'bg-success' : 'bg-danger'}
              disabled={isPending}
              data-testid="locationFeeSwitch"
            />
          </Col>
          <Divider className="mb-2 mt-2" />
          <Col span={18}>
            {t('PRODUCT_SETTINGS.OUT_OF_STOCK')}
          </Col>
          <Col span={6} align="right">
            <Switch
              checked={!!marketProduct.isShowOutOfStock}
              onClick={() => {
                handleSwitchClick(
                  'isShowOutOfStock',
                  marketProduct.isShowOutOfStock,
                  marketProduct.isShowOutOfStock ?
                    t('PRODUCT_SETTINGS.SHOW_OUT_OF_STOCK_MODAL.MESSAGE_NEGATIVE') :
                    t('PRODUCT_SETTINGS.SHOW_OUT_OF_STOCK_MODAL.MESSAGE_POSITIVE'),
                );
              }}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className={marketProduct.isShowOutOfStock ? 'bg-success' : 'bg-danger'}
              disabled={isPending}
              data-testid="showOutOfStockSwitch"
            />
          </Col>
          <Divider className="mb-2 mt-2" />
          <Col span={18}>
            {t('PRODUCT_SETTINGS.FRESH')}
          </Col>
          <Col span={6} align="right">
            <Switch
              checked={marketProduct?.isFresh}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              className={marketProduct.isFresh ? 'bg-success' : 'bg-danger'}
              disabled
            />
          </Col>
        </Row>
      </>
      {confirmationModal}
    </Space>
  );
};

export default ProductSettings;
