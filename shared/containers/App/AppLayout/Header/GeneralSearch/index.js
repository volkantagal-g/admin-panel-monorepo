import { SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useDebounce from '@shared/shared/hooks/useDebounce';
import { inDevelopmentEnvironment, isMobile } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';

import useStyles from './styles';
import { SEARCH_TABS, SEARCH_TAB_TO_ACCESS_KEY, SEARCH_TAB_TO_LIST_COMPONENT, SEARCH_TAB_TRANSLATION_KEY } from './config';
import { getValidatedSearchText } from './utils';

const { TabPane } = Tabs;

export default function GeneralSearch() {
  const { t } = useTranslation();
  const classes = useStyles({ isDev: inDevelopmentEnvironment });
  const { canAccess } = usePermission();

  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // close when url changes
  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyUp = event => {
      if (event.ctrlKey && event.key === ' ') setIsVisible(true);
      if (event.key === 'Escape') setIsVisible(false);
    };

    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [setIsVisible]);

  const accessibleTabs = SEARCH_TABS.filter(tab => canAccess(SEARCH_TAB_TO_ACCESS_KEY[tab]));

  if (!accessibleTabs?.length) {
    return null;
  }

  const shortcutText = isMobile() ? '' : ' (ctrl + space)';
  return (
    <Dropdown
      overlay={<SearchOverlay classes={classes} accessibleTabs={accessibleTabs} />}
      placement="bottomCenter"
      trigger={['click']}
      visible={isVisible}
      onVisibleChange={setIsVisible}
      destroyPopupOnHide
    >
      <Button className={classes.headerSearchButton}>
        <SearchOutlined />
        {`${t('SEARCH')}${shortcutText}`}
      </Button>
    </Dropdown>
  );
}

function SearchOverlay({ classes, accessibleTabs }) {
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();

  const defaultActiveTab = accessibleTabs[0];

  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const debouncedSearchText = useDebounce(searchText, 500);

  const validatedSearchText = getValidatedSearchText(debouncedSearchText);

  return (
    <div className={classes.overlayWrapper}>
      <Input
        placeholder={t('SEARCH')}
        onChange={e => setSearchText(e.target.value)}
        prefix={<SearchOutlined />}
        tabIndex="0"
        autoFocus
      />
      <Tabs defaultActiveKey={defaultActiveTab} className={classes.docsTabs} onChange={newTab => setActiveTab(newTab)}>
        {accessibleTabs.map(tab => {
          const TabComponent = SEARCH_TAB_TO_LIST_COMPONENT[tab];
          return (
            <TabPane tab={t(SEARCH_TAB_TRANSLATION_KEY[tab])} key={tab}>
              <TabComponent
                searchText={searchText}
                debouncedSearchText={debouncedSearchText}
                validatedSearchText={validatedSearchText}
                isActive={tab === activeTab}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
