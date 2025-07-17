import { Table, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { calculatePercentage, calculateWithDiscountedPrice } from '../../utils/calculate';
import { numberFormatter, priceColor } from '../../utils/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { listSelector, stateSelector } from '../../redux/selectors';

import useStyles from '../../styles';

const TableSummary = ({ showAandM, showIndex }) => {
  const classes = useStyles();
  const { t } = useTranslation('pricingTool');
  const filteredTableData = useSelector(stateSelector.filteredTableData);

  const isLoading = useSelector(stateSelector.loading);
  const competitorList = useSelector(listSelector.competitorList);
  const subcategoryPercentageValue = useSelector(stateSelector.subcategoryPercentage);

  const countryDetail = getSelectedCountry();
  const currency = countryDetail.currency.symbol;

  const priceType = useSelector(stateSelector.priceType);

  if (isLoading) return null;

  const calculateOverallIndex = competitor => {
    let sumCompetitorPrice = 0;
    let sumGetirPrice = 0;
    filteredTableData.forEach(element => {
      if (element.competitor_product_infos &&
      element &&
      element.competitor_product_infos[competitor]) {
        const current = element.competitor_product_infos[competitor].competitor_discounted_price;
        if (current !== '' && current && current !== 'NaN') sumCompetitorPrice += parseFloat(current);
        sumGetirPrice += parseFloat(element.new_price);
      }
    });
    const index = (100 * (sumGetirPrice / sumCompetitorPrice)).toFixed(2) === 'NaN' ? 0 : (100 * (sumGetirPrice / sumCompetitorPrice));
    return index.toFixed(2);
  };
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell id="overall" index={0}>
        <Tooltip title={t('TOOLTIP_TITLE_TABLE')}>
          <div className={classes.boldCenterBlack}>
            {
              `${filteredTableData?.length}`
              // (${subcategoryList.find(e => e.subcategory_name === selectedSubCategory)?.count_percentage}%) NOTE: WILL BE ACTIVATED AFTER BACKEND FIXES
            }
          </div>
        </Tooltip>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1} />
      <Table.Summary.Cell id="price-current" index={2}>
        <div className={classes.boldCenterBlack}>
          {numberFormatter(
            filteredTableData
              .reduce(
                (accumulator, current) => accumulator +
                  parseFloat(
                    calculateWithDiscountedPrice(current, priceType, showAandM),
                  ),
                0,
              )
              .toFixed(2),
          ) + currency}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="price-new" index={3}>
        <div className={classes.boldCenterBlack}>
          <div>
            {numberFormatter(
              filteredTableData
                .reduce(
                  (accumulator, current) => accumulator + parseFloat(current.new_price),
                  0,
                )
                .toFixed(2),
            ) + currency}
          </div>
          <div
            className={classes.productColumn}
            style={{ color: priceColor(subcategoryPercentageValue) }}
          >
            {`(${parseFloat(subcategoryPercentageValue === 'NaN' ? 0 : subcategoryPercentageValue)}%)`}
          </div>
        </div>
      </Table.Summary.Cell>
      {showIndex ? competitorList.map(competitor => (
        <Table.Summary.Cell
          key={competitor}
        >
          <div className={classes.boldCenterBlack}>
            {calculateOverallIndex(competitor)}

          </div>
        </Table.Summary.Cell>
      )) : null}
      <Table.Summary.Cell id="sales-current">
        <div className={classes.boldCenterBlack}>
          {numberFormatter(filteredTableData.reduce((accumulator, current) => accumulator + current.total_sales, 0))}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="sales-predicted">
        <div className={classes.boldCenterBlack}>
          <div> {
            numberFormatter(filteredTableData.reduce((accumulator, current) => accumulator +
                      current.weekly_sales_predicted, 0).toFixed(0))
          }
          </div>
          <div
            className={classes.productColumn}
            style={{
              color: priceColor(calculatePercentage(
                (
                  filteredTableData.reduce((accumulator, current) => accumulator +
                          current.total_sales, 0)),
                filteredTableData.reduce((accumulator, current) => accumulator +
                        current.weekly_sales_predicted, 0),
              )),
            }}
          >
            {
              `(${parseFloat(
                calculatePercentage(
                  (
                    filteredTableData.reduce((accumulator, current) => accumulator +
                              current.total_sales, 0)),
                  filteredTableData.reduce((accumulator, current) => accumulator +
                            current.weekly_sales_predicted, 0),
                ),
              )
              }%)`
            }
          </div>
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="revenue-current">
        <div className={classes.boldCenterBlack}>
          {numberFormatter((filteredTableData.reduce((accumulator, current) => accumulator
                    + parseFloat(calculateWithDiscountedPrice(current, priceType, showAandM)
                      * current.total_sales), 0)).toFixed(2))
                    + currency}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="revenue-predicted">
        <div className={classes.boldCenterBlack}>
          <div> {
            numberFormatter(filteredTableData.reduce((accumulator, current) => accumulator + current.weekly_total_basket_predicted, 0).toFixed(2))
                    + currency
          }
          </div>
          <div
            className={classes.productColumn}
            style={{
              color: priceColor(
                calculatePercentage(
                  filteredTableData.reduce((accumulator, current) => accumulator
                          + (parseFloat(calculateWithDiscountedPrice(current, priceType, showAandM) * current.total_sales)), 0),
                  filteredTableData.reduce((accumulator, current) => accumulator + current.weekly_total_basket_predicted, 0),
                ),
              ),
            }}
          >
            {
              `(${parseFloat(calculatePercentage(
                filteredTableData.reduce((accumulator, current) => accumulator
                          + (parseFloat(calculateWithDiscountedPrice(current, priceType, showAandM) * current.total_sales)), 0),
                filteredTableData.reduce((accumulator, current) => accumulator + current.weekly_total_basket_predicted, 0),
              ))
              }%)`
            }
          </div>
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="weekly-nominal-margin-current-unit">
        <div className={classes.boldCenterBlack}>
          {numberFormatter((filteredTableData.reduce((accumulator, current) => accumulator
                    + current.margin_current_product, 0)).toFixed(2))
                    + currency}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="weekly-nominal-margin-current-total">
        <div className={classes.boldCenterBlack}>
          <div> {
            numberFormatter(filteredTableData.reduce((accumulator, current) => accumulator + current.margin_current_gross, 0).toFixed(2))
                    + currency
          }
          </div>
          <div
            className={classes.productColumn}
            style={{
              color: priceColor(
                calculatePercentage(
                  filteredTableData.reduce((accumulator, current) => accumulator
                          + current.margin_current_product, 0),
                  filteredTableData.reduce((accumulator, current) => accumulator + current.margin_current_gross, 0),
                ),
              ),
            }}
          >
            {
              `(${numberFormatter(calculatePercentage(
                filteredTableData.reduce((accumulator, current) => accumulator
                        + current.margin_current_product, 0),
                filteredTableData.reduce((accumulator, current) => accumulator + current.margin_current_gross, 0),
              ))
              }%)`
            }
          </div>
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="weekly-nominal-margin-new-unit">
        <div className={classes.boldCenterBlack}>
          {numberFormatter((filteredTableData.reduce((accumulator, current) => accumulator
                    + current.margin_new_product, 0)).toFixed(2))
                    + currency}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="weekly-nominal-margin-new-total">
        <div className={classes.boldCenterBlack}>
          <div> {
            numberFormatter(filteredTableData.reduce((accumulator, current) => accumulator + current.margin_new_gross, 0).toFixed(2))
                    + currency
          }
          </div>
          <div
            className={classes.productColumn}
            style={{
              color: priceColor(
                calculatePercentage(
                  filteredTableData.reduce((accumulator, current) => accumulator
                          + current.margin_new_product, 0),
                  filteredTableData.reduce((accumulator, current) => accumulator + current.margin_new_gross, 0),
                ),
              ),
            }}
          >
            {
              `(${numberFormatter(calculatePercentage(
                filteredTableData.reduce((accumulator, current) => accumulator
                        + current.margin_new_product, 0),
                filteredTableData.reduce((accumulator, current) => accumulator + current.margin_new_gross, 0),
              ))
              }%)`
            }
          </div>
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="margin-current-gm">
        <div className={classes.boldCenterBlack}>
          {numberFormatter((filteredTableData.reduce((accumulator, current) => accumulator
                    + current.margin_current_product_percentage, 0)).toFixed(2))}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="margin-struck-price">
        <div className={classes.boldCenterBlack}>
          {numberFormatter((filteredTableData.reduce((accumulator, current) => accumulator
                    + current.margin_new_product_percentage, 0)).toFixed(2))}
        </div>
      </Table.Summary.Cell>
      {showAandM ? (
        <Table.Summary.Cell id="aandm-current-unit">
          <div className={classes.boldCenterBlack}>
            {
              numberFormatter((filteredTableData.reduce((accumulator, current) => accumulator +
              current.aandm, 0)).toFixed(2)) + currency
            }
          </div>
        </Table.Summary.Cell>
      )
        : null}
      {showAandM ? (
        <Table.Summary.Cell id="aandm-current-total">
          <div className={classes.boldCenterBlack}>
            {
              numberFormatter((filteredTableData.reduce((accumulator, current) => accumulator +
              current.aandm_gross, 0)).toFixed(2)) + currency
            }
          </div>
        </Table.Summary.Cell>
      )
        : null}
      {showAandM ? (
        <Table.Summary.Cell id="aandm-new-unit">
          <div className={classes.boldCenterBlack}>
            {
              numberFormatter(filteredTableData.reduce((accumulator, current) => accumulator +
              (current.new_price < current[priceType] ? current.new_aandm_product : current.aandm), 0).toFixed(2)) + currency
            }
          </div>
        </Table.Summary.Cell>
      )
        : null}
      {showAandM ? (
        <Table.Summary.Cell id="aandm-new-total">
          <div className={classes.boldCenterBlack}>
            {
              numberFormatter(filteredTableData.reduce((accumulator, current) => accumulator +
                (current.new_price < current[priceType] ? current.new_aandm_gross : current.aandm_gross), 0).toFixed(2)) + currency
            }
          </div>
        </Table.Summary.Cell>
      )
        : null}
    </Table.Summary.Row>
  );
};

export default TableSummary;
