import arrowsExpand from '@app/pages/MarketProductChainManagement/assets/Icons/arrows-expand.svg';
import globe from '@app/pages/MarketProductChainManagement/assets/Icons/globe.svg';
import map from '@app/pages/MarketProductChainManagement/assets/Icons/map.svg';
import officeBuilding from '@app/pages/MarketProductChainManagement/assets/Icons/office-building.svg';
import star from '@app/pages/MarketProductChainManagement/assets/Icons/star.svg';
import tag from '@app/pages/MarketProductChainManagement/assets/Icons/tag.svg';
import { DETAIL_INFO_CONTENT_KEYS, DETAIL_INFO_KEYS } from '@app/pages/MarketProductChainManagement/constants';

export const pageConfig = {
  warehouse: [
    { key: DETAIL_INFO_KEYS.DOMAIN, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.DOMAIN], icon: star },
    { key: DETAIL_INFO_KEYS.REGION, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.REGION], icon: map },
    { key: DETAIL_INFO_KEYS.CITY, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.CITY], icon: officeBuilding },
    { key: DETAIL_INFO_KEYS.DARK_STORES, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.DARK_STORES], icon: tag },
  ],
  product: [
    { key: DETAIL_INFO_KEYS.DOMAIN, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.DOMAIN], icon: star },
    { key: DETAIL_INFO_KEYS.CATEGORY, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.CATEGORY], icon: map },
    { key: DETAIL_INFO_KEYS.SEGMENT, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.SEGMENT], icon: tag },
    { key: DETAIL_INFO_KEYS.STORAGE_TYPE, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.STORAGE_TYPE], icon: officeBuilding },
    { key: DETAIL_INFO_KEYS.DEMOGRAPHY, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.DEMOGRAPHY], icon: globe },
    { key: DETAIL_INFO_KEYS.SIZE, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.SIZE], icon: arrowsExpand },
    { key: DETAIL_INFO_KEYS.LOCAL, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.LOCAL], icon: star },
    {
      key: DETAIL_INFO_KEYS.WAREHOUSE_TYPE,
      contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.WAREHOUSE_TYPE],
      icon: officeBuilding,
    },
  ],
  darkStore: [
    { key: DETAIL_INFO_KEYS.DOMAIN, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.DOMAIN], icon: star },
    { key: DETAIL_INFO_KEYS.REGION, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.REGION], icon: map },
    { key: DETAIL_INFO_KEYS.CITY, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.CITY], icon: officeBuilding },
    { key: DETAIL_INFO_KEYS.WAREHOUSE_TYPE, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.WAREHOUSE_TYPE], icon: officeBuilding },
    { key: DETAIL_INFO_KEYS.DEMOGRAPHY, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.DEMOGRAPHY], icon: globe },
    { key: DETAIL_INFO_KEYS.SIZE, contentKey: DETAIL_INFO_CONTENT_KEYS[DETAIL_INFO_KEYS.SIZE], icon: arrowsExpand },
  ],
};
