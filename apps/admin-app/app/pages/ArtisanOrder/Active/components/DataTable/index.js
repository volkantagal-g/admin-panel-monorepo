import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row, Col, Space } from 'antd';
import _ from 'lodash';
import moment from 'moment-timezone';

import useStyles from './styles';
import { generateColumns } from './config';
import { Creators } from '../../redux/actions';
import { activesSelector, paymentMethodsSelector, mappedResultsSelector, merchantTypesSelector } from '../../redux/selectors';
import { getCitiesSelector, getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { mapResults, mapTotals } from './utils';

const DataTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isActivesPending = useSelector(activesSelector.getActivesIsPending);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isPaymentMethodsPending = useSelector(paymentMethodsSelector.getPaymentMethodsIsPending);
  const isMerchantTypesPending = useSelector(merchantTypesSelector.getMerchantTypesIsPending);

  const isPending = isActivesPending || isCitiesPending || isPaymentMethodsPending || isMerchantTypesPending;

  const activeOrders = useSelector(activesSelector.getActives);
  const cities = useSelector(getCitiesSelector.getData);
  const dataTimeZone = useSelector(getSelectedCountryTimezone.getData);
  const filteredData = useSelector(mappedResultsSelector.getResults);

  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    if (!isActivesPending) {
      const arrangedData = mapResults(activeOrders);
      dispatch(Creators.setMappedResults({ data: arrangedData }));
    }
  }, [dispatch, activeOrders, isActivesPending]);

  useEffect(() => {
    if (!isPending) {
      const arrangedTotal = mapTotals(filteredData);
      setTableColumns(generateColumns({ cities, dataTimeZone, arrangedTotal }));
    }
  }, [filteredData, isPending, cities, dataTimeZone]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <Table
            dataSource={_.orderBy(filteredData, data => moment.tz(data.checkoutDate, dataTimeZone).unix(), ['desc'])}
            columns={tableColumns}
            rowKey="_id"
            loading={isPending}
            scroll={{ x: 'max-content' }}
            className={classes.tableWrapper}
            sortDirections={['descend', 'ascend']}
            size="small"
            pagination={{
              total: filteredData.length,
              defaultPageSize: 100,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default DataTable;
