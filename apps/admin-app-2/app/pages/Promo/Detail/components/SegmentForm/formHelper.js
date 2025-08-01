import { get } from 'lodash';

import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';
import {
  ALL_PROMO_EXCLUDED_SEGMENTS,
  DEFAULT_EXCLUDED_PROMO_ABUSER,
  DEFAULT_EXCLUDED_PROMO_ABUSER_UNIT,
  excludedPromoAbusers,
  PROMO_MECHANICS,
} from '@app/pages/Promo/constantValues';

export const validationSchema = () => {
  return Yup.object().shape({
    isP3Enabled: Yup.boolean(),
    p3Objective: Yup.string().when('isP3Enabled', {
      is: true,
      then: Yup.string().required(),
      otherwise: Yup.string().nullable(),
    }),
    ownBrands: Yup.array().when('p3Objective', {
      is: val => ['5', '10'].includes(val),
      then: Yup.array().min(1),
      otherwise: Yup.array().nullable(),
    }),
    targetedBrands: Yup.array().when('p3Objective', {
      is: val => ['5', '9'].includes(val),
      then: Yup.array().min(1),
      otherwise: Yup.array().nullable(),
    }),
    ownProducts: Yup.array().when('p3Objective', {
      is: val => ['9'].includes(val),
      then: Yup.array().min(1),
      otherwise: Yup.array().nullable(),
    }),
    targetedProducts: Yup.array().when('p3Objective', {
      is: val => ['6'].includes(val),
      then: Yup.array().min(1),
      otherwise: Yup.array().nullable(),
    }),
    subcategories: Yup.array().when('p3Objective', {
      is: val => ['7', '11'].includes(val),
      then: Yup.array().min(1),
      otherwise: Yup.array().nullable(),
    }),
  });
};

export const getExcludedPromoAbuserOptions = (
  promoAbusers = excludedPromoAbusers,
) => {
  return promoAbusers.map(abuser => {
    return {
      value: abuser.id.toString(),
      label: abuser.level[getLangKey()],
    };
  });
};

export const getObjectiveOptions = () => {
  return [
    {
      label: '[Getir] Objectives',
      options: [
        { label: 'High Propensity', value: 1 },
        { label: 'Penetration', value: 2 },
        { label: 'Order Driver', value: 4 },
      ],
    },
    {
      label: '[Supplier] Penetration',
      options: [
        { label: 'Brand Competitor Penetration', value: 5 },
        { label: 'Product Competitor Penetration', value: 6 },
        { label: 'Subcategory Building', value: 7 },
        { label: 'Cross-sell Complementary', value: 8 },
        { label: 'Cross-sell Brand', value: 9 },
      ],
    },
    {
      label: '[Supplier] Churn',
      options: [
        { label: 'Brand Churn', value: 10 },
        { label: 'Subcategory Churn', value: 11 },
        { label: 'Product Churn', value: 12 },
      ],
    },
    {
      label: '[Supplier] Upselling',
      options: [
        { label: 'Item Sold Count', value: 13, disabled: true },
        { label: 'Volume Increase', value: 14, disabled: true },
      ],
    },
  ];
};

const INPUT_RENDER_MAP = {
  targetedProducts: [6],
  ownProducts: [6, 8, 9, 12],
  targetedBrands: [5, 9],
  ownBrands: [5, 10],
  subcategories: [7, 11],
};

export const shouldInputRender = (objective, inputName) => {
  return INPUT_RENDER_MAP[inputName]?.includes(objective);
};

const getDefaultPromoAbuser = ({ promo }) => {
  return promo?.promoMechanic === PROMO_MECHANICS.PAY_X_TL_TAKE_Y_TL
    ? DEFAULT_EXCLUDED_PROMO_ABUSER_UNIT.id.toString()
    : DEFAULT_EXCLUDED_PROMO_ABUSER.id.toString();
};

export const getBrandsOptions = brands => {
  return brands.map(brand => {
    return {
      value: brand._id,
      label: brand.name,
    };
  });
};

export const getCategoryOptions = categories => {
  return categories.map(category => {
    return {
      value: category._id,
      label: category.name[getLangKey()],
    };
  });
};

const setClientExSegments = ({ values }) => {
  const selectedPromoAbuser = +(
    values.excludedPromoAbuser?.value || values.excludedPromoAbuser
  );
  const excludedPromoAbuser = excludedPromoAbusers.find(
    abuser => abuser.id === selectedPromoAbuser,
  );
  const allExcludedPromoAbusers = get(excludedPromoAbuser, [
    'excludedSegments',
  ]);
  const clientExSegments = values.clientExSegments?.map(item => (item.value !== undefined ? +item.value : +item));
  if (!allExcludedPromoAbusers) {
    return clientExSegments;
  }
  return [...new Set([...clientExSegments, ...allExcludedPromoAbusers])];
};

export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  const { p3Objective, ownProducts, targetedProducts, ownBrands, targetedBrands, subcategories, ...rest } = values;

  const clientSegments = values.clientSegments.map(item => {
    const val = item.value !== undefined ? item.value : item;
    return +val;
  });

  const clientExSegments = setClientExSegments({ values });

  return {
    ...rest,
    ...(ownProducts.length ? { ownProducts } : {}),
    ...(targetedProducts.length ? { targetedProducts } : {}),
    ...(ownBrands.length ? { ownBrands } : {}),
    ...(targetedBrands.length ? { targetedBrands } : {}),
    ...(subcategories.length ? { subcategories } : {}),
    p3Objective,
    clientSegments,
    clientExSegments,
  };
};

export const getSelectedAbuser = ({ promo }) => {
  if (promo) {
    const clientExSegments = promo?.clientExSegments;
    const selectedAbuser = excludedPromoAbusers.find(abuser => {
      if (abuser.excludedSegments.length && clientExSegments?.length) {
        return abuser.excludedSegments.every(abuserId => clientExSegments.includes(abuserId));
      }
      return null;
    });
    let excludedPromoAbuser = DEFAULT_EXCLUDED_PROMO_ABUSER.id;
    if (selectedAbuser) {
      excludedPromoAbuser = get(selectedAbuser, ['id']);
      return excludedPromoAbuser.toString();
    }
    return '';
  }
  return getDefaultPromoAbuser({ promo });
};

export const getClientExSegments = ({ promo }) => {
  if (promo) {
    const clientExSegments = promo?.clientExSegments;

    const allExcludedPromoAbusers = ALL_PROMO_EXCLUDED_SEGMENTS;
    const newClientExSegments = clientExSegments?.filter(
      segmentId => allExcludedPromoAbusers.indexOf(segmentId) < 0,
    );
    return newClientExSegments;
  }
  return null;
};

export const getInitialValues = (promo, p3Details) => {
  const initialValues = {
    isP3Enabled: promo?.isP3Enabled,
    p3Objective: p3Details?.objective || '',
    targetedProducts: p3Details?.targetedProducts || [],
    ownProducts: p3Details?.ownProducts || [],
    targetedBrands: p3Details?.targetedBrands || [],
    ownBrands: p3Details?.ownBrands || [],
    subcategories: p3Details?.subcategories || [],
    clientSegments: promo?.clientSegments || [],
    clientExSegments: getClientExSegments({ promo }),
    excludedPromoAbuser: getSelectedAbuser({ promo }),
  };
  return initialValues;
};

export const getSegmentCount = (count, t) => {
  switch (count) {
    case 'SUC_CLIENTS':
      return t('SEGMENT.ALL_SUCCESS_CLIENTS');
    case 'ALL':
      return t('SEGMENT.ALL_CLIENTS');
    default:
      return count;
  }
};
