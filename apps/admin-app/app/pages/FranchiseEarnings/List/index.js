import { useState, useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';
import { PageHeader, Col, Row } from 'antd';

import { t } from '@shared/i18n';
import { REDUX_KEY, TAX_TYPE } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Filter, Table } from './components';
import { getDefaultSelectedDateRange } from './utils';

const FranchiseEarningsPage = () => {
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_EARNINGS_LIST.name, squad: ROUTE.FRANCHISE_EARNINGS_LIST.squad });
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    selectedFranchises: [],
    selectedWarehouses: [],
    selectedTaxType: TAX_TYPE.EXCLUDED,
    selectedRequestTimeRange: getDefaultSelectedDateRange(),
  });

  const handleSelectedFranchise = franchise => {
    if (franchise) {
      setFilters(prevState => {
        return {
          ...prevState,
          selectedFranchises: [franchise],
        };
      });
    }
    else {
      setFilters(prevState => {
        return {
          ...prevState,
          selectedFranchises: [],
        };
      });
    }
  };

  const handleSelectedWarehouse = warehouses => {
    setFilters(prevState => {
      return {
        ...prevState,
        selectedWarehouses: warehouses,
      };
    });
  };

  const handleSelectedTaxType = e => {
    setFilters(prevState => {
      return {
        ...prevState,
        selectedTaxType: e.target.value,
      };
    });
  };

  const handleSelectedRequestTimeRange = timeRange => {
    setFilters(prevState => {
      return {
        ...prevState,
        selectedRequestTimeRange: timeRange,
      };
    });
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.FRANCHISE_EARNINGS.LIST.TITLE')}
          />
        </Col>
      </Row>
      <Filter
        filters={filters}
        handleSelectedFranchise={handleSelectedFranchise}
        handleSelectedWarehouse={handleSelectedWarehouse}
        handleSelectedTaxType={handleSelectedTaxType}
        handleSelectedRequestTimeRange={handleSelectedRequestTimeRange}
      />
      <Table filters={filters} />
    </>
  );
};

const reduxKey = REDUX_KEY.FRANCHISE_EARNINGS.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FranchiseEarningsPage);
