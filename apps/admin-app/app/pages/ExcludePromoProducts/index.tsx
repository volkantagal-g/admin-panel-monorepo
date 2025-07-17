import { Button, Col, Row, Select, Typography } from 'antd';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getUser } from '@shared/redux/selectors/auth';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import {
  EXCLUDE_PROMO_PRODUCTS_ACTIONS,
  PAGINATION_SETTINGS,
  PromoUsageType,
} from '../Promo/constantValues';
import CsvUpload from './components/CsvUpload/index';
import Filters from './components/Filters/index';
import Table from './components/Table/index';
import { IFilters, IFiltersWithPagination, PaginationType, ProductItem, PromoList } from './interfaces';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/sagas';
import { excludePromoProductsSelector, getPromosByFiltersSelector, getResponsibleDepartmentsSelector } from './redux/selectors';

const reduxKey = REDUX_KEY.EXCLUDE_PROMO_PRODUCTS;
const { Title } = Typography;

const ExcludePromoProducts: FC = () => {
  const { t } = useTranslation('excludePromoProducts');
  const dispatch = useDispatch();
  const isSearchPending = useSelector(getPromosByFiltersSelector.getIsPending);
  const isExcludePromoProductsPending = useSelector(excludePromoProductsSelector.getIsPending);
  const responsibleDepartments = useSelector(getResponsibleDepartmentsSelector.getData);
  const getFilteredPromos = useSelector(getPromosByFiltersSelector.getData) as PromoList;

  const [productIds, setProductIds] = useState<string[]>([]);
  const [unselectedPromoIds, setUnselectedPromoIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<IFilters>({} as IFilters);
  const [action, setAction] = useState(EXCLUDE_PROMO_PRODUCTS_ACTIONS.EXCLUDE.toString());
  const [resetForm, setResetForm] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: PAGINATION_SETTINGS.DEFAULT, rowsPerPage: PAGINATION_SETTINGS.ROWSPERPAGE });

  usePageViewAnalytics({
    name: ROUTE.EXCLUDE_PROMO_PRODUCTS.name,
    squad: ROUTE.EXCLUDE_PROMO_PRODUCTS.squad,
  });

  useInitAndDestroyPage({ dispatch, Creators });

  const getActionTypeOptions = useMemo(() => {
    return Object.entries(EXCLUDE_PROMO_PRODUCTS_ACTIONS).map(([, value]) => {
      return {
        value: value.toString(),
        label: t(`EXCLUDE_PRODUCT_ACTIONS.${value}`),
      };
    });
  }, [t]);

  const handleProductsImport = ({ data }: { data: ProductItem[] }) => {
    if (!data.length) {
      return dispatch(ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }));
    }
    let isInvalidCSV = false;
    const importedProductIds = data.map(codes => {
      if (!codes.item) {
        isInvalidCSV = true;
      }
      return codes.item.trim();
    });
    if (isInvalidCSV) {
      return dispatch(ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }));
    }
    setProductIds(importedProductIds);
    return null;
  };

  const handleSearch = (filterValues: IFilters) => {
    const { domainTypes, status, promoMechanic } = filterValues;
    if (!domainTypes?.length || !status || !promoMechanic) return;

    const body: IFiltersWithPagination = {
      ...filterValues,
      promoUsageType: PromoUsageType.GENERAL,
      limit: pagination.rowsPerPage,
      page: pagination.currentPage - 1,
    };
    dispatch(Creators.getPromosByFiltersRequest(body));
  };

  const resetting = () => {
    setResetForm(true);
    setProductIds([]);
    setAction(EXCLUDE_PROMO_PRODUCTS_ACTIONS.EXCLUDE.toString());
    return dispatch(Creators.setFilteredPromosSuccess());
  };

  const handleSubmit = () => {
    if (!productIds.length) {
      return dispatch(ToastCreators.error({ message: t('ERR_EMPTY_PRODUCT_IDS') }));
    }
    if (!getFilteredPromos.length) {
      return dispatch(ToastCreators.error({ message: t('ERR_EMPTY_PROMOS') }));
    }
    const body = {
      productIds,
      excludedPromoIds: unselectedPromoIds,
      filters: {
        ...filters,
        action: +action,
      },
      notificationEmail: getUser()?.email,
    };
    let message = t('SUCCESS_MESSAGE_EXCLUDED');
    if (action === EXCLUDE_PROMO_PRODUCTS_ACTIONS.INCLUDE.toString()) {
      message = t('SUCCESS_MESSAGE_INCLUDED');
    }
    else if (action === EXCLUDE_PROMO_PRODUCTS_ACTIONS.OVERRIDE.toString()) {
      message = t('SUCCESS_MESSAGE_OVERRIDE');
    }
    message = message.replace('{PRODUCTS_COUNT}', `${productIds.length}`);
    dispatch(Creators.excludePromoProductsRequest({ body, message }));
    return resetting();
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }: PaginationType) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleUnselectPromo = (e: ChangeEvent<HTMLInputElement>, promoId: string) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      setUnselectedPromoIds(promoIds => {
        return [
          ...promoIds,
          promoId,
        ];
      });
    }
    else {
      const filteredPromoIds = unselectedPromoIds.filter(unselectedPromoId => unselectedPromoId !== promoId);
      setUnselectedPromoIds(filteredPromoIds);
    }
  };

  const handleFiltersChange = (filterValues: IFilters) => {
    setFilters(filterValues);
  };

  useEffect(() => {
    dispatch(Creators.getResponsibleDepartmentsRequest());
  }, [dispatch]);

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>{t('TITLE')}</Title>
        </Col>
      </Row>
      <Row justify="space-between" align="middle" className="mb-1" style={{ justifyContent: 'flex-start' }}>
        <Col>
          <CsvUpload
            onProductsImport={handleProductsImport}
          />
        </Col>
      </Row>
      {productIds.length ? (
        <Row className="alert alert-success" role="alert">
          <b>{t('SUCCESS_PRODUCTS_IMPORT').replace('{productsCount}', productIds.length.toString())}</b>
        </Row>
      ) : null}
      <Filters
        onSearch={handleSearch}
        isSearchPending={isSearchPending}
        responsibleDepartments={responsibleDepartments}
        pagination={pagination}
        onFiltersChange={handleFiltersChange}
        resetForm={resetForm}
        setResetForm={setResetForm}
      />
      <Table
        filteredPromos={getFilteredPromos}
        isSearchPending={isSearchPending}
        onPaginationChange={handlePaginationChange}
        onUnselectPromo={handleUnselectPromo}
        total={100000}
        pagination={pagination}
        unselectedPromoIds={unselectedPromoIds}
      />
      <Row justify="end" align="middle">
        <Col xs={24} sm={24} md={8}>
          <Select
            placeholder={t('STATUS')}
            className="w-100"
            labelInValue
            options={getActionTypeOptions}
            onChange={val => setAction(val.value)}
            value={action}
            allowClear
            showSearch
          />
        </Col>
        <Col>
          <Button
            size="middle"
            type="primary"
            disabled={isExcludePromoProductsPending || isSearchPending}
            onClick={handleSubmit}
          > {t('RUN_SCRIPT')}
          </Button>
        </Col>
      </Row>
    </>
  );
};

const withReducer = injectReducer({ key: reduxKey, reducer });
const withSaga = injectSaga({ key: reduxKey, saga });
export default compose(withReducer, withSaga)(ExcludePromoProducts);
