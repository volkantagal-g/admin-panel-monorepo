import { useDispatch, useSelector } from 'react-redux';

import { Col, Empty, Row, Skeleton, Table, TableProps } from 'antd';

import { CheckAllBox, PromoCodeHeader, useChildrenTableColumns } from './config';
import { ChildPromo } from '@app/pages/Promo/types';
import { ChildrenPromosSlice } from '@app/pages/Promo/Detail/components/ChildPromos/slice';
import { selectFilteredPromos } from '@app/pages/Promo/Detail/components/ChildPromos/selectors';

export function ChildrenPromosTable() {
  const dispatch = useDispatch();

  const loading = useSelector(ChildrenPromosSlice.selectors.isTableLoading);
  const childPromos = useSelector(ChildrenPromosSlice.selectors.children);
  const selectedRowKeys = useSelector(ChildrenPromosSlice.selectors.selected);
  const tableParams = useSelector(ChildrenPromosSlice.selectors.getTableParams);
  const columns = useChildrenTableColumns();
  const { length: total } = useSelector(selectFilteredPromos);

  const handleChange: TableProps<ChildPromo>['onChange'] = (pagination, filters) => {
    dispatch(ChildrenPromosSlice.actions.changeTable({
      filters,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  const handleRowSelection: TableProps<ChildPromo>['rowSelection'] = {
    selectedRowKeys,
    onChange: keys => dispatch(ChildrenPromosSlice.actions.setSelected(keys as string[])),
  };

  if (loading && !childPromos) {
    return <Skeleton loading />;
  }

  if (!childPromos) {
    return <Empty />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]} align="bottom">
          <Col>
            <CheckAllBox />
          </Col>
          <Col>
            <PromoCodeHeader />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={childPromos}
          loading={loading}
          onChange={handleChange}
          rowSelection={handleRowSelection}
          pagination={{
            ...tableParams,
            total,
          }}
          scroll={{ x: 670 }}
        />
      </Col>
    </Row>
  );
}
