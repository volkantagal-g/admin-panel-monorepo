import { useEffect } from 'react';
import { Row, Col, PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { REDUX_KEY } from '@shared/shared/constants';
import sagas from './redux/sagas';
import reducer from './redux/reducer';

import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';
import MapWrapper from './components/MapWrapper';
import Form from './components/Form';
import useStyles from './styles';

const HeatMap = () => {
  usePageViewAnalytics({ name: ROUTE.GIS_HEATMAP.name });
  const { t } = useTranslation('gisHeatMapPage');
  const dispatch = useDispatch();
  const pageTitle = t('PAGE_TITLE.GIS.HEATMAP');

  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Row justify="end" align="middle">
        <Col span={24}>
          <PageHeader className="p-0 page-title" title={pageTitle} />
        </Col>
      </Row>
      <Row className={classes.mapWrapper}>
        <MapWrapper />
        <Form />
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.GIS.HEATMAP;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(HeatMap);
