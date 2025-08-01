/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import moment from 'moment';

import _ from 'lodash';

import {
  AICommunicationsDetails,
  ChildPromo,
  GeneralInformationFormType,
  MobileAppActionType,
  ParentPromo,
  Promo,
  PromoMechanic,
  PromoStatus,
  PromoTagType,
} from '@app/pages/Promo/types';
import { DefaultTermsAndConditions, tabPromoMechanics } from '@app/pages/Promo/constantValues';
import { getFinancedBy } from '@app/pages/Promo/utils';

export type GetPromoByIdResponse = {
  promo: Promo
}

type StateType = {
  data: Promo | null;
  loading: boolean;
  error: string | null;
  isPreviewsHidden: boolean
  isUpdateStatusPending: boolean;
}

const initialState: StateType = {
  data: null,
  loading: false,
  error: null,
  isPreviewsHidden: true,
  isUpdateStatusPending: false,
};

type GetPromoByIdRequest = {
  id: MongoIDType
}

export const PromoDetailSlice = createSlice({
  name: 'PromoDetail/PromoDetail',
  initialState,
  reducers: {
    getPromoByIdRequest: (state, action: PayloadAction<GetPromoByIdRequest>) => {
      state.loading = true;
    },
    getPromoByIdSuccess: (state, action: PayloadAction<GetPromoByIdResponse>) => {
      state.loading = false;
      state.data = action.payload.promo;
    },
    getPromoByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAICommunicationsStatus: (state, action: PayloadAction<AICommunicationsDetails>) => {
      if (state.data) {
        state.data.aiCommunicationsStatus = action.payload;
      }
    },
    togglePicturePreviews: state => {
      state.isPreviewsHidden = !state.isPreviewsHidden;
    },
    updatePromoPartial: (state, action: PayloadAction<Partial<Promo>>) => {
      if (state.data) {
        const nestedPayload = {};

        Object.entries(action.payload).forEach(([path, value]) => {
          _.set(nestedPayload, path, value);
        });

        state.data = _.merge({}, state.data, nestedPayload);
      }
    },
    getChildrenOfParentPromoRequest: () => {
    },
    setChildren: (state, action: PayloadAction<ChildPromo[]>) => {
      if (state.data) {
        state.data.children = action.payload;
        const singleAndChildPromos = action.payload.filter(child => !child.isParent);
        const createdChildrenCount = singleAndChildPromos.filter(item => item.creatorParentId === state.data!._id).length;
        const totalChildrenCount = action.payload.length;
        const addedChildrenCount = singleAndChildPromos.length - createdChildrenCount;
        const activePromoCount = singleAndChildPromos.filter(item => item.status === PromoStatus.Active).length;
        state.data.parentPromoDetails = {
          createdChildrenCount,
          totalChildrenCount,
          addedChildrenCount,
          activePromoCount,
        };
      }
    },
    toggleStatusRequest: state => {
      state.isUpdateStatusPending = true;
    },
    toggleStatusSuccess: state => {
      state.isUpdateStatusPending = false;
      if (state.data) {
        state.data.status = state.data.status === PromoStatus.Active ? PromoStatus.Inactive : PromoStatus.Active;
      }
    },
    toggleStatusFailure: state => {
      state.isUpdateStatusPending = false;
    },
    setParents: (state, action: PayloadAction<ParentPromo[]>) => {
      if (state.data) {
        state.data.parents = action.payload;
      }
    },
    initPage: () => initialState,
    destroyPage: () => initialState,
  },
  selectors: {
    promo: (state): Promo => {
      return state.data ?? {} as Promo;
    },
    isLoading: state => state.loading,
    error: state => state.error,
    promoMechanic: state => state.data?.promoMechanic!,
    autoAggressionLevels: state => state.data?.autoAggressionLevels,
    availableTimes: state => state.data?.availableTimes,
    promoId: state => state.data?._id!,
    usedOrderCount: state => state.data?.usedOrderCount,
    classificationFormInitialValues: state => {
      const promo = state.data;
      return {
        promoClass: promo?.promoClassification?.promoClass || null,
        responsibleDepartment:
          promo?.promoClassification?.responsibleDepartment || null,
        objective: promo?.promoClassification?.objective || null,
        occasion: promo?.promoClassification?.occasion || null,
        daypart: promo?.promoClassification?.daypart || null,
        weekpart: promo?.promoClassification?.weekpart || null,
        funnelSegment: promo?.promoClassification?.funnelSegment || null,
        benefitGroup: promo?.promoClassification?.benefitGroup || null,
        productTLGroup: promo?.promoClassification?.productTLGroup || null,
        location: promo?.promoClassification?.location || null,
      };
    },
    promoCode: state => state.data?.promoCode,
    domainTypes: state => state.data?.domainTypes,
    country: state => state.data?.country,
    aiCommunicationsStatus: state => state.data?.aiCommunicationsStatus,
    aiCommunicationsFormInitialValues: state => {
      const promo = state.data;

      return {
        isCommsEnabled: promo?.isCommsEnabled,
        assets: promo?.aiCommunicationsStatus?.data?.assets || [],
        description: promo?.aiCommunicationsStatus?.data?.description || '',
      };
    },
    conditionItems: state => state.data?.condition?.items,
    conditionProductsFormInitialValues: state => {
      const promo = state.data;

      return {
        items: promo?.condition?.items?.map(item => {
          if (typeof item === 'string') {
            return item;
          }
          return item?.id;
        }) || [],
        minItemCount: promo?.condition?.minItemCount || 0,
        minItemTotalAmount: promo?.condition?.minItemTotalAmount || 0,
      };
    },
    excludedProductsFormInitialValues: state => {
      const promo = state.data;

      return {
        exItems: promo?.exItems || [],
        excludedProductCategories: promo?.excludedProductCategories || [],
        excludedProductSubCategories: promo?.excludedProductSubCategories || [],
      };
    },
    isListingPromo: state => {
      const promo = state.data;

      return promo?.promoMechanic === PromoMechanic.BUY_X_AND_GET_Y_FOR_FREE
        || promo?.promoMechanic === PromoMechanic.BUY_X_GET_Y_TL_DISCOUNT
        || promo?.promoMechanic === PromoMechanic.CHANGE_PRICE;
    },
    financialConditionFormInitialValues: state => {
      const promo = state.data!;

      return {
        paymentMethods: promo.paymentMethods?.map(item => item.toString()) || [],
        doNotApplyMinimumBasketSize: promo.doNotApplyMinimumBasketSize || false,
        minOrderTotalPrice: promo.minOrderTotalPrice || 0,
        maxOrderTotalPrice: promo.maxOrderTotalPrice || 0,
        foodBasketValueBehaviorType: promo.foodBasketValueBehaviorType?.toString() || null,
        cardBins: promo.cardBins || [],
        promoFinancedBy: getFinancedBy(promo),
        supplier: promo.supplier || null,
        supplierSupportRate: promo.supplierSupportRate || 0,
        isFreeProduct: promo.isFreeProduct || false,
        thirdPartySupportRate: promo.thirdPartySupportRate || 0,
      };
    },
    linkedAndDependentPromos: state => {
      const promo = state.data!;
      return {
        linkedPromos: promo.linkedPromos,
        dependentPromos: promo.dependentPromos,
      };
    },
    p3Enabled: state => state.data?.isP3Enabled,
    conditionProductsEnabled: state => {
      const promo = state.data;
      return !promo?.isParent
        && !promo?.isParentPromo
        && promo?.promoMechanic && ![PromoMechanic.BASKET_CHANGE_PRICE, PromoMechanic.STAR_DEALS].includes(promo.promoMechanic);
    },
    isMaster: state => !!state.data?.isParent,
    isParent: state => !!state.data?.isParentPromo,
    generalInformationFormInitialValues: (state): GeneralInformationFormType => {
      const promo = state.data!;

      return {
        promoTarget: promo.promoTarget,
        domainTypes: promo.domainTypes,
        promoCode: promo.promoCode,
        deviceTypes: promo.deviceTypes,
        openAggressionStates: promo.openAggressionStates,
        isAggressionStateNonAffected: promo.isAggressionStateNonAffected,
        priority: promo.priority,
        validFrom: moment(promo.validFrom),
        validUntil: moment(promo.validUntil),
        cities: promo.cities,
        warehouses: promo.warehouses,
      };
    },
    warehouses: state => state.data?.warehouses,
    isTabPromo: state => Object.keys(tabPromoMechanics).includes(state.data!.promoMechanic.toString()),
    isPreviewsHidden: state => state.isPreviewsHidden,
    canHaveChildPromos: state => state.data?.isParent || state.data?.isParentPromo,
    hasChildren: state => (state.data?.children.length ?? 0) > 0,
    buttonActionFormInitialValues: (state): Omit<Promo['button']['action'], 'text'> & {
      text: Promo['button']['text']
    } => {
      const promo = state.data!;

      return {
        ...promo.button.action,
        isConfirmationPopupEnabled: !!promo.button.action.isConfirmationPopupEnabled,
        text: promo.button.text,
        type: promo.promoMechanic === PromoMechanic.STAR_DEALS ? MobileAppActionType.ShowPromotionProducts : promo.button.action.type,
      };
    },
    children: (state): ChildPromo[] => state.data?.children || [],
    activePromoCount: state => state.data?.parentPromoDetails.activePromoCount,
    parents: (state): ParentPromo[] => state.data?.parents || [],
    status: state => state.data?.status,
    isUpdateStatusPending: state => state.isUpdateStatusPending,
    masters: state => {
      const masters = new Map<MongoIDType, PromoTagType>();
      state.data?.children.forEach(child => {
        if (child.master && !masters.has(child.master._id)) {
          masters.set(child.master._id, child.master);
        }
      });

      return Array.from(masters.values());
    },
    isDiscountAmountAvailable: state => !!state.data && [PromoMechanic.BASKET_CHANGE_PRICE, PromoMechanic.STAR_DEALS].includes(state.data.promoMechanic),
    termsAndConditions: state => state.data?.termsAndConditions || DefaultTermsAndConditions,
    isLegacyTerms: state => state.data?.promoURL?.tr || state.data?.promoContentURL?.tr || state.data?.promoBodyContentURL?.tr,
  },
});
