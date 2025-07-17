import { useMemo } from 'react';

import { createVerticalActions } from './redux/actions';
import { createVerticalReducer } from './redux/reducer';
import { createVerticalSaga } from './redux/saga';
import { createVerticalSelectors } from './redux/selectors';
import { VerticalToReduxKeyMap, VerticalToTranslationKeyMap, VerticalToRouteMap, tableColumns } from './config';
import { TAB_TO_COMPANY_TYPE_MAP } from './constants';

export default function useVerticalConfig(vertical) {
  const reduxKey = VerticalToReduxKeyMap[vertical];
  const translationKey = VerticalToTranslationKeyMap[vertical];
  const route = VerticalToRouteMap[vertical];
  const companyTypeMap = TAB_TO_COMPANY_TYPE_MAP;

  const reduxKeyPrefix = `${reduxKey}_`;

  const { Types, Creators } = useMemo(() => createVerticalActions(reduxKeyPrefix), [reduxKeyPrefix]);
  const reducer = useMemo(() => createVerticalReducer(Types), [Types]);
  const selectors = useMemo(() => createVerticalSelectors(reduxKey), [reduxKey]);
  const saga = useMemo(() => createVerticalSaga(Types, Creators, vertical), [Types, Creators, vertical]);

  const config = useMemo(() => ({
    reduxKey,
    translationKey,
    route,
    companyTypeMap,
    tableColumns,
    Types,
    Creators,
    reducer,
    selectors,
    saga,
  }), [reduxKey, translationKey, route, companyTypeMap, Types, Creators, reducer, selectors, saga]);

  return config;
}
