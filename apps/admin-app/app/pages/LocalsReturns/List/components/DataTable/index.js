import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row, Col, Space } from 'antd';

import useStyles from './styles';
import { generateColumns } from './config';
import {
  returnsSelector,
  filtersSelector,
  returnDetailSelector,
} from '../../redux/selectors';
import ReturnDetailModal from '../ReturnDetailModal';
import { Creators } from '../../redux/actions';
import { SORT_OPTIONS } from '../../constants';
import { t } from '@shared/i18n';
import { usePermission } from '@shared/hooks';

const DataTable = () => {
  const classes = useStyles();
  const [isModalVisible, setModalVisibility] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();

  const { Can } = usePermission();

  const getReturns = useSelector(returnsSelector.getReturns);
  const getReturnsPending = useSelector(returnsSelector.getReturnsPending);
  const getReturnsCount = useSelector(returnsSelector.getReturnsCount);
  const getFilters = useSelector(filtersSelector.getFilters);
  const getReturnDetailError = useSelector(
    returnDetailSelector.getReturnDetailError,
  );
  const openModalAndGetId = id => {
    setModalVisibility(true);
    setSelectedId(id);
  };

  useEffect(() => {
    if (getReturnDetailError) {
      setModalVisibility(false);
      setSelectedId('');
    }
  }, [getReturnDetailError]);

  useEffect(() => {
    dispatch(Creators.setFilter({ key: 'sort', value: SORT_OPTIONS.selectedSlotDate_descend }));
  }, [dispatch]);

  const handleChange = (pagination, filters, sorter) => {
    const page = pagination.current;

    dispatch(Creators.setFilter({ key: 'page', value: page }));

    if (sorter?.field) {
      const sortOption = SORT_OPTIONS[`${sorter.field}_${sorter.order}`];
      dispatch(Creators.setFilter({ key: 'sort', value: sortOption }));
    }

    dispatch(Creators.getReturnRequest());
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <Table
            dataSource={getReturns}
            columns={generateColumns({ openModalAndGetId, t, Can })}
            loading={getReturnsPending}
            scroll={{ x: 'max-content' }}
            className={classes.tableWrapper}
            size="small"
            sortDirections={['descend', 'ascend']}
            onChange={handleChange}
            pagination={{
              current: getFilters.page,
              total: getReturnsCount,
              defaultPageSize: 30,
              showSizeChanger: false,
              showQuickJumper: false,
            }}
          />
        </Space>
      </Col>
      {selectedId && (
        <ReturnDetailModal
          isModalVisible={isModalVisible}
          returnId={selectedId}
          setModalVisibility={setModalVisibility}
        />
      )}
    </Row>
  );
};

export default DataTable;
