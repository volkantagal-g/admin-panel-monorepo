import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { PageHeader, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import LeafletMap from './components/MapWrapper';
import Filter from './components/Filter';
import useStyles from './styles';
import { ROUTE } from '@app/routes';
import { gorillasWarehouseConfig, deliveryFeeConfig } from './utils';

const Map = () => {
  usePageViewAnalytics({ name: ROUTE.POLYGON_MAP.name, squad: ROUTE.POLYGON_MAP.squad });
  const dispatch = useDispatch();

  const { t } = useTranslation('polygonPage');

  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getGorillasWhsRequest({ body: gorillasWarehouseConfig }));
    dispatch(Creators.getSlottedDeliveryConfigRequest({ body: deliveryFeeConfig }));
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const pageTitle = t('PAGE_TITLE.POLYGON.MAP');

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <PageHeader className="p-0 page-title" title={pageTitle} />
        </Col>
      </Row>
      <Row className={classes.mapWrapper}>
        <LeafletMap />
        <Filter />
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.POLYGON.MAP;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(Map);
