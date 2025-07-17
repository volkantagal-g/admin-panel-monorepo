import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button, Content } from '@shared/components/GUI';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import permKey from '@shared/shared/permKey.json';

import { usePageViewAnalytics, usePermission } from '@shared/hooks';

import { ROUTE } from '@app/routes';

import { REDUX_KEY } from '@shared/shared/constants';

import reducer from './redux/reducer';
import saga from './redux/saga';

import { Creators } from './redux/actions';

import Header from '../components/Header';
import Filter from './components/Filter';
import Table from './components/Table';
import { getFormattedRequestData, getInitialDates } from './utils';

const List = () => {
  usePageViewAnalytics({
    name: ROUTE.AB_TEST_V2_LIST.name,
    squad: ROUTE.AB_TEST_V2_LIST.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation(['abTestingV2Page', 'global']);
  const { Can } = usePermission();

  useEffect(() => {
    dispatch(Creators.initPage());
    const requestData = getFormattedRequestData({ dates: getInitialDates() });
    dispatch(Creators.setFilters({ requestData }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Content>
      <Header
        title={t('PAGE_TITLE.AB_TEST_V2.LIST')}
        buttonContent={(
          <Can permKey={permKey.PAGE_AB_TEST_V2_NEW}>
            <Link to={ROUTE.AB_TEST_V2_NEW.path}>
              <Button>{t('global:CREATE')}</Button>
            </Link>
          </Can>
        )}
        showButton
        contentStartPlacement={false}
      />
      <React.Fragment key="PAGE_AB_TEST_LIST_REST_OF_HEADER">
        <Filter />
        <Table />
      </React.Fragment>
    </Content>
  );
};

const reduxKey = REDUX_KEY.AB_TEST_V2_PAGE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(List);
