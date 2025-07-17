import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import {
  Header,
  UserTable,
  UserSearch,
} from './components';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const UserListPage = () => {
  usePageViewAnalytics({ name: ROUTE.USER_LIST.name, squad: ROUTE.USER_LIST.squad });
  const [searchText, setSearchText] = useState<string>('');
  const [searchId, setSearchId] = useState<string>('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const handleSearch = (searchInput: string) => {
    setSearchId('');
    setSearchText(searchInput);
  };

  const handleSearchById = (id: string) => {
    setSearchId(id);
  };

  return (
    <div style={{ margin: '1px 2px' }}>
      <Header />
      <UserSearch onSearch={handleSearch} onSearchById={handleSearchById} />
      <UserTable searchText={searchText} searchId={searchId} />
    </div>
  );
};

const reduxKey = REDUX_KEY.USER.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(UserListPage);
