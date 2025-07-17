import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import { stateSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';
import { INDEX_BY_LIST } from '@app/pages/MarketIntelligencePriceIndex/constants';

const TableSummary = params => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const tableOverall = useSelector(stateSelector.tableOverall);
  const indexBy = useSelector(stateSelector.indexBy);
  const tableData = useSelector(stateSelector.tableData);

  const currentCompetitorList = params;

  const tempPriceIndex = tableOverall?.price_index !== undefined
    ? tableOverall.price_index.toFixed(1)
    : null;

  const tempCompetitorPriceIndex = tempCompetitor => {
    return tableOverall[`${tempCompetitor.toLowerCase()}_price_index`] !== undefined
      ? tableOverall[
        `${tempCompetitor.toLowerCase()
        }_price_index`
      ].toFixed(1)
      : null;
  };
  return (
    indexBy !== INDEX_BY_LIST.PRODUCT[0] && tableData && Object.keys(currentCompetitorList).length > 0 && Object.keys(tableOverall)?.length > 0 ? (
      <Table.Summary fixed="top">
        <Table.Summary.Row>
          <Table.Summary.Cell>
            <div className={classes.overallDiv}>
              {t('OVERALL')}
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={classes.highDiv}>
              {tableOverall.count}
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={classes.highDiv}>
              {tableOverall.matched}
              <span className={classes.labeledDiv}>
                {' '}
                {`(${(
                  (100 * tableOverall.matched) /
                  tableOverall.count
                ).toFixed(1)}%)`}
              </span>
            </div>
          </Table.Summary.Cell>
          {currentCompetitorList &&
            tableOverall.getir_price_index !== undefined
            ? (
              <Table.Summary.Cell>
                <div className={classes.highDiv}>
                  {tableOverall.getir_price_index.toFixed(1)}
                </div>
              </Table.Summary.Cell>
            ) : null}
          {currentCompetitorList && tableOverall
            ? currentCompetitorList.map(competitor => {
              const tempCompetitor = competitor.split('-')[0];
              return (
                <Table.Summary.Cell>
                  <div
                    key={tempCompetitor}
                    className={classes.highDiv}
                  >
                    {
                      currentCompetitorList.length > 1
                        ? tempCompetitorPriceIndex(tempCompetitor)
                        : tempPriceIndex
                    }
                  </div>
                </Table.Summary.Cell>
              );
            })
            : null}
        </Table.Summary.Row>
      </Table.Summary>
    ) : null
  );
};

export default TableSummary;
