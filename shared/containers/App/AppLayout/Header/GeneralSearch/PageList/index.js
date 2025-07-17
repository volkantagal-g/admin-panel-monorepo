import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';
import { LinkOutlined, SettingOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import { usePermission } from '@shared/hooks';
import menus from '@shared/sideMenu';
import { Creators as CoreCreators } from '@shared/redux/actions/core';
import { searchPagesSelector } from '@shared/redux/selectors/core';
import permKey from '@shared/shared/permKey.json';

import { filterPageObjects, fillLinkMenuItems, getFormattedPageObject } from './utils';
import useStyles from './styles';
import { getCommonTypography } from '../utils';

export default function PageList({ validatedSearchText, isActive }) {
  const dispatch = useDispatch();
  const classes = useStyles('sidebar');
  const { t } = useTranslation();
  const pages = useSelector(searchPagesSelector.getData);
  const pagesPending = useSelector(searchPagesSelector.getIsPending);

  // since this is client side search, we can fake the pending state so user knows that we are searching
  // TODO: remove this when we have text search for pages in backend and we can use normal pending
  const [fakePending, setFakePending] = useState(false);
  const prevSearchText = useRef(null);
  if (prevSearchText.current !== validatedSearchText && validatedSearchText) {
    prevSearchText.current = validatedSearchText;
    setFakePending(true);
    setTimeout(() => {
      setFakePending(false);
    }, 300);
  }

  const totalPending = pagesPending || fakePending;

  const { canAccess, getPagePermKey } = usePermission();

  useEffect(() => {
    // Since we fetch every page, we don't need to fetch again if we already have the data
    if (!isEmpty(pages) || !validatedSearchText || !isActive) return;
    // TODO: remove the above if when we have text search for pages in backend

    dispatch(CoreCreators.searchPagesRequest({ searchText: validatedSearchText }));
  }, [dispatch, validatedSearchText, isActive, pages]);

  const filteredPages = useMemo(() => filterPageObjects({
    pageObjects: pages,
    t,
    searchText: validatedSearchText,
  }), [pages, t, validatedSearchText]);

  const accessibleMenuItems = useMemo(() => {
    const linkMenuItems = [];
    fillLinkMenuItems({
      initialMenus: menus,
      resultMenus: linkMenuItems,
    });

    return linkMenuItems.filter(menuItem => canAccess(getPagePermKey(menuItem.key)) || menuItem?.isGloballyAllowed);
  }, [canAccess, getPagePermKey]);

  const searchedAndSortedMenuItems = useMemo(() => {
    const result = accessibleMenuItems.filter(menuItem => {
      if (!validatedSearchText) return false;
      const { name } = menuItem;

      const translated = t(`sidebar:${name}`);

      const nameMatch = translated.toLocaleLowerCase(getLangKey()).includes(validatedSearchText.toLocaleLowerCase(getLangKey()));
      if (nameMatch) return true;
      return false;
    });

    return result.sort((a, b) => {
      const aName = t(`sidebar:${a.name}`);
      const bName = t(`sidebar:${b.name}`);
      return aName.localeCompare(bName);
    });
  }, [accessibleMenuItems, validatedSearchText, t]);

  const sortedPages = useMemo(() => filteredPages.sort((a, b) => {
    const aName = a.name[getLangKey()];
    const bName = b.name[getLangKey()];
    return aName.localeCompare(bName);
  }), [filteredPages]);

  return (
    <div className={classes.pagesContainer}>
      <b className={classes.pageListTitle}>{t('PAGES')}</b>
      <Skeleton active loading={totalPending}>
        <div className={classes.pageList}>
          {searchedAndSortedMenuItems.map(menuItem => renderMenuLink(menuItem))}
        </div>
      </Skeleton>
      <div className={classes.divider} />
      <b className={classes.pageListTitle}>{t('PAGES_FOR_CONFIG')}</b>
      <Skeleton active loading={totalPending}>
        <div className={classes.pageList}>
          {sortedPages.map(page => (
            renderPageDetailLink(page)
          ))}
        </div>
      </Skeleton>
    </div>
  );

  function renderMenuLink(menuItem) {
    return (
      <Link to={menuItem.path} key={`${menuItem?.parentMenus?.map(p => p.key)}${menuItem.key}`}>
        {getCommonTypography((
          <>
            <LinkOutlined style={{ marginRight: '4px' }} />
            {menuItem?.parentMenus?.map(p => (
              <span key={p.key}>
                <span style={{ marginRight: '4px' }}>{t(`sidebar:${p.name}`)}</span>
                <span style={{ marginRight: '4px' }}>➔</span>
              </span>
            ))}
            <b>{t(`sidebar:${menuItem.name}`)}</b>
          </>))}
      </Link>
    );
  }

  function renderPageDetailLink(page) {
    const renderResult = (
      <>
        <SettingOutlined style={{ marginRight: '4px' }} />
        {getFormattedPageObject({ page })}
      </>
    );

    return (
      canAccess(permKey.PAGE_PAGE_DETAIL) ? (
        <Link to={ROUTE.PAGE_DETAIL.path.replace(':id', page._id)} key={page._id}>
          {renderResult}
        </Link>
      ) :
        (<div key={page._id}>{renderResult}</div>)
    );
  }
}
