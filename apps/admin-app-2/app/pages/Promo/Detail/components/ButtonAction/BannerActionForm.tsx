import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Col, Form, Row, Select, Switch } from 'antd';

import { useFormik } from 'formik';

import { getSelectFilterOption } from '@shared/utils/common';
import { InAppRedirectAction } from '@app/pages/Promo/Detail/components/ButtonAction/InAppRedirectAction';
import { SearchInApplicationAction } from '@app/pages/Promo/Detail/components/ButtonAction/SearchInApplicationAction';
import OpenApplicationAction from '@app/pages/Promo/Detail/components/ButtonAction/OpenApplicationAction';
import { RestaurantListAction } from '@app/pages/Promo/Detail/components/ButtonAction/RestaurantListAction';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { RedirectToUrlAction } from '@app/pages/Promo/Detail/components/ButtonAction/RedirectToUrlAction';
import { ShowProductAction } from '@app/pages/Promo/Detail/components/ButtonAction/ShowProductAction';
import { ShowCategoryAction } from '@app/pages/Promo/Detail/components/ButtonAction/ShowCategoryAction';
import { ShowMultipleProductsAction } from '@app/pages/Promo/Detail/components/ButtonAction/ShowMultipleProductsAction';
import { AddToBasketAction } from '@app/pages/Promo/Detail/components/ButtonAction/AddToBasketAction';
import { PhoneCallAction } from '@app/pages/Promo/Detail/components/ButtonAction/PhoneCallAction';
import { OpenPromotionAction } from '@app/pages/Promo/Detail/components/ButtonAction/OpenPromotionAction';
import { OpenAnnouncementAction } from '@app/pages/Promo/Detail/components/ButtonAction/OpenAnnouncementAction';
import { RedirectRestaurantDetailAction } from '@app/pages/Promo/Detail/components/ButtonAction/RedirectRestaurantDetailAction';
import { RedirectToLocalsStoreListAction } from '@app/pages/Promo/Detail/components/ButtonAction/RedirectToLocalsStoreListAction';
import { RedirectToLocalsStoreDetailAction } from '@app/pages/Promo/Detail/components/ButtonAction/RedirectToLocalsStoreDetailAction';
import { GetirLocalsMerchantDetailAction } from '@app/pages/Promo/Detail/components/ButtonAction/GetirLocalsMerchantDetailAction';
import { GetirLocalsFilteredMerchantListAction } from '@app/pages/Promo/Detail/components/ButtonAction/GetirLocalsFilteredMerchantListAction';
import { GetirLocalsChainMerchantDetailAction } from '@app/pages/Promo/Detail/components/ButtonAction/GetirLocalsChainMerchantDetailAction';
import { GetirLocalsCuisineFilteringListAction } from '@app/pages/Promo/Detail/components/ButtonAction/GetirLocalsCuisineFilteringListAction';
import { GetirLocalsMerchantSearchTaggedListAction } from '@app/pages/Promo/Detail/components/ButtonAction/GetirLocalsMerchantSearchTaggedListAction';
import { MobileAppActionType } from '../../../types';
import { ButtonActionFormType, getButtonActionOptions } from './formHelper';

type PropTypes = {
  disabled?: boolean
  formik: ReturnType<typeof useFormik<ButtonActionFormType>>
}

export function BannerActionForm({ formik, disabled }: PropTypes) {
  const promoMechanic = useSelector(PromoDetailSlice.selectors.promoMechanic);
  const isParentPromo = useSelector(PromoDetailSlice.selectors.isParent);
  const { t } = useTranslation('bannerAction');
  const { values, setValues } = formik;

  const handleActionTypeChange = (type: MobileAppActionType) => {
    setValues({ ...values, type, data: {} });
  };

  return (
    <Form
      id="banner-action-form"
      layout="vertical"
    >
      <Row gutter={24}>
        <Col span={24}>
          <MultiLanguageInput
            label={t('TEXT')}
            disabled={disabled}
            fieldPath={['text']}
            formik={formik}
          />
        </Col>
        <Col span={24} style={{ marginBottom: -15 }}>
          <Form.Item
            label={t('TYPE')}
          >
            <Select
              options={getButtonActionOptions({ isParentPromo, promoMechanic })}
              showSearch
              filterOption={getSelectFilterOption}
              value={values.type}
              disabled={disabled}
              onChange={handleActionTypeChange}
            />
          </Form.Item>
        </Col>

        {/* Redirect to url */}
        {values.type === MobileAppActionType.RedirectToURL && (
          <RedirectToUrlAction value={values} onChange={setValues} disabled={disabled} />
        )}

        {/* In app redirect */}
        {values.type === MobileAppActionType.InAppRedirection && (
          <InAppRedirectAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Show Product */}
        {values.type === MobileAppActionType.ShowProduct && (
          <ShowProductAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Show Category */}
        {values.type === MobileAppActionType.ShowCategory && (
          <ShowCategoryAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Search in Application */}
        {values.type === MobileAppActionType.SearchInApplication && (
          <SearchInApplicationAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Show Multiple Product */}
        {values.type === MobileAppActionType.ShowMultipleProducts && (
          <ShowMultipleProductsAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Open Application */}
        {values.type === MobileAppActionType.OpenApplication && (
          <OpenApplicationAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Add to Basket */}
        {values.type === MobileAppActionType.AddToBasket && (
          <AddToBasketAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Phone call */}
        {values.type === MobileAppActionType.PhoneCall && (
          <PhoneCallAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Open Promotion */}
        {values.type === MobileAppActionType.OpenPromotion && (
          <OpenPromotionAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Open Announcement */}
        {values.type === MobileAppActionType.OpenAnnouncement && (
          <OpenAnnouncementAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Redirect Restaurant Detail */}
        {values.type === MobileAppActionType.RedirectToRestaurantDetail && (
          <RedirectRestaurantDetailAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Redirect Restaurant List */}
        {values.type === MobileAppActionType.RedirectToRestaurantList && (
          <RestaurantListAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Local Store List */}
        {values.type === MobileAppActionType.RedirectToLocalsStoreList && (
          <RedirectToLocalsStoreListAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Local Store Detail */}
        {values.type === MobileAppActionType.RedirectToLocalsStoreDetail && (
          <RedirectToLocalsStoreDetailAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Local Merchant Detail */}
        {values.type === MobileAppActionType.GetirLocalsMerchantDetail && (
          <GetirLocalsMerchantDetailAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Local Filtered Merchant List */}
        {values.type === MobileAppActionType.GetirLocalsFilteredMerchantList && (
          <GetirLocalsFilteredMerchantListAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Local Merchant Detail */}
        {values.type === MobileAppActionType.GetirLocalsChainMerchantDetail && (
          <GetirLocalsChainMerchantDetailAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Local Merchant Type */}
        {values.type === MobileAppActionType.GetirLocalsCuisineFilteringList && (
          <GetirLocalsCuisineFilteringListAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Local Merchant Tagged List */}
        {values.type === MobileAppActionType.GetirLocalsMerchantSearchTaggedList && (
          <GetirLocalsMerchantSearchTaggedListAction value={values} disabled={disabled} onChange={setValues} />
        )}

        {/* Confirmation Popup */}
        <Col span={24} className="mt-4">
          <Form.Item
            label={t('CONFIRMATION_MESSAGE')}
          >
            <Switch
              checked={!!values.isConfirmationPopupEnabled}
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
              disabled={disabled}
              className={
                values.isConfirmationPopupEnabled
                  ? 'bg-success'
                  : 'bg-danger'
              }
              onChange={isConfirmationPopupEnabled => setValues({ ...values, isConfirmationPopupEnabled })}
            />
          </Form.Item>
        </Col>
        {values.isConfirmationPopupEnabled && (
          <Col span={24}>
            <MultiLanguageInput
              label={t('MESSAGE')}
              fieldPath={['confirmationPopup', 'message']}
              disabled={disabled}
              formik={formik}
            />
            <MultiLanguageInput
              label={t('POSITIVE_BUTTON')}
              fieldPath={['confirmationPopup', 'positiveButton', 'text']}
              disabled={disabled}
              formik={formik}
            />
            <MultiLanguageInput
              label={t('NEGATIVE_BUTTON')}
              fieldPath={['confirmationPopup', 'negativeButton', 'text']}
              disabled={disabled}
              formik={formik}
            />
          </Col>
        )}
      </Row>
    </Form>
  );
}
