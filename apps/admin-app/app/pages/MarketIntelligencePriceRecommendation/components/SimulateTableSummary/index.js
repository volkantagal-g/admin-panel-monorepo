import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from '../../styles';

const SimulateTableSummary = (currentCompetitorList, simulateData) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const { overall, result } = simulateData;
  const currentList = currentCompetitorList;

  const tempPriceIndex = overall?.price_index !== undefined
    ? overall?.price_index?.toFixed(1)
    : null;

  const tempCompetitorPriceIndex = tempCompetitor => {
    return overall[`${tempCompetitor?.toLowerCase()}_price_index`] !== undefined
      ? overall[
        `${tempCompetitor?.toLowerCase()
        }_price_index`
      ]?.toFixed(1)
      : null;
  };
  return result &&
    result?.length > 0 &&
    Object.keys(currentList)?.length > 0 &&
    overall &&
    Object.keys(overall)?.length > 0 ? (
      <Table.Summary fixed="top">
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>
            <div className={classes.overallDiv}>{t('OVERALL')}</div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={classes.highDiv}>
              {overall?.total_count}
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={`${classes.highDiv} ${classes.matchesContainer}`}>
              <div className={classes.matchesText}>
                {overall?.count}
              </div>
              <div className={classes.labeledDiv}>
                {' '}
                {`(%${overall?.count && overall?.total_count && (
                  (100 * overall.count) /
                overall.total_count
                )?.toFixed(1)})`}
              </div>
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={`${classes.highDiv} ${classes.matchesContainer}`}>
              <div className={classes.matchesText}>
                {overall?.updated_count}
              </div>
              <div className={classes.labeledDiv}>
                {' '}
                {`(%${overall?.updated_count && overall?.total_count && (
                  (100 * overall.updated_count) /
                overall.total_count
                )?.toFixed(1)})`}
              </div>
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={classes.highDiv}>
              {parseFloat(overall?.new_matched_weighted_margin)?.toFixed(1)}
              {overall?.new_matched_weighted_margin !==
              overall?.matched_weighted_margin && (
              <div className={classes.struckPrice}>
                {parseFloat(overall?.matched_weighted_margin)?.toFixed(1)}
              </div>
              )}
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={classes.highDiv}>
              {parseFloat(overall?.new_unmatched_weighted_margin)?.toFixed(1)}
              {overall?.new_unmatched_weighted_margin !==
              overall?.unmatched_weighted_margin && (
              <div className={classes.struckPrice}>
                {parseFloat(overall?.unmatched_weighted_margin)?.toFixed(1)}
              </div>
              )}
            </div>
          </Table.Summary.Cell>
          <Table.Summary.Cell>
            <div className={classes.highDiv}>
              {parseFloat(overall?.new_weighted_margin)?.toFixed(1)}
              {overall?.new_weighted_margin !==
              overall?.weighted_margin && (
              <div className={classes.struckPrice}>
                {parseFloat(overall?.weighted_margin)?.toFixed(1)}
              </div>
              )}
            </div>
          </Table.Summary.Cell>
          {currentList &&
        overall?.getir_price_new_index !== undefined ? (
          <Table.Summary.Cell>
            <div className={classes.highDiv}>
              {overall?.getir_price_new_index?.toFixed(1)}
              {overall?.getir_price_new_index !==
                overall?.getir_price_index && (
                <div className={classes.struckPrice}>
                  {parseFloat(overall?.getir_price_index)?.toFixed(
                    1,
                  )}
                </div>
              )}
            </div>
          </Table.Summary.Cell>
            ) : null}
          {currentList && overall
            ? currentList.map(competitor => {
              const tempCompetitor = competitor?.split('-')[0];
              return (
                <Table.Summary.Cell>
                  <div key={tempCompetitor} className={classes.highDiv}>
                    {currentList?.length > 1
                      ? tempCompetitorPriceIndex(tempCompetitor)
                      : tempPriceIndex}
                  </div>
                </Table.Summary.Cell>
              );
            })
            : null}
        </Table.Summary.Row>
      </Table.Summary>
    ) : null;
};

export default SimulateTableSummary;
