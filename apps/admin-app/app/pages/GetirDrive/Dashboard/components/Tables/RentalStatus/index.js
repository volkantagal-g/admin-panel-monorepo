import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { numberFormat } from '@shared/utils/localization';

import { rentalStatusSelector } from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const RentalStatus = () => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(() => getColumns({ t, classes }), [classes, t]);

  const rentalStatus = useSelector(rentalStatusSelector.getData);
  const rentalStatusIsPending = useSelector(rentalStatusSelector.getIsPending);

  const tableData = [
    { key: t('getirDriveDashboardPage:COMPLETED'), value: rentalStatus?.completed },
    { key: t('getirDriveDashboardPage:CANCELED'), value: rentalStatus?.canceled },
  ];
  const total = (rentalStatus?.completed || 0) + (rentalStatus?.canceled || 0);
  const summaryRow = () => (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell
          index={0}
          className={classes.smallerPadding}
        >
          {t('TOTAL')}
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={1}
          align="right"
          className={classes.smallerPadding}
        >
          {numberFormat({ maxDecimal: 0 }).format(total)}
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
      loading={rentalStatusIsPending}
      headerClassName={classes.smallerPadding}
      summary={summaryRow}
      showFooter={false}
    />
  );
};

export default memo(RentalStatus);
