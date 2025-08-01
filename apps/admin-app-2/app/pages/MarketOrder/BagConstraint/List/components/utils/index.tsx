import { getLangKey } from '@shared/i18n';

export const getMasterCategoriesMap = masterCategories => {
  const masterCategoriesMap = {};
  masterCategories.forEach(category => {
    masterCategoriesMap[category._id] = category;
  });
  return masterCategoriesMap;
};

export const formatBagConstraints = (
  masterCategories = [],
  bagConstraints = [],
  lang = getLangKey(),
) => {
  const masterCategoriesMap = getMasterCategoriesMap(masterCategories);
  bagConstraints.forEach((constraint = {}) => {
    const { right, left } = constraint;
    Object.assign(constraint, {
      firstGroup: left?.items?.map(item => ({
        id: item,
        name: masterCategoriesMap[item]?.name?.[lang] || item,
      })),
      secondGroup: right?.items?.map(item => ({
        id: item,
        name: masterCategoriesMap[item]?.name?.[lang] || item,
      })),
    });
  });
  return bagConstraints;
};
