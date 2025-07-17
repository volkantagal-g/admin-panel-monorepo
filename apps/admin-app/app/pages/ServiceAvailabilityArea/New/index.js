import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Spin } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { countriesSelector, getCitiesSelector } from '@shared/redux/selectors/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { Header, FormNew } from './components';
import { MapWrapper } from '../components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import useStyles from './styles';
import { LIST_MAP_ZOOM } from '../constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

function ServiceAvailabilityAreaNew() {
  usePageViewAnalytics({ name: ROUTE.SERVICE_AVAILABILITY_AREA_NEW.name, squad: ROUTE.SERVICE_AVAILABILITY_AREA_NEW.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  const countries = useSelector(countriesSelector.getData);
  const cities = useSelector(getCitiesSelector.getData);
  const selectedCountry = useSelector(getSelectedCountry);
  const mapCenterCoordinates = [
    selectedCountry.center.coordinates[1],
    selectedCountry.center.coordinates[0],
  ];

  useEffect(() => {
    dispatch(CommonCreators.getCountriesRequest());
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  if (!cities.length || !countries?.length) {
    return <Spin />;
  }

  return (
    <>
      <Header />
      <Row className={classes.innerContainer}>
        <MapWrapper
          center={mapCenterCoordinates}
          zoom={LIST_MAP_ZOOM}
        />
        <FormNew countries={countries} />
      </Row>
    </>
  );
}

const reduxKey = REDUX_KEY.SERVICE_AVAILABILITY_AREA.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ServiceAvailabilityAreaNew);
