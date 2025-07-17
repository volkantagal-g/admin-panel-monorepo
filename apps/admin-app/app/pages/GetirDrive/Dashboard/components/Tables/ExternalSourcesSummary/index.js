import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table, Typography } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import {
  GETIR_DRIVE_EXTERNAL_SOURCE,
  GETIR_DRIVE_EXTERNAL_SOURCE_GETIR,
  GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI,
  GETIR_DRIVE_EXTERNAL_SOURCE_MOOV,
} from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';

import {
  externalSourcesSummaryCurrentSelector,
  externalSourcesSummaryPreviousSelector,
} from '../../../redux/selectors';
import { getColumns } from './config';
import useStyles from '../generalStyles';
import useParentStyles from '../styles';

const { Text } = Typography;

const ExternalSourcesSummary = ({ dateRangeDayCount }) => {
  const { t } = useTranslation('getirDriveDashboardPage');
  const classes = useStyles();
  const parentClasses = useParentStyles();
  const columns = useMemo(
    () => getColumns({ t, classes, parentClasses, dateRangeDayCount }),
    [dateRangeDayCount, classes, parentClasses, t],
  );

  const externalSourcesSummaryCurrent = useSelector(externalSourcesSummaryCurrentSelector.getData);
  const externalSourcesSummaryCurrentIsPending = useSelector(externalSourcesSummaryCurrentSelector.getIsPending);
  const externalSourcesSummaryPrevious = useSelector(externalSourcesSummaryPreviousSelector.getData);
  const externalSourcesSummaryPreviousIsPending = useSelector(externalSourcesSummaryPreviousSelector.getIsPending);

  const totalRentalCountCurrent = (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.rental_count || 0) +
    (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.rental_count || 0) +
    (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.rental_count || 0);
  const totalRentalCountPrevious = (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.rental_count || 0) +
    (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.rental_count || 0) +
    (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.rental_count || 0);
  const totalRentalCountGrw = ((totalRentalCountCurrent - totalRentalCountPrevious) / totalRentalCountPrevious) * 100;
  const totalNetRevenueTaxExcludedCurrent = (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.net_revenue_tax_excluded || 0) +
    (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.net_revenue_tax_excluded || 0) +
    (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.net_revenue_tax_excluded || 0);
  const totalNetRevenueTaxExcludedPrevious = (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.net_revenue_tax_excluded || 0) +
    (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.net_revenue_tax_excluded || 0) +
    (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.net_revenue_tax_excluded || 0);
  const totalNetRevenueTaxExcludedGrw = ((totalNetRevenueTaxExcludedCurrent - totalNetRevenueTaxExcludedPrevious) / totalNetRevenueTaxExcludedPrevious) * 100;

  const tableData = [
    {
      key: GETIR_DRIVE_EXTERNAL_SOURCE.MOOV,
      rentalCount: externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.rental_count || 0,
      rentalCountAvg: (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.rental_count || 0) / dateRangeDayCount,
      rentalCountGrw: (
        (
          (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.rental_count || 0) -
          (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.rental_count || 0)
        ) /
        (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.rental_count || 0)
      ) * 100,
      netRevenueTaxExcluded: externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.net_revenue_tax_excluded || 0,
      netRevenueTaxExcludedAvg: (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.net_revenue_tax_excluded || 0) / dateRangeDayCount,
      netRevenueTaxExcludedGrw: (
        (
          (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.net_revenue_tax_excluded || 0) -
          (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.net_revenue_tax_excluded || 0)
        ) /
        (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]?.net_revenue_tax_excluded || 0)
      ) * 100,
    },
    {
      key: GETIR_DRIVE_EXTERNAL_SOURCE.GETIR,
      rentalCount: externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.rental_count || 0,
      rentalCountAvg: (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.rental_count || 0) / dateRangeDayCount,
      rentalCountGrw: (
        (
          (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.rental_count || 0) -
          (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.rental_count || 0)
        ) /
        (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.rental_count || 0)
      ) * 100,
      netRevenueTaxExcluded: externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.net_revenue_tax_excluded || 0,
      netRevenueTaxExcludedAvg: (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.net_revenue_tax_excluded || 0) / dateRangeDayCount,
      netRevenueTaxExcludedGrw: (
        (
          (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.net_revenue_tax_excluded || 0) -
          (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.net_revenue_tax_excluded || 0)
        ) /
        (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]?.net_revenue_tax_excluded || 0)
      ) * 100,
    },
    {
      key: GETIR_DRIVE_EXTERNAL_SOURCE.BITAKSI,
      rentalCount: externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.rental_count || 0,
      rentalCountAvg: (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.rental_count || 0) / dateRangeDayCount,
      rentalCountGrw: (
        (
          (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.rental_count || 0) -
          (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.rental_count || 0)
        ) /
        (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.rental_count || 0)
      ) * 100,
      netRevenueTaxExcluded: externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.net_revenue_tax_excluded || 0,
      netRevenueTaxExcludedAvg: (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.net_revenue_tax_excluded || 0) / dateRangeDayCount,
      netRevenueTaxExcludedGrw: (
        (
          (externalSourcesSummaryCurrent?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.net_revenue_tax_excluded || 0) -
          (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.net_revenue_tax_excluded || 0)
        ) /
        (externalSourcesSummaryPrevious?.[GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]?.net_revenue_tax_excluded || 0)
      ) * 100,
    },
  ];

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
          {numberFormat({ maxDecimal: 0 }).format(totalRentalCountCurrent)}
        </Table.Summary.Cell>
        {
          dateRangeDayCount > 1 ?
            (
              <Table.Summary.Cell
                index={2}
                align="right"
                className={classes.smallerPadding}
              >
                {numberFormat({ maxDecimal: 0 }).format(totalRentalCountCurrent / dateRangeDayCount)}
              </Table.Summary.Cell>
            ) :
            null
        }

        <Table.Summary.Cell
          index={3}
          align="right"
          className={classes.smallerPadding}
        >
          <Text className={totalRentalCountGrw < 0 ? parentClasses.textDanger : parentClasses.textSuccess}>
            {numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(totalRentalCountGrw || 0)}
          </Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={4}
          align="right"
          className={classes.smallerPadding}
        >
          {numberFormat({ maxDecimal: 0 }).format(totalNetRevenueTaxExcludedCurrent)}
        </Table.Summary.Cell>
        {
          dateRangeDayCount > 1 ?
            (
              <Table.Summary.Cell
                index={5}
                align="right"
                className={classes.smallerPadding}
              >
                {numberFormat({ maxDecimal: 0 }).format(totalNetRevenueTaxExcludedCurrent / dateRangeDayCount)}
              </Table.Summary.Cell>
            ) :
            null
        }

        <Table.Summary.Cell
          index={6}
          align="right"
          className={classes.smallerPadding}
        >
          <Text className={totalNetRevenueTaxExcludedGrw < 0 ? parentClasses.textDanger : parentClasses.textSuccess}>
            {numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(totalNetRevenueTaxExcludedGrw || 0)}
          </Text>
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
      loading={
        externalSourcesSummaryCurrentIsPending || externalSourcesSummaryPreviousIsPending
      }
      headerClassName={classes.smallerPadding}
      summary={summaryRow}
      showFooter={false}
    />
  );
};

export default memo(ExternalSourcesSummary);
