import { useState, useEffect, useCallback } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import history from '@shared/utils/history';
import permKey from '@shared/shared/permKey.json';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { warehouseAnnouncementsListByWarehouseSelector } from './redux/selectors';
import NewButton from '../components/NewButton';
import Filter from './components/Filter';
import { getRequestParams } from './utils';
import AntTableV2 from '@shared/components/UI/AntTableV2';

const { Title } = Typography;

const FieldAnnouncementListByWarehouse = () => {
  usePageViewAnalytics({
    name: ROUTE.FIELD_ANNOUNCEMENT_CREATE.name,
    squad: ROUTE.FIELD_ANNOUNCEMENT_CREATE.squad,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation('fieldAnnouncementPage');
  const { Can } = usePermission();
  const pageTitle = t('PAGE_TITLE.LIST_BY_WAREHOUSE');

  const [filters, setFilters] = useState({ warehouses: [] });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const warehouseAnnouncements = useSelector(
    warehouseAnnouncementsListByWarehouseSelector.getData,
  );
  const isPending = useSelector(
    warehouseAnnouncementsListByWarehouseSelector.getIsPending,
  );
  const total = useSelector(
    warehouseAnnouncementsListByWarehouseSelector.getTotal,
  );

  const warehouseAnnouncementsListRequest = useCallback(
    ({ requestPagination, requestFilters }) => {
      const { currentPage, rowsPerPage } = requestPagination;
      const requestParams = getRequestParams({
        ...requestFilters,
        currentPage,
        rowsPerPage,
      });

      dispatch(
        Creators.getWarehouseAnnouncementsListByWarehouseRequest(requestParams),
      );
    },
    [dispatch],
  );

  const handleSubmit = newFilters => {
    setFilters(newFilters);
    const newPagination = {
      currentPage: 1,
      rowsPerPage: pagination.rowsPerPage,
    };
    setPagination(newPagination);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const tableColumns = () => [
    {
      title: t('global:ID'),
      key: 'id',
      dataIndex: ['announcement', '_id'],
      render: id => <CopyToClipboard message={id} />,
      width: 200,
    },
    {
      title: t('global:TITLE'),
      dataIndex: ['announcement', 'title'],
      key: 'title',
      render: title => title?.[getLangKey()] || title?.native,
      width: 150,
    },
    {
      title: t('global:WAREHOUSE'),
      key: 'warehouse',
      dataIndex: 'warehouse',
      width: 200,
      render: id => <CopyToClipboard message={id} />,
    },
    {
      title: t('global:CREATED_BY'),
      key: 'createdBy',
      dataIndex: 'createdBy',
      render: createdBy => (createdBy ? <CopyToClipboard message={createdBy} /> : '-'),
      width: 200,
    },
    {
      title: t('global:DATE'),
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: creationDate => formatDate(creationDate),
      width: 100,
    },
    {
      title: t('global:ACTIVE'),
      key: 'isActive',
      dataIndex: ['announcement', 'active'],
      render: isActive => (isActive ? t('YES') : t('NO')),
      width: 80,
    },
    {
      title: <b>{t('global:ACTION')}</b>,
      dataIndex: ['announcement', '_id'],
      key: 'detail',
      align: 'center',
      width: 100,
      render: id => (
        <Button
          onClick={() => {
            history.push(`/field-announcement/detail/${id}`);
          }}
        >
          {t('global:DETAIL')}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    warehouseAnnouncementsListRequest({
      requestPagination: pagination,
      requestFilters: filters,
    });
  }, [filters, pagination, warehouseAnnouncementsListRequest]);
  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={3}>{pageTitle}</Title>
        <Can permKey={permKey.PAGE_FIELD_ANNOUNCEMENT_CREATE}>
          <NewButton />
        </Can>
      </Row>
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Row>
        <Col span={24}>
          <AntTableV2
            data={warehouseAnnouncements}
            columns={tableColumns()}
            total={total}
            loading={isPending}
            rowKey="_id"
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.FIELD_ANNOUNCEMENT.LIST_BY_WAREHOUSE;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FieldAnnouncementListByWarehouse);
