import {
  Image,
  InputNumber,
  Tooltip,
  Col,
  Row,
  Button,
  Checkbox,
  Tag,
  Popover,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { isNumber } from 'lodash';

import downArrow from '@app/pages/MarketIntelligencePriceRecommendation/img/down-arrow.png';
import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

import { changeProductPrice } from '../../utils/changePrice';
import { priceColor, numberFormatter, isValidate } from '../../utils/common';
import { Creators } from '../../redux/actions';
import { stateSelector, listSelector } from '../../redux/selectors';
import { calculateBundleStatus } from '../../utils/calculate';
import {
  RULE_NAME_TRANSLATER,
  RULE_TYPES_CONVERTER,
  SELECT_TITLE_ICONS,
  COMPETITORS,
} from '../../constants';
import { getSelectedCountryCurrencySymbol } from '@shared/redux/selectors/countrySelection';

import useStyles from '../../styles';
import FamilyDetail from '../FamilyDetail';

const TableColumns = (
  setOpenDetail,
  setDetailProductData,
  showIndex,
  setOpenGuardrailDetail,
  applyRecommendedPrice,
  setApplyRecommendedPrice,
  showBundleCheck,
  setShowBundleStatusDetailModal,
  showFamilyColumn,
  filters,
  setFilters,
  setOpenDrawer,
) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const dispatch = useDispatch();
  const classes = useStyles();

  const countryCurrency = getSelectedCountryCurrencySymbol();

  const filteredTableData = useSelector(stateSelector.filteredTableData);
  const priceType = useSelector(stateSelector.priceType);
  const competitorList = useSelector(listSelector.competitorList);

  const [indexChildren, setIndexChildren] = useState([]);

  useEffect(() => {
    const tempChildren = [];
    if (competitorList?.length > 0) {
      competitorList.forEach(competitor => {
        const tempCompetitor = competitor?.split('-')[0];
        tempChildren.push({
          title: (
            <Row className={classes.priceIndexRow}>
              {COMPETITORS[competitor] ? (
                <>
                  <img
                    src={COMPETITORS[competitor][1]}
                    alt={tempCompetitor}
                    className={classes.priceIndexImage}
                  />
                  <span>{COMPETITORS[competitor][0]}</span>
                </>
              ) : (
                <>
                  <img
                    src={noPicture}
                    alt={tempCompetitor}
                    className={classes.priceIndexImage}
                  />
                  <span>{competitor}</span>
                </>
              )}
            </Row>
          ),
          dataIndex: 'competitor_product_infos',
          key: competitor,
          align: 'center',
          sorter: (a, b) => {
            if (
              a &&
              a?.competitor_product_infos !== '' &&
              a?.competitor_product_infos[competitor] &&
              a?.competitor_product_infos[competitor].competitor_price &&
              b &&
              b?.competitor_product_infos !== '' &&
              b?.competitor_product_infos[competitor] &&
              b?.competitor_product_infos[competitor].competitor_price
            ) {
              return (
                100 *
                  (a.new_price /
                    (a.is_direct_match
                      ? a.competitor_product_infos[competitor]
                        .competitor_price
                      : parseFloat(
                        ((100 +
                            a.competitor_product_infos[competitor]
                              .competitor_parameter) *
                            a.competitor_product_infos[competitor]
                              .competitor_price) /
                            100,
                      ).toFixed(2))) -
                100 *
                  (b.new_price /
                    (b?.is_direct_match
                      ? b.competitor_product_infos[competitor]
                        .competitor_price
                      : parseFloat(
                        ((100 +
                            b.competitor_product_infos[competitor]
                              .competitor_parameter) *
                            b.competitor_product_infos[competitor]
                              .competitor_price) /
                            100,
                      ).toFixed(2)))
              );
            } if (
              a &&
              a?.competitor_product_infos !== '' &&
              a?.competitor_product_infos[competitor] &&
              a?.competitor_product_infos[competitor].competitor_price
            ) {
              // That means be has null competitor_product_infos, so a will come first.
              return -1;
            } if (
              b &&
              b?.competitor_product_infos !== '' &&
              b?.competitor_product_infos[competitor] &&
              b?.competitor_product_infos[competitor].competitor_price
            ) {
              // That means a has null competitor_product_infos so b will come first.
              return 1;
            }
            return 0;
          },
          sortDirections: ['descend', 'ascend'],
          width: 120,
          render: (text, record) => {
            return {
              props: {
                style: {
                  backgroundColor:
                    !(text && competitor && text[competitor]) && '#E3E5E5',
                },
              },
              children: competitor && text && text[competitor] && (
                <>
                  <div>
                    {text[competitor]?.competitor_price &&
                      isNumber(text[competitor]?.competitor_price) &&
                      record?.new_price &&
                      isNumber(record?.new_price) &&
                      (
                        (record.new_price /
                          (record?.is_direct_match
                            ? text[competitor].competitor_price
                            : parseFloat(
                              ((100 +
                                  text[competitor].competitor_parameter) *
                                  text[competitor].competitor_price) /
                                  100,
                            ))) *
                        100
                      )?.toFixed(1)}
                  </div>
                  {record?.price && record?.new_price !== record?.price && (
                    <div className={classes.struckPrice}>
                      {text[competitor]?.competitor_price &&
                        (
                          (record.price /
                            (record.is_direct_match
                              ? text[competitor].competitor_price
                              : parseFloat(
                                ((100 +
                                    text[competitor].competitor_parameter) *
                                    text[competitor].competitor_price) /
                                    100,
                              ))) *
                          100
                        )?.toFixed(1)}
                    </div>
                  )}
                </>
              ),
            };
          },
        });
      });
    }
    setIndexChildren(tempChildren);
  }, [classes, competitorList]);

  const handleChangeInput = (record, value, type) => {
    const { percentage, newTableData } = changeProductPrice(
      filteredTableData,
      record,
      value,
      type,
    );
    dispatch(Creators.setSubcategoryPercentage({ data: percentage }));
    dispatch(Creators.setFilteredTableData({ data: newTableData }));
    const priceFinalResultList = newTableData
      .filter(
        element => element?.new_price && element?.final_result && !element?.final_alert,
      )
      .every(
        data => data?.final_result?.toFixed(2) === data?.new_price?.toFixed(2),
      );
    setApplyRecommendedPrice(priceFinalResultList);
  };

  let columns = [
    {
      title: t('PRODUCT_NAME'),
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a, b) => b.product_name?.length > 0 && a.product_name?.length && a.product_name.length - b.product_name.length,
      sortDirections: ['descend', 'ascend'],
      width: 275,
      align: 'center',
      fixed: 'left',
      render: (text, record) => (
        <Row gutter={2}>
          <Col span={6}>
            <Image src={record?.picurl} fallback={noPicture} height="6vh" />
          </Col>
          <Col span={18} className={classes.productNameCol}>
            <Button
              type="text"
              onClick={() => {
                setDetailProductData(record);
                setOpenDetail(true);
              }}
              className={classes.productNameSpan}
            >
              <div className={classes.badgeWrapperLeft}>
                <div className={classes.productName}>{text}</div>
                <div className={classes.productNameTagWrapper}>
                  <div className={classes.matchTagWrapper}>
                    {record?.competitor_product_infos !== '' &&
                      record?.competitor_product_infos &&
                      (!record?.is_direct_match ? (
                        <Tag color="#87d068" className={classes.matchTags}>
                          {t('INDIRECT').toUpperCase()}
                        </Tag>
                      ) : (
                        <Tag color="#108ee9" className={classes.matchTags}>
                          {t('DIRECT').toUpperCase()}
                        </Tag>
                      ))}
                  </div>
                  {record?.competitor_product_infos &&
                    record?.competitor_product_infos !== '' &&
                    Object.keys(record?.competitor_product_infos).map(
                      competitor => COMPETITORS[competitor] && (
                      <Tooltip
                        title={COMPETITORS[competitor][0]}
                        placement="top"
                      >
                        <img
                          src={COMPETITORS[competitor][1]}
                          alt={competitor}
                          className={classes.productNameCompetitorImage}
                        />
                      </Tooltip>
                      ),
                    )}
                </div>
              </div>
              <div
                className={`${classes.badgeWrapperItems} ${classes.bundledDiscountedWrapper}`}
              >
                {record?.bundle_product_infos &&
                  record?.bundle_product_infos?.length > 0 &&
                  record?.bundle_product_infos !== '' && (
                    <div className={classes.bundledProduct}>
                      <Tooltip title={t('BUNDLE_PRODUCT')} placement="top">
                        <img
                          src={SELECT_TITLE_ICONS.bundled}
                          alt={t('BUNDLE_PRODUCT')}
                          className={classes.productNameOtherImage}
                        />
                      </Tooltip>
                    </div>
                )}
                {record?.price > record?.discounted_price && (
                  <div className={classes.discountedProduct}>
                    <Tooltip title={t('DISCOUNTED_PRODUCT')} placement="top">
                      <img
                        src={SELECT_TITLE_ICONS.discounted}
                        alt={t('DISCOUNTED_PRODUCT')}
                        className={classes.productNameOtherImage}
                      />
                    </Tooltip>
                  </div>
                )}
                {record?.is_family_lead_product && (
                  <div className={classes.bundledProduct}>
                    <Tooltip title={t('FAMILY_LEAD_PRODUCT')} placement="top">
                      <img
                        src={SELECT_TITLE_ICONS.lead}
                        alt={t('FAMILY_LEAD_PRODUCT')}
                        className={classes.productNameOtherImage}
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      title: t('FAMILY_NAME'),
      dataIndex: 'family_id',
      key: 'family_id',
      align: 'center',
      width: 120,
      render: (text, record) => {
        return {
          props: { style: { backgroundColor: (!text || text === '') && '#E3E5E5' } },
          children: (
            <Popover
              content={(
                <FamilyDetail
                  classes={classes}
                  record={record}
                  filters={filters}
                  setFilters={setFilters}
                  setOpenDrawer={setOpenDrawer}
                />
              )}
              title={t('FAMILY_DETAIL')}
              trigger="hover"
              overlayStyle={{ maxWidth: '600px' }}
            >
              {text}
            </Popover>
          ),
        };
      },
    },
    {
      title: t('SEGMENTATIONS'),
      dataIndex: 'product_specs',
      key: 'product_specs',
      align: 'center',
      width: 120,
      render: (_, record) => (
        <div>
          {record?.category_roles}-{record?.kvi}
        </div>
      ),
    },
    {
      title: t('ACTIVE_RULE'),
      dataIndex: 'calculated_rule',
      key: 'calculated_rule',
      width: 120,
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            <Row className={classes.activeRule}>
              <Col className={classes.activeRuleContent}>
                <div>{RULE_NAME_TRANSLATER[text]}-</div>
                <div>
                  {(text !== RULE_TYPES_CONVERTER.INDEX ||
                    text !== RULE_TYPES_CONVERTER.EXCLUSIVE_INDEX) && (
                    <span>%</span>
                  )}
                  {record?.calculated_rule_value}
                </div>
                {record?.calculated_rule_inelastic && (
                  <div className={classes.inelasticStatus}>-{t('INELASTIC')}</div>
                )}
              </Col>
              <Col>
                {text !== RULE_TYPES_CONVERTER.MARGIN &&
                  record?.calculated_rule_competitor && (
                    <div className={classes.competitorName}>
                      ({record?.calculated_rule_competitor})
                    </div>
                )}
              </Col>
            </Row>
          ),
        };
      },
    },
    {
      title: t('PRICE'),
      fixed: 'left',
      children: [
        {
          title: t('CURRENT'),
          dataIndex: priceType,
          key: priceType,
          sorter: (a, b) => a.price - b.price,
          sortDirections: ['descend', 'ascend'],
          align: 'center',
          width: 100,
          render: (text, record) => {
            return {
              children: (
                <div>
                  <Row gutter={24}>
                    <Col span={6} className={classes.downArrowCol}>
                      {record.discounted_price &&
                      parseFloat(record.discounted_price) < text ? (
                        <img
                          src={downArrow}
                          alt={t('DOWN')}
                          className={classes.currentPriceImg}
                        />
                        ) : null}
                    </Col>
                    <Col span={18} className={classes.discountedPriceColumn}>
                      <div className={classes.newPriceDiv}>
                        {countryCurrency} {parseFloat(text).toFixed(2)}
                      </div>
                      {record.discounted_price &&
                      record.discounted_price < text ? (
                        <div className={classes.currentPriceDiv}>
                          {`${countryCurrency} ${parseFloat(
                            record.discounted_price,
                          ).toFixed(2)}`}
                        </div>
                        ) : null}
                    </Col>
                  </Row>
                </div>
              ),
            };
          },
        },
        {
          title: t('RECOMMENDED'),
          dataIndex: 'result',
          key: 'result',
          width: 150,
          sorter: (a, b) => (100 * (a.final_result - a.price)) / a.price -
            (100 * (b.final_result - b.price)) / b.price,
          sortDirections: ['descend', 'ascend'],
          align: 'center',
          render: (text, record) => {
            return {
              children: (
                <div className={classes.recommendedWrapper}>
                  <Button
                    type="text"
                    className={classes.recommendedButton}
                    onClick={() => {
                      setDetailProductData(record);
                      setOpenGuardrailDetail(true);
                    }}
                  >
                    {!record?.final_alert && (
                      <div className={classes.recommendedPrice}>
                        <div className={classes.recommendedPriceLine}>
                          {countryCurrency}{' '}
                          {parseFloat(
                            record?.final_alert
                              ? record[priceType]
                              : record?.final_result,
                          )?.toFixed(2)}{' '}
                        </div>
                        <div
                          className={classes.productColumn}
                          style={{
                            color: priceColor(
                              record.final_result - record[priceType],
                            ),
                          }}
                        >
                          {numberFormatter(
                            record.recommended_price_percentage,
                          ) !== 0 &&
                            isValidate(record?.final_result) &&
                            !record?.final_alert &&
                            record?.final_result !== record[priceType] && (
                              <div>
                                <div>
                                  {numberFormatter(
                                    (
                                      record.final_result - record[priceType]
                                    )?.toFixed(2),
                                  )}{' '}
                                </div>
                                <div>{`(%${numberFormatter(
                                  record?.recommended_price_percentage,
                                )})`}
                                </div>
                              </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div
                      className={
                        record?.final_alert
                          ? classes.exclamationIconWrapperFinalAlert
                          : classes.exclamationIconWrapper
                      }
                    >
                      <div className={classes.exclamationIconContainer}>
                        {record?.guardrail_check && (
                          <Tooltip title={t('GUARDRAIL_FAILED')} placement="top">
                            <ExclamationCircleOutlined
                              className={classes.recommendedIcon}
                              style={{ color: 'orange' }}
                            />
                          </Tooltip>
                        )}
                      </div>
                      <div className={classes.exclamationIconContainer}>
                        {record?.final_alert && (
                          <Tooltip title={t('FINAL_ALERT')} placement="top">
                            <ExclamationCircleOutlined
                              className={classes.recommendedIcon}
                              style={{ color: 'red' }}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                    <div className={classes.exclamationIconContainer}>
                      {(record?.is_same_with_family === false ||
                        !record?.is_same_with_family === '') && (
                        <Tooltip title={t('FAMILY_PRICE')} placement="top">
                          <ExclamationCircleOutlined
                            className={classes.recommendedIcon}
                            style={{ color: 'green' }}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </Button>
                </div>
              ),
            };
          },
        },
        {
          title: t('NEW'),
          dataIndex: priceType,
          key: priceType,
          width: 150,
          align: 'center',
          sorter: (a, b) => a.new_price - b.new_price,
          sortDirections: ['descend', 'ascend'],
          render: (_, record) => {
            return {
              children: (
                <Row className={classes.replaceButtonRow}>
                  <Col>
                    <div
                      className={`${classes.newPriceInput} ${classes.newPriceCol}`}
                    >
                      <Tooltip title={t('NEW_PRICE')} placement="top">
                        <InputNumber
                          prefix={countryCurrency}
                          value={record?.new_price?.toFixed(2)}
                          onChange={v => handleChangeInput(record, v, 'new_price')}
                          step={0.01}
                          min={0}
                          size="small"
                        />
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title={t('NEW_PRICE_PERCENTAGE')} placement="top">
                        <InputNumber
                          prefix="%"
                          value={record?.price_change?.toFixed(2)}
                          onChange={v => handleChangeInput(record, v, 'price_change')}
                          step={0.1}
                          size="small"
                        />
                      </Tooltip>
                    </div>
                  </Col>
                  <Col className={classes.newPriceCheckbox}>
                    <Tooltip title={t('APPLY_RECOMMENDED_PRICE')} placement="top">
                      <Checkbox
                        disabled={
                          !record?.price ||
                          !record?.final_result ||
                          (record?.final_alert &&
                            record?.new_price === record[priceType]) ||
                          record?.final_result === record[priceType]
                        }
                        checked={
                          (record?.final_result === record?.new_price &&
                            record[priceType] !== record?.new_price) ||
                          applyRecommendedPrice
                        }
                        onChange={() => handleChangeInput(
                          record,
                          (record.final_alert
                            ? record.price
                            : record.final_result) !== record.new_price
                            ? record.final_result
                            : record.price,
                          'new_price',
                        )}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ),
            };
          },
        },
      ],
    },
    {
      title: t('INDEX'),
      children: indexChildren,
    },
    {
      title: t('BUNDLE_CHECK'),
      dataIndex: 'bundle_product_infos',
      key: 'bundle_product_infos',
      align: 'center',
      width: 80,
      render: (text, record) => {
        const status =
          text && text !== '' && text?.length > 0
            ? text.every(bundle => calculateBundleStatus(bundle.bundle_index))
            : null;
        return {
          props: { style: { backgroundColor: (text === null || text === '') && '#E3E5E5' } },
          children: text && text !== '' && text?.length > 0 && (
            <div>
              <Button
                type="text"
                onClick={() => {
                  setDetailProductData(record);
                  setShowBundleStatusDetailModal(true);
                }}
              >
                <img
                  src={
                    status === true
                      ? SELECT_TITLE_ICONS.checked
                      : SELECT_TITLE_ICONS.cancel
                  }
                  alt={
                    status === true
                      ? t('BUNDLE_INDEX_SUCCESS')
                      : t('BUNDLE_INDEX_FAILED')
                  }
                  className={classes.bundleStatusIcon}
                />
              </Button>
            </div>
          ),
        };
      },
    },
    {
      title: t('MARGIN'),
      dataIndex: 'new_margin',
      key: 'new_margin',
      sorter: (a, b) => a.new_margin - b.new_margin,
      sortDirections: ['descend', 'ascend'],
      width: 100,
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            <div>
              {text && parseFloat(numberFormatter(text))?.toFixed(1)}{' '}
              <div className={classes.productColumn}>
                {text &&
                  record?.margin &&
                  parseFloat(numberFormatter(text))?.toFixed(1) !==
                    parseFloat(numberFormatter(record?.margin))?.toFixed(1) && (
                    <div>
                      <div className={classes.struckPrice}>
                        {parseFloat(numberFormatter(record?.margin))?.toFixed(
                          1,
                        )}
                      </div>
                    </div>
                )}
              </div>
            </div>
          ),
        };
      },
    },
  ];
  if (!showIndex) columns = columns.filter(e => e?.title !== t('INDEX'));
  if (!showBundleCheck) {
    columns = columns.filter(e => e?.title !== t('BUNDLE_CHECK'));
  }
  if (!showFamilyColumn) {
    columns = columns.filter(e => e?.title !== t('FAMILY_NAME'));
  }
  return columns;
};

export default TableColumns;
