import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import { Header, Form } from '@app/pages/Fleet/VehicleConstraint/Detail/components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';

const reduxKey = REDUX_KEY.VEHICLE_CONSTRAINT.DETAIL;

const VehicleConstraintDetail = () => {
  usePageViewAnalytics({ name: ROUTE.VEHICLE_CONSTRAINT_DETAIL.name, squad: ROUTE.VEHICLE_CONSTRAINT_DETAIL.squad });
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header title={t('PAGE_TITLE.FLEET.VEHICLE_CONSTRAINT.DETAIL')} />
      <Form />
    </>
  );
};

export default VehicleConstraintDetail;
