import { getLangKey } from '@shared/i18n';
import { getCommonTypography } from '../utils';

export const filterPageObjects = ({ pageObjects, searchText }) => {
  return pageObjects.filter(pageObject => {
    if (!searchText) return false;
    const { name, description, permKey } = pageObject;

    const nameMatch = `${name?.tr} ${name?.en}`.toLocaleLowerCase(getLangKey()).includes(searchText.toLocaleLowerCase(getLangKey()));
    if (nameMatch) return true;
    const descriptionMatch = `${description?.tr} ${description?.en}`.toLocaleLowerCase(getLangKey()).includes(searchText.toLocaleLowerCase(getLangKey()));
    if (descriptionMatch) return true;

    const permKeyMatch = permKey.toLocaleLowerCase(getLangKey()).includes(searchText.toLocaleLowerCase(getLangKey()));
    if (permKeyMatch) return true;

    return false;
  });
};

export const getFormattedPageObject = ({ page }) => {
  const { name, description } = page || {};
  const formatted = `${name?.[getLangKey()]} — ${description?.[getLangKey()]}`;
  return getCommonTypography(formatted);
};

export function fillLinkMenuItems({ initialMenus, resultMenus, parentMenus = [] }) {
  const newMenus = resultMenus || [];

  for (let i = 0; i < initialMenus.length; i++) {
    const menu = initialMenus[i];
    if (menu?.children) {
      fillLinkMenuItems({
        initialMenus: menu.children,
        resultMenus: newMenus,
        parentMenus: parentMenus ? [...parentMenus, menu] : [menu],
      });
    }
    else {
      newMenus.push({ ...menu, parentMenus });
    }
  }

  return newMenus;
}
