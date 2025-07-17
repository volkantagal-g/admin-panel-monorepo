import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { omit } from 'lodash';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '@app/pages/GetirWater/VendorFilter/redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@app/pages/GetirWater/VendorFilter/redux/sagas';
import reducer from '@app/pages/GetirWater/VendorFilter/redux/reducers';
import injectReducer from '@shared/utils/injectReducer';
import { Header, Filter, FilterSummaryTable, VendorInformationTable } from '@app/pages/GetirWater/VendorFilter/components';
import { initialVendorFilter } from './components/Filter/constants';

const VendorFilter = () => {
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_VENDOR_FILTER.name, squad: ROUTE.GETIR_WATER_VENDOR_FILTER.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getBrandsRequest());
    dispatch(Creators.filterVendorsRequest({ data: initialVendorFilter }));
    dispatch(Creators.getFirmsRequest());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getStatusRequest());
    dispatch(Creators.getVendorFilterCountRequest({ data: omit(initialVendorFilter, ['page', 'count']) }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Filter />
      <FilterSummaryTable />
      <VendorInformationTable />
    </>
  );
};

const reduxKey = REDUX_KEY.GETIR_WATER.VENDOR_FILTER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(VendorFilter);
