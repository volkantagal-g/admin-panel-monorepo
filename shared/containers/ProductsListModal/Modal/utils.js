import { isNil } from 'lodash';

import { getLangKey } from '@shared/i18n';

export const filterProductsForName = (searchStr, products) => {
  if (!searchStr) return products;
  const searchLowerCase = searchStr.toLowerCase();

  return products.filter(p => {
    const fullNameLowerCase = p.product?.fullName[getLangKey()].toLowerCase();
    if (!isNil(fullNameLowerCase)) {
      return fullNameLowerCase.includes(searchLowerCase);
    }

    return false;
  });
};
