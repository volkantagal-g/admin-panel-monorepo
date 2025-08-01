import { useCallback, useState } from 'react';

import { INITIAL_FORM_VALUES } from '@app/pages/MarketProductChainManagement/components/TabContent';
import { WAREHOUSE_TABS } from '@app/pages/MarketProductChainManagement/constants';

export const useWarehouseDetail = () => {
  const [activeTab, setActiveTab] = useState(WAREHOUSE_TABS.PRODUCTS);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const handleChangeTabs = useCallback(newTab => {
    setActiveTab(newTab);
    setFormValues(INITIAL_FORM_VALUES);
  }, []);

  return {
    activeTab,
    formValues,
    setFormValues,
    handleChangeTabs,
  };
};
