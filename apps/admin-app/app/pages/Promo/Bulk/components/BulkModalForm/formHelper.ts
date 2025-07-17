import * as Yup from 'yup';

import moment from 'moment';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { PromoType } from '@app/pages/Promo/types';

export type csvLineType = {
  conditional_product_id: string | null;
  discounted_product_id: string;
  promo_code: string;
  discount_amount: number;
  min_required_items: number;
  max_item_count: number;
  priority: number;
  start_time: Date;
  end_time: Date;
  use_limit: number;
  daily_use_limit: number;
  // sale_limit: number;
  promo_title_en: string;
  promo_title_tr: string;
  promo_title_local: string;
  promo_description_en: string;
  promo_description_tr: string;
  promo_description_local: string;
};

export type submitType = {
  parentId: string;
  bulkPromos: csvLineType[];
};

export const getTimezonedDates = (startDate: Date, endDate: Date) => {
  if (startDate && endDate) {
    const timezonedStartDate = moment
      .tz(startDate, getSelectedCountryTimezone.getData(undefined))
      .valueOf();
    const timezonedEndDate = moment
      .tz(endDate, getSelectedCountryTimezone.getData(undefined))
      .valueOf();
    return { validFrom: timezonedStartDate, validUntil: timezonedEndDate };
  }

  return { startDate, endDate };
};

const csvSchema = Yup.array()
  .of(
    Yup.object({
      conditional_product_id: Yup.string().nullable(),
      discounted_product_id: Yup.string().when('conditional_product_id', {
        is: null,
        then: Yup.string().required(),
        otherwise: Yup.string().nullable(),
      }),
      promo_code: Yup.string().required(),
      discount_amount: Yup.number().required(),
      min_required_items: Yup.number().required(),
      max_item_count: Yup.number().required(),
      priority: Yup.number().required(),
      start_time: Yup.date().required(),
      end_time: Yup.date().required(),
      use_limit: Yup.number().required(),
      daily_use_limit: Yup.number().max(Yup.ref('use_limit'), 'Daily use limit must be less than use limit'),
      // sale_limit: Yup.number().nullable(),
      promo_title_en: Yup.string().nullable(),
      promo_title_tr: Yup.string().nullable(),
      promo_title_local: Yup.string().nullable(),
      promo_description_en: Yup.string().nullable(),
      promo_description_tr: Yup.string().nullable(),
      promo_description_local: Yup.string().nullable(),
    }),
  )
  .required();

export const validationSchema = () => {
  return Yup.object().shape({
    parentId: Yup.string().required(),
    promoType: Yup.number(),
    bulkPromos: Yup.array()
      .when('promoType', {
        is: PromoType.Percentage,
        then: Yup.array().of(
          Yup.object({ discount_amount: Yup.number().min(0).max(1) }),
        ),
        otherwise: csvSchema,
      })
      .required(),
  });
};

export const getValuesBeforeSubmit = (values: submitType, countryLanguages: string[]) => {
  const localLanguage = countryLanguages.find(lang => lang !== 'tr' && lang !== 'en');

  const bulkPromos = values.bulkPromos.map(val => {
    const { validFrom, validUntil } = getTimezonedDates(
      val.start_time,
      val.end_time,
    );
    return {
      useLimitPerDay: val.daily_use_limit,
      discountAmount: val.discount_amount,
      ...(val.conditional_product_id
        ? { conditionalProductId: [val.conditional_product_id] }
        : undefined),
      ...(val.discounted_product_id
        ? { items: [val.discounted_product_id] }
        : undefined),
      validFrom,
      validUntil,
      maxItemCount: val.max_item_count,
      priority: val.priority,
      minItemCount: val.min_required_items,
      promoCode: val.promo_code,
      useLimit: val.use_limit,
      title: {
        en: val.promo_title_en,
        tr: val.promo_title_tr,
        ...(localLanguage ? { [localLanguage]: val.promo_title_local } : undefined),
      },
      description: {
        en: val.promo_description_en,
        tr: val.promo_description_tr,
        ...(localLanguage ? { [localLanguage]: val.promo_description_local } : undefined),
      },
      // ...(val.sale_limit ? { saleLimit: val.sale_limit } : undefined),
    };
  });
  return {
    parentId: values.parentId,
    bulkPromos,
  };
};

export const getInitialValues = () => {
  const initialValues = {
    parentId: '',
    bulkPromos: [],
    promoType: undefined,
  };
  return initialValues;
};

export const getParentIdOptions = (
  masterPromos: Array<{ _id: string; promoCode: string }>,
) => {
  return masterPromos.map(promo => {
    return { label: promo.promoCode, value: promo._id };
  });
};

export const validateCSVData = (data: unknown) => {
  return csvSchema.validateSync(data);
};

export const ExampleCsvColumns = [Object.fromEntries([
  'conditional_product_id',
  'discounted_product_id',
  'priority',
  'promo_code',
  'discount_amount',
  'min_required_items',
  'max_item_count',
  'start_time',
  'end_time',
  'use_limit',
  'daily_use_limit',
  'sale_limit',
  'promo_title_en',
  'promo_title_tr',
  'promo_title_local',
  'promo_description_en',
  'promo_description_tr',
  'promo_description_local',
].map(item => [item, item]))];

export const ExampleCsvData = [
  {
    conditional_product_id: '5d1a793edca34c00011dd1a7',
    discounted_product_id: '5d1a793edca34c00011dd1a7',
    priority: 436645,
    promo_code: 'Load_promo5',
    discount_amount: 1,
    min_required_items: 2,
    max_item_count: 1,
    start_time: '2024-09-03T08:00:00.000Z',
    end_time: '2024-09-11T11:59:00.000Z',
    use_limit: 10,
    daily_use_limit: 10,
    sale_limit: null,
    promo_title_en: 'Second product 5 TL off',
    promo_title_tr: null,
    promo_title_local: '2. ürüne 5 TL indirim',
    promo_description_en: 'To use the promo you must add at least 2 selected products to your basket.',
    promo_description_tr: null,
    promo_description_local: 'Kampanyadan faydalanabilmek için seçili ürünlerden en az 2 adet sepetinize eklemelisiniz.',
  },
  {
    conditional_product_id: '5d26deb51ee04f0001ee4130',
    discounted_product_id: '5d26deb51ee04f0001ee4130',
    priority: 2427667,
    promo_code: 'Load_promo6',
    discount_amount: 1,
    min_required_items: 2,
    max_item_count: 1,
    start_time: '2024-09-03T08:00:00.000Z',
    end_time: '2024-09-11T11:59:00.000Z',
    use_limit: 10,
    daily_use_limit: 10,
    sale_limit: null,
    promo_title_en: 'Second product 5 TL off',
    promo_title_tr: null,
    promo_title_local: '2. ürüne 5 TL indirim',
    promo_description_en: 'To use the promo you must add at least 2 selected products to your basket.',
    promo_description_tr: null,
    promo_description_local: 'Kampanyadan faydalanabilmek için seçili ürünlerden en az 2 adet sepetinize eklemelisiniz.',
  },
];
