import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const DynamicRecordsTable = ({
  isPending,
  handlePaginationChange,
  data,
  pagination,
  total,
  onChangeTable,
  tableColumns,
  configType,
  sortedInfo,
}) => {
  const { t } = useTranslation('franchiseDynamicConfig');
  const { canAccess } = usePermission();

  const [columns, setColumns] = useState([]);
  const hasAccessToDetailPage = canAccess(permKey.PAGE_FRANCHISE_CONFIG_TYPE_DETAIL);

  useEffect(() => {
    if (!isPending) {
      const configuredTableColumns = getTableColumns(tableColumns, configType, sortedInfo, hasAccessToDetailPage);
      setColumns(configuredTableColumns);
    }
  }, [tableColumns, configType, sortedInfo, isPending, hasAccessToDetailPage]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          columns={columns}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          totalBadge={{ total, label: t('LIST.CONFIG_RECORDS') }}
          onChange={onChangeTable}
        />
      </Col>
    </Row>
  );
};

export default DynamicRecordsTable;
