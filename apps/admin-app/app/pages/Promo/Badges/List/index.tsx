import { Col, Row, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { PAGINATION_SETTINGS } from '@app/pages/Promo/constantValues';
import Filters from './components/Filters/index';
import ManagePromoBadge from './components/ManagePromoBadge';
import Table from './components/Table/index';
import { IFilters, IFiltersWithPagination, PaginationType, PromoBadge, PromoBadgeList } from './interfaces';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/sagas';
import { getPromoBadgesByFiltersSelector } from './redux/selectors';

const reduxKey = REDUX_KEY.PROMO.BADGES;
const { Title } = Typography;

const PromoBadgesList: FC = () => {
  const { t } = useTranslation('promoBadgesPage');
  const dispatch = useDispatch();
  const isSearchPending = useSelector(
    getPromoBadgesByFiltersSelector.getIsPending,
  );
  const filteredPromoBadges = useSelector(
    getPromoBadgesByFiltersSelector.getData,
  ) as PromoBadgeList;

  const [selectedPromoBadge, setSelectedPromoBadge] = useState<PromoBadge | null>(null);
  const [pagination, setPagination] = useState({ currentPage: PAGINATION_SETTINGS.DEFAULT, rowsPerPage: PAGINATION_SETTINGS.ROWSPERPAGE });
  const [isModalVisible, setIsModalVisible] = useState(false);

  usePageViewAnalytics({
    name: ROUTE.DISCOUNT_CODE_LIST.name,
    squad: ROUTE.DISCOUNT_CODE_LIST.squad,
  });

  useInitAndDestroyPage({ dispatch, Creators });

  const handleSearch = (filterValues: IFilters) => {
    const body: IFiltersWithPagination = { ...filterValues, limit: pagination.rowsPerPage, page: pagination.currentPage - 1 };
    dispatch(Creators.getPromoBadgesByFiltersRequest(body));
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }: PaginationType) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getPromoBadgesByFiltersRequest({ limit: 10, page: 0 }));
  }, [dispatch]);

  const handleBadgeEdit = (promoBadge: PromoBadge) => {
    setSelectedPromoBadge(promoBadge);
    setIsModalVisible(true);
  };

  const handleModal = () => {
    setSelectedPromoBadge(null);
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setIsModalVisible(false);
  }, [isSearchPending]);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>{t('LIST.TITLE')}</Title>
        </Col>
        <Col>
          <ManagePromoBadge
            promoBadge={selectedPromoBadge}
            onManageModalClick={handleModal}
            isModalVisible={isModalVisible}
          />
        </Col>
      </Row>
      <Filters
        onSearch={handleSearch}
        isSearchPending={isSearchPending}
        pagination={pagination}
      />
      <Table
        filteredPromoBadges={filteredPromoBadges}
        isSearchPending={isSearchPending}
        onPaginationChange={handlePaginationChange}
        total={100}
        pagination={pagination}
        onBadgeEdit={handleBadgeEdit}
      />
    </>
  );
};

const withReducer = injectReducer({ key: reduxKey, reducer });
const withSaga = injectSaga({ key: reduxKey, saga });
export default compose(withReducer, withSaga)(PromoBadgesList);
