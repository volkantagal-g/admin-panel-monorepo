import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns, getInnerTableColumns } from './config';
import { getLangKey } from '@shared/i18n';

const innerTable = (record, t) => {
  return (
    <AntTableV2
      data={record.answers}
      columns={getInnerTableColumns({ t })}
      className="m-2"
    />
  );
};

const FeedbackTable = ({ pagination, onPaginationChange, data, isLoading, courierDetails }) => {
  const { t } = useTranslation(['global', 'courierFeedbackPage']);
  const langKey = getLangKey();

  return (
    <AntTableV2
      data={data.result}
      columns={getTableColumns({ t, langKey, courierDetails })}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      total={data.totalCount}
      expandable={{
        expandedRowRender: record => innerTable(record, t),
        rowExpandable: record => record.answers.length > 0,
      }}
      loading={isLoading}
    />
  );
};

export default FeedbackTable;
