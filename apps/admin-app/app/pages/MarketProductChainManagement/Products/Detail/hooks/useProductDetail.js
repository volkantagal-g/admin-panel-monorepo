import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { INITIAL_FORM_VALUES } from '@app/pages/MarketProductChainManagement/components/TabContent';
import { PRODUCT_TABS } from '@app/pages/MarketProductChainManagement/constants';
import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';

export const useProductDetail = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(PRODUCT_TABS.DARK_STORE);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const handleChangeTabs = value => {
    setActiveTab(value);
    setFormValues(INITIAL_FORM_VALUES);
  };

  return {
    activeTab,
    formValues,
    setFormValues,
    handleChangeTabs,
  };
};
