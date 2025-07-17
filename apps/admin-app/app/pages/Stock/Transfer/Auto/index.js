import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { serviceTypeSelector } from '@app/pages/Stock/Transfer/Auto/redux/selectors';
import { AUTO_TRANSFER_SERVICE_TYPE } from '@app/pages/Stock/Transfer/constants';
import { ROUTE } from '@app/routes';

import { Header, Form, CategoryTable, RegularWarehouseTable, ProductTable } from './components';
import saga from './redux/saga';
import reducer from './redux/reducers';
import { Creators } from './redux/actions';

const TransferAuto = () => {
  usePageViewAnalytics({ name: ROUTE.STOCK_TRANSFER_AUTO.name, squad: ROUTE.STOCK_TRANSFER_AUTO.squad });
  const dispatch = useDispatch();
  const currentServiceType = useSelector(serviceTypeSelector.getServiceType);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getSuppliersRequest());
    dispatch(Creators.getMarketProductMasterCategoriesOldRequest({ isSubCategory: false }));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Form />
      {(currentServiceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT ||
        currentServiceType === AUTO_TRANSFER_SERVICE_TYPE.VOLUME_TRANSFER) && <CategoryTable />}
      {currentServiceType === AUTO_TRANSFER_SERVICE_TYPE.DEFAULT && <RegularWarehouseTable />}
      {currentServiceType === AUTO_TRANSFER_SERVICE_TYPE.DIRECT_DISPATCH && <ProductTable />}
    </>
  );
};

const reduxKey = REDUX_KEY.STOCK.TRANSFER.AUTO;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransferAuto);
