import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import {
  PageHeader,
  PageFilter,
  Table,
} from './components';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';

const reduxKey = REDUX_KEY.USER.WEBHELP_MATCHING;

const UserWebhelpMatchingPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.USER_WEBHELP_MATCHING.name, squad: ROUTE.USER_WEBHELP_MATCHING.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  useTranslation('userPage');

  const [filters, setFilters] = useState({
    searchTerm: '',
    webhelpId: '',
  });

  const handleFilterChange = ({ searchTerm, webhelpId }) => {
    setFilters({ searchTerm, webhelpId });
  };

  return (
    <>
      <PageHeader />
      <PageFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <Table filters={filters} />
    </>
  );
};

export default UserWebhelpMatchingPage;
