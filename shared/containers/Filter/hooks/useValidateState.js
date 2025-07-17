import { useTranslation } from "react-i18next";
import { isEmpty } from 'lodash';

export const useValidateState = ({ filterKey = "", componentName }) => {
  const { t } = useTranslation('error');

  if (isEmpty(filterKey)) throw new Error(t('filterComponent:FILTER_WRAPPER_NOT_FOUND', { componentName }));
  if (typeof filterKey !== 'string') 
    throw new Error(t('filterComponent:INVALID_FILTER_KEY_TYPE', { componentName: 'FilterWrapper', filterKey }));
};
