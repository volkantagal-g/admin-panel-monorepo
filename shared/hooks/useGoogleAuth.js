import { useState, useCallback, useEffect } from 'react';
import { isString } from 'lodash';

import { REDIRECT_URL } from '@app/routes';
import { loadScript } from '@shared/utils/common';
import Config from '@shared/config/env';
import { getLangKey } from '@shared/i18n';

/*
 * this can't be stored in the component state as it will be cleared when the component is unmounted
 * whereas the script remains loaded
 */
let googleLibaryLoaded = false;

const useGoogleAuth = ({
  authRequest,
  onError = () => {},
  onReady = () => {},
  Creators = null,
  dispatch = null,
  token = undefined,
  accessToken = undefined,
}) => {
  const [cToken, setCToken] = useState(token || accessToken);

  const onSignInCallback = useCallback(data => {
    const { credential: clientToken } = data;
    const redirectUrl = !isString(REDIRECT_URL) ? '' : REDIRECT_URL;
    dispatch(Creators.authGoogleTokenRequest({ clientToken, redirectUrl }));
    setCToken(clientToken);
  }, [Creators, dispatch]);

  const signOut = useCallback(() => {
    return new Promise((resolve, reject) => {
      try {
        window.google.accounts.id.disableAutoSelect();
        resolve(true);
      }
      catch (error) {
        reject(error);
      }
    });
  }, []);

  const initGsiLogin = useCallback(() => {
    try {
      const locale = getLangKey();
      window.google.accounts.id.initialize({
        client_id: Config.GOOGLE_AUTH.CLIENT_ID,
        callback: onSignInCallback,
      });

      if (!cToken) {
        const gsiLogin = document.getElementById('gsiLogin');
        window.google.accounts.id.renderButton(
          gsiLogin,
          {
            theme: 'outline',
            size: 'large',
            locale,
            width: gsiLogin.offsetWidth,
          }, // customization attributes
        );
      }
    }
    catch (error) {
      onError({ error, authRequest });
    }
  }, [authRequest, onError, onSignInCallback, cToken]);

  useEffect(() => {
    if (googleLibaryLoaded) initGsiLogin();
  }, [initGsiLogin]);

  useEffect(() => {
    if (!googleLibaryLoaded) {
      loadScript(
        'body',
        Config.GOOGLE_AUTH.JS_URI,
        Config.GOOGLE_AUTH.DOM_ID,
        () => {
          window.onGoogleLibraryLoad = () => {
            googleLibaryLoaded = true;
            initGsiLogin();
          };
        },
        error => {
          onError({ error, authRequest });
        },
      );
    }
  }, [authRequest, onError, onReady, onSignInCallback, cToken, initGsiLogin]);

  return { signOut };
};

export default useGoogleAuth;
