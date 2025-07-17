import { useCallback, useEffect, useState } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getPromosSelector } from './redux/selectors';
import permKey from '@shared/shared/permKey.json';
import { tableColumns } from './config';
import Filter from './components/Filter';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { useInitAndDestroyPage, usePageViewAnalytics, usePermission } from '@shared/hooks';
import PromoNewPage from '../New';
import PromoBulkPage from '../Bulk';
import { ROUTE } from '@app/routes';
import { getPromosRequestBody } from './utils';
import { PAGINATION_SETTINGS } from '@app/pages/Promo/constantValues';

const { Title } = Typography;

const PromoListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PROMO_LIST.name, squad: ROUTE.PROMO_LIST.squad });
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_CREATE);
  useInitAndDestroyPage({ dispatch, Creators });
  const { t } = useTranslation('promoPage');
  const [filters, setFilters] = useState({
    promoCode: null,
    discountReason: null,
    domainTypes: [],
    promoTarget: null,
    startDate: null,
    endDate: null,
    status: null,
  });

  const [pagination, setPagination] = useState({ currentPage: PAGINATION_SETTINGS.DEFAULT, rowsPerPage: PAGINATION_SETTINGS.ROWSPERPAGE });

  const promos = useSelector(getPromosSelector.getData);
  const total = useSelector(getPromosSelector.getTotal);
  const isPending = useSelector(getPromosSelector.getIsPending);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleSubmit = selectedFilters => {
    setFilters(selectedFilters);
  };

  const getPromosRequest = useCallback(() => {
    const { currentPage, rowsPerPage } = pagination;
    const requestParams = getPromosRequestBody({
      ...filters,
      currentPage,
      rowsPerPage,
    });
    dispatch(Creators.getPromosRequest(requestParams));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    getPromosRequest();
  }, [getPromosRequest, pagination.currentPage, pagination.rowsPerPage]);

  const pageTitle = t('PROMO_LIST.TITLE');

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3} id="page-header">{pageTitle}</Title>
        </Col>
        <Col>
          {canEdit && (
            <Row justify="space-between" gutter={[5, 5]}>
              <Col>
                <PromoBulkPage />
              </Col>
              <Col>
                <PromoNewPage />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
      <Row>
        <Col span={24}>
          <AntTableV2
            data={promos}
            columns={tableColumns(t)}
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

const reduxKey = REDUX_KEY.PROMO.LIST;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PromoListPage);
