import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import FormWrapper from './components/Form';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const { Title } = Typography;

const New = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_NEW.name, squad: ROUTE.WAREHOUSE_NEW.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('warehousePage');

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getMainStoresRequest());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getNonagreementWarehousesRequest());
    dispatch(Creators.getSAPDraftWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const pageTitle = t('PAGE_TITLE.WAREHOUSE.NEW');

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <FormWrapper />
    </>
  );
};

const reduxKey = REDUX_KEY.WAREHOUSE.NEW;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(New);
