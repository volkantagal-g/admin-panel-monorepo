import { createMap } from '@shared/utils/common';
import { TABLE_TYPES } from '@app/pages/GetirMarket/CommercialMonitoring/components/Table/constants';

export const getFilteredSubCategories = ({ subCategories, selectedCategories }) => {
  const filteredSubCategories = [];

  subCategories?.forEach(subCategory => {
    if (selectedCategories?.includes(subCategory?.parent?._id)) {
      filteredSubCategories.push(subCategory);
    }
  });

  return filteredSubCategories;
};

export const getFilteredSelectedSubCategoryBySelectedCategories = ({
  selectedSubCategories,
  selectedCategories,
  subCategories,
}) => {
  const subCategoriesMap = createMap(subCategories);
  return selectedSubCategories?.filter(subCategoryId => (
    selectedCategories.includes(subCategoriesMap?.[subCategoryId]?.parent?._id)
  ));
};

export const getTableTypeButtonOptions = ({ t, isMobile }) => [
  { label: t('global:PRODUCT'), value: TABLE_TYPES.PRODUCT },
  { label: isMobile ? t('commercialMonitoringPage:SUB_CATEGORY_SHORT') : t('global:SUB_CATEGORY'), value: TABLE_TYPES.SUB_CATEGORY },
  { label: t('global:CATEGORY'), value: TABLE_TYPES.CATEGORY },
  { label: t('global:SUPPLIER'), value: TABLE_TYPES.SUPPLIER },
];
