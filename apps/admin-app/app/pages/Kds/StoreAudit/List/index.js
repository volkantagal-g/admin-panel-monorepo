import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, PageHeader, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { kdsStoreAuditListSelector } from './redux/selectors';
import { Filter, Table } from './components';
import { ROUTE } from '@app/routes';
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getLimitAndOffset } from '@shared/utils/common';
import { auditEndDate, auditStartDate } from './constant';

const reduxKey = REDUX_KEY.KDS.STORE_AUDIT.LIST;

const StoreAuditList = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const { t } = useTranslation('storeAuditPage');

  const [filters, setFilters] = useState({
    auditDate: [auditStartDate, auditEndDate],
    completionDate: [],
    sentToFranchiseDate: [],
    auditorIds: [],
    franchiseIds: [],
    warehouseIds: [],
    warehouseTypes: [],
    domainTypes: [],
    statuses: [],
    cities: [],
    auditFormTypes: [],
  });

  const data = useSelector(kdsStoreAuditListSelector.getData);
  const total = useSelector(kdsStoreAuditListSelector.getTotal);
  const isPending = useSelector(kdsStoreAuditListSelector.getIsPending);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handleSubmit = filter => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setFilters(filter);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    // this equality prevents possible extra renders (because of AntTable) when the page initialized
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const getStoreAuditList = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getKdsStoreAuditListRequest({ filters, offset, limit }));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    getStoreAuditList();
  }, [getStoreAuditList]);

  const dispatchCitiesRequest = useCallback(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatchCitiesRequest();
  }, [dispatchCitiesRequest]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE.STORE_AUDIT.LIST')}
          />
        </Col>
        <Col>
          <Link to={ROUTE.STORE_AUDIT_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_STORE_AUDIT')}
            </Button>
          </Link>
        </Col>
      </Row>
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Row>
        <Col span={24}>
          <Table
            data={data}
            isPending={isPending}
            total={total}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default StoreAuditList;
