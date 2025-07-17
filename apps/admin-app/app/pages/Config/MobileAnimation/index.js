import { useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getTableColumns } from './utils/config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { CONFIG_NAME, CONFIGS, MARKET_CONFIG_QUERY_TYPES } from './utils/index';
import {
  getConfigGeneralKeySelector,
  getConfigOnBoardingKeySelector,
  getConfigSplashKeySelector,
  updateConfigKeySelector,
} from './redux/selectors';
import { getLangKey } from '@shared/i18n';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const List = () => {
  usePageViewAnalytics({ name: ROUTE.CONFIG_MOBILE_ANIMATION.name, squad: ROUTE.CONFIG_MOBILE_ANIMATION.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('configPage');
  const pageTitle = t('PAGE_TITLE.CONFIG.MOBILE_ANIMATION');
  const configGeneralKeyData = useSelector(getConfigGeneralKeySelector.getData);
  const configSplashKeyData = useSelector(getConfigSplashKeySelector.getData);
  const configOnBoardingKeyData = useSelector(getConfigOnBoardingKeySelector.getData);
  const isGetConfigGeneralKeyPending = useSelector(getConfigGeneralKeySelector.getIsPending);
  const isGetConfigSplashKeyPending = useSelector(getConfigSplashKeySelector.getIsPending);
  const isGetConfigOnBoardingKeyPending = useSelector(getConfigOnBoardingKeySelector.getIsPending);
  const isUpdatePending = useSelector(updateConfigKeySelector.getIsPending);
  const getIsPending = isGetConfigGeneralKeyPending && isGetConfigSplashKeyPending && isGetConfigOnBoardingKeyPending;

  const [tableColumns, setTableColumns] = useState([]);
  const generalKey = { ...configGeneralKeyData, key: CONFIG_NAME.MOBILE_ANIMATION_GENERAL[getLangKey()] };
  const splashKey = { ...configSplashKeyData, key: CONFIG_NAME.MOBILE_ANIMATION_SPLASH[getLangKey()] };
  const onBoardingKey = { ...configOnBoardingKeyData, key: CONFIG_NAME.MOBILE_ANIMATION_ONBOARDING[getLangKey()] };
  const configKeysData = [generalKey, splashKey, onBoardingKey];

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getConfigGeneralKeyRequest(
      {
        body: {
          key: CONFIGS.MOBILE_ANIMATION_GENERAL,
          type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
        },
      },
    ));
    dispatch(Creators.getConfigSplashKeyRequest(
      {
        body: {
          key: CONFIGS.MOBILE_ANIMATION_SPLASH,
          type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
        },
      },
    ));
    dispatch(Creators.getConfigOnBoardingKeyRequest(
      {
        body: {
          key: CONFIGS.MOBILE_ANIMATION_ONBOARDING,
          type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
        },
      },
    ));
    dispatch(CommonCreators.getOperationalCountriesRequest());
  }, [dispatch, isUpdatePending]);

  useEffect(() => {
    const tempTableColumns = getTableColumns({ t });
    setTableColumns(tempTableColumns);
  }, [t]);

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={pageTitle}
        />
      </Col>
      <Col>
        <AntTableV2
          data={configKeysData}
          columns={tableColumns}
          loading={getIsPending}
        />
      </Col>
    </Row>
  );
};

const reduxKey = REDUX_KEY.CONFIG.MOBILE_ANIMATION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(List);
