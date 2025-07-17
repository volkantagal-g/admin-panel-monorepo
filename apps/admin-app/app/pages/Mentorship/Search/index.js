import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Space } from '@shared/components/GUI';
import Header from '../components/Header';
import { useUrlQueryParams, useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { base64ToJson } from '@shared/utils/common';
import { ROUTE } from '@app/routes';
import { reduxKey } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { searchMentorshipCoursesSelector } from './redux/selectors';
import Table from './components/Table';
import Filter from './components/Filter';

const Search = () => {
  const queryParams = useUrlQueryParams();
  const isFirst = useRef(true);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.MENTORSHIP_SEARCH.name, squad: ROUTE.MENTORSHIP_SEARCH.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { t } = useTranslation(['mentorshipPage', 'employeePage', 'global']);
  const items = useSelector(searchMentorshipCoursesSelector.getData);
  const isPending = useSelector(searchMentorshipCoursesSelector.getIsPending);
  const filters = useSelector(searchMentorshipCoursesSelector.getFilters);

  useEffect(() => {
    if (isFirst.current) {
      const queryFilters = queryParams.get('filters');
      const filtersJson = base64ToJson(queryFilters);

      dispatch(Creators.setFilters({ filters: filtersJson }));
      dispatch(Creators.searchMentorshipCoursesRequest({ body: { filters: filtersJson } }));
    }

    return () => {
      isFirst.current = false;
    };
  }, [dispatch, queryParams]);

  return (
    <div className="p-3">
      <Header isSearchPage />
      <Space title={t('MENTORSHIP_SEARCH')}>
        <>
          <Filter t={t} initialValues={filters} loading={isPending} />
          <Table t={t} data={items} loading={isPending} />
        </>
      </Space>
    </div>
  );
};

export default Search;
