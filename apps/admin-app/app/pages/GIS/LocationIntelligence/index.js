import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

import { ROUTE } from '@app/routes';
import { MapSideBar, MapWrapper, RedirectionModal } from './components';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { DEFAULT_MAP_OPTIONS } from './utils/constants';

const { Title } = Typography;
const zoomLevel = DEFAULT_MAP_OPTIONS.ZOOM_LEVEL / 2;

const LocationIntelligence = () => {
  usePageViewAnalytics({
    name: ROUTE.GIS_LOCATION_INTELLIGENCE.name,
    squad: ROUTE.GIS_LOCATION_INTELLIGENCE.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('gisLocationIntelligencePage');
  const selectedCountry = useSelector(getSelectedCountryV2);
  const pageTitle = t('PAGE_TITLE.GIS.LOCATION_INTELLIGENCE');

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    const mapCenterCoordinates = [
      selectedCountry.center.coordinates[1],
      selectedCountry.center.coordinates[0],
    ];
    dispatch(Creators.setMapCenter({ center: mapCenterCoordinates }));
    dispatch(Creators.setMapZoom({ zoom: zoomLevel }));
  }, [dispatch, selectedCountry.center.coordinates]);

  return (
    <>
      <RedirectionModal />
      <Row justify="end" align="middle">
        <Col flex={5}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
      </Row>
      <Row justify="end" align="middle">
        <Col xs={24} sm={24} md={18} lg={18}>
          <MapWrapper />
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <MapSideBar />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.GIS.LOCATION_INTELLIGENCE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(LocationIntelligence);
