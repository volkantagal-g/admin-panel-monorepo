import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  BulkSmsFilter,
  BulkSmsListTable,
} from '@app/pages/CommunicationBulkSms/List/components';

import saga from '@app/pages/CommunicationBulkSms/List/redux/saga';

import reducer from '@app/pages/CommunicationBulkSms/List/redux/reducer';

import { Creators } from '@app/pages/CommunicationBulkSms/List/redux/actions';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const BulkSmsListPage = () => {
  usePageViewAnalytics({ name: ROUTE.COMMUNICATION_BULK_SMS_LIST.name, squad: ROUTE.COMMUNICATION_BULK_SMS_LIST.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <BulkSmsFilter />
      <BulkSmsListTable />
    </>
  );
};

const reduxKey = REDUX_KEY.COMMUNICATION_BULK_SMS.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BulkSmsListPage);
