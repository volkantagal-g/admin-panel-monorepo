import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const DtsRecordsTable = ({ isPending, handlePaginationChange, data, pagination, total, onChangeTable, sortedInfo }) => {
  const { t } = useTranslation('dts');

  const { canAccess } = usePermission();
  const hasAccessToDetailPage = canAccess(permKey.PAGE_DTS_DETAIL);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          columns={getTableColumns(hasAccessToDetailPage, sortedInfo)}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          totalBadge={{ total, label: t('DTS_RECORDS') }}
          onChange={onChangeTable}
        />
      </Col>
    </Row>
  );
};

export default DtsRecordsTable;
