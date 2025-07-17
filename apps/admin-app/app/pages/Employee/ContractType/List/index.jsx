import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Header, Table } from './components';
import { Creators } from './redux/actions';
import reduxKey from './redux/key';
import reducer from './redux/reducer';
import saga from './redux/saga';
import useStyles from './styles';

const List = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const { name, squad } = ROUTE.WORKFORCE_CONTRACT_LIST;
  usePageViewAnalytics({ name, squad });

  return (
    <div className={classes.body}>
      <Header />
      <Table />
    </div>
  );
};

export default List;
