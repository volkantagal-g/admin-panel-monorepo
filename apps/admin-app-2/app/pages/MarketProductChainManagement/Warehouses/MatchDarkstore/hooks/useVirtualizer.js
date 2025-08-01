import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback } from 'react';

const useVirtualizerManagement = (
  darkstoreMatchData,
  expandedPanels,
  expandedCategories,
  loadingDarkStoreDetails,
  expandedDarkStoreDetails,
  itemSizeCache,
  parentRef,
) => {
  const getItemSize = useCallback(index => {
    const totalItems = darkstoreMatchData?.darkStores?.length || 0;
    const isLastItem = index === (totalItems - 1);
    const gapSize = isLastItem ? 0 : 8;

    if (!totalItems) {
      return 88 + gapSize;
    }

    const darkStore = darkstoreMatchData.darkStores[index];
    if (!darkStore?.id) {
      return 88 + gapSize;
    }

    const isExpanded = expandedPanels.current.has(darkStore.id);
    if (!isExpanded) {
      return 88 + gapSize;
    }

    return 800 + gapSize;
  }, [darkstoreMatchData?.darkStores, expandedPanels]);

  const virtualizer = useVirtualizer({
    count: darkstoreMatchData?.darkStores?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: getItemSize,
    overscan: 20,
    scrollPaddingStart: 0,
    scrollPaddingEnd: 0,
    getItemKey: index => {
      const darkStore = darkstoreMatchData?.darkStores?.[index];
      return darkStore?.id || index;
    },
    scrollMargin: 0,
    initialOffset: 0,
    lanes: 1,
  });

  return {
    virtualizer,
    getItemSize,
  };
};

export default useVirtualizerManagement;
