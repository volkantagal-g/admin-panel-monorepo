import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { PAGE_REDUX_KEY } from './constants';
import PanelDocPreview from './components/PanelDocPreview';

const reduxKey = PAGE_REDUX_KEY;

const PanelDocPreviewPage = () => {
  const { t } = useTranslation(['panelDocPreviewPage']);
  const dispatch = useDispatch();
  const { id: _id } = useParams();

  usePageViewAnalytics({ name: ROUTE.PANEL_DOC_PREVIEW.name, squad: ROUTE.PANEL_DOC_PREVIEW.squad });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getPanelDocByIdRequest({ _id }));
    AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION.EVENT_NAME, { method: PANEL_EVENTS.DOCUMENTATION.BUTTON.DOCUMENTATION_DETAIL });
  }, [dispatch, _id]);

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE')} />
      <PanelDocPreview />
    </>
  );
};

const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PanelDocPreviewPage);
