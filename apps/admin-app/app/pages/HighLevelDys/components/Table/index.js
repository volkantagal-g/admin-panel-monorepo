import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';
import { getFormattedData } from '../../utils';
import useStyles from './styles';

const DtsRecordsTable = ({ isPending, handlePaginationChange, data, pagination, total, handleDownloadCsv, selectedPerformanceSystem }) => {
  const classes = useStyles();
  const { t } = useTranslation('highLevelDys');
  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={getFormattedData(data, selectedPerformanceSystem)}
          columns={getTableColumns(data, classes, selectedPerformanceSystem)}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          onExport={handleDownloadCsv}
          total={total}
          totalBadge={{ total, label: t('HIGH_LEVEL_RECORDS') }}
        />
      </Col>
    </Row>
  );
};

export default DtsRecordsTable;
