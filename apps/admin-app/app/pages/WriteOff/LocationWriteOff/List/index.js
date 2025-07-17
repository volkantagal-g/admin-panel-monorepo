import { compose } from 'redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import NewButton from '../../components/NewButton';
import permKey from '@shared/shared/permKey.json';
import reducer from './redux/reducer';
import sagas from './redux/sagas';
import Filter from './components/Filter';
import { locationWriteOffSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { getLocationWriteOffRequestParams } from './utils';

const { Title } = Typography;

const List = () => {
  const { t } = useTranslation('writeOffPage');
  const dispatch = useDispatch();
  const pageTitle = t('global:PAGE_TITLE.LOCATION_WRITE_OFF.LIST');

  const locationWriteOffs = useSelector(locationWriteOffSelector.getData);
  const isPending = useSelector(locationWriteOffSelector.getIsPending);
  const total = useSelector(locationWriteOffSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const [filters, setFilters] = useState({
    warehouses: [],
    locations: [],
    createdAt: undefined,
    approvedAt: undefined,
    reasons: [],
    statuses: [],
  });

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    const requestParams = getLocationWriteOffRequestParams({ ...filters, ...pagination });
    dispatch(Creators.filterLocationWriteOffRequest(requestParams));
  }, [filters, dispatch, pagination]);

  const handleSubmit = selectedFilters => {
    setFilters(selectedFilters);
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={3}>{pageTitle}</Title>
        <NewButton
          path={ROUTE.LOCATION_WRITE_OFF_NEW.path}
          permKey={permKey.PAGE_LOCATION_WRITE_OFF_NEW}
          label={t('global:PAGE_TITLE.LOCATION_WRITE_OFF.NEW')}
        />
      </Row>
      <Filter filters={filters} handleSubmit={handleSubmit} isPending={false} />
      <Row>
        <Col span={24}>
          <AntTableV2
            scroll={{ x: 'max-content' }}
            data={locationWriteOffs}
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

const reduxKey = REDUX_KEY.LOCATION_WRITE_OFF.LIST;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(List);
