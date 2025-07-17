import menus from '../sideMenu';

export const getMenuKey = (menu, parent) => `${parent.key}_${menu.key}`;

export const ROOT_PARENT = { key: 'ROOT' };

// recursively build menu tree, replace route keys with parent-child relationship keys
const fillMenuMap = (menueWithUniqueKeys, _menus, parent) => {
  _menus.forEach(menu => {
    const menuKey = getMenuKey(menu, parent);
    if (menu.children) {
      fillMenuMap(menueWithUniqueKeys, menu.children, { ...menu, key: menuKey });
    }
    else {
      menueWithUniqueKeys.push({ ...menu, key: menuKey });
    }
  });
};

// { menu_path: menu } map
export const getMenuesWithUniqueKeys = () => {
  const menuWithUniqueKeys = [];

  // since the most outer menu groups don't have parents, give a fake one
  fillMenuMap(menuWithUniqueKeys, menus, ROOT_PARENT);

  return menuWithUniqueKeys;
};

export const MENUES_WITH_UNIQUE_KEYS = getMenuesWithUniqueKeys();
