import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import Header from '../components/Header';
import Filter from './components/Filter';
import Table from './components/Table';
import { getFormattedRequestData, getInitialDates } from './utils';

const List = () => {
  usePageViewAnalytics({ name: ROUTE.AB_TEST_LIST.name, squad: ROUTE.AB_TEST_LIST.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation(['abTestingPage', 'global']);
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
    <div>
      <Header
        title={t('PAGE_TITLE.AB_TEST.LIST')}
        key="header"
      >
        <Can permKey={permKey.PAGE_AB_TEST_NEW}>
          <Link to={ROUTE.AB_TEST_NEW.path}>
            <Button type="primary">
              {t('global:CREATE')}
            </Button>
          </Link>
        </Can>
      </Header>
      <React.Fragment key="PAGE_AB_TEST_LIST_REST_OF_HEADER">
        <Filter />
        <Table />
      </React.Fragment>
    </div>
  );
};

const reduxKey = REDUX_KEY.AB_TEST_PAGE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(List);
