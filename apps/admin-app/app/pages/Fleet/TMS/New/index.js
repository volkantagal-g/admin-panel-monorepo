import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { Creators } from '@app/pages/Fleet/TMS/New/redux/actions';
import saga from '@app/pages/Fleet/TMS/New/redux/saga';
import reducer from '@app/pages/Fleet/TMS/New/redux/reducer';
import CreateTmsVehicleForm from '@app/pages/Fleet/TMS/New/components/Form';

const reduxKey = REDUX_KEY.TMS.NEW;

const CreateTmsVehiclePage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.TMS_NEW.name, squad: ROUTE.TMS_NEW.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const handleFormSubmission = formValues => {
    dispatch(Creators.createTmsVehicleRequest({ formValues }));
  };

  useEffect(() => {
    const section = document.getElementsByTagName('section')[1];
    section.style.overflowX = 'hidden';

    return () => {
      section.style = {};
    };
  }, []);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.FLEET.TMS.NEW')} />
      <CreateTmsVehicleForm onFormSubmit={handleFormSubmission} />
    </>
  );
};

export default CreateTmsVehiclePage;
