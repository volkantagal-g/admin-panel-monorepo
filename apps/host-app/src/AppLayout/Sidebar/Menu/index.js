import { Link, matchPath, useLocation } from 'react-router-dom';
import { useMemo, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Tooltip } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { some, isEqual, filter, concat, isEmpty } from 'lodash';

import { usePermission } from '@shared/hooks';
import { ROUTE } from '@shared/routes';
import { isMobile } from '@shared/utils/common';

import useStyles from './styles';
import { Creators } from '../redux/actions';
import { favoritePagesSelector } from '../redux/selectors';
import { deepFilterMenus } from '../utils';
import menus, { MENU_TYPE_GROUP } from '@shared/sideMenu';
import { getMenuKey, MENUES_WITH_UNIQUE_KEYS, ROOT_PARENT } from '../../utils';

const { SubMenu: ParentMenuItem, Item: MenuItem, ItemGroup } = Menu;

const SIDEBAR_CLOSED_TOP_LEVEL_MENUS = 'SIDEBAR_CLOSED_TOP_LEVEL_MENUS';

const normaliseMenuItem = menuItem => ({ menuKey: menuItem.key, path: menuItem.path });
const getFavoritePageKey = menuKey => `FAVORITE_${menuKey}`;

const MenuItemLink = ({ menuItem, showTooltip }) => {
  const { t } = useTranslation(['sidebar']);
  const classes = useStyles();

  if (menuItem.isExternal) {
    const anchor = (
      <a
        href={menuItem.path}
        target="_blank"
        rel="noopener noreferrer"
      >{t(menuItem.name)}
      </a>
    );
    return (
      <MenuItem
        eventKey={menuItem.key}
        className="panelMenuItem"
        id={menuItem.domId}
      >
        {showTooltip ? (
          <Tooltip
            overlayClassName={classes.favoritesTooltip}
            trigger="hover focus"
            title={`${t(menuItem.parent.name)} - ${t(menuItem.name)}`}
            placement="top"
          >{anchor}
          </Tooltip>
        ) : anchor}
      </MenuItem>
    );
  }

  const link = (
    <Link to={menuItem.path}>
      {t(menuItem.name)}
    </Link>
  );
  return (
    <MenuItem
      eventKey={menuItem.key}
      className="panelMenuItem"
      id={menuItem.domId}
    >
      {showTooltip ? (
        <Tooltip
          overlayClassName={classes.favoritesTooltip}
          trigger="hover focus"
          title={`${t(menuItem.parent.name)} - ${t(menuItem.name)}`}
          placement="top"
        >{link}
        </Tooltip>
      ) : link}
    </MenuItem>
  );
};

const DraggableFavorite = ({ index, menuItem, moveFavorite }) => {
  const classes = useStyles();

  return (
    <div>
      <FavoriteButton menuItem={menuItem}>
        <MenuItemLink showTooltip={!isMobile()} menuItem={{ ...menuItem, key: getFavoritePageKey(menuItem.key) }} />
      </FavoriteButton>
    </div>
  );
};

const FavoritesSubMenu = ({ permissionFilteredMenus }) => {
  const { t } = useTranslation(['sidebar']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const favoritePages = useSelector(favoritePagesSelector.getData);

  const favoritePagesMenuEntries = useMemo(() => {
    if (isEmpty(favoritePages)) return {};

    const entries = {};
    const collectEntries = (menu, parent) => {
      const menuKey = getMenuKey(menu, parent);
      favoritePages.forEach(page => {
        if (menu.type === MENU_TYPE_GROUP) {
          menu.children.forEach(childMenu => collectEntries(childMenu, { ...menu, key: menuKey }));
          return;
        }

        if (!isEmpty(menu.children)) {
          menu.children.forEach(childMenu => collectEntries(childMenu, { ...menu, key: menuKey }));
        }
        if (menu.path === page.path && menuKey === page.menuKey) {
          entries[getFavoritePageKey(menuKey)] = { ...menu, key: menuKey, parent };
        }
      });
    };

    permissionFilteredMenus.forEach(menu => collectEntries(menu, ROOT_PARENT));
    return entries;
  }, [favoritePages, permissionFilteredMenus]);

  const moveFavorite = useCallback((fromIndex, toIndex) => {
    const updatedFavorites = [...favoritePages];
    updatedFavorites.splice(toIndex, 0, updatedFavorites.splice(fromIndex, 1)[0]);

    dispatch(Creators.updateFavoritePagesRequest({ favoritePages: updatedFavorites }));
  }, [dispatch, favoritePages]);

  const renderedPages = favoritePages?.reduce((accumulator, page, index) => {
    const favoritePageKey = getFavoritePageKey(page.menuKey);

    const menuItem = favoritePagesMenuEntries[favoritePageKey];
    if (!menuItem || !menuItem.parent) return accumulator;

    accumulator.push(<DraggableFavorite
      key={favoritePageKey}
      index={index}
      menuItem={menuItem}
      moveFavorite={moveFavorite}
    />);
    return accumulator;
  }, []);
  if (isEmpty(renderedPages)) return null;

  return (
    <ItemGroup
      className={classes.menuItemGroup}
      key="FAVORITES"
      title={t('FAVORITES')}
    >{renderedPages}
    </ItemGroup>
  );
};

const FavoriteButton = ({ menuItem, children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const favoritePages = useSelector(favoritePagesSelector.getData);

  const linkRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const addFavoritePage = useCallback(() => {
    dispatch(Creators.updateFavoritePagesRequest({ favoritePages: concat(favoritePages, [normaliseMenuItem(menuItem)]) }));
    setIsHovered(false);
  }, [dispatch, favoritePages, menuItem]);
  const removeFavoritePage = useCallback(() => {
    dispatch(Creators.updateFavoritePagesRequest({ favoritePages: filter(favoritePages, p => !isEqual(normaliseMenuItem(menuItem), p)) }));
    setIsHovered(false);
  }, [dispatch, favoritePages, menuItem]);

  /*
   * the favorite button needs to be detached from the sidebar menu due to an issue with the css `overflow` property
   * namely, the horizontal overflow cannot be shown when the vertical overflow is set to scroll/auto
   * see: https://stackoverflow.com/a/6433475
   */
  const boundingRectangle = linkRef.current?.getBoundingClientRect();

  const isFavorite = useMemo(() => some(favoritePages, p => isEqual(p, normaliseMenuItem(menuItem))), [favoritePages, menuItem]);

  const onStarClick = () => {
    if (isFavorite) removeFavoritePage(menuItem);
    else addFavoritePage(menuItem);
  };

  return (
    <div ref={linkRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children}
      {isHovered && !isMobile() && (
        <button
          type="button"
          className={classes.favoriteButton}
          style={{ top: boundingRectangle?.top, left: boundingRectangle?.right }}
          onClick={onStarClick}
        >
          {isFavorite ? <StarFilled style={{ color: '#ffd100' }} /> : <StarOutlined style={{ color: 'white' }} />}
        </button>
      )}
    </div>
  );
};

export default function SidebarMenu({ isSidebarCollapsed }) {
  const { t } = useTranslation(['sidebar']);

  const { canAccess, getPagePermKey } = usePermission();
  const [highlightedMenus, setHighlightedMenus] = useState([]);

  const getCurrentMenues = ({ pathName }) => {
    // Note: Some pages don't have menu items, like detail/new pages
    const currentMenus = MENUES_WITH_UNIQUE_KEYS.filter(menu => menu.path === pathName);

    if (currentMenus.length) {
      return {
        pathName,
        menues: currentMenus,
        menuKeys: currentMenus.map(menu => menu.key),
        menuKeyMap: currentMenus.reduce((acc, menu) => ({ ...acc, [menu.key]: menu }), {}),
        // no need for a route, we found the menu items
        route: null,
      };
    }

    const selectedRoute = Object.values(ROUTE).find(route => matchPath({
      path: route.path,
      end: true,
      caseSensitive: true,
    }, pathName));
    if (selectedRoute?.menuPath) {
      const innerMenues = MENUES_WITH_UNIQUE_KEYS.filter(menu => menu.path === selectedRoute.menuPath);

      if (innerMenues.length) {
        return {
          pathName,
          menues: innerMenues,
          menuKeys: innerMenues.map(menu => menu.key),
          menuKeyMap: innerMenues.reduce((acc, menu) => ({ ...acc, [menu.key]: menu }), {}),
          route: selectedRoute,
        };
      }
    }

    // Note: If you navigate to a page which doesn't have menu item or menuPath, use previous menu item
    // likely you went to a new_x/detail_x page from a list_x page, so it is fine
    return {
      pathName,
      menues: [],
      menuKeys: [],
      menuKeyMap: {},
      route: selectedRoute,
    };
  };
  const location = useLocation();

  const currentMenues = useMemo(() => {
    return getCurrentMenues({ pathName: location.pathname });
  }, [location.pathname]);

  const classes = useStyles();

  const permissionFilteredMenus = useMemo(() => {
    return deepFilterMenus({ initialMenus: menus, canAccess, getPagePermKey });
  }, [canAccess, getPagePermKey]);

  const sortedMenus = useMemo(() => {
    return permissionFilteredMenus.map(subMenu => {
      return {
        children: subMenu?.children?.sort((a, b) => t(a.name).localeCompare(t(b.name))),
        key: subMenu.key,
        name: t(subMenu.name),
        type: subMenu.type,
      };
    });
  }, [permissionFilteredMenus, t]);

  const [menuItems, topLevelMenuKeysSet] = useMemo(() => {
    const afterNavigateHighlightedMenus = new Set();
    const tempTopLeveLMenuKeys = new Set();

    const getMenuItems = (menu, parent) => {
      return menu
        .map(menuItem => {
          // since some menu items can be in multiple places, use parent-child relation to make it unique
          const uniqueMenuKey = getMenuKey(menuItem, parent);
          const newMenuItem = { ...menuItem, key: uniqueMenuKey };

          if (newMenuItem.type === MENU_TYPE_GROUP) {
            tempTopLeveLMenuKeys.add(newMenuItem.key);
            // NOTE: mobile has view issues with nested collapsable keys, so we don't want to use them
            const TopLevelMenuComponent = isMobile() ? ItemGroup : ParentMenuItem;

            return (
              <TopLevelMenuComponent
                className={`${classes.menuItemGroup} ${classes.topLevelMenuGroup}`}
                key={newMenuItem.key}
                title={t(newMenuItem.name)}
              >{getMenuItems(newMenuItem.children, newMenuItem)}
              </TopLevelMenuComponent>
            );
          }

          if (newMenuItem.children) {
            return (
              <ParentMenuItem
                key={newMenuItem.key}
                icon={newMenuItem.icon}
                title={t(newMenuItem.name)}
              >
                {getMenuItems(newMenuItem.children, newMenuItem)}
              </ParentMenuItem>
            );
          }

          if (currentMenues.menuKeyMap[newMenuItem.key]) {
            afterNavigateHighlightedMenus.add(newMenuItem.key);
            afterNavigateHighlightedMenus.add(getFavoritePageKey(newMenuItem.key));
          }
          return (
            <FavoriteButton key={newMenuItem.key} menuItem={newMenuItem}>
              <MenuItemLink menuItem={newMenuItem} />
            </FavoriteButton>
          );
        });
    };

    // since to outer menu groups don't have parents, give a fake one
    const items = getMenuItems(sortedMenus, ROOT_PARENT);
    setHighlightedMenus([...afterNavigateHighlightedMenus]);
    return [items, tempTopLeveLMenuKeys];
  }, [sortedMenus, t, classes, currentMenues]);

  const topLevelMenuKeysArray = useMemo(() => [...topLevelMenuKeysSet], [topLevelMenuKeysSet]);

  const savedTopLevelClosedKeys = useMemo(() => {
    const sidebarOpenKeysString = localStorage.getItem(SIDEBAR_CLOSED_TOP_LEVEL_MENUS);
    if (!sidebarOpenKeysString) return null;
    return JSON.parse(sidebarOpenKeysString);
  }, []);

  // NOTE: mobile has view issues with open keys, so we don't want to use them
  const defaultOpenKeys = useMemo(() => {
    if (isMobile()) return topLevelMenuKeysArray;
    return topLevelMenuKeysArray.filter(key => !savedTopLevelClosedKeys?.includes(key));
  }, [savedTopLevelClosedKeys, topLevelMenuKeysArray]);

  return (
    <div className={classes.menuWrapper}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={highlightedMenus}
        onSelect={({ selectedKeys }) => setHighlightedMenus(selectedKeys)}
        onDeselect={({ selectedKeys }) => setHighlightedMenus(selectedKeys)}
        defaultOpenKeys={defaultOpenKeys}
        onOpenChange={openKeys => {
          // we don't want sidebar collapse to reset the open keys
          // we also don't want to save/use  localStoraged keys on mobile
          if (isSidebarCollapsed || isMobile()) return;
          const openKeysSet = new Set(openKeys);
          const closedTopLevelKeys = topLevelMenuKeysArray.filter(key => !openKeysSet.has(key));
          localStorage.setItem(SIDEBAR_CLOSED_TOP_LEVEL_MENUS, JSON.stringify(closedTopLevelKeys));
        }}
      >
        <FavoritesSubMenu permissionFilteredMenus={permissionFilteredMenus} />
        {menuItems}
      </Menu>
    </div>
  );
}
