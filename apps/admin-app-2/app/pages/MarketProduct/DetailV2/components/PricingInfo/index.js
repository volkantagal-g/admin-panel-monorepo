import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import useStyles from './styles';

import { Space } from '@shared/components/GUI';

import { BuyingPriceList } from './components/BuyingPriceList';
import { UnitPriceInfo } from './components/UnitPriceInfo';
import { DepositEcoContributionForm } from './components/DepositEcoContributionForm';
import { BuyingPriceFinancials } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials';
import { Barcode } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Barcode';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Manufacturer } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Manufacturer';
import { Family } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Family';
import { SellingPriceList } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceList';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { Creators as FamilyCreators } from '@app/pages/MarketProduct/Family/redux/actions';
import { SellingPriceFinancials } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials';
import { Bonuses } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/Bonuses';
import { BonusList } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BonusList';
import { getMarketProductAllPriceSelector, getSellingPriceListSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { BundleRules } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules';
import { SellingPriceVat } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/SellingPriceVat';
import { FamilyPriceInfo } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/FamilyPriceInfo';
import { SELLING_PRICE_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { DOMAIN_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BundleRules/formHelper';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import { PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import reducerFamily from '@app/pages/MarketProduct/Family/redux/reducer';
import sagaFamily from '@app/pages/MarketProduct/Family/redux/saga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';

function PricingInfo() {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const { id } = useParams();

  useInjectReducer({ key: REDUX_KEY.MARKET_PRODUCT.FAMILY, reducer: reducerFamily });
  useInjectSaga({ key: REDUX_KEY.MARKET_PRODUCT.FAMILY, saga: sagaFamily });

  const classes = useStyles();

  const data = useSelector(getSellingPriceListSelector.getData);
  const { isBundled, familyPrice } = useSelector(getMarketProductAllPriceSelector.getData);
  const isPending = useSelector(getMarketProductAllPriceSelector.getIsPending);

  const activationErrorsForSellingPrice = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.SELLING_PRICE_FINANCIALS.containerId });
  const activationErrorsForBuyingPrice = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.BUYING_PRICE_FINANCIALS.containerId });
  const activationErrorsForManufacturer = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.MANUFACTURER.containerId });

  useEffect(() => {
    dispatch(CommonCreators.getSuppliersRequest({ fields: ['name', 'accounts', 'types', 'supplierReferenceId'] }));
    dispatch(CommonCreators.getFilteredWarehousesRequest({ fields: 'name' }));
    dispatch(FamilyCreators.getMarketProductFamilyListRequest());
    dispatch(Creators.getMarketProductAllPriceRequest({ id }));
    dispatch(Creators.getSellingPriceListRequest({ productIds: [id] }));
    dispatch(Creators.getWarehouseSegmentsRequest());
    dispatch(Creators.getBadgesRequest());
    dispatch(Creators.getMarketProductsPriceListRequest({
      productIds: [id],
      domainTypes: [DOMAIN_TYPES.g10, DOMAIN_TYPES.g30, DOMAIN_TYPES.getirwater],
      pricingTypes: [SELLING_PRICE_TYPES.DOMAIN, SELLING_PRICE_TYPES.WAREHOUSE],
      startDate: new Date(),
      endDate: new Date(),
    }));
  }, [dispatch, id]);

  if (isPending && !Object.keys(data).length) {
    return (
      <div className={classes.loaderContainer}>
        <Spin />
      </div>
    );
  }
  return (
    <>
      <Space title={t('BARCODE.TITLE')}>
        <Barcode />
      </Space>
      <>
        <Space
          title={t('MANUFACTURER')}
          errorBadgeProps={{
            title: t('PRODUCT_ACTIVATION_ERRORS'),
            errors: activationErrorsForManufacturer,
          }}
        >
          <Manufacturer activationErrorsForManufacturer={activationErrorsForManufacturer} />
        </Space>
        <Space
          title={t('FAMILY')}
        >
          <Family />
        </Space>
        <Space
          title={t('BUYING_PRICE_FINANCIALS')}
          errorBadgeProps={{
            title: t('PRODUCT_ACTIVATION_ERRORS'),
            errors: activationErrorsForBuyingPrice,
          }}
        >
          <BuyingPriceFinancials activationErrorsForBuyingPrice={activationErrorsForBuyingPrice} />
          <BuyingPriceList activationErrorsForBuyingPrice={activationErrorsForBuyingPrice} />
          <Bonuses activationErrorsForBuyingPrice={activationErrorsForBuyingPrice} />
          <BonusList />
        </Space>
      </>
      <Space
        title={t('SELLING_PRICE_FINANCIALS')}
        errorBadgeProps={{
          title: t('PRODUCT_ACTIVATION_ERRORS'),
          errors: activationErrorsForSellingPrice,
        }}
      >
        <SellingPriceVat activationErrorsForSellingPrice={activationErrorsForSellingPrice} />
        <FamilyPriceInfo familyPrice={familyPrice} />
        {!isBundled && <SellingPriceFinancials activationErrorsForSellingPrice={activationErrorsForSellingPrice} />}
        {isBundled && <BundleRules />}
        <SellingPriceList activationErrorsForSellingPrice={activationErrorsForSellingPrice} />
      </Space>
      <>
        <Space title={t('DEPOSIT_ECO_CONTRIBUTION.TITLE')}>
          <DepositEcoContributionForm />
        </Space>
        <Space title={t('UNIT_PRICE_INFO.TITLE')}>
          <UnitPriceInfo />
        </Space>
      </>
    </>
  );
}

export default PricingInfo;
