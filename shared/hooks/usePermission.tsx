import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLiveQuery } from 'dexie-react-hooks';

import { getMyPermKeySet } from '@shared/redux/selectors/common';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { indexedDb } from '@shared/indexedDb';

const usePermission = () => {
  const permKeySet = useSelector(getMyPermKeySet);
  type PageAndComponentMap = { [permKey: string]: PageType | ComponentType; };
  const pagesAndComponentsByPermKey: PageAndComponentMap = useLiveQuery(async () => {
    const pages = await indexedDb.pages.toArray() as unknown as PageTypePopulated[];

    const byPermKey: PageAndComponentMap = {};
    pages.forEach(page => {
      byPermKey[page.permKey] = page;

      page.components.forEach(component => {
        byPermKey[component.permKey] = component;
      });
    });

    return byPermKey;
  }, [], {});
  const { _id: selectedCountryId } = useSelector(getSelectedCountryV2);

  const canAccess = useCallback((
    permKey : string,
    { route, countryId } : { route?: { isGlobal: boolean; }; countryId?: string; } = {},
  ) => {
    if (route?.isGlobal) return true;

    const hasPermKey = permKeySet.has(permKey);
    if (!hasPermKey) return false;

    const pageOrComponent = pagesAndComponentsByPermKey[permKey];
    if (!pageOrComponent) return true;
    if (pageOrComponent.hasGlobalAccess) return true;

    const countryIdToCheck = countryId || selectedCountryId;
    return pageOrComponent.countries.includes(countryIdToCheck);
  }, [permKeySet, pagesAndComponentsByPermKey, selectedCountryId]);

  const Can = useCallback(
    ({ permKey, children }) => {
      const isAllowed = canAccess(permKey);
      return isAllowed ? children : null;
    },
    [canAccess],
  );

  const getPagePermKey = useCallback((routeKey: string) => {
    return `PAGE_${routeKey}`;
  }, []);

  const getRouteKeyFromPermKey = useCallback(
    (permKey : string) => {
      const pageAtStart = /^PAGE_/;
      return permKey.replace(pageAtStart, '');
    },
    [],
  );

  // FIXME: Returned pagesAndComponentsByPermKey so that we can check if that is empty or not
  // async loading of pagesAndComponentsByPermKey from indexedDB is causing canAccess to change its reference since it is a dependency of canAccess,
  // it is causing effects to run twice. canAccess should only change if user's permissions change.
  // We shouldn't "fetch" this already available data every time we want to use this hook
  // instead of fetching asynchronously from indexedDB, we can save it to redux once on app load
  // and use it from there synchronously. Update redux when indexedDB changes.
  // So the fix should make "pagesAndComponentsByPermKey" a redux state and remove the usage of "useLiveQuery" from this hook
  // make it always stable unless pages and components change
  // After fixing this, also remove the usage of "pagesAndComponentsByPermKey" from the components that are using this hook
  return { Can, canAccess, getPagePermKey, getRouteKeyFromPermKey, pagesAndComponentsByPermKey };
};

export default usePermission;
