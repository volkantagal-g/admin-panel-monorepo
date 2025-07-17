import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Col, Empty, Row, Skeleton, Table, TableProps } from 'antd';

import { getParentsTableColumns, CheckAllBox, PromoCodeHeader } from '@app/pages/Promo/Detail/components/ParentPromos/config';
import { ParentPromo } from '@app/pages/Promo/types';
import { ParentPromosSlice } from '@app/pages/Promo/Detail/components/ParentPromos/slice';
import { selectFilteredPromos } from '@app/pages/Promo/Detail/components/ParentPromos/selectors';

export function ParentPromosTable() {
  const { t } = useTranslation('promoPage');
  const dispatch = useDispatch();

  const loading = useSelector(ParentPromosSlice.selectors.isTableLoading);
  const parents = useSelector(ParentPromosSlice.selectors.parents);
  const selectedRowKeys = useSelector(ParentPromosSlice.selectors.selected);
  const tableParams = useSelector(ParentPromosSlice.selectors.getTableParams);
  const { length: total } = useSelector(selectFilteredPromos);

  const handleChange: TableProps<ParentPromo>['onChange'] = pagination => {
    dispatch(ParentPromosSlice.actions.changeTable({
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  const handleRowSelection: TableProps<ParentPromo>['rowSelection'] = {
    selectedRowKeys,
    onChange: keys => dispatch(ParentPromosSlice.actions.setSelected(keys as string[])),
  };

  if (loading && !parents) {
    return <Skeleton loading />;
  }

  if (!parents) {
    return <Empty />;
  }

  return (
    <Row gutter={[16, 16]} className="mw-100">
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
          columns={getParentsTableColumns(t)}
          dataSource={parents}
          loading={loading}
          onChange={handleChange}
          rowSelection={handleRowSelection}
          pagination={{
            ...tableParams,
            total,
          }}
          scroll={{ x: 720 }}
        />
      </Col>
    </Row>

  );
}
