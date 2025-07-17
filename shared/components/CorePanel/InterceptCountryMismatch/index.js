import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Modal, Spin } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { Creators as CountryCreators } from '@shared/redux/actions/countrySelection';
import { getMismatchResult } from './utils';
import { usePermission } from '../../../hooks';
import { getLangKey } from '../../../i18n';
import { DEFAULT_MODAL_CONTENT } from './constants';

/**
 *
 * @param {string} countryCode - code of the country, eg. 'TR', pass either this or "countryId" or if it depends on the api result, pass "error"
 * @param {string} countryId - id of the country
 * @param {ReactNode} modalContent - the content to render in the modal, if not passed, a default content will be rendered
 * @param {boolean} isSilent - if true, the modal will not be shown, instead the country will be changed silently
 * @param {number} delayInSeconds - the delay in seconds to show the modal, if isSilent is false
 * @param {object} apiError - the axios error that is created from api that fetches the data, two possible schemas:
 * ```js
 *    // for axios error
 *   apiError.response.data = { type: 'CountryMismatchError', dataCountryCode: 'TR', dataCountryId: '5f9b9b9b9b9b9b9b9b9b9b9b' }
 *   // if you want to pass a custom error
 *  apiError = { type: 'CountryMismatchError', dataCountryCode: 'TR', dataCountryId: '5f9b9b9b9b9b9b9b9b9b9b9b' }
 * ```
 * @param {ReactNode} children - the children to render if there is no mismatch (your page or component)
 */
export default function InterceptCountryMismatch({
  countryCode,
  countryId,
  modalContent,
  isSilent,
  delayInSeconds = 3,
  pagePermKey,
  apiError,
  children,
}) {
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const countries = useSelector(countriesSelector.getData);
  const { canAccess } = usePermission();

  const { isThereAMismatch, nextCountry } = useMemo(() => getMismatchResult({
    countryCode,
    countryId,
    selectedCountry,
    countries,
    apiError,
  }), [countryCode, countryId, selectedCountry, countries, apiError]);

  const canAccessPageInNextCountry = useMemo(() => {
    if (!pagePermKey) return true;
    if (!nextCountry) return false;
    return canAccess(pagePermKey, { countryId: nextCountry._id });
  }, [nextCountry, pagePermKey, canAccess]);

  useEffect(() => {
    if (isSilent && isThereAMismatch) {
      dispatch(CountryCreators.startCountrySelectionFlow({ selectedCountry: nextCountry, shouldReloadAfterLocalStorage: true }));
    }
  }, [dispatch, isSilent, isThereAMismatch, nextCountry]);

  if (!isThereAMismatch) {
    return children;
  }

  if (isThereAMismatch && isSilent) {
    return null;
  }

  if (isThereAMismatch && canAccessPageInNextCountry) {
    return (
      <Modal
        visible
        closable={false}
        footer={<ModalFooterWithAccess delayInSeconds={delayInSeconds} selectedCountry={selectedCountry} nextCountry={nextCountry} />}
      >
        {modalContent || (
        <div style={{ textAlign: 'center' }}>
          <h1>{DEFAULT_MODAL_CONTENT.title[getLangKey()]}</h1>
          <p>
            {DEFAULT_MODAL_CONTENT.body[getLangKey()]}
          </p>
        </div>
        )}
      </Modal>
    );
  }

  return (
    <Modal visible closable={false} footer={<ModalFooterWithoutAccess selectedCountry={selectedCountry} nextCountry={nextCountry} />}>
      <div style={{ textAlign: 'center' }}>
        <h1>{DEFAULT_MODAL_CONTENT.title[getLangKey()]}</h1>
        <p>
          {DEFAULT_MODAL_CONTENT.body[getLangKey()]}
        </p>
      </div>
    </Modal>
  );
}

function ModalFooterWithAccess({ delayInSeconds, selectedCountry, nextCountry }) {
  const [countDown, setCountDown] = useState(delayInSeconds < 1 ? 1 : delayInSeconds);
  const dispatch = useDispatch();
  const { t } = useTranslation('');

  const changeCountry = useCallback(() => {
    dispatch(CountryCreators.startCountrySelectionFlow({ selectedCountry: nextCountry, shouldReloadAfterLocalStorage: true }));
  }, [dispatch, nextCountry]);

  useEffect(() => {
    if (countDown <= 0) {
      changeCountry();
    }
  }, [countDown, changeCountry]);

  useEffect(() => {
    // setTimeout until countDown is 0
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [countDown]);

  return (
    <div>
      <Alert
        message={(
          <div>
            <div>{t('AUTO_COUNTRY_CHANGE')}</div>
            <CountryMismatch currentCountry={selectedCountry} nextCountry={nextCountry} />
            <div>
              <Spin size="small" spinning={countDown > 0} style={{ marginRight: '6px' }} /> {countDown}...
            </div>
          </div>
        )}
        type="warning"
        style={{ textAlign: 'left', marginBottom: '6px' }}
      />
      <div>
        <Button
          href="/"
        >
          {t('CANCEL')} ({t('GO_TO_HOME_PAGE')})
        </Button>
        <Button
          type="primary"
          onClick={changeCountry}
        >
          {t('FAST_FORWARD')}
        </Button>
      </div>
    </div>
  );
}

function ModalFooterWithoutAccess({
  selectedCountry,
  nextCountry,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <Alert
        message={(
          <div>
            <div>{t('AUTO_COUNTRY_CHANGE_ACCESS_ERROR')}</div>
            <CountryMismatch currentCountry={selectedCountry} nextCountry={nextCountry} />
          </div>
        )}
        type="warning"
        style={{ textAlign: 'left', marginBottom: '6px' }}
      />
      <div>
        <Button
          href="/"
        >
          {t('GO_TO_HOME_PAGE')}
        </Button>
      </div>
    </div>
  );
}

function CountryMismatch({ currentCountry, nextCountry }) {
  const { t } = useTranslation();
  return (
    <div style={{ }}>
      <div>
        <b style={{ marginRight: '2px' }}>{t('CURRENT_COUNTRY')}: </b>
        <span style={{ marginRight: '2px' }}>{currentCountry.name[getLangKey()]}</span>
        <span>{currentCountry.flag}</span>
      </div>
      <div>
        <b style={{ marginRight: '2px' }}>{t('CORRECT_COUNTRY')}: </b>
        <span style={{ marginRight: '2px' }}>{nextCountry.name[getLangKey()]}</span>
        <span>{nextCountry.flag}</span>
      </div>
    </div>
  );
}
