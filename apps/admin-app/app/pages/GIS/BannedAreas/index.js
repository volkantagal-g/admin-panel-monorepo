import { useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import MapSidebar from './components/MapSidebar';
import MapContent from './components/MapContent';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { REDUX_KEY } from '@shared/shared/constants';
import sagas from './redux/sagas';
import reducer from './redux/reducer';

import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';

const { Title } = Typography;

const BannedAreas = () => {
  const { t } = useTranslation('gisBannedAreasPage');
  const dispatch = useDispatch();
  const pageTitle = t('PAGE_TITLE.GIS.BANNED_AREAS');
  usePageViewAnalytics({ name: ROUTE.GIS_BANNED_AREAS.name, squad: ROUTE.GIS_BANNED_AREAS.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getBannedAreasRequest());
    dispatch(Creators.getScheduledBannedAreasRequest());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getWarehousesRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Row justify="end" align="middle">
        <Col flex={5}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Row justify="end" align="middle">
        <MapContent />
        <MapSidebar />
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.GIS.BANNED_AREAS;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(BannedAreas);
