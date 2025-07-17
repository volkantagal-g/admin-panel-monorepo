import reducer from '@app/pages/Planogram/Warehouses/redux/reducer';
import saga from '@app/pages/Planogram/Warehouses/redux/saga';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

export const useReduxSetup = () => {
  const reduxKey = REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.WAREHOUSES_LIST;

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  return reduxKey;
};
