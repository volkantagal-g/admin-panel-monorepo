import moment from 'moment';

import { convertSelectOptions, convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { GETIR_FOOD } from '@shared/shared/constants';

export const matchedOptions = convertSelectOptions([
  { value: "OnlyReconciled", name: { tr: 'Evet', en: 'Yes' } },
  { value: "OnlyNotReconciled", name: { tr: 'Hayır', en: 'No' } },
  { value: "All", name: { tr: 'Tümü', en: 'All' } },
], { isTranslation: true, valueKey: 'value' });

export const mealCardOptions = convertConstantValuesToSelectOptions(GETIR_FOOD.MEAL_CARDS_STRING);

export const initialValues = {
  mealCard: GETIR_FOOD.MEAL_CARDS.SODEXO,
  isMatched: 'All',
  dateRange: [moment().startOf('day').subtract(10,'days'), moment().endOf('day')],
};

export const MAX_DATE_RANGE_IN_DAYS = 30;