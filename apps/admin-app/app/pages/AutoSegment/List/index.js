import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage, useToggle } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

import AutoSegmentTable from './components/AutoSegmentTable';
import Header from './components/Header';
import NewAutoSegmentModal from './components/NewAutoSegmentModal';
import EditAutoSegmentModal from './components/EditAutoSegmentModal';

const reduxKey = REDUX_KEY.AUTO_SEGMENT.LIST;

function AutoSegmentListPage() {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.AUTO_SEGMENT_LIST.name, squad: ROUTE.AUTO_SEGMENT_LIST.squad });

  const [isNewAutoSegmentModalVisible, setIsNewAutoSegmentModalVisible] = useToggle();
  const [isEditAutoSegmentModalVisible, setIsEditAutoSegmentModalVisible] = useToggle();
  const [selectedAutoSegment, setSelectedAutoSegment] = useState();
  const [areInactivesIncluded, setAreInactivesIncluded] = useState(false);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header
        setIsNewAutoSegmentModalVisible={setIsNewAutoSegmentModalVisible}
        onAllStatusesSwitchChange={newAreInactivesIncluded => setAreInactivesIncluded(newAreInactivesIncluded)}
      />
      <AutoSegmentTable
        handleEditAutoSegmentOnClick={handleEditAutoSegmentOnClick}
        areInactivesIncluded={areInactivesIncluded}
      />
      <NewAutoSegmentModal
        isNewAutoSegmentModalVisible={isNewAutoSegmentModalVisible}
        setIsNewAutoSegmentModalVisible={setIsNewAutoSegmentModalVisible}
      />
      <EditAutoSegmentModal
        isEditAutoSegmentModalVisible={isEditAutoSegmentModalVisible}
        setIsEditAutoSegmentModalVisible={setIsEditAutoSegmentModalVisible}
        autoSegment={selectedAutoSegment}
      />
    </>
  );

  function handleEditAutoSegmentOnClick(segment) {
    setSelectedAutoSegment(segment);
    setIsEditAutoSegmentModalVisible();
  }
}

export default AutoSegmentListPage;
