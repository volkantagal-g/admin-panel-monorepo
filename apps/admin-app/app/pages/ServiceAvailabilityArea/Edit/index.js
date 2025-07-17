import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { Row, Spin } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { countriesSelector } from '@shared/redux/selectors/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { Header, FormEdit } from './components';
import { MapWrapper } from '../components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { getSaaData } from './redux/selectors';
import useStyles from './styles';
import { getCenterOfPolygon } from '../utils';
import { DETAIL_MAP_ZOOM } from '../constants';

function ServiceAvailabilityAreaEdit() {
  usePageViewAnalytics({ name: ROUTE.SERVICE_AVAILABILITY_AREA_EDIT.name, squad: ROUTE.SERVICE_AVAILABILITY_AREA_EDIT.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const area = useSelector(getSaaData.getData);
  const areaPending = useSelector(getSaaData.getIsPending);
  const countries = useSelector(countriesSelector.getData);
  const countriesPending = useSelector(countriesSelector.getIsPending);

  useEffect(() => {
    dispatch(CommonCreators.getCountriesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getSaaByIdRequest({ id }));
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
        {(areaPending || countriesPending) ? <Spin /> : (
          <>
            <MapWrapper
              center={mapState.center}
              zoom={mapState.zoom}
              areas={area ? [area] : []}
            />
            {area && <FormEdit saa={area} countries={countries} />}
          </>
        )}
      </Row>
    </>
  );
}

const reduxKey = REDUX_KEY.SERVICE_AVAILABILITY_AREA.EDIT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ServiceAvailabilityAreaEdit);
