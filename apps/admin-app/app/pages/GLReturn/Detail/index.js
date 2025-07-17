import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

import {
  Header,
  DataTable,
  Filter,
} from './components';
import { REDUX_KEY, GETIR_DOMAIN_TYPES } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const GLReturnAlertDetail = () => {
  const { warehouseId } = useParams();
  usePageViewAnalytics({ name: ROUTE.GL_RETURN_ALERT_DETAIL.name, squad: ROUTE.GL_RETURN_ALERT_DETAIL.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getWarehousesRequest({ domainTypes: [GETIR_DOMAIN_TYPES.LOCALS] }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getSlotDataRequest({ data: { warehouseId } }));
  }, [dispatch, warehouseId]);

  return (
    <>
      <Header warehouseId={warehouseId} />
      <Filter warehouseId={warehouseId} />
      <DataTable warehouseId={warehouseId} />
    </>
  );
};

const reduxKey = REDUX_KEY.GL_RETURN.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GLReturnAlertDetail);
