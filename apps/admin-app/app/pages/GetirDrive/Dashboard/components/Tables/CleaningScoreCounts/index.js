import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { forEach as _forEach, toNumber as _toNumber, map as _map } from 'lodash';
import { Table } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { numberFormat } from '@shared/utils/localization';
import { cleaningScoreCountsSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const CleaningScoreCounts = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const cleaningScoreCounts = useSelector(cleaningScoreCountsSelector.getData);
  const cleaningScoreCountsIsPending = useSelector(cleaningScoreCountsSelector.getIsPending);

  let totalCleaningScore = 0;
  let totalClient = 0;
  let weightedAverageScore = 0;
  _forEach(cleaningScoreCounts, (clientCount, rateAsText) => {
    const rateAsNumber = _toNumber(rateAsText);
    totalCleaningScore += rateAsNumber * clientCount;
    totalClient += clientCount;
    weightedAverageScore = totalCleaningScore / totalClient;
  });
  const tableData = _map(cleaningScoreCounts, (clientCount, rateAsText) => ({
    key: rateAsText,
    value: clientCount,
    pct: (clientCount / totalClient) * 100,
  }));
  const summaryRow = () => (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell
          index={0}
          className={classes.smallerPadding}
        >
          {numberFormat({ minDecimal: 2, maxDecimal: 2 }).format(weightedAverageScore)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      className={classes.table}
      containerClassName={parentClasses.antTableContainer}
      loading={cleaningScoreCountsIsPending}
      headerClassName={classes.smallerPadding}
      summary={summaryRow}
      showFooter={false}
    />
  );
};

export default memo(CleaningScoreCounts);
