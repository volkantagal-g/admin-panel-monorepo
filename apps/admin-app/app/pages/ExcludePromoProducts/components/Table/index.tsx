import { Col, Row } from 'antd';
import { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { tableColumns } from './config';
import { PaginationType, PromoList } from '../../interfaces';
import AntTableV2 from '@shared/components/UI/AntTableV2';

type TableProps = {
  filteredPromos: PromoList,
  isSearchPending: Boolean,
  total: number,
  onPaginationChange: (pagination: PaginationType) => void,
  onUnselectPromo: (e: ChangeEvent<HTMLInputElement>, promoId: string) => void,
  pagination: PaginationType,
  unselectedPromoIds: string[],
}

const Table: FC<TableProps> = ({ filteredPromos, isSearchPending, total, onPaginationChange, pagination, onUnselectPromo, unselectedPromoIds }) => {
  const { t } = useTranslation('excludePromoProducts');

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          columns={tableColumns(t, onUnselectPromo, unselectedPromoIds)}
          data={filteredPromos}
          loading={isSearchPending}
          total={total}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      </Col>
    </Row>
  );
};

export default Table;
