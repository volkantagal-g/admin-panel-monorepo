import { Col, Collapse, Row } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { t } from '@shared/i18n';

const { Panel } = Collapse;

const ReminderHistoryTable = ({ tableData, isPending }) => {
  return (
    <Row>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('franchiseLegalPage:DETAIL.HISTORY_TABLE_HEADER')} key="1">
            <AntTableV2
              data={tableData || []}
              columns={tableColumns()}
              loading={isPending}
            />
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default ReminderHistoryTable;
