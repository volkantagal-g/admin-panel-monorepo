import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import PanelDocForm from './components/PanelDocForm';
import Header from './components/Header';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.PANEL_DOC.DETAIL;

const PanelDocDetailPage = () => {
  const { t } = useTranslation(['panelDocDetailPage']);
  const dispatch = useDispatch();
  const { id: _id } = useParams();
  usePageViewAnalytics({ name: ROUTE.PANEL_DOC_DETAIL.name, squad: ROUTE.PANEL_DOC_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getPanelDocByIdRequest({ _id }));
  }, [dispatch, _id]);

  return (
    <>
      <Header title={t('DOCUMENT_UPLOAD_PAGE')} />
      <PanelDocForm />
    </>
  );
};

export default PanelDocDetailPage;
