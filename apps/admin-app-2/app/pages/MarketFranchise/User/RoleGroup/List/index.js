import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, PageHeader, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { marketFranchiseUserRoleGroupListSelector } from './redux/selectors';
import { Filter, Table } from './components';
import { useEffectSkipInitialRender, useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { getLimitAndOffset } from '@shared/utils/common';
import { ROUTE } from '@app/routes';

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE_GROUP.LIST;

const MarketFranchiseUserRoleGroupList = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_LIST.name,
    squad: ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_LIST.squad,
  });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const { t } = useTranslation('marketFranchiseUserRoleGroupPage');

  const [filters, setFilters] = useState({ name: '', isActive: true });

  const data = useSelector(marketFranchiseUserRoleGroupListSelector.getData);
  const total = useSelector(marketFranchiseUserRoleGroupListSelector.getTotal);
  const isPending = useSelector(marketFranchiseUserRoleGroupListSelector.getIsPending);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handleSubmit = newFilters => {
    setFilters(newFilters);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const getRoleGroupList = () => {
    const { limit, offset } = getLimitAndOffset(pagination);
    dispatch(Creators.getMarketFranchiseUserRoleGroupListRequest({ offset, limit, filters }));
  };

  useEffectSkipInitialRender(() => {
    const { currentPage } = pagination;

    if (currentPage !== 1) {
      setPagination({ ...pagination, currentPage: 1 });
    }
    else {
      getRoleGroupList();
    }
  }, [filters]);

  useEffect(() => {
    getRoleGroupList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.rowsPerPage]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.MARKET_FRANCHISE_USER_ROLE_GROUP.LIST')} />
        </Col>
        <Col>
          <Link to={ROUTE.MARKET_FRANCHISE_USER_ROLE_GROUP_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_MARKET_FRANCHISE_USER_ROLE_GROUP')}
            </Button>
          </Link>
        </Col>
      </Row>
      <Filter filters={filters} handleSubmit={handleSubmit} isPending={isPending} />
      <Row>
        <Col span={24}>
          <Table data={data} isPending={isPending} total={total} pagination={pagination} handlePaginationChange={handlePaginationChange} />
        </Col>
      </Row>
    </>
  );
};

export default MarketFranchiseUserRoleGroupList;
