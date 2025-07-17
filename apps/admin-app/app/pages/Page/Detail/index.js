import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Skeleton, Tabs } from 'antd';

import { useTranslation } from 'react-i18next';

import {
  Header,
  PageDetailForm,
  RoleList,
  PanelDocList,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';
import PageOwnerList from './components/PageOwnerList';
import PageComponentList from './components/PageComponentList';
import AntCard from '@shared/components/UI/AntCard';

import { PAGE_DETAIL_TAB_PANE_KEY } from './constants';
import { getPageByIdSelector } from './redux/selectors';

const { TabPane } = Tabs;

const PageDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.PAGE_DETAIL.name, squad: ROUTE.PAGE_DETAIL.squad });
  const { t } = useTranslation('pagePage');
  const dispatch = useDispatch();
  const { id: pageId } = useParams();
  const isPagePending = useSelector(getPageByIdSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getPageByIdRequest({ id: pageId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, pageId]);

  const handleRemovePanelDoc = ({ panelDocId }) => {
    dispatch(Creators.removePanelDocRequest({ _id: panelDocId, pageId }));
  };

  const handleActivenessChange = ({ checked, panelDocId }) => {
    dispatch(Creators.panelDocUpdateActivenessRequest({ _id: panelDocId, pageId, isActive: checked }));
  };

  return (
    <>
      <Header />
      <PageDetailForm />
      <AntCard>
        <Tabs>
          <TabPane tab={t('PAGE_COMPONENTS')} key={PAGE_DETAIL_TAB_PANE_KEY.PAGE_COMPONENTS_LIST}>
            <Skeleton loading={isPagePending} active>
              <PageComponentList />
            </Skeleton>
          </TabPane>
          <TabPane tab={t('COMPONENTS.PAGE_DETAIL.PAGE_OWNERS_INFO')} key={PAGE_DETAIL_TAB_PANE_KEY.PAGE_OWNERS_LIST}>
            <Skeleton loading={isPagePending} active>
              <PageOwnerList />
            </Skeleton>
          </TabPane>
          <TabPane tab={t('COMPONENTS.PAGE_DETAIL.ROLES_INFO')} key={PAGE_DETAIL_TAB_PANE_KEY.ROLE_LIST}>
            <Skeleton loading={isPagePending} active>
              <RoleList />
            </Skeleton>
          </TabPane>
          <TabPane tab={t('COMPONENTS.PAGE_DETAIL.DOCUMENTATION_INFO')} key={PAGE_DETAIL_TAB_PANE_KEY.PANEL_DOC_LIST}>
            <Skeleton loading={isPagePending} active>
              <PanelDocList
                onRemovePanelDocItem={handleRemovePanelDoc}
                onActivenessChange={handleActivenessChange}
              />
            </Skeleton>
          </TabPane>
        </Tabs>
      </AntCard>
    </>
  );
};

const reduxKey = REDUX_KEY.PAGE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PageDetailPage);
