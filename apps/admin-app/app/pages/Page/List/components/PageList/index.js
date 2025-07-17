import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, Row, Tabs } from 'antd';
import { escapeRegExp, forEach, get } from 'lodash';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getAllPagesSelector, getUserOwnedPagesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { usePermission } from '@shared/hooks';
import { getUser } from '@shared/redux/selectors/auth';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import AntCard from '@shared/components/UI/AntCard';
import permKey from '@shared/shared/permKey.json';
import AnalyticsService from '@shared/services/analytics';
import { TAB_PANE_KEY, tableColumns } from './config';
import useStyles from './styles';
import { indexedDb } from '@shared/indexedDb';

const { Search } = Input;
const { TabPane } = Tabs;

const PageList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const { t } = useTranslation('pagePage');
  const classes = useStyles();

  const userOwnedPages = useSelector(getUserOwnedPagesSelector.getData);
  const userOwnedPagesPending = useSelector(getUserOwnedPagesSelector.getIsPending);
  const getPagesIsPending = useSelector(getAllPagesSelector.getIsPending);
  const [searchedText, setSearchedText] = useState('');
  const [activeTab, setActiveTab] = useState('allPages');
  const hasAccessToPageDetailPage = canAccess(permKey.PAGE_PAGE_DETAIL);
  const hasAccessToComponentDetailPage = canAccess(permKey.PAGE_COMPONENT_DETAIL);

  useEffect(() => {
    dispatch(CommonCreators.getAllPagesRequest());
    const userId = getUser()._id;
    dispatch(CommonCreators.getUserOwnedPagesRequest({ userId }));
  }, [dispatch]);

  const filteredPages = useLiveQuery(() => {
    const langKey = getLangKey();
    const searchedValue = searchedText.trim().toLocaleLowerCase(langKey);
    const searchRegex = new RegExp(escapeRegExp(searchedValue), 'i');

    // avoid expensive filter for this trivial case
    if (!searchedValue && activeTab === 'allPages') {
      return indexedDb
        .pages
        .toArray();
    }

    // indexing on arrays of objects is not supported, so we have to use an unindexed filter
    return indexedDb.pages.filter(page => {
      if (activeTab === 'myPages' && !canAccess(page.permKey)) return false;
      if (!searchedValue) return true;

      let searchTerm = '';

      searchTerm += page.permKey;
      searchTerm += get(page, ['name', langKey], '').toLocaleLowerCase(langKey);
      searchTerm += get(page, ['description', langKey], '').toLocaleLowerCase(langKey);
      searchTerm += get(page, 'permKey', '').toLocaleLowerCase(langKey);

      forEach(page.components, component => {
        searchTerm += get(component, ['name', langKey], '').toLocaleLowerCase(langKey);
        searchTerm += get(component, ['description', langKey], '').toLocaleLowerCase(langKey);
        searchTerm += get(component, 'permKey', '').toLocaleLowerCase(langKey);
      });

      return searchTerm.search(searchRegex) !== -1;
    }).toArray();
  }, [searchedText, activeTab, canAccess], []);

  const pagesForTable = useMemo(() => {
    return filteredPages.map(page => ({ ...page, children: page?.components?.length && page.components }));
  }, [filteredPages]);

  const handleSearch = useCallback(event => {
    setSearchedText(event?.target?.value);
  }, []);

  const { debouncedCallback: handleDebouncedSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const handleTabChanges = key => {
    setActiveTab(key);
    if (key === TAB_PANE_KEY.ALL_PAGES) {
      AnalyticsService.track(PANEL_EVENTS.PAGE_LIST.EVENT_NAME, { button: PANEL_EVENTS.PAGE_LIST.BUTTON.PAGES });
    }

    if (key === TAB_PANE_KEY.MY_PAGES) {
      AnalyticsService.track(PANEL_EVENTS.PAGE_LIST.EVENT_NAME, { button: PANEL_EVENTS.PAGE_LIST.BUTTON.MY_PAGES });
    }
  };

  const tableComp = (
    <AntTableV2
      data={pagesForTable}
      bordered
      columns={
        tableColumns(
          getLangKey(),
          {
            hasAccessToPageDetailPage,
            hasAccessToComponentDetailPage,
            canAccess,
            userOwnedPages,
            navigate,
            dispatch,
            t,
          },
        )
      }
      rowKey="_id"
      expandable={{ indentSize: 0 }}
      loading={getPagesIsPending || userOwnedPagesPending}
      className={classes.table}
      scroll={{ y: 600 }}
    />
  );

  return (
    <>
      <Row className="mb-2">
        <Search
          size="large"
          allowClear
          placeholder={t('SEARCH_PAGE')}
          onChange={event => {
            event.persist();
            handleDebouncedSearch(event);
          }}
          enterButton
        />
      </Row>
      <AntCard>
        <Tabs activeKey={activeTab} onChange={handleTabChanges}>
          <TabPane tab={t('ALL_PAGES')} key={TAB_PANE_KEY.ALL_PAGES}>
            {tableComp}
          </TabPane>
          <TabPane tab={t('PERMITTED_PAGES')} key={TAB_PANE_KEY.MY_PAGES}>
            {tableComp}
          </TabPane>
        </Tabs>
      </AntCard>
    </>
  );
};

export default PageList;
