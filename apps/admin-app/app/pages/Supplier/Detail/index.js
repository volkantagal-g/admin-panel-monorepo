import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'antd';
import { useTheme } from 'react-jss';

import {
  Header,
  SupplierDetailForm,
  SupplierAccountListTable,
  SupplierSettingsForm,
  SupplierProductMappingListTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import InterceptCountryMismatch from '@shared/components/CorePanel/InterceptCountryMismatch';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getSupplierByIdSelector } from './redux/selectors';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

const { PAGE_SUPPLIER_DETAIL } = permKey;

const SupplierDetailPage = () => {
  usePageViewAnalytics({
    name: ROUTE.SUPPLIER_DETAIL.name,
    squad: ROUTE.SUPPLIER_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const theme = useTheme();
  const { id: supplierId } = useParams();
  const supplier = useSelector(getSupplierByIdSelector.getData) || {};
  const supplierError = useSelector(getSupplierByIdSelector.getError);
  const { isApiEnabled } = supplier;

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getSupplierByIdRequest({ id: supplierId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InterceptCountryMismatch
      countryCode={supplier?.countryCode}
      apiError={supplierError}
      pagePermKey={PAGE_SUPPLIER_DETAIL}
    >
      <Header />
      <Row gutter={[theme.spacing(3)]}>
        <Col xs={24} lg={24}>
          <SupplierDetailForm />
        </Col>
        <Col xs={24} lg={24}>
          <SupplierAccountListTable />
        </Col>
        <Col xs={24} lg={24}>
          <SupplierSettingsForm />
        </Col>
        {isApiEnabled && (
          <Col xs={24}>
            <SupplierProductMappingListTable />
          </Col>
        )}
      </Row>
    </InterceptCountryMismatch>
  );
};

const reduxKey = REDUX_KEY.SUPPLIER.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SupplierDetailPage);
