import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Row, Col, Space } from 'antd';
import { orderBy } from 'lodash';
import moment from 'moment-timezone';

import useStyles from './styles';
import { generateColumns } from './config';
import { Creators } from '../../redux/actions';
import { alertDataSelector, mappedResultsSelector } from '../../redux/selectors';
import { getCitiesSelector, getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { mapResults } from './utils';

const DataTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [t] = useTranslation('glReturnAlertPage');

  const isAlertPending = useSelector(alertDataSelector.getIsPending);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);

  const isPending = isCitiesPending || isAlertPending;

  const { alert } = useSelector(alertDataSelector.getData);
  const cities = useSelector(getCitiesSelector.getData);
  const dataTimeZone = useSelector(getSelectedCountryTimezone.getData);
  const filteredData = useSelector(mappedResultsSelector.getResults);

  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    if (!isAlertPending) {
      let arrangedData = [];
      if (alert) {
        arrangedData = mapResults(alert);
      }
      dispatch(Creators.setMappedResults({ data: arrangedData }));
    }
  }, [dispatch, alert, isAlertPending]);

  useEffect(() => {
    const resolveAlert = id => {
      dispatch(Creators.getAlertResolveDataRequest({ id }));
    };

    if (!isPending) {
      setTableColumns(generateColumns({ cities, dataTimeZone, t, resolveAlert }));
    }
  }, [filteredData, isPending, cities, dataTimeZone, t, dispatch]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <Table
            dataSource={orderBy(filteredData, data => moment.tz(data.createdAt, dataTimeZone).unix(), ['desc'])}
            columns={tableColumns}
            className={classes.tableWrapper}
            rowKey="id"
            loading={isPending}
            scroll={{ x: 'max-content' }}
            sortDirections={['descend', 'ascend']}
            size="small"
            pagination={{
              total: filteredData.length,
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
