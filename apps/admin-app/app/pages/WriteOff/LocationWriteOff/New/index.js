import { useEffect } from 'react';
import { compose } from 'redux';

import { useTranslation } from 'react-i18next';
import { Typography, Row, Col } from 'antd';

import { useDispatch } from 'react-redux';

import { REDUX_KEY } from '@shared/shared/constants';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import sagas from './redux/sagas';

import reducer from './redux/reducer';
import FormWrapper from './components/Form';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const { Title } = Typography;

const New = () => {
  usePageViewAnalytics({ name: ROUTE.LOCATION_WRITE_OFF_NEW.name, squad: ROUTE.LOCATION_WRITE_OFF_NEW.squad });
  const { t } = useTranslation('writeOffPage');
  const dispatch = useDispatch();

  const pageTitle = t('PAGE_TITLE.LOCATION_WRITE_OFF.NEW');

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getFilteredWarehousesRequest({ fields: '_id name' }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Row gutter={[8, 8]} justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <FormWrapper />
    </>
  );
};

const reduxKey = REDUX_KEY.LOCATION_WRITE_OFF.NEW;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(New);
