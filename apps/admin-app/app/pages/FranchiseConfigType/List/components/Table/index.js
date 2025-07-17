import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const ConfigTypeListTable = ({ isPending, handlePaginationChange, data, pagination, total, deleteConfigType }) => {
  const { t } = useTranslation('franchiseConfigType');

  const { canAccess } = usePermission();
  const hasAccessToDetailPage = canAccess(permKey.PAGE_FRANCHISE_CONFIG_TYPE_DETAIL);
  const hasDeleteConfigTypeAccess = canAccess(permKey.PAGE_FRANCHISE_CONFIG_TYPE_LIST_COMPONENT_DELETE);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data}
          columns={getTableColumns(hasAccessToDetailPage, hasDeleteConfigTypeAccess, deleteConfigType)}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          totalBadge={{ total, label: t('LIST.CONFIG_TYPE_RECORDS') }}
        />
      </Col>
    </Row>
  );
};

export default ConfigTypeListTable;
