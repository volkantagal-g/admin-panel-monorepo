import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Row, Col, Space } from 'antd';

import { orderBy } from 'lodash';
import moment from 'moment-timezone';

import useStyles from './styles';
import { generateColumns } from './config';
import { Creators } from '../../redux/actions';
import { slotDataSelector, mappedResultsSelector } from '../../redux/selectors';
import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';

const DataTable = ({ warehouseId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [t] = useTranslation('glReturnAlertPage');

  const isSlotPending = useSelector(slotDataSelector.getIsPending);
  const slotData = useSelector(slotDataSelector.getData);

  const dataTimeZone = useSelector(getSelectedCountryTimezone.getData);
  const filteredData = useSelector(mappedResultsSelector.getResults);

  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    if ((!isSlotPending)) {
      const arrangedData = slotData?.slotStatuses;
      dispatch(Creators.setMappedResults({ data: arrangedData }));
    }
  }, [dispatch, slotData, isSlotPending]);

  useEffect(() => {
    const handleCourierReassign = id => {
      dispatch(Creators.getCourierReassignDataRequest({ id, warehouseId }));
    };

    if (!isSlotPending) {
      const arrangedTotal = filteredData;
      setTableColumns(generateColumns({ dataTimeZone, arrangedTotal, t, handleCourierReassign }));
    }
  }, [filteredData, isSlotPending, dataTimeZone, t, dispatch, warehouseId]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <Table
            dataSource={orderBy(filteredData, data => moment.tz(data.checkoutDate, dataTimeZone).unix(), ['desc'])}
            columns={tableColumns}
            className={classes.tableWrapper}
            rowKey="id"
            loading={isSlotPending}
            scroll={{ x: 'max-content' }}
            sortDirections={['descend', 'ascend']}
            size="small"
            pagination={{
              total: filteredData?.length,
              defaultPageSize: 100,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />;
        </Space>
      </Col>
    </Row>
  );
};

export default DataTable;
