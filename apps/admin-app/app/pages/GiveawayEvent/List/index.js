import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import useQuery from '@shared/shared/hooks/useQuery';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { GiveawayEventsTable, Header, GiveawaySearch } from './components';

const GiveawayEventList = () => {
  usePageViewAnalytics({ name: ROUTE.GIVEAWAY_EVENT_DRAW_LIST.name, squad: ROUTE.GIVEAWAY_EVENT_DRAW_LIST.squad });
  const query = useQuery();
  const queryText  = query.get('queryText');

  const [searchTerm, setSearchTerm] = useState(queryText || '');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  const onSearch = value => {
    query.set('queryText', value);
    setSearchTerm(value);
  };

  return (
    <>
      <Header />
      <GiveawaySearch onSearch={onSearch} searchTerm={searchTerm} />
      <GiveawayEventsTable queryText={searchTerm} />
    </>
  );
};

const reduxKey = REDUX_KEY.GIVEAWAY_EVENT.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GiveawayEventList);
