import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Row, Col, PageHeader } from 'antd';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import Form from './components/Form/index';

const reduxKey = REDUX_KEY.VEHICLE.NEW;

const CreateVehicle = () => {
  const { t } = useTranslation();
  usePageViewAnalytics({ name: ROUTE.VEHICLE_NEW.name, squad: ROUTE.VEHICLE_NEW.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getVehicleType());
  }, [dispatch]);

  return (
    <>
      <Row gutter={[8, 4]}>
        <Col flex={1}>
          <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.FLEET.VEHICLE.NEW')} />
        </Col>
      </Row>
      <Form />
    </>
  );
};

export default CreateVehicle;
