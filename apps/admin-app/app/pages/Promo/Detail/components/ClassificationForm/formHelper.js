import { forEach } from 'lodash';

import {
  departmentPromotionsObjectiveTypes,
  PROMO_CLASS,
  promoBenefitGroupTypes,
  promoClasses,
  promoDaypartTypes,
  promoFunnelSegmentTypes,
  promoLocationTypes,
  promoObjectiveTypes,
  promoOccasionTypes,
  promoProductTLGroupTypes,
  promotionsObjectiveTypes,
  promoWeekpartTypes,
} from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';

export const getPromoClassOptions = () => {
  return Object.entries(promoClasses).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getPromoOccasionTypesOptions = () => {
  return Object.entries(promoOccasionTypes)
    .sort(([, aValue], [, bValue]) => aValue.priority - bValue.priority)
    .map(([key, value]) => {
      return {
        value: +key,
        label: value[getLangKey()],
      };
    });
};

export const getResponsibleDepartmentsOptions = responsibleDepartments => {
  if (!responsibleDepartments?.length) return [];
  return responsibleDepartments.filter(department => !department.parent).map(department => {
    return {
      value: department._id,
      label: typeof department.name === 'object' ? department.name?.[getLangKey()] : department.name,
    };
  });
};

export const getPromoDaypartTypesOptions = () => {
  return Object.entries(promoDaypartTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getPromoWeekpartTypesOptions = () => {
  return Object.entries(promoWeekpartTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getPromoFunnelSegmentTypesOptions = () => {
  return Object.entries(promoFunnelSegmentTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getPromoBenefitGroupTypesOptions = () => {
  return Object.entries(promoBenefitGroupTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getPromoProductTLGroupTypesOptions = () => {
  return Object.entries(promoProductTLGroupTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getPromoLocationTypesOptions = () => {
  return Object.entries(promoLocationTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getPromoTargetOptions = promoClass => {
  const objectiveTypes = {};
  if (promoClass === PROMO_CLASS.PROMOTIONS) {
    forEach(promotionsObjectiveTypes, k => {
      objectiveTypes[k] = promoObjectiveTypes[k];
    });
  }
  else if (promoClass === PROMO_CLASS.DEPARTMENT_PROMOTIONS) {
    forEach(departmentPromotionsObjectiveTypes, k => {
      objectiveTypes[k] = promoObjectiveTypes[k];
    });
  }
  return Object.entries(objectiveTypes).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  const newValues = {
    ...values,
    ...(values.promoClass?.value
      ? { promoClass: values.promoClass?.value }
      : null),
    ...(values.responsibleDepartment?.value
      ? { responsibleDepartment: values.responsibleDepartment?.value }
      : null),
    ...(values.occasion?.value ? { occasion: values.occasion?.value } : null),
    ...(values.objective?.value ? { objective: values.objective?.value } : null),
    ...(values.daypart?.value ? { daypart: values.daypart?.value } : null),
    ...(values.weekpart?.value ? { weekpart: values.weekpart?.value } : null),
    ...(values.funnelSegment?.value
      ? { funnelSegment: values.funnelSegment?.value }
      : null),
    ...(values.benefitGroup?.value
      ? { benefitGroup: values.benefitGroup?.value }
      : null),
    ...(values.productTLGroup?.value
      ? { productTLGroup: values.productTLGroup?.value }
      : null),
    ...(values.location?.value ? { location: values.location?.value } : null),
  };
  return newValues;
};
