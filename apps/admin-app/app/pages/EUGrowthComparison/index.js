import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Col, Row } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { currentWeekStatsSelector, xWeekStatsSelector } from './redux/selectors';

import Header from './components/Header';
import Filter from './components/Filter';
import GrowthComparisonTable from './components/GrowthComparisonTable';
import { getNumberOfWeek } from './utils';

const EUGrowthComparison = () => {
  usePageViewAnalytics({ name: ROUTE.EU_GROWTH_COMPARISON.name, squad: ROUTE.EU_GROWTH_COMPARISON.squad });
  const { t } = useTranslation('euGrowthComparison');
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    country: JSON.parse(localStorage.getItem('euGrowthCountry')),
    week: getNumberOfWeek(JSON.parse(localStorage.getItem('euGrowthCountry'))),
  });

  const xWeekStatsCountryData = useSelector(xWeekStatsSelector.getXWeekCountryStats);
  const xWeekStatsCityData = useSelector(xWeekStatsSelector.getXWeekCityStats);
  const xWeekStatsIsPending = useSelector(xWeekStatsSelector.getXWeekStatsIsPending);

  const currentWeekCountryStats = useSelector(currentWeekStatsSelector.getCurrentWeekCountryStats);
  const currentWeekCityStats = useSelector(currentWeekStatsSelector.getCurrentWeekCityStats);
  const currentWeekStatsIsPending = useSelector(currentWeekStatsSelector.getCurrentWeekStatsIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getCountriesRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  useEffect(() => {
    if (filters.week) {
      dispatch(Creators.getStatsBetweenDatesRequest({
        startDateL: moment().startOf('week'),
        endDateL: moment().endOf('week'),
      }));
      dispatch(Creators.getXWeekStatsRequest({ week: filters.week }));
    }
  }, [filters.week]);

  const handleOnFilterChange = filters => {
    setFilters(filters);
  };

  return (
    <>
      <Header />
      <Filter
        onFilterChange={handleOnFilterChange}
        filters={filters}
      />
      <Row gutter={8}>
        <Col xs={24} md={12}>
          <Row gutter={8}>
            <Col xs={24}>
              <GrowthComparisonTable
                title={t('TABLE.TITLE.WEEK_X_OF_EACH_COUNTRY', { week: filters.week })}
                data={xWeekStatsCountryData}
                isPending={xWeekStatsIsPending}
              />
            </Col>
            <Col xs={24}>
              <GrowthComparisonTable
                title={t('TABLE.TITLE.WEEK_X_OF_EACH_CITY', { week: filters.week })}
                data={xWeekStatsCityData}
                isPending={xWeekStatsIsPending}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={8}>
            <Col xs={24}>
              <GrowthComparisonTable
                title={t('TABLE.TITLE.CURRENT_WEEK')}
                data={currentWeekCountryStats}
                isPending={currentWeekStatsIsPending}
              />
            </Col>
            <Col xs={24}>
              <GrowthComparisonTable
                title={t('TABLE.TITLE.CURRENT_WEEK')}
                data={currentWeekCityStats}
                isPending={currentWeekStatsIsPending}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.EU_GROWTH_COMPARISON;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(EUGrowthComparison);
