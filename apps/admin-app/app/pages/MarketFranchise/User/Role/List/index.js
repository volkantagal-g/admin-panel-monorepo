import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, PageHeader, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { marketFranchiseUserRoleListSelector } from './redux/selectors';
import { Filter, Table } from './components';
import { ROUTE } from '@app/routes';
import { useEffectSkipInitialRender, useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getLimitAndOffset } from '@shared/utils/common';

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.LIST;

const MarketFranchiseUserRoleList = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const { t } = useTranslation('marketFranchiseUserRolePage');

  const [filters, setFilters] = useState({ roleName: '' });

  const data = useSelector(marketFranchiseUserRoleListSelector.getData);
  const total = useSelector(marketFranchiseUserRoleListSelector.getTotal);
  const isPending = useSelector(marketFranchiseUserRoleListSelector.getIsPending);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handleSubmit = _filters => {
    setFilters(_filters);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const getRoleList = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getMarketFranchiseUserRoleListRequest({ offset, limit, filters }));
  }, [dispatch, filters, pagination]);

  useEffectSkipInitialRender(() => {
    const { currentPage } = pagination;

    if (currentPage !== 1) {
      setPagination({ ...pagination, currentPage: 1 });
    }
    else {
      getRoleList();
    }
  }, [filters]);

  useEffect(() => {
    getRoleList();
  }, [pagination.currentPage, pagination.rowsPerPage, getRoleList]);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('PAGE_TITLE.MARKET_FRANCHISE_USER_ROLE.LIST')}
          />
        </Col>
        <Col>
          <Link to={ROUTE.MARKET_FRANCHISE_USER_ROLE_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_MARKET_FRANCHISE_USER_ROLE')}
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

export default MarketFranchiseUserRoleList;
