import { useCallback, useMemo } from 'react';
import { Layout, Menu, Dropdown, Button, Typography } from 'antd';
import { get as lget, debounce as ldebounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUser } from '@shared/redux/selectors/auth';
import AnalyticsService from '@shared/services/analytics';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { Creators } from '@shared/redux/actions/auth';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as LanguageSelectionCreators } from '@shared/redux/actions/languageSelection';
import { Creators as CountrySelectionModalCreators } from '@shared/containers/HelperContainer/CountrySelectionModal/redux/actions';
import { getLangKey } from '@shared/i18n';
import { inDevelopmentEnvironment } from '@shared/utils/common';
import { useGoogleAuth, usePermission } from '@shared/hooks';
import { GOOGLE_AUTH_REQUEST_TYPES } from '@shared/shared/constants';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

import SidebarToggler from './SidebarToggler';
import useStyles from './styles';
import PageDocsSection from './PageDocsSection';
import SelectCountryDropdown from './SelectCountryDropdown';
import Globe from './Icons/Globe';
import GlobeAlt from './Icons/GlobeAlt';
import ChevronDown from './Icons/ChevronDown';
import Identification from './Icons/Identification';
import User from './Icons/User';
import FolderOpen from './Icons/FolderOpen';
import Logout from './Icons/Logout';
import GeneralSearch from './GeneralSearch';

const { Header } = Layout;
const { Item, Divider } = Menu;
const { Text } = Typography;
const MY_PROFILE_TAB_PATH = 'myProfile';

function AppHeader({ sidebarWidth, isSidebarCollapsed, toggleSidebar }) {
  const dispatch = useDispatch();
  const { Can, canAccess } = usePermission();

  const selectedCountry = getSelectedCountry();
  const { t } = useTranslation();
  const user = getUser();
  const userName = lget(user, 'name', '');
  const countryFlag = lget(selectedCountry, ['flag'], '');
  const countryCode = lget(selectedCountry, 'code.alpha3', '');
  const classes = useStyles({ sidebarWidth, isDev: inDevelopmentEnvironment });

  const { signOut } = useGoogleAuth({
    authRequest: GOOGLE_AUTH_REQUEST_TYPES.SIGN_OUT,
    token: window.localStorage.getItem('token'),
    accessToken: window.localStorage.getItem('accessToken'),
    onError: () => {
      return dispatch(ToastCreators.error({ message: t('GOOGLE_LOGIN_ERRORS.SIGNOUT_INIT') }));
    },
  });

  const handleLanguageSelection = () => {
    const targetLang = getLangKey() === 'tr' ? 'en' : 'tr';
    dispatch(LanguageSelectionCreators.startLanguageSelectionFlow({ selectedLanguage: targetLang }));
    window.location.reload(true);
  };

  const handleCountryChange = () => {
    dispatch(CountrySelectionModalCreators.setVisibility({ data: true }));
  };

  const handleSignOut = useMemo(() => ldebounce(signOutCb => {
    if (signOutCb) {
      signOutCb().then(
        res => {
          if (res) {
            dispatch(Creators.logoutRequest());
          }
        },
        () => {
          dispatch(ToastCreators.error({ message: t('GOOGLE_LOGIN_ERRORS.SIGNOUT_COMPLETED') }));
          AnalyticsService.track(PANEL_EVENTS.LOGOUT.EVENT_NAME, {});
        },
      );
    }
    else {
      dispatch(Creators.logoutRequest());
    }
  }, 100), [dispatch, t]);

  const handleSignOutClick = useCallback(() => {
    handleSignOut(signOut);
  }, [signOut, handleSignOut]);

  const menu = (
    <Menu className={classes.profileMenu}>
      <Item key="Item-1" className={classes.userProfileButton}>
        <Identification width="16" height="16" />
        {canAccess(permKey.PAGE_PROFILE) ? (

          <Link
            to={ROUTE.PROFILE.path.replace(':tabId', MY_PROFILE_TAB_PATH)}
            className={classes.profileMenuLink}
          >
            {userName}
          </Link>
        ) :
          (
            <Text className={classes.profileMenuLink}>
              {userName}
            </Text>
          )}
      </Item>
      <Item key="Item-2" onClick={handleLanguageSelection} className="hideOnDesktop">
        <Globe width="14" height="14" stroke="#0E0E0E" />
        <Text className={classes.profileMenuLink}>{t('global:CHANGE_LANGUAGE')}&nbsp;{`( ${getLangKey().toUpperCase()} )`}</Text>
      </Item>
      <Item key="Item-3" onClick={handleCountryChange}>
        <GlobeAlt width="14" height="14" />
        <Text className={classes.profileMenuLink}>{t('global:CHANGE_COUNTRY')}&nbsp;{`( ${countryFlag} - ${countryCode} )`}</Text>
      </Item>
      <Can permKey={permKey.PAGE_PANEL_DOC_SEARCH}>
        <Item key="Item-4">
          <FolderOpen width="14" height="14" />
          <Link to="/panelDoc/search" className={classes.profileMenuLink}>
            {t('global:DOCUMENTATIONS')}
          </Link>
        </Item>
      </Can>
      <Divider />
      <Item key="Item-5" onClick={handleSignOutClick}>
        <Logout width="14" height="14" />
        <Text className={classes.profileMenuLink}>{t('LOGOUT')}</Text>
      </Item>
    </Menu>
  );

  return (
    <Header className={[classes.appHeader]}>
      <SidebarToggler isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={classes.appHeaderRight}>
        <GeneralSearch />
        <Can permKey={permKey.PAGE_PANEL_DOC_SEARCH}>
          <PageDocsSection isSidebarCollapsed={isSidebarCollapsed} />
        </Can>
        <Button
          onClick={handleLanguageSelection}
          className={classes.userLanguageButton}
        >
          <Globe stroke="white" />
          <span>
            {t('global:CHANGE_LANGUAGE')}
          </span>
          <span className={classes.userLanguageButtonKey}>
            {`${getLangKey().toUpperCase()}`}
          </span>
        </Button>
        <SelectCountryDropdown classes={classes} />
        <Dropdown
          overlay={menu}
          placement="bottomLeft"
          trigger={['click']}
        >
          <Button className={classes.userButton}>
            <User width="15" height="15" />
            <Text className={classes.userButtonText}>{t('PROFILE')}</Text>
            <ChevronDown width="14" height="14" className={classes.userButtonArrow} />
          </Button>
        </Dropdown>
      </div>

    </Header>
  );
}

export default AppHeader;
