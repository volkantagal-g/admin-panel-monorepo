import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import { useEffect } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import DetailForm from './components/DetailForm';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.TMS.DETAIL;

const DetailPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.TMS_DETAIL.name, squad: ROUTE.TMS_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id } = useParams();

  useEffect(() => {
    dispatch(Creators.getTmsVehicleRequest({ vehicleId: id }));
  }, [dispatch, id]);

  const handleFormSubmission = values => {
    const { _id: vehicleId } = values;
    const formValues = {
      ...values,
      vehicleDocuments: values.vehicleDocuments.map(doc => {
        return {
          ...doc,
          startDate: doc.startDate.format(),
          endDate: doc.endDate.format(),
        };
      }),
    };

    delete formValues._id;

    dispatch(Creators.updateTmsVehicleRequest({ vehicleId, formValues }));
  };

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.FLEET.TMS.DETAIL')} />
      <DetailForm onFormSubmit={handleFormSubmission} />
    </>
  );
};

export default DetailPage;
