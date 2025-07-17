/* eslint-disable import/no-cycle */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';

import Header from './components/Header';
import GetirGeneralDetail from './components/GetirGeneralDetail';
import Getir10ServiceDetail from './components/Getir10ServiceDetail';
import GetirLocalsServiceDetail from './components/GetirLocalsServiceDetail';
import GetirMoreServiceDetail from './components/GetirMoreServiceDetail';
import GetirWaterServiceDetail from './components/GetirWaterServiceDetail';
import GetirFoodServiceDetail from './components/GetirFoodServiceDetail';
import GetirBitaksiServiceDetail from './components/GetirBitaksiServiceDetail';
import GetirWaterMarketPlaceServiceDetail from './components/GetirWaterMarketPlaceServiceDetail';
import GetirJobsServiceDetail from './components/GetirJobsServiceDetail';
import GetirDriveServiceDetail from './components/GetirDriveServiceDetail';
import ListDetail from './components/ListDetail';
import './index.css';
import GetirN11ServiceDetail from './components/GetirN11ServiceDetail';
import GetirSelectServiceDetail from './components/GetirSelectServiceDetail';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import GetirFinanceServiceDetail from './components/GetirFinanceServiceDetail';

const ClientTargeting = () => {
  usePageViewAnalytics({ name: ROUTE.CLIENT_TARGETING.name, squad: ROUTE.CLIENT_TARGETING.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getOperationalCountriesRequest());
    dispatch(CommonCreators.getFilteredWarehousesRequest({ fields: 'city domainTypes name warehouseType' }));
    dispatch(CommonCreators.getMarketProductsRequest({
      statusList: ['ACTIVE'],
      fields: ['name', 'fullName', 'category', 'subCategory', 'manufacturer', 'suppliers'],
      populate: [],
      shouldGetSuppliersAndManufacturerFromNewPricingService: true,
      useAPIGatewayCache: true,
    }));
    dispatch(CommonCreators.getSuppliersRequest());
    dispatch(CommonCreators.getMarketProductCategoriesRequest({ isSubCategory: false }));
    dispatch(CommonCreators.getMarketProductSubCategoriesRequest());
    dispatch(Creators.getCuisinesRequest());
    dispatch(Creators.getAllGwmpVendorsRequest());
    dispatch(Creators.getAllGwmpBrandsRequest());
    dispatch(Creators.getArtisanTypesRequest());
    dispatch(Creators.getArtisanChainShopsRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE.CLIENT_TARGETING')} />
      <Header />
      <GetirGeneralDetail />
      <Getir10ServiceDetail />
      <GetirMoreServiceDetail />
      <GetirFoodServiceDetail />
      <GetirWaterServiceDetail />
      <GetirLocalsServiceDetail />
      <GetirBitaksiServiceDetail />
      <GetirWaterMarketPlaceServiceDetail />
      <GetirJobsServiceDetail />
      <GetirDriveServiceDetail />
      <GetirN11ServiceDetail />
      <GetirSelectServiceDetail />
      <GetirFinanceServiceDetail />
      <ListDetail />
    </>
  );
};

const reduxKey = REDUX_KEY.CLIENT_TARGETING;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ClientTargeting);
