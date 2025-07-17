import { useDispatch } from 'react-redux';

import { DtsCategorySettingTable, Header } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';

const reduxKey = REDUX_KEY.DTS_SETTING.CATEGORY.LIST;

const DtsCategorySettingList = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.DTS_CATEGORY_SETTING_LIST.name, squad: ROUTE.DTS_CATEGORY_SETTING_LIST.squad });

  return (
    <>
      <Header />
      <DtsCategorySettingTable />
    </>
  );
};

export default DtsCategorySettingList;
