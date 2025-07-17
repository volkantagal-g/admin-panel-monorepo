// recursively filter accessible menu items
// menu groups with 0 accessible children should be removed
export function deepFilterMenus({ initialMenus, canAccess, getPagePermKey }) {
  return initialMenus.reduce((newMenus, menu) => {
    if (menu.children?.length) {
      const newChildren = deepFilterMenus({ initialMenus: menu.children, canAccess, getPagePermKey });
      if (newChildren.length) {
        newMenus.push({ ...menu, children: newChildren });
      }
    }
    else if (menu.isGloballyAllowed || canAccess(getPagePermKey(menu.key))) {
      newMenus.push(menu);
    }
    return newMenus;
  }, []);
}
