import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate, useLocation, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { Alert } from 'antd';
import { isEmpty } from 'lodash';
import { compose, Dispatch } from 'redux';

import AnalyticsService from '@shared/services/analytics';
import { getIsAfterLoginInitFailed, getIsAfterLoginInitFinished } from '@shared/redux/selectors/init';
import Spinner from '@shared/components/Spinner';
import { ROUTE, INITIAL_ROUTE, REDIRECT_SEARCH } from '@app/routes';
import { Creators as InitCreators } from '@shared/redux/actions/init';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import {
  getIsAuthTempTokenPending,
  getToken,
  getAccessToken,
  getUser,
  getUserCountries,
  redirectUrlPathSelector,
} from '@shared/redux/selectors/auth';
import {
  getCountryIsChanging,
  getInitialCountryIsSet,
  getSelectedCountryV2,
} from '@shared/redux/selectors/countrySelection';

import AppLayout from './AppLayout';
import { t } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { countriesSelector } from '@shared/redux/selectors/common';
import { Creators as CountryCreators } from '@shared/redux/actions/countrySelection';

// init Rudderstack integration
AnalyticsService.init();

type AppProps = {
  routeComponentsMap: any;
};

// @ts-ignore
const SelectCountryOrLayoutComp = ({ routeComponentsMap, ..._props }) => {
  const selectedCountry = useSelector(getSelectedCountryV2);
  if (!selectedCountry) {
    return <Navigate to={ROUTE.COUNTRY_SELECTION.path} replace {..._props} />;
  }
  return <AppLayout {..._props} routeComponentsMap={routeComponentsMap} />;
};

// @ts-ignore
const LoginRouteCheckComp = ({ routeComponentsMap, ..._props }) => {
  const token = useSelector(getToken);
  const accessToken = useSelector(getAccessToken);
  const user = useSelector(getUser);
  const isLoggedIn = (token || accessToken) && !isEmpty(user);
  if (!user || (token && (token === 'undefined' || token.length < 10))) {
    return <Navigate to={ROUTE.LOGOUT.path} replace {..._props} />;
  }
  if (isLoggedIn) return <Navigate to={INITIAL_ROUTE.path} replace {..._props} />;
  const Login = routeComponentsMap.LOGIN;
  return <Login {..._props} />;
};

type CountryRedirectParameters = {
  dispatch: Dispatch;
  location: any;
  navigate: any;
  countryIsChanging: boolean;
  initialCountryIsSet: boolean;
  magicLinkRedirectUrlPath: string[] | null;
  selectedCountry: ICountry;
  queryParameters: URLSearchParams;
  allCountries: ICountry[];
};
const handleCountryRedirect = ({
  dispatch,
  location,
  navigate,
  countryIsChanging,
  initialCountryIsSet,
  magicLinkRedirectUrlPath,
  selectedCountry,
  queryParameters,
  allCountries,
}: CountryRedirectParameters) : boolean => {
  if (location.pathname === ROUTE.NOT_FOUND.path) return false;

  if (countryIsChanging) return false;
  // can't determine if we need to change the country until the current country has been loaded from the local storage
  if (!initialCountryIsSet) return true;

  const redirectParameters = new URLSearchParams(REDIRECT_SEARCH);
  let magicLinkRedirectParameters = new URLSearchParams();
  if (Array.isArray(magicLinkRedirectUrlPath)) {
    const magicLinkQuery = magicLinkRedirectUrlPath[magicLinkRedirectUrlPath.length - 1]?.split('?')?.[1];
    magicLinkRedirectParameters = new URLSearchParams(magicLinkQuery);
  }

  const showCountryChangeNotification = !!queryParameters.get('country');
  const queryCountry = queryParameters.get('country')?.toLowerCase()
      || redirectParameters.get('country')?.toLowerCase()
      || magicLinkRedirectParameters.get('country')?.toLowerCase();

  if (!queryCountry) return false;
  if (queryCountry === selectedCountry?.code?.alpha2?.toLowerCase()) return false;

  const countryToSwitchTo = allCountries.find(c => c.code.alpha2.toLowerCase() === queryCountry);

  if (countryToSwitchTo) {
    const currentUser = getUser();
    const availableCountries = currentUser.hasGlobalAccess ? allCountries : getUserCountries();
    if (!availableCountries.find((c: ICountry) => c._id === countryToSwitchTo._id)) {
      navigate(ROUTE.NOT_FOUND.path);
      return true;
    }

    if (showCountryChangeNotification) {
      dispatch(CountryCreators.startCountrySelectionFlowWithPrompt({ selectedCountry: countryToSwitchTo, message: t('COUNTRY_CHANGING') }));
    }
    else {
      dispatch(CountryCreators.startCountrySelectionFlow({ selectedCountry: countryToSwitchTo, shouldReloadAfterLocalStorage: true }));
    }

    return true;
  }

  if (selectedCountry) {
    queryParameters.set('country', selectedCountry.code.alpha2.toLowerCase());
    navigate({ pathname: location.pathname, search: queryParameters.toString() }, { replace: true });
    return true;
  }

  return false;
};

const AppLoggedIn = ({ routeComponentsMap }: AppProps) => {
  const dispatch = useDispatch();
  const isAfterLoginInitFinished = useSelector(getIsAfterLoginInitFinished);
  const isAuthTempTokenPending = useSelector(getIsAuthTempTokenPending);
  const isAfterLoginInitFailed = useSelector(getIsAfterLoginInitFailed);

  const allCountries = useSelector(countriesSelector.getData) || [];
  const selectedCountry = useSelector(getSelectedCountryV2);
  const magicLinkRedirectUrlPath = useSelector(redirectUrlPathSelector.getData) as string[] | null;
  const countryIsChanging = useSelector(getCountryIsChanging);
  const initialCountryIsSet = useSelector(getInitialCountryIsSet);

  const NotFoundComponent = routeComponentsMap.NOT_FOUND;
  const CountrySelectionComponent = routeComponentsMap.COUNTRY_SELECTION;

  useEffect(() => {
    dispatch(InitCreators.initAfterLogin());
    dispatch(Creators.initAppLayout());
    return () => {
      dispatch(Creators.destroyAppLayout());
    };
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  useEffect(() => {
    if (!selectedCountry) return;
    if (queryParameters.get('country')) return;
    queryParameters.set('country', selectedCountry.code.alpha2.toLowerCase());

    navigate({ pathname: location.pathname, search: queryParameters.toString() }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, location.pathname, location.search]);

  /*
   * this function will only return `true` if it issued some redirect, or might still issue a redirect in the future
   * that way, we can avoid needlessly redirecting the user to the country selection page
   */
  if (handleCountryRedirect({
    dispatch,
    location,
    navigate,
    countryIsChanging,
    initialCountryIsSet,
    magicLinkRedirectUrlPath,
    selectedCountry,
    queryParameters,
    allCountries,
  })) return null;

  if (!isAfterLoginInitFinished || isAuthTempTokenPending) {
    return <Spinner />;
  }

  if (isAfterLoginInitFailed) {
    return <Alert message={t('error:AFTER_LOGIN_INIT_ERROR')} type="error" />;
  }

  return (
    <Routes>
      {NotFoundComponent && <Route path={ROUTE.NOT_FOUND.path} element={<NotFoundComponent />} />}
      {CountrySelectionComponent && <Route path={ROUTE.COUNTRY_SELECTION.path} element={<CountrySelectionComponent />} />}
      <Route path="/*" element={<SelectCountryOrLayoutComp routeComponentsMap={routeComponentsMap} />} />
    </Routes>
  );
};

// @ts-ignore
const MainRouteCheckComp = ({ routeComponentsMap, ..._props }) => {
  const token = useSelector(getToken);
  const accessToken = getAccessToken();
  const user = useSelector(getUser);
  const isLoggedIn = !!(token || accessToken) && !isEmpty(user);
  if (!user || (token && (token === 'undefined' || token.length < 10))) {
    return <Navigate to={ROUTE.LOGOUT.path} replace {..._props} />;
  }
  if (!isLoggedIn) return <Navigate to={ROUTE.LOGIN.path} replace {..._props} />;
  return <AppLoggedIn {..._props} routeComponentsMap={routeComponentsMap} />;
};

const App = ({ routeComponentsMap }: AppProps) => {
  const HealthComponent = routeComponentsMap.HEALTH;
  const LogoutComponent = routeComponentsMap.LOGOUT;
  return (
    <>
      <Helmet titleTemplate="%s - Getir" defaultTitle="Getir" />
      <ToastContainer position="top-right" className="toast-z-index" autoClose={2000} />
      <Routes>
        {/* Health Check */}
        {HealthComponent && <Route path={ROUTE.HEALTH.path} element={<HealthComponent />} />}
        {/* Force logout page */}
        {LogoutComponent && <Route path={ROUTE.LOGOUT.path} element={<LogoutComponent />} />}
        {routeComponentsMap.LOGIN && <Route path={ROUTE.LOGIN.path} element={<LoginRouteCheckComp routeComponentsMap={routeComponentsMap} />} />}
        <Route path="/*" element={<MainRouteCheckComp routeComponentsMap={routeComponentsMap} />} />
      </Routes>
    </>
  );
};

const reduxKey = REDUX_KEY.APP_LAYOUT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(App);
