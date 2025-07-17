import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from '@app/pages/Fleet/TmsDriver/Detail/redux/actions';
import saga from '@app/pages/Fleet/TmsDriver/Detail/redux/saga';
import reducer from '@app/pages/Fleet/TmsDriver/Detail/redux/reducer';
import PageWrapper from '@app/pages/Fleet/TmsDriver/Detail/components/PageWrapper';

const reduxKey = REDUX_KEY.TMS_DRIVER.DETAIL;

const TmsDriverDetailPage = () => {
  const { t } = useTranslation(['global']);
  const { id } = useParams();
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.TMS_DRIVER_DETAIL.name, squad: ROUTE.TMS_DRIVER_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(Creators.getTmsDriverRequest({ id }));
  }, [dispatch, id]);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.FLEET.TMS_DRIVER.DETAIL')} />
      <PageWrapper />
    </>
  );
};

export default TmsDriverDetailPage;
