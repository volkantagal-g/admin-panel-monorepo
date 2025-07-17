import { useCallback, useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Spin } from 'antd';

import { useNavigate } from 'react-router-dom';

import { DOMAIN_TYPES_WITHOUT_WAREHOUSES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';

import { Header, ListForm } from './components';
import { MapWrapper } from '../components';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import useStyles from './styles';
import { getShowWarehouses, domainTypeSelector, getSaaData, getShowAutoCreatedSaas } from './redux/selectors';
import { LIST_MAP_ZOOM } from '../constants';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

function ServiceAvailabilityAreaList() {
  usePageViewAnalytics({ name: ROUTE.SERVICE_AVAILABILITY_AREA_LIST.name, squad: ROUTE.SERVICE_AVAILABILITY_AREA_LIST.squad });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const warehouses = useSelector(getWarehousesSelector.getData);
  const domainType = useSelector(domainTypeSelector);
  const showWarehouses = useSelector(getShowWarehouses);
  const cities = useSelector(getCitiesSelector.getData);
  const areas = useSelector(getSaaData.getData);
  const selectedCountry = useSelector(getSelectedCountryV2);
  const mapCenterCoordinates = [
    selectedCountry.center.coordinates[1],
    selectedCountry.center.coordinates[0],
  ];

  const [manuallyCreatedAreas, setManuallyCreatedAreas] = useState([]);
  const [autoCreatedAreas, setAutoCreatedAreas] = useState([]);
  const showAutoCreatedSaas = useSelector(getShowAutoCreatedSaas);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    // once for initial value, rest will be done by search button
    dispatch(Creators.getSaasRequest({ domainType }));
  }, [dispatch, domainType]);

  useEffect(
    () => {
      if (areas.length) {
        const manuallyCreated = areas.filter(area => !area.isAutomated);
        const autoCreated = areas.filter(area => area.isAutomated);
        setManuallyCreatedAreas(manuallyCreated);
        setAutoCreatedAreas(autoCreated);
      }
    },
    [areas],
  );

  const onPolygonClick = useCallback(
    polygon => {
      if (polygon) {
        const targetProps = polygon.properties;
        const { path } = ROUTE.SERVICE_AVAILABILITY_AREA_DETAIL;
        navigate(path.replace(':id', targetProps._id));
      }
    },
    [navigate],
  );

  if (!cities.length) {
    return <Spin />;
  }

  const mapState = {
    center: mapCenterCoordinates,
    zoom: LIST_MAP_ZOOM,
  };
  // don't show warehouses for domain types without warehouse
  const areWarehousesShown = showWarehouses && !DOMAIN_TYPES_WITHOUT_WAREHOUSES.includes(domainType);

  return (
    <>
      <Header />
      <Row className={classes.innerContainer}>
        <MapWrapper
          center={mapState.center}
          zoom={5}
          areas={showAutoCreatedSaas ? autoCreatedAreas : manuallyCreatedAreas}
          onClick={onPolygonClick}
          warehouses={areWarehousesShown ? warehouses : []}
        />
        <ListForm />
      </Row>
    </>
  );
}

const reduxKey = REDUX_KEY.SERVICE_AVAILABILITY_AREA.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ServiceAvailabilityAreaList);
