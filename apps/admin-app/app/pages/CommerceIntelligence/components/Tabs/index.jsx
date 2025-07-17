import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs as AntTabs } from '@shared/components/GUI';
import {
  CONFIDENCE_LEVELS,
  TRANSLATION_NAMESPACE,
} from '@app/pages/CommerceIntelligence/constants';
import { createConfidenceTabItems } from '@app/pages/CommerceIntelligence/ProductMatching/utils/tabMappers';
import useStyles from './styles';

const formatTabItems = (items, activeTab, classes, showCountBadge = true) => items.map(item => {
  if (typeof item.label !== 'object' || !showCountBadge) return item;

  const badgeClass = `${classes.countBadge} ${activeTab === item.key ? '' : classes.inactiveCountBadge}`;

  return {
    ...item,
    label: (
      <>
        {Array.isArray(item.label.props?.children)
          ? item.label.props.children[0]
          : item.label.props?.children}

        <span className={badgeClass}>
          {(Array.isArray(item.label.props?.children) && item.label.props.children[1]?.props?.children) || '0'}
        </span>
      </>
    ),
  };
});

const Tabs = ({
  activeTab,
  setActiveTab,
  items,
  wrapperClass = '',
  isConfidenceTabs = false,
  showCountBadge = true,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(TRANSLATION_NAMESPACE);
  const [confidenceActiveTab, setConfidenceActiveTab] = useState(
    String(CONFIDENCE_LEVELS.VERY_HIGH),
  );

  const tabItems = isConfidenceTabs
    ? createConfidenceTabItems(t, classes)
    : items;

  const currentActiveTab = isConfidenceTabs ? confidenceActiveTab : activeTab;
  const handleTabChange = isConfidenceTabs ? setConfidenceActiveTab : setActiveTab;

  const formattedItems = formatTabItems(tabItems, currentActiveTab, classes, showCountBadge);

  return (
    <div className={`${classes.wrapper} ${wrapperClass}`}>
      <AntTabs
        activeKey={currentActiveTab}
        onChange={handleTabChange}
        items={formattedItems}
        className={classes.tabs}
      />
    </div>
  );
};

export default memo(Tabs);
