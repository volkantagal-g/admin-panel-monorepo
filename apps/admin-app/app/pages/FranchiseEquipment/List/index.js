import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { useInitAndDestroyPage } from '@shared/hooks';
import { Filter, Table } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { franchiseEquipmentListSelector } from './redux/selector';
import { REDUX_KEY } from '@shared/shared/constants';

const FranchiseEquipmentListPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('franchiseEquipmentPage');

  useInitAndDestroyPage(({ dispatch, Creators }));
  const [filters, setFilters] = useState({
    selectedWarehouses: [],
    selectedFranchises: [],
    status: 'all',
  });

  const franchiseEquipmentList = {
    data: useSelector(franchiseEquipmentListSelector.getData),
    isPending: useSelector(franchiseEquipmentListSelector.getIsPending),
  };

  const handleSubmit = incomingFilters => {
    setFilters(incomingFilters);
  };

  const franchiseEquipmentListRequest = () => {
    const { selectedWarehouses, selectedFranchises, status } = filters;
    const requestParams = {
      selectedWarehouses,
      selectedFranchises,
    };

    if (status !== 'all') {
      requestParams.isArchived = status === 'archived';
    }

    if (!isEmpty(selectedFranchises) || !isEmpty(selectedWarehouses)) {
      dispatch(Creators.getFranchiseEquipmentListRequest(requestParams));
    }
  };

  useEffect(() => {
    franchiseEquipmentListRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('franchiseEquipmentPage:PAGE_TITLE')}
          />
        </Col>
        <Col>
          <Link to="/franchiseEquipment/new">
            <Button type="primary" icon={<PlusOutlined />}>
              {t('franchiseEquipmentPage:NEW_EQUIPMENT_AGREEMENT')}
            </Button>
          </Link>
        </Col>
      </Row>
      <Filter
        filters={filters}
        handleSubmit={handleSubmit}
        isPending={franchiseEquipmentList.isPending}
      />
      <Row>
        <Col span={24}>
          <Table
            isPending={franchiseEquipmentList.isPending}
            data={franchiseEquipmentList.data}
          />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.FRANCHISE_EQUIPMENT.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FranchiseEquipmentListPage);
