import { Checkbox, Col, Row, Table, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  calculateOverallIndex,
  calculateOverallWeightedIndex,
  calculatePercentage,
} from '../../utils/calculate';
import { isValidate, numberFormatter, priceColor } from '../../utils/common';
import { listSelector, stateSelector } from '../../redux/selectors';
import { CALCULATE_OVERALL_TYPE, INDEX_TYPE_LIST } from '../../constants';
import { changeAllPrice } from '../../utils/changePrice';
import { Creators } from '../../redux/actions';

import useStyles from '../../styles';
import { getSelectedCountryCurrencySymbol } from '@shared/redux/selectors/countrySelection';

const TableSummary = ({
  showIndex,
  showIndexType,
  setApplyRecommendedPrice,
  applyRecommendedPrice,
  showBundleCheck,
  showFamilyColumn,
}) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');
  const dispatch = useDispatch();
  const classes = useStyles();

  const filteredTableData = useSelector(stateSelector.filteredTableData);
  const isLoading = useSelector(stateSelector.loading);
  const competitorList = useSelector(listSelector.competitorList);
  const subcategoryPercentageValue = useSelector(
    stateSelector.subcategoryPercentage,
  );
  const priceType = useSelector(stateSelector.priceType);
  const countryCurrency = getSelectedCountryCurrencySymbol();

  if (isLoading) return null;

  const differentMargin = () => {
    if (filteredTableData && filteredTableData?.length > 0) {
      const newSummaryMargin =
        filteredTableData.reduce(
          (accumulator, current) => accumulator +
            (isValidate(current?.netrevenue) && isValidate(current?.new_margin)
              ? parseFloat(current.netrevenue * current.new_margin)
              : 0),
          0,
        ) /
        filteredTableData.reduce(
          (accumulator, current) => accumulator +
            (isValidate(current?.netrevenue)
              ? parseFloat(current?.netrevenue)
              : 0),
          0,
        );
      const oldSummaryMargin =
        filteredTableData.reduce(
          (accumulator, current) => accumulator +
            (isValidate(current?.netrevenue) && isValidate(current?.margin)
              ? parseFloat(current.netrevenue * current.margin)
              : 0),
          0,
        ) /
        filteredTableData.reduce(
          (accumulator, current) => accumulator +
            (isValidate(current?.netrevenue)
              ? parseFloat(current?.netrevenue)
              : 0),
          0,
        );
      return newSummaryMargin?.toFixed(3) !== oldSummaryMargin?.toFixed(3);
    }
    return null;
  };
  const handleChangeAllPrice = () => {
    const { percentage, newTableData } = changeAllPrice(
      filteredTableData,
      !applyRecommendedPrice,
    );
    dispatch(Creators.setSubcategoryPercentage({ data: percentage }));
    dispatch(Creators.setFilteredTableData({ data: newTableData }));
  };

  const sendIsValidate = item => (isValidate(item) ? parseFloat(item) : 0);

  return (
    <Table.Summary.Row>
      <Table.Summary.Cell id="overall" index={0}>
        <div className={classes.boldCenterBlack}>
          {`${filteredTableData?.length}`}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1} />
      <Table.Summary.Cell index={2} />
      {showFamilyColumn && <Table.Summary.Cell index={3} />}
      <Table.Summary.Cell id="price-current" index={showFamilyColumn ? 4 : 3}>
        <div className={classes.boldCenterBlack}>
          {countryCurrency}{' '}
          {numberFormatter(
            filteredTableData
              ?.reduce(
                (accumulator, current) => isValidate(current[priceType]) &&
                  accumulator + parseFloat(current[priceType]),
                0,
              )
              ?.toFixed(2),
          )}
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell
        id="price-recommended"
        index={showFamilyColumn ? 5 : 4}
      >
        <div className={classes.boldCenterBlack}>
          <div>
            {countryCurrency}{' '}
            {numberFormatter(
              filteredTableData
                ?.reduce(
                  (accumulator, current) => accumulator +
                    (current.final_alert && isValidate(current[priceType])
                      ? parseFloat(current[priceType])
                      : sendIsValidate(current?.final_result)),
                  0,
                )
                ?.toFixed(2),
            )}
          </div>
          <div
            className={classes.productColumn}
            style={{
              color: priceColor(
                calculatePercentage(
                  filteredTableData?.reduce(
                    (accumulator, current) => isValidate(current[priceType]) &&
                      accumulator + parseFloat(current[priceType]),
                    0,
                  ),
                  filteredTableData?.reduce(
                    (accumulator, current) => accumulator +
                      (current?.final_alert && isValidate(current[priceType])
                        ? parseFloat(current[priceType])
                        : sendIsValidate(current?.final_result)),
                    0,
                  ),
                ),
              ),
            }}
          >
            {`(%${parseFloat(
              calculatePercentage(
                filteredTableData?.reduce(
                  (accumulator, current) => isValidate(current[priceType]) &&
                    accumulator + parseFloat(current[priceType]),
                  0,
                ),
                filteredTableData?.reduce(
                  (accumulator, current) => accumulator +
                    (current?.final_alert && isValidate(current[priceType])
                      ? parseFloat(current[priceType])
                      : sendIsValidate(current?.final_result)),
                  0,
                ),
              ),
            )})`}
          </div>
        </div>
      </Table.Summary.Cell>
      <Table.Summary.Cell id="price-new" index={showFamilyColumn ? 6 : 5}>
        <Row className={classes.summaryPriceNew}>
          <Col className={`${classes.boldCenterBlack} ${classes.newPriceCol}`}>
            <div>
              {countryCurrency}{' '}
              {numberFormatter(
                filteredTableData
                  ?.reduce(
                    (accumulator, current) => accumulator +
                      (isValidate(current?.new_price)
                        ? parseFloat(current?.new_price)
                        : 0),
                    0,
                  )
                  ?.toFixed(2),
              )}
            </div>
            <div
              className={classes.productColumn}
              style={{ color: priceColor(subcategoryPercentageValue) }}
            >
              {`(%${parseFloat(
                subcategoryPercentageValue === 'NaN' &&
                  !subcategoryPercentageValue
                  ? 0
                  : subcategoryPercentageValue,
              )})`}
            </div>
          </Col>
          <Col
            sm={3}
            className={`${classes.index} ${classes.applyAllRecommendedCheckbox}`}
          >
            <Tooltip
              title={t('APPLY_ALL_RECOMMENDED_PRICE')}
              placement="top"
              color="purple"
            >
              <Checkbox
                disabled={filteredTableData?.every(
                  element => element?.final_alert &&
                    element?.new_price === element[priceType],
                )}
                checked={applyRecommendedPrice}
                onChange={() => {
                  setApplyRecommendedPrice(!applyRecommendedPrice);
                  handleChangeAllPrice();
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      </Table.Summary.Cell>
      {showIndex &&
        competitorList?.map(competitor => (
          <Table.Summary.Cell key={competitor}>
            {showIndexType === INDEX_TYPE_LIST.NOMINAL_WEIGHTED_INDEX.key ? (
              <div className={classes.boldCenterBlack}>
                {calculateOverallWeightedIndex(
                  competitor,
                  CALCULATE_OVERALL_TYPE.NEW,
                  filteredTableData,
                  priceType,
                )}
                {calculateOverallWeightedIndex(
                  competitor,
                  CALCULATE_OVERALL_TYPE.OLD,
                  filteredTableData,
                  priceType,
                ) !==
                  calculateOverallWeightedIndex(
                    competitor,
                    CALCULATE_OVERALL_TYPE.NEW,
                    filteredTableData,
                    priceType,
                  ) && (
                  <div className={classes.struckPrice}>
                    {parseFloat(
                      calculateOverallWeightedIndex(
                        competitor,
                        CALCULATE_OVERALL_TYPE.OLD,
                        filteredTableData,
                        priceType,
                      ),
                    )?.toFixed(1)}
                  </div>
                )}
              </div>
            ) : (
              <div className={classes.boldCenterBlack}>
                {calculateOverallIndex(
                  competitor,
                  CALCULATE_OVERALL_TYPE.NEW,
                  filteredTableData,
                  priceType,
                )}
                {calculateOverallIndex(
                  competitor,
                  CALCULATE_OVERALL_TYPE.OLD,
                  filteredTableData,
                  priceType,
                ) !==
                  calculateOverallIndex(
                    competitor,
                    CALCULATE_OVERALL_TYPE.NEW,
                    filteredTableData,
                    priceType,
                  ) && (
                  <div className={classes.struckPrice}>
                    {parseFloat(
                      calculateOverallIndex(
                        competitor,
                        CALCULATE_OVERALL_TYPE.OLD,
                        filteredTableData,
                        priceType,
                      ),
                    )?.toFixed(1)}
                  </div>
                )}
              </div>
            )}
          </Table.Summary.Cell>
        ))}
      {showBundleCheck && <Table.Summary.Cell />}
      <Table.Summary.Cell id="margin">
        <div className={classes.boldCenterBlack}>
          {filteredTableData &&
            filteredTableData?.length > 0 &&
            parseFloat(
              filteredTableData.reduce(
                (accumulator, current) => accumulator +
                  (isValidate(current?.netrevenue) && current?.new_margin
                    ? parseFloat(current.netrevenue * current.new_margin)
                    : 0),
                0,
              ) /
                filteredTableData.reduce(
                  (accumulator, current) => accumulator +
                    (isValidate(current?.netrevenue)
                      ? parseFloat(current?.netrevenue)
                      : 0),
                  0,
                ),
            )?.toFixed(1)}
          {differentMargin() && (
            <div className={classes.struckPrice}>
              {filteredTableData &&
                filteredTableData?.length > 0 &&
                parseFloat(
                  filteredTableData.reduce(
                    (accumulator, current) => accumulator +
                      (isValidate(current?.netrevenue) && current?.margin
                        ? parseFloat(current.netrevenue * current.margin)
                        : 0),
                    0,
                  ) /
                    filteredTableData.reduce(
                      (accumulator, current) => accumulator +
                        (isValidate(current?.netrevenue)
                          ? parseFloat(current?.netrevenue)
                          : 0),
                      0,
                    ),
                )?.toFixed(1)}
            </div>
          )}
        </div>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
};

export default TableSummary;
