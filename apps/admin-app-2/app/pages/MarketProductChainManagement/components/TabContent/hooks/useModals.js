import { useEffect, useState } from 'react';

import { defaultVisibleColumns } from '@app/pages/MarketProductChainManagement/components/DraggableTable/config';
import { defaultModalOptions, tabOptions } from '@app/pages/MarketProductChainManagement/constants';

export const useModals = activeTab => {
  const [openFreezeColumnsModal, setOpenFreezeColumnsModal] = useState(false);
  const [selectedFreezeColumns, setSelectedFreezeColumns] = useState([]);

  const [openManageColumnsModal, setOpenManageColumnsModal] = useState(false);
  const [tabColumnSelections, setTabColumnSelections] = useState({});

  const selectedManageColumns = tabColumnSelections[activeTab] || defaultVisibleColumns[activeTab] || [];

  useEffect(() => {
    if (!tabColumnSelections[activeTab]) {
      setTabColumnSelections(prev => ({
        ...prev,
        [activeTab]: defaultVisibleColumns[activeTab] || [],
      }));
    }
  }, [activeTab, tabColumnSelections]);

  const setSelectedManageColumns = columns => {
    setTabColumnSelections(prev => ({
      ...prev,
      [activeTab]: columns,
    }));
  };

  const [openDeletePlatformModal, setOpenDeletePlatformModal] = useState(false);
  const [deletePlatformRecord, setDeletePlatformRecord] = useState(null);

  const [openAddPlatformModal, setOpenAddPlatformModal] = useState(false);

  const renderModalOptions = () => {
    const selectedValues = tabOptions[activeTab] || tabOptions.default;
    return defaultModalOptions.filter(option => selectedValues.includes(option.value));
  };

  const onDeletePlatform = record => {
    setDeletePlatformRecord(record);
    setOpenDeletePlatformModal(true);
  };

  return {
    openFreezeColumnsModal,
    setOpenFreezeColumnsModal,
    selectedFreezeColumns,
    setSelectedFreezeColumns,

    openManageColumnsModal,
    setOpenManageColumnsModal,
    selectedManageColumns,
    setSelectedManageColumns,

    openDeletePlatformModal,
    setOpenDeletePlatformModal,
    deletePlatformRecord,
    setDeletePlatformRecord,

    openAddPlatformModal,
    setOpenAddPlatformModal,

    renderModalOptions,
    onDeletePlatform,
  };
};
