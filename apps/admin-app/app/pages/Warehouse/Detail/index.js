import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Row, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import permKey from '@shared/shared/permKey.json';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import FormWrapper from './components/Form';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

const { Title } = Typography;

const Detail = () => {
  usePageViewAnalytics({
    name: ROUTE.WAREHOUSE_DETAIL.name,
    squad: ROUTE.WAREHOUSE_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { id } = useParams();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getEmployeesRequest());
    dispatch(Creators.getWarehouseShipmentFrequenciesRequest({ warehouseId: id }));
    dispatch(Creators.getWarehouseShipmentPreparationsRequest({ warehouseId: id }));
    dispatch(Creators.getShipmentFrequenciesRequest());
    dispatch(Creators.getShipmentPreparationsRequest());
    dispatch(CommonCreators.getMarketFranchisesRequest());
    dispatch(Creators.getWarehouseRequest({ id }));
    dispatch(CommonCreators.getOperationalCountriesRequest());
    dispatch(CommonCreators.getMainStoresRequest());
    dispatch(CommonCreators.getNonagreementWarehousesRequest());
    dispatch(Creators.getWarehouseSectionsRequest({ warehouseId: id }));
    dispatch(CommonCreators.getTransferGroupsRequest({
      limit: 250,
      offset: 0,
    }));
    dispatch(Creators.getWarehouseSegmentsRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id]);

  const pageTitle = t('PAGE_TITLE.WAREHOUSE.DETAIL');
  const feeDetailsUrl = ROUTE.MARKET_FEES_DETAILS.path.replace(':warehouseId', id);
  const basketAmountDetailsUrl = ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.path.replace(':warehouseId', id);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={3}>{pageTitle}</Title>
        <Space style={{ marginBlock: '2px' }}>
          <RedirectButtonV2
            text={t('warehousePage:MARKET_FEE_DETAILS')}
            to={feeDetailsUrl}
            permKey={permKey.PAGE_MARKET_FEES_DETAILS}
            target="_blank"
            type="primary"
            size="middle"
          />
          <RedirectButtonV2
            text={t('warehousePage:BASKET_CONFIG_DETAILS')}
            to={basketAmountDetailsUrl}
            permKey={permKey.PAGE_GETIR_MARKET_BASKET_CONFIG_DETAILS}
            target="_blank"
            type="primary"
            size="middle"
          />
        </Space>
      </Row>
      <FormWrapper />
    </>
  );
};

const reduxKey = REDUX_KEY.WAREHOUSE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(Detail);
