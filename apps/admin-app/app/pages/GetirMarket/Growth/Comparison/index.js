import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useEffect, useMemo } from 'react';

import { ROUTE } from '@app/routes';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { getSelectedCountryDivision, getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';

import Header from './components/Header';
import Filters from './components/Filters';
import PromoRatesTable from './components/Tables/PromoRatesTable';
import ClientOrdersTable from './components/Tables/ClientOrdersTable';
import OrderCountsByStoreTable from './components/Tables/OrderCountsByStoreTable';
import NewClientsTable from './components/Tables/NewClientsTable';

import useStyles from './styles';
import './style.css';
import { filtersSelector } from './redux/selectors';

const reduxKey = REDUX_KEY.GETIR_MARKET.GROWTH_COMPARISON;

function GetirMarketGrowthComparisonPage() {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.GETIR_MARKET_GROWTH_COMPARISON.name, squad: ROUTE.GETIR_MARKET_GROWTH_COMPARISON.squad });
  const classes = useStyles();
  const selectedDomainType = useSelector(filtersSelector?.getDomainTypes);
  const selectedDivision = getSelectedCountryDivision();
  const selectedCountry = useSelector(getSelectedCountryV2);
  const defaultSelectedDivisionCountry = useMemo(() => {
    if (selectedDivision) {
      return selectedCountry._id;
    }
    return null;
  }, [selectedDivision, selectedCountry]);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(CommonCreators.setSelectedDomainType({ data: selectedDomainType }));
  }, [dispatch, selectedDomainType]);

  useEffect(() => {
    dispatch(CommonCreators.getAvailableDomainTypesForCountrySelectorRequest());
    dispatch(Creators.getActiveIntegrationTypesConfigRequest({}));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Filters defaultSelectedDivisionCountry={defaultSelectedDivisionCountry} />
      <div className={`${classes.container} getirMarketGrowthComparisonPage`}>
        <Row gutter={[8, 8]}>
          <Col xs={24} lg={12}>
            <PromoRatesTable />
          </Col>
          <Col xs={24} lg={12}>
            <Row gutter={8}>
              <Col xs={24}>
                <ClientOrdersTable />
              </Col>
              <Col xs={24}>
                <NewClientsTable />
              </Col>
              <Col xs={24}>
                <OrderCountsByStoreTable />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default GetirMarketGrowthComparisonPage;
