import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { compose } from 'redux';

import Spinner from '@shared/components/Spinner';
import CountrySelectionAlert from '@shared/containers/HelperContainer/CountrySelectionAlert';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer, { useInjectReducer } from '@shared/utils/injectReducer';
import injectSaga, { useInjectSaga } from '@shared/utils/injectSaga';
import {
  AutoAggressionLevelsForm,
  AvailableTimesForm,
  BenefitTypeForm,
  ChildPromos,
  ClassificationForm,
  CommunicationsForm,
  ConditionProductsForm,
  ExcludedProductsForm,
  FinancialConditionForm,
  GeneralInfoForm,
  Header,
  LinkedPromotions,
  ParentBenefitType,
  ParentPromos,
  PictureInformation,
  PromoButtonActionForm,
  PromoContentForm,
  PromoDetails,
  PromoUrlForm,
  SegmentForm,
  SegmentTypesForm,
  UserFilteringForm,
} from './components';
import PromoBadgeForm from './components/PromoBadgeForm';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { promoDetailSaga } from '@app/pages/Promo/Detail/redux/sagaV2';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { selectIsPromoCountryAsSelectedCountry } from '@app/pages/Promo/Detail/redux/selectorsV2';
import { usePromoDetailStyles } from '@app/pages/Promo/Detail/styles';
import TermsAndConditions from '@app/pages/Promo/Detail/components/TermsAndConditions';

const reduxKey = REDUX_KEY.PROMO.DETAIL;

const PromoDetailPage = () => {
  usePageViewAnalytics({
    name: ROUTE.PROMO_DETAIL.name,
    squad: ROUTE.PROMO_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { id: promoId } = useParams();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators: PromoDetailSlice.actions });
  // @ts-ignore
  useInitAndDestroyPage({ dispatch, Creators });

  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isPending = useSelector(PromoDetailSlice.selectors.isLoading);
  const isListingPromo = useSelector(PromoDetailSlice.selectors.isListingPromo);
  const isPromoCountryAsSelectedCountry = useSelector(selectIsPromoCountryAsSelectedCountry);
  const isMasterPromo = useSelector(PromoDetailSlice.selectors.isMaster);
  const isPreviewsHidden = useSelector(PromoDetailSlice.selectors.isPreviewsHidden);
  const isParentPromo = useSelector(PromoDetailSlice.selectors.isParent);

  useEffect(() => {
    dispatch(PromoDetailSlice.actions.getPromoByIdRequest({ id: promoId! }));
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
    dispatch(Creators.getResponsibleDepartmentsRequest());
  }, [dispatch, promoId]);

  const styles = usePromoDetailStyles();

  if (isPending && !promo._id) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <span>
        {isPromoCountryAsSelectedCountry ? (
          <Row gutter={[12, 0]} className={styles.wrapper}>
            <Col xs={isPreviewsHidden || isMasterPromo ? 24 : 18}>
              <Row>
                <Col xs={24}>
                  <PromoDetails />
                </Col>
                <Col xs={24}>
                  <GeneralInfoForm />
                </Col>
                <Col span={24}>
                  <Row gutter={[12, 0]}>
                    <ParentPromos />
                    <LinkedPromotions />
                  </Row>
                </Col>
                <ChildPromos />
                <PromoButtonActionForm />
                <Col xs={24}>
                  <PromoContentForm />
                </Col>
                <Col xs={24}>
                  <PromoUrlForm />
                </Col>
                <TermsAndConditions />
              </Row>
              <Row gutter={[12, 0]}>
                <Col xs={12}>
                  <ClassificationForm />
                </Col>
                <Col xs={12}>
                  <UserFilteringForm />
                </Col>
                <Col xs={24}>
                  {
                    isParentPromo ? <ParentBenefitType /> :
                    <BenefitTypeForm />
                  }
                </Col>
                <ExcludedProductsForm />
              </Row>
              <Row gutter={[12, 0]}>
                <ConditionProductsForm />
                {isListingPromo && (
                  <Col xs={24}>
                    <PromoBadgeForm />
                  </Col>
                )}
                <Col xs={24}>
                  <FinancialConditionForm />
                </Col>
                <Col xs={24}>
                  <SegmentForm />
                </Col>
                <Col xs={24}>
                  <CommunicationsForm />
                </Col>
                <SegmentTypesForm />
                <AvailableTimesForm />
                <AutoAggressionLevelsForm />
              </Row>
            </Col>
            <PictureInformation />
          </Row>
        ) : (
          <CountrySelectionAlert
            itemCountryId={promo.country}
            translationKey="promoPage:ALERT_COUNTRY_MESSAGE"
          />
        )}
      </span>
    </>
  );
};

const withSaga = injectSaga({ key: PromoDetailSlice.reducerPath, saga: promoDetailSaga });
const withReducer = injectReducer({ key: PromoDetailSlice.reducerPath, reducer: PromoDetailSlice.reducer });

export default compose(withReducer, withSaga)(PromoDetailPage);
