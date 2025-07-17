import { Col, Row, Tag } from 'antd';

import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getTableColumns } from './config';
import { TASK_STATUS } from '../../../constant';

const ActiveTasksTable = ({ isPending, handlePaginationChange, data, pagination, total, onChangeTable, tableName }) => {
  const { t } = useTranslation('courierGamificationPage');

  const { canAccess } = usePermission();
  const hasAccessToDetailPage = canAccess(
    permKey.PAGE_COURIER_GAMIFICATION_TASK_DETAIL,
  );
  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          title={(
            <Tag color={tableName === TASK_STATUS.ACTIVE ? 'green' : 'purple'}>
              {tableName === TASK_STATUS.ACTIVE ? t('LIST.ACTIVE_TASK_TABLE') : t('LIST.COMPLETED_TASK_TABLE')}
            </Tag>
          )}
          data={data}
          columns={getTableColumns(hasAccessToDetailPage)}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={total}
          onChange={onChangeTable}
        />
      </Col>
    </Row>
  );
};

export default ActiveTasksTable;
