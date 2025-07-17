import { useCallback, useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY, WAREHOUSE_ACTIVE_STATE } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { warehousesSelector } from './redux/selectors';
import permKey from '@shared/shared/permKey.json';

import { tableColumns } from './config';
import Filter from './components/Filter';
import NewButton from './components/NewButton';
import FeeBulkUploadButton from './components/FeeBulkUploadButton';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { getWarehousesRequestBody } from './utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const { Title } = Typography;

const paginationSettings = {
  DEFAULT: 1,
  ROWSPERPAGE: 10,
};

const List = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_LIST.name, squad: ROUTE.WAREHOUSE_LIST.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { canAccess } = usePermission();
  const hasBulkUploadPermission = canAccess(permKey.PAGE_MARKET_FEES_BULK_UPLOAD);
  const [filters, setFilters] = useState({
    domainTypes: [],
    cities: [],
    statuses: [],
    states: [WAREHOUSE_ACTIVE_STATE],
    warehouseTypes: [],
    name: '',
    SAPReferenceCodes: [],
  });

  const [pagination, setPagination] = useState({ currentPage: paginationSettings.DEFAULT, rowsPerPage: paginationSettings.ROWSPERPAGE });

  const warehouses = useSelector(warehousesSelector.getData);
  const total = useSelector(warehousesSelector.getTotal);
  const isPending = useSelector(warehousesSelector.getIsPending);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const getWarehousesRequest = useCallback(() => {
    const { currentPage, rowsPerPage } = pagination;
    const requestParams = getWarehousesRequestBody({
      ...filters,
      currentPage,
      rowsPerPage,
    });
    dispatch(Creators.getWarehousesRequest(requestParams));
  }, [pagination, filters, dispatch]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    getWarehousesRequest();
  }, [getWarehousesRequest]);

  const pageTitle = t('PAGE_TITLE.WAREHOUSE.LIST');

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>{pageTitle}</Title>
        </Col>
        <Col>
          <Space>
            {hasBulkUploadPermission && <FeeBulkUploadButton title={t('sidebar:MARKET_FEES_BULK_UPLOAD')} to={ROUTE.MARKET_FEES_BULK_UPLOAD.path} />}
            <NewButton />
          </Space>
        </Col>
      </Row>
      <Filter filters={filters} handleSubmit={e => setFilters(e)} isPending={isPending} />
      <Row>
        <Col span={24}>
          <AntTableV2
            data={warehouses}
            columns={tableColumns}
            loading={isPending}
            total={total}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.WAREHOUSE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(List);
