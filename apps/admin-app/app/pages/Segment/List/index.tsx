import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Header, Search, Table } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.SEGMENT.LIST;

const SegmentListPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.SEGMENT_LIST.name, squad: ROUTE.SEGMENT_LIST.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [search, setSearch] = useState('');

  return (
    <>
      <Header />
      <Search onSearch={setSearch} />
      <Table search={search} />
    </>
  );
};

export default SegmentListPage;
