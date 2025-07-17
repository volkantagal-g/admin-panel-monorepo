import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import useWindowSize from '@shared/shared/hooks/useWindowSize';
import { activeOrdersSelector, filterSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { generateColumns } from './config';
import Footer from './Footer';

const DataTable = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { t } = useTranslation('waterOrderActivePage');
  const classes = useStyles();
  const { Can } = usePermission();
  const filters = useSelector(filterSelector.getFilters);
  const activeOrders = useSelector(activeOrdersSelector.getActiveOrders);
  const totalOrders = useSelector(activeOrdersSelector.getTotalOrders);
  const activeOrdersPending = useSelector(
    activeOrdersSelector.getActiveOrdersIsPending,
  );
  const dataTimeZone = useSelector(getSelectedCountryTimezone.getData);

  const [pagination, setPagination] = useState({
    current: filters.page + 1,
    pageSize: filters.size,
    total: totalOrders,
    size: 'small',
    showSizeChanger: true,
  });

  const customizedData = useMemo(() => {
    const startNumber = (pagination.current - 1) * pagination.pageSize + 1;

    return activeOrders.map((item, index) => {
      return {
        ...item,
        orderNumber: startNumber + index,
      };
    });
  }, [activeOrders, pagination]);

  useEffect(() => {
    setPagination(p => ({
      ...p,
      total: totalOrders,
    }));
  }, [totalOrders]);

  const tableColumns = useMemo(
    () => generateColumns(dataTimeZone, customizedData, Can, t, width),
    [dataTimeZone, Can, t, width, customizedData],
  );

  const handlePaginationChange = useCallback(({ current, pageSize }) => {
    setPagination({ ...pagination, current, pageSize });

    dispatch(
      Creators.getActiveOrdersRequest({
        data: {
          ...filters,
          page: current - 1,
          size: pageSize,
        },
      }),
    );
  }, [dispatch, filters, pagination]);

  const customFooter = useMemo(() => {
    return (
      <Footer
        total={totalOrders}
        currentPage={pagination.current}
        rowsPerPage={pagination.pageSize}
        pageSizeOptions={[10, 25, 50, 100]}
        onPaginationChange={handlePaginationChange}
        resetAfterLimitChange
        isScrollableToTop
      />
    );
  }, [handlePaginationChange, pagination, totalOrders]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space direction="vertical" className={classes.filterWrapper}>
          <AntTableV2
            footer={customFooter}
            dataSource={customizedData}
            columns={tableColumns}
            scroll={{ x: 'max-content' }}
            className={classes.tableWrapper}
            pagination={{ currentPage: pagination.current, rowsPerPage: pagination.pageSize }}
            size="small"
            loading={activeOrdersPending}
            rowKey="orderId"
          />
        </Space>
      </Col>
    </Row>
  );
};

export default DataTable;
