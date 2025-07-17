import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import AntTable from '@shared/components/UI/AntTableV2';

import { getWarehousesSelector } from '@shared/redux/selectors/common';

import { generateColumns } from './config';
import useStyles from './styles';

import { Creators } from '../../redux/actions';
import { couriersSelector, mappedWarehousesSelector } from '../../redux/selectors';

const minLastStatusMinute = 120;

const DataTable = () => {
  const { t } = useTranslation('getirWater');
  const dispatch = useDispatch();
  const classes = useStyles();

  const [couriersList, setCouriersList] = useState([]);

  const couriers = useSelector(couriersSelector.getData);
  const mappedWarehouses = useSelector(mappedWarehousesSelector.getData);
  const warehouses = useSelector(getWarehousesSelector.getData);

  const isCouriersPending = useSelector(couriersSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.getCouriersRequest());
  }, [dispatch]);

  useEffect(() => {
    if (warehouses.length) {
      dispatch(Creators.setMappedWarehousesSuccess({ mappedWarehouses: warehouses }));
    }
  }, [dispatch, warehouses]);

  useEffect(() => {
    const nowDate = moment();

    const filterCouriers = couriers?.filter(courier => {
      const lastStatusDate = moment(courier.statusLastChangedAt);
      const diff = nowDate.diff(lastStatusDate, 'minutes');

      return diff <= minLastStatusMinute;
    });

    setCouriersList(filterCouriers);
  }, [couriers]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <AntTable
            dataSource={couriersList}
            columns={generateColumns(mappedWarehouses, t)}
            rowKey="_id"
            scroll={{ x: 'max-content' }}
            className={classes.tableWrapper}
            sortDirections={['descend', 'ascend']}
            size="small"
            pagination={{ currentPage: 1, rowsPerPage: 10 }}
            loading={isCouriersPending}
          />
        </Space>
      </Col>
    </Row>
  );
};

export default DataTable;
