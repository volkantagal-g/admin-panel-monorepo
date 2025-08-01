import _ from 'lodash';

import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';

export const getFormattedProductPositions = (productPositions, areInactivesShowing) => {
  let statusFilter = MARKET_PRODUCT_STATUS.ACTIVE;
  if (areInactivesShowing) {
    statusFilter = undefined;
  }
  const newProductPositions = productPositions
    .map(productPosition => {
      let isSubCategoryVisible = true;
      if (statusFilter) {
        const subCategoryStatus = _.get(productPosition, 'subCategory.status', false);
        isSubCategoryVisible = subCategoryStatus === MARKET_PRODUCT_STATUS.ACTIVE;
      }
      return {
        ...productPosition,
        isSubCategoryVisible,
      };
    })
    .map(productPosition => {
      let newProductPositionsItems = (productPosition.items || [])?.map(item => {
        const itemVisible = _.get(item, 'item.isVisible', false);
        let isVisible = true;

        if (statusFilter) {
          const itemStatus = _.get(item, 'item.status', false);
          isVisible = itemStatus === MARKET_PRODUCT_STATUS.ACTIVE && itemVisible;
        }
        return {
          ...item,
          item: item.item || {},
          position: item.position,
          isVisible,
        };
      });
      newProductPositionsItems = _.uniqBy(newProductPositionsItems, 'item._id');
      return {
        ...productPosition,
        items: newProductPositionsItems,
      };
    })
    .sort((a, b) => _.get(a, 'subCategory.order') - _.get(b, 'subCategory.order'));
  return newProductPositions;
};

export const getFormattedItemsBeforeSave = (items = []) => {
  const newItems = items.filter(item => !!item.item);
  return newItems.map((item, index) => {
    return {
      item: item.item._id,
      position: Number(index),
    };
  });
};

export const getChangedProductPositions = productPositions => {
  return productPositions.filter(productPosition => {
    const isAnyProductItemsChanged = (productPosition.items || [])?.some(item => item.hasBorder);
    return isAnyProductItemsChanged;
  });
};

export const checkInactiveProductPositionChange = productPositions => {
  const modifiedItemList = [];
  const categoryItems = productPositions?.map(category => category?.items);
  categoryItems?.map(items => {
    return items?.map(item => {
      return modifiedItemList.push({ isVisible: item?.isVisible, hasBorder: item?.hasBorder });
    });
  });

  const inactiveProductChangeList = modifiedItemList?.filter(item => item?.isVisible === false && item?.hasBorder === true);
  const isAnyInactiveProductPositionChanged = inactiveProductChangeList?.length > 0;

  return isAnyInactiveProductPositionChanged;
};
