import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { COUNTRY_IDS, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import Header from './components/Header';
import Filter from './components/Filter';
import Tables from './components/Tables';
import { getEndDate1, getEndDate2, getStartDate1, getStartDate2 } from './utils';

// istanbul
const INITIAL_CITY_ID = '55999ad00000010001000000';

const GLGrowthComparison = () => {
  usePageViewAnalytics({ name: ROUTE.GL_GROWTH_COMPARISON.name, squad: ROUTE.GL_GROWTH_COMPARISON.squad });
  const dispatch = useDispatch();
  const selectedCountryId = getSelectedCountry()._id;

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountryId === COUNTRY_IDS.TR) {
      dispatch(Creators.setSelectedCity({ data: INITIAL_CITY_ID }));
    }
  }, [dispatch, selectedCountryId]);

  useEffect(() => {
    if (selectedCountryId === COUNTRY_IDS.TR) {
      const selectedDate1 = { startDate: getStartDate1(), endDate: getEndDate1() };
      const selectedDate2 = { startDate: getStartDate2(), endDate: getEndDate2() };
      const selectedTimeRange = { startTime: selectedDate1.startDate, endTime: selectedDate1.endDate };
      const selectedCity = INITIAL_CITY_ID;
      dispatch(Creators.getComparisonDataRequest({ data: { selectedDate1, selectedDate2, selectedTimeRange, selectedCity } }));
      dispatch(Creators.setRequestedDates({ data: { selectedDate1, selectedDate2 } }));
    }
  }, [dispatch, selectedCountryId]);

  return (
    <div>
      <Header />
      <Filter />
      <Tables />
    </div>
  );
};

const reduxKey = REDUX_KEY.GL_GROWTH_COMPARISON;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GLGrowthComparison);
