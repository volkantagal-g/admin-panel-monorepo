import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, PageHeader, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getConfigTypeListSelector } from './redux/selectors';
import { Table } from './components';
import { useInitAndDestroyPage, usePageViewAnalytics, usePermission } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { getLimitAndOffset } from '@shared/utils/common';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

const reduxKey = REDUX_KEY.FRANCHISE_CONFIG_TYPE.LIST;

const List = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('franchiseConfigType');
  const { Can } = usePermission();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_CONFIG_TYPE_LIST.name, squad: ROUTE.FRANCHISE_CONFIG_TYPE_LIST.squad });

  const data = useSelector(getConfigTypeListSelector.getData);
  const total = useSelector(getConfigTypeListSelector.getTotal);
  const isPending = useSelector(getConfigTypeListSelector.getIsPending);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const getConfigTypeList = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);

    dispatch(Creators.getFranchiseConfigTypeListRequest({ offset, limit }));
  }, [dispatch, pagination]);

  useEffect(() => {
    getConfigTypeList();
  }, [getConfigTypeList]);

  const deleteConfigType = id => {
    if (id !== undefined) {
      dispatch(Creators.deleteFranchiseConfigTypeRequest({ id }));
    }
  };

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('franchiseConfigType:LIST.PAGE_TITLE')}
          />
        </Col>
        <Can permKey={permKey.PAGE_FRANCHISE_CONFIG_TYPE_NEW}>
          <Col>
            <Link to="/franchiseConfigType/new">
              <Button type="primary" icon={<PlusOutlined />}>
                {t('franchiseConfigType:LIST.NEW_CONFIG_TYPE')}
              </Button>
            </Link>
          </Col>
        </Can>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            data={data}
            isPending={isPending}
            total={total}
            pagination={pagination}
            handlePaginationChange={handlePaginationChange}
            deleteConfigType={deleteConfigType}
          />
        </Col>
      </Row>
    </>

  );
};

export default List;
