import { Layout } from 'antd';
import { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import routes, { INITIAL_ROUTE } from '@app/routes';
import { usePermission } from '@shared/hooks';
import { Creators } from '@shared/redux/actions/common';
import pagePlugins from '@shared/pagePlugins';
import permKey from '@shared/shared/permKey.json';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import useStyles from './styles';

const { Content } = Layout;

const RouteComponentWrapper = ({ route, Component, ...propsParam }) => {
  const squadName = route.squad || null;
  if (window?.newrelic?.setCustomAttribute) {
    window.newrelic.setCustomAttribute('squad', squadName);
  }

  const { getPagePermKey } = usePermission();
  return (
    <>
      <Component {...propsParam} routeKey={route.key} pagePermKey={getPagePermKey(route.key)} />
      {pagePlugins.map(({ Plugin, key }) => <Plugin routeParams={propsParam} routeKey={route.key} key={`${route.key}_${key}`} />)}
    </>
  );
};

const NavigateWithToast = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  useEffect(() => {
    dispatch(ToastCreators.error({ message: t('ROUTING_ERROR') }));
  }, [dispatch, t]);

  return <Navigate {...props} />;
};

export default function AppContent({ sidebarWidth, routeComponentsMap }) {
  const styleProps = useMemo(() => ({
    sidebarWidth,
    desktopContentWidth: (sidebarWidth ? `calc(100% - ${sidebarWidth}) !important` : '100% !important'),
  }), [sidebarWidth]);

  const classes = useStyles(styleProps);

  const { canAccess, getPagePermKey } = usePermission();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    dispatch(Creators.init());
    if (canAccess(permKey.PAGE_PANEL_DOC_SEARCH)) {
      // try to not block page requests by adding some delay
      setTimeout(() => {
        if (!isMounted) return;
        dispatch(Creators.getFavoriteDocumentsRequest());
      }, 1000);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, canAccess]);

  return (
    <Content
      className={classes.appContent}
    >
      <Routes>
        {routes
          .filter(route => canAccess(getPagePermKey(route.key), { route }) && routeComponentsMap[route.key])
          .map(route => (
            <Route
              key={route.key}
              path={route.path}
              element={<RouteComponentWrapper route={route} Component={routeComponentsMap[route.key]} />}
            />
          ))}
        <Route path="/*" element={<NavigateWithToast to={INITIAL_ROUTE.path} replace />} />
      </Routes>
    </Content>
  );
}
