import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Content } from '@shared/components/GUI';
import Header from '@app/pages/ContentCreation/components/Header';
import Filters from '@app/pages/ContentCreation/components/Filters';
import NotificationsTabs from '@app/pages/ContentCreation/components/NotificationsTabs';

import { Creators } from '@app/pages/ContentCreation/redux/actions';
import reducer from '@app/pages/ContentCreation/redux/reducer';
import saga from '@app/pages/ContentCreation/redux/saga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.CONTENT_CREATION;

const ContentCreation = () => {
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Content>
      <Header />
      <Filters />
      <NotificationsTabs />
    </Content>
  );
};

export default ContentCreation;
