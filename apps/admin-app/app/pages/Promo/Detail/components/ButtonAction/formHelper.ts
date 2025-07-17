import { getLangKey } from '@shared/i18n';

import { bannerActionTargets } from '@shared/shared/constantValues';
import { getLanguageValues } from '@app/pages/Promo/Detail/utils';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { ConfirmationPopup, LanguageGlobal, MobileAppActionType, PromoMechanic } from '@app/pages/Promo/types';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { mobileAppActionTypes } from '@app/pages/Promo/constantValues';

export type ButtonActionFormType = ReturnType<typeof PromoDetailSlice.selectors.buttonActionFormInitialValues>

export const getInAppRedirectPageOptions = (pageOptions: {
  pageId: string;
  name: Record<string, string>;
}[] = []) => {
  return pageOptions.map(item => ({
    value: item.pageId,
    label: item.name[getLangKey()],
  }));
};

export const getSmartSuggestionsOptions = (smartSuggestions: {
  id: string;
  name: Record<string, string>;
}[] = []) => {
  return smartSuggestions.map(item => ({
    value: item.id,
    label: item.name[getLangKey()],
  }));
};

export const getBannerActionTargetsOptions = () => {
  return Object.entries(bannerActionTargets).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values, countryLanguages }: {
  values: ButtonActionFormType,
  countryLanguages: (keyof LanguageGlobal)[]
}) => {
  const { isConfirmationPopupEnabled, confirmationPopup, text } = values;

  let confirmationPopupMessage: ConfirmationPopup | undefined;

  if (!isConfirmationPopupEnabled) {
    confirmationPopupMessage = {
      message: getLanguageValues(countryLanguages),
      positiveButton: { text: getLanguageValues(countryLanguages) },
      negativeButton: { text: getLanguageValues(countryLanguages) },
    };
  }
  else if (confirmationPopup) {
    confirmationPopupMessage = {
      message: getLanguageValues(countryLanguages, confirmationPopup.message),
      positiveButton: { text: getLanguageValues(countryLanguages, confirmationPopup.positiveButton.text) },
      negativeButton: { text: getLanguageValues(countryLanguages, confirmationPopup.negativeButton.text) },
    };
  }

  return {
    ...values,
    text: getLanguageValues(countryLanguages, text),
    confirmationPopup: confirmationPopupMessage,
  };
};

export type ActionFormProps = {
  value: ButtonActionFormType
  onChange: (value: ButtonActionFormType) => void
  disabled?: boolean
}

export function getButtonActionOptions(args: { promoMechanic: PromoMechanic, isParentPromo: boolean }) {
  const options = convertConstantValuesToSelectOptions(mobileAppActionTypes);

  const onlyShowPromoProductsAvailable = args.promoMechanic === PromoMechanic.STAR_DEALS || args.isParentPromo;
  return options.filter(option => !onlyShowPromoProductsAvailable || option.value === MobileAppActionType.ShowPromotionProducts);
}
