import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Spin } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { Header, FormDetail } from './components';
import { MapWrapper } from '../components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import useStyles from './styles';
import { getSaaData } from './redux/selectors';
import { getCenterOfPolygon } from '../utils';
import { countriesSelector } from '@shared/redux/selectors/common';
import { DETAIL_MAP_ZOOM } from '../constants';

function ServiceAvailabilityAreaDetail() {
  usePageViewAnalytics({ name: ROUTE.SERVICE_AVAILABILITY_AREA_DETAIL.name, squad: ROUTE.SERVICE_AVAILABILITY_AREA_DETAIL.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  const area = useSelector(getSaaData.getData);
  const areaIsPending = useSelector(getSaaData.getIsPending);
  const countries = useSelector(countriesSelector.getData);
  const countriesPending = useSelector(countriesSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getSaaByIdRequest({ id }));
    dispatch(CommonCreators.getCountriesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id]);

  const mapState = {
    // first point of the polygon, we don't have center info
    center: getCenterOfPolygon(area?.polygon),
    zoom: DETAIL_MAP_ZOOM,
  };

  return (
    <>
      <Header />
      <Row className={classes.innerContainer}>
        {(areaIsPending || countriesPending) ? <Spin /> : (
          <>
            <MapWrapper
              center={mapState.center}
              zoom={mapState.zoom}
              areas={area ? [area] : []}
            />
            <FormDetail saa={area} countries={countries} />
          </>
        )}
      </Row>
    </>
  );
}

const reduxKey = REDUX_KEY.SERVICE_AVAILABILITY_AREA.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ServiceAvailabilityAreaDetail);
