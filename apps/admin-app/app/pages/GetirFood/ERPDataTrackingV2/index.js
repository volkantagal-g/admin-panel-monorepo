import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { Tabs } from '@shared/components/GUI';

import Header from './components/Header';
import AntCard from '@shared/components/UI/AntCard';

import reducer from './redux/reducer';
import saga from './redux/saga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import { getTabItems } from './utils';
import { Creators } from './redux/actions';
import { getActiveTab } from './redux/selectors';

const reduxKey = REDUX_KEY.FOOD.ERP_DATA_TRACKING_V2;

const ERPDataTrackingV2 = () => {
  const { t } = useTranslation('foodERPDataTrackingV2Page');
  const dispatch = useDispatch();
  const activeTab = useSelector(getActiveTab);

  const tabItems = getTabItems(t);

  const handleTabChange = key => {
    dispatch(Creators.setActiveTab({ activeTab: key }));
  };

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.GETIR_FOOD_ERP_DATA_TRACKING_V2.name, squad: ROUTE.GETIR_FOOD_ERP_DATA_TRACKING_V2.squad });

  return (
    <>
      <Header />
      <AntCard>
        <Tabs items={tabItems} activeKey={activeTab} onChange={handleTabChange} />
      </AntCard>
    </>
  );
};

export default ERPDataTrackingV2;
