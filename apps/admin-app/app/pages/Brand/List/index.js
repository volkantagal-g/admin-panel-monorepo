import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  BrandListTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import BrandSearch from './components/BrandSearch/index';

const BrandListPage = () => {
  usePageViewAnalytics({ name: ROUTE.BRAND_LIST.name, squad: ROUTE.BRAND_LIST.squad });
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [status, setStatus] = useState();

  const handleSearch = name => {
    setName(name.trim());
  };
  const handleStatusChange = status => {
    setStatus(status);
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  return (
    <>
      <Header />
      <BrandSearch onSearch={handleSearch} onStatusChange={handleStatusChange} />
      <BrandListTable brandName={name} status={status} />
    </>
  );
};

const reduxKey = REDUX_KEY.BRAND.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BrandListPage);
