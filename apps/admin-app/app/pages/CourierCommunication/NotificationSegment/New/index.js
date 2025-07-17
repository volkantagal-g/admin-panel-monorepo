import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import reducer from '@app/pages/CourierCommunication/NotificationSegment/New/redux/reducer';
import saga from '@app/pages/CourierCommunication/NotificationSegment/List/redux/saga';
import { Creators } from '@app/pages/CourierCommunication/NotificationSegment/List/redux/actions';
import Header from '@app/pages/CourierCommunication/NotificationSegment/New/component/Header';
import SegmentForm from '@app/pages/CourierCommunication/NotificationSegment/New/component/SegmentForm';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_SEGMENT.LIST;
const CourierNotificationCreateSegment = () => {
  usePageViewAnalytics({ name: ROUTE.COURIER_NOTIFICATION_SEGMENT_LIST.name, squad: ROUTE.COURIER_NOTIFICATION_SEGMENT_LIST.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <SegmentForm />
    </>
  );
};

export default CourierNotificationCreateSegment;
