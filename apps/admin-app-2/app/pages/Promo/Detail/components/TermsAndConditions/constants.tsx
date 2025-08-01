import type { Rule } from 'rc-field-form/lib/interface';

import { t } from '@shared/i18n';
import { LanguageGlobal, PromoMechanic, PromoMechanicsSet, TermsAndConditions } from '@app/pages/Promo/types';
import { getPromoMechanicsSet } from '@app/pages/Promo/utils';
import { DefaultTermsAndConditions } from '@app/pages/Promo/constantValues';

/**
 * Enum for TC Chips
 * @enum {string} Correlated with promoPage.json:TERMS_AND_CONDITIONS keys
 */
export enum TCChips {
  SelectAtCheckout = 'SELECT_AT_CHECKOUT',
  InstantDiscount = 'INSTANT_DISCOUNT',
  ExpirationDate = 'EXPIRATION_DATE',
  RemainingUsageRights = 'REMAINING_USAGE_RIGHTS',
  WithOtherPromos = 'WITH_OTHER_PROMOS',
  MinimumBasket = 'MINIMUM_BASKET',
  NoDeliveryFee = 'NO_DELIVERY_FEE'
}

type GetChipParams = { promoMechanic: PromoMechanic, useLimit: number, termsAndConditions: TermsAndConditions }

export function getTCChips({ promoMechanic, useLimit, termsAndConditions }: GetChipParams): TCChips[] {
  const mechanicsSet = getPromoMechanicsSet(promoMechanic);
  const chips: TCChips[] = [];

  if ([PromoMechanicsSet.Tab].includes(mechanicsSet)) {
    chips.push(TCChips.SelectAtCheckout);
  }

  if ([PromoMechanicsSet.Listing, PromoMechanicsSet.Basket].includes(mechanicsSet)) {
    chips.push(TCChips.InstantDiscount, TCChips.WithOtherPromos);
  }

  if (termsAndConditions.checkboxes.isValidDatesEnabled) {
    chips.push(TCChips.ExpirationDate);
  }

  if (useLimit > 0 && useLimit < 15) {
    chips.push(TCChips.RemainingUsageRights);
  }

  if (termsAndConditions.checkboxes.isMinBasketEnabled) {
    chips.push(TCChips.MinimumBasket);
  }

  if (termsAndConditions.checkboxes.isFreeDeliveryEnabled) {
    chips.push(TCChips.NoDeliveryFee);
  }

  return chips;
}

export function getMaxLenMessage(len: number) {
  return t('baseYupError:STRING.MAX', { max: len });
}

export function getMaxLenRules(len: number): Rule[] {
  return [{ type: 'string' }, { max: len, message: getMaxLenMessage(len) }];
}

export function getModifiedValuesBeforeSubmit(termsAndConditions: TermsAndConditions): TermsAndConditions {
  const emptyTranslation = { tr: '', en: '' };

  return {
    checkboxes: termsAndConditions.checkboxes,
    campaignDetails: {
      minBasket: termsAndConditions.checkboxes.isMinBasketEnabled ? termsAndConditions.campaignDetails.minBasket : emptyTranslation,
      maxBenefit: termsAndConditions.checkboxes.isMaxBenefitEnabled ? termsAndConditions.campaignDetails.maxBenefit : emptyTranslation,
      freeDelivery: termsAndConditions.checkboxes.isFreeDeliveryEnabled ? termsAndConditions.campaignDetails.freeDelivery : emptyTranslation,
      validDates: termsAndConditions.checkboxes.isValidDatesEnabled ? termsAndConditions.campaignDetails.validDates : emptyTranslation,
    },
    exampleUsages: termsAndConditions.checkboxes.isExampleUsagesEnabled ? termsAndConditions.exampleUsages : emptyTranslation,
    excludedProducts: termsAndConditions.checkboxes.isExcludedProductsEnabled ? termsAndConditions.excludedProducts : emptyTranslation,
    conditions: { legal: termsAndConditions.checkboxes.isLegalEnabled ? termsAndConditions.conditions.legal : emptyTranslation },
  };
}

function getTranslationOrDefault<T extends keyof typeof DefaultTermsAndConditions>(
  value: LanguageGlobal,
  section: T,
  key?: keyof (typeof DefaultTermsAndConditions)[T],
): LanguageGlobal {
  const defaultValue = key
    ? DefaultTermsAndConditions[section][key]
    : DefaultTermsAndConditions[section];
  return value?.tr ? value : defaultValue as LanguageGlobal;
}

export function getInitialValues(termsAndConditions: TermsAndConditions): TermsAndConditions {
  const { campaignDetails, exampleUsages, excludedProducts, conditions, checkboxes } = termsAndConditions;

  return {
    checkboxes,
    campaignDetails: {
      minBasket: getTranslationOrDefault(campaignDetails?.minBasket, 'campaignDetails', 'minBasket'),
      maxBenefit: getTranslationOrDefault(campaignDetails?.maxBenefit, 'campaignDetails', 'maxBenefit'),
      freeDelivery: getTranslationOrDefault(campaignDetails?.freeDelivery, 'campaignDetails', 'freeDelivery'),
      validDates: getTranslationOrDefault(campaignDetails?.validDates, 'campaignDetails', 'validDates'),
    },
    exampleUsages: getTranslationOrDefault(exampleUsages, 'exampleUsages'),
    excludedProducts: getTranslationOrDefault(excludedProducts, 'excludedProducts'),
    conditions: { legal: getTranslationOrDefault(conditions?.legal, 'conditions', 'legal') },
  };
}
