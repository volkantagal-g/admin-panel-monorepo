import { useMemo } from 'react';

import { getLangKey } from '@shared/i18n';
import {
  DEMOGRAPHY_LABELS,
  DETAIL_INFO_DOMAIN_TYPES,
  SEGMENT_LABELS,
  SIZE_LABELS,
  STORAGE_TYPE_LABELS,
  WAREHOUSE_TYPE_LABELS,
} from '@app/pages/MarketProductChainManagement/constants';
import { formatDisplayContent } from '@app/pages/MarketProductChainManagement/utils/formatters';
import { pageConfig } from '@app/pages/MarketProductChainManagement/utils/pageConfig';
import { WAREHOUSE_DETAIL_TYPES } from '@app/pages/MarketProductChainManagement/Warehouses/constants';

// Label mapping configuration
const LABEL_MAPS = {
  DOMAIN: DETAIL_INFO_DOMAIN_TYPES,
  DEMOGRAPHY: DEMOGRAPHY_LABELS,
  SIZE: SIZE_LABELS,
  SEGMENT: SEGMENT_LABELS,
  STORAGE_TYPE: STORAGE_TYPE_LABELS,
  WAREHOUSE_TYPE: WAREHOUSE_TYPE_LABELS,
};

// Keys that require label mapping
const MAPPED_KEYS = Object.keys(LABEL_MAPS);

/**
 * Get localized label for a given type and value
 * @param {string} key - Type of the label (e.g., 'DOMAIN', 'SEGMENT')
 * @param {number|string} value - Value to get label for
 * @returns {string} Localized label or original value if not found
 */
const getLocalizedLabel = (key, value) => {
  const labelMap = LABEL_MAPS[key];
  if (!labelMap) return value;

  const currentLang = getLangKey();
  return labelMap[value]?.[currentLang] || value;
};

/**
 * Format content based on its type
 * @param {string} key - Type of the content
 * @param {any} content - Content to format
 * @returns {string} Formatted content
 */
const formatContent = (key, content) => {
  if (Array.isArray(content)) {
    if (key === 'DOMAIN' && content.length > 0 && content[0].domainType) {
      return content
        .map(item => getLocalizedLabel(key, item.domainType))
        .join(', ');
    }

    if (key === 'WAREHOUSE_TYPE') {
      return content
        .map(item => getLocalizedLabel(key, item))
        .join(', ');
    }

    return content
      .map(item => getLocalizedLabel(key, item))
      .join(', ');
  }

  // Handle localized objects (e.g., name)
  if (content && typeof content === 'object' && (content.en || content.tr)) {
    return content[getLangKey()] || content.en || '';
  }

  // Handle boolean values (e.g., isLocal)
  if (typeof content === 'boolean') {
    return content ? 'Evet' : 'Hayır';
  }

  // Handle values that need label mapping
  if (MAPPED_KEYS.includes(key)) {
    return getLocalizedLabel(key, content);
  }

  return content;
};

/**
 * Get configuration based on detail type
 * @param {string} detailType - Type of detail view
 * @returns {Array} Configuration for the detail type
 */
const getDetailConfig = detailType => {
  if (detailType === WAREHOUSE_DETAIL_TYPES.DARK_STORE) {
    return pageConfig.darkStore || [];
  }
  return pageConfig[detailType.toLowerCase()] || [];
};

/**
 * Custom hook for handling detail information display
 * @param {Object} data - Data to display
 * @param {string} detailType - Type of detail view
 * @returns {Object} Formatted items and layout information
 */
export const useDetailInfo = (data, detailType) => {
  // Get configuration for the detail type
  const config = useMemo(
    () => getDetailConfig(detailType),
    [detailType],
  );

  // Transform data into display items
  const items = useMemo(() => {
    if (!data) return [];

    return config.map(({ key, contentKey, icon }) => {
      const rawContent = data[contentKey];
      const formattedContent = formatContent(key, rawContent);
      const displayContent = formatDisplayContent(key, formattedContent);

      return {
        key,
        icon,
        title: key,
        content: displayContent,
      };
    });
  }, [config, data]);

  // Determine if the layout should be reduced
  const hasReducedItems = config.length === 6;

  return {
    items,
    hasReducedItems,
  };
};
