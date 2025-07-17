import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Typography } from 'antd';

import { getIsLoginPending, getIsAuthTempTokenPending, getIsLoginSuccess } from '@shared/redux/selectors/auth';
import { Creators } from '@shared/redux/actions/auth';
import Spinner from '@shared/components/Spinner';
import getirLogo from '@shared/assets/images/getir_purple_logo.png';
import Image from '@shared/components/UI/Image';
import AnalyticsService from '@shared/services/analytics';
import { ROUTE } from '@app/routes';
import useStyles from './styles';
import GoogleLogin from '@shared/components/UI/GoogleLogin';
import { MagicLink } from './components';

const { Title } = Typography;

const magicLinkTokenParam = '?authTempToken=';

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoginSuccess = useSelector(getIsLoginSuccess);
  const isLoginPending = useSelector(getIsLoginPending);
  const isAuthTempTokenPending = useSelector(getIsAuthTempTokenPending);
  const { t } = useTranslation('loginPage');
  const classes = useStyles();

  useEffect(() => {
    // initial login page opened, send analytics
    if (!location.search.includes(magicLinkTokenParam)) {
      AnalyticsService.pageView({ pageName: ROUTE.LOGIN.name, squad: ROUTE.LOGIN.squad });
    }
  }, [location.search]);

  useEffect(() => {
    // if magic link
    if (location.search.includes(magicLinkTokenParam)) {
      const tempToken = location.search.replace(magicLinkTokenParam, '');
      // if it includes slash, it means there is a redirect url appended
      if (tempToken.includes('/')) {
        const userToken = tempToken.split('/')[0];
        const redirectUrl = tempToken.split('/');
        dispatch(Creators.redirectUrlPathRequest({ data: redirectUrl }));
        dispatch(Creators.authTempTokenRequest({ tempToken: userToken }));
      }
      else {
        dispatch(Creators.authTempTokenRequest({ tempToken }));
      }
    }
  }, [dispatch, location.search]);

  const [showMagicLink, setShowMagicLink] = useState(false);

  if (isLoginPending || isAuthTempTokenPending) {
    return <Spinner />;
  }

  const login = showMagicLink ? (
    <>
      <MagicLink />
      <GoogleLogin />
    </>
  ) : (
    <>
      <GoogleLogin />
      <Button
        className={classes.noGetirEmailButton}
        size="large"
        type="secondary"
        block
        onClick={() => setShowMagicLink(true)}
      >
        {t('NO_GETIR_EMAIL')}
      </Button>
    </>
  );
  const content = isLoginSuccess ? (
    <Title level={3}>{t('LOGIN_LINK_HAS_BEEN_SENT')}</Title>
  ) : login;
  return (
    <div className={classes.mainWrapper}>
      <Card className={[classes.loginCard, showMagicLink ? classes.magicLinkVisible : null].join(' ')}>
        <div className="mb-5">
          <Image src={getirLogo} height={50} alt="logo" />
        </div>
        {content}
      </Card>
    </div>
  );
};

export default LoginPage;
