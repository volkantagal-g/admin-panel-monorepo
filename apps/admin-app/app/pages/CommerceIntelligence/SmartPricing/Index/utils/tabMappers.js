import SmartPricingIndexContent from '@app/pages/CommerceIntelligence/components/SmartPricingIndexContent';
import { SMART_PRICING_TABS } from '@app/pages/CommerceIntelligence/constants';

const createTab = (key, labelText, classes, children) => ({
  key,
  label: (
    <>{labelText} </>
  ),
  children,
});

export const createTabItems = (t, classes) => {
  const tabs = [
    {
      key: String(SMART_PRICING_TABS.GETIR),
      text: 'SMART_PRICING.GETIR',
      content: <SmartPricingIndexContent wrapperClass={classes.smartPricingWrapper} tabType={SMART_PRICING_TABS.GETIR} />,
    },
    {
      key: String(SMART_PRICING_TABS.GETIR_MORE),
      text: 'SMART_PRICING.GETIR_MORE',
      content: <SmartPricingIndexContent wrapperClass={classes.smartPricingWrapper} tabType={SMART_PRICING_TABS.GETIR_MORE} />,
    },
  ];

  return tabs.map(tab => createTab(
    tab.key,
    t(tab.text),
    classes,
    tab.content,
  ));
};
