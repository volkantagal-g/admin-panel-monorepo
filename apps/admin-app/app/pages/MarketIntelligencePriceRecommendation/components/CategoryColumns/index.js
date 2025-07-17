import { Image, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import getirLogo from '@app/pages/MarketIntelligencePriceIndex/img/assets/getirlogo.png';
import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

import { backgroundColorCategoryFinder, colorCategoryFinder } from '../../utils/tableColorFinder';

import { COMPETITORS } from '../../constants';
import { isValidate } from '../../utils/common';
import useStyles from '../../styles';

const CategoryColumns = currentCompetitorList => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const classes = useStyles();
  const competitorType =
    currentCompetitorList?.length > 1 ? 'multiple' : 'single';

  const tableProperties = [
    {
      title: t('NAME'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 300,
      align: 'left',
      fixed: 'left',
      render: (text, record) => {
        return {
          children:
            record.hasOwnProperty('getir_image') ? (
              <Tooltip
                placement="topRight"
                title={<div className={classes.tooltipTitle}>{text}</div>}
              >
                <span>
                  <Image
                    className={
                      competitorType === 'multiple'
                        ? classes.tooltipImage
                        : classes.tooltipImageSec
                    }
                    alt={text}
                    src={record?.getir_image}
                  />
                  {text}
                </span>
              </Tooltip>
            ) : (
              text
            ),
        };
      },
    },
    {
      title: t('PRODUCTS'),
      dataIndex: 'total_count',
      key: 'total_count',
      sorter: (a, b) => a.total_count - b.total_count,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      width: 100,
    },
    {
      title: t('MATCHES'),
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      width: 125,
      render: (text, record) => {
        return {
          children:
            text && isValidate(text) && text !== 'NaN' ? (
              <div className={classes.matchesContainer}>
                <div className={classes.matchesText}> {text}</div>
                <div className={classes.matchedSpan}>
                  {' '}
                  (
                  {`%${
                    text
                      ? (
                        100 *
                          (parseFloat(text) / parseFloat(record?.total_count))
                      )?.toFixed(1)
                      : ''
                  })`}
                </div>
              </div>
            ) : (
              '-'
            ),
        };
      },
    },
    {
      title: t('UPDATED_COUNT'),
      dataIndex: 'updated_count',
      key: 'updated_count',
      sorter: (a, b) => a.updated_count - b.updated_count,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
      width: 125,
      render: (text, record) => {
        return {
          children: (
            <div className={classes.matchesContainer}>
              <div className={classes.matchesText}> {text}</div>
              <div className={classes.matchedSpan}>
                {' '}
                (
                {`%${
                  text && isValidate(text)
                    ? (
                      100 *
                        (parseFloat(text) / parseFloat(record?.total_count))
                    )?.toFixed(1)
                    : ''
                })`}
              </div>
            </div>
          ),
        };
      },
    },
    {
      title: t('MARGIN'),
      fixed: 'left',
      children: [
        {
          title: t('MATCHED'),
          dataIndex: 'new_matched_weighted_margin',
          key: 'new_matched_weighted_margin',
          sorter: (a, b) => a.new_matched_weighted_margin - b.new_matched_weighted_margin,
          sortDirections: ['descend', 'ascend'],
          align: 'center',
          width: 100,
          render: (text, record) => {
            return {
              children: (
                <div>
                  {text && text !== 'NaN' ? parseFloat(text)?.toFixed(1) : '-'}
                  {record?.matched_weighted_margin !==
                    record?.new_matched_weighted_margin &&
                    record?.matched_weighted_margin && (
                      <div className={classes.struckPrice}>
                        {parseFloat(record?.matched_weighted_margin)?.toFixed(
                          1,
                        )}
                      </div>
                  )}
                </div>
              ),
            };
          },
        },
        {
          title: t('UNMATCHED'),
          dataIndex: 'new_unmatched_weighted_margin',
          key: 'new_unmatched_weighted_margin',
          sorter: (a, b) => a.new_unmatched_weighted_margin - b.new_unmatched_weighted_margin,
          sortDirections: ['descend', 'ascend'],
          align: 'center',
          width: 100,
          render: (text, record) => {
            return {
              children: (
                <div>
                  {text && text !== 'NaN' ? parseFloat(text)?.toFixed(1) : '-'}
                  {record?.unmatched_weighted_margin !==
                    record?.new_unmatched_weighted_margin &&
                    record?.unmatched_weighted_margin && (
                      <div className={classes.struckPrice}>
                        {parseFloat(record?.unmatched_weighted_margin)?.toFixed(
                          1,
                        )}
                      </div>
                  )}
                </div>
              ),
            };
          },
        },
        {
          title: t('TOTAL'),
          dataIndex: 'new_weighted_margin',
          key: 'new_weighted_margin',
          sorter: (a, b) => a.weighted_margin - b.weighted_margin,
          sortDirections: ['descend', 'ascend'],
          align: 'center',
          width: 100,
          render: (text, record) => {
            return {
              children: (
                <div>
                  {text && parseFloat(text)?.toFixed(1)}
                  {record?.weighted_margin !== record?.new_weighted_margin &&
                    record?.weighted_margin && (
                      <div className={classes.struckPrice}>
                        {parseFloat(record?.weighted_margin)?.toFixed(1)}
                      </div>
                  )}
                </div>
              ),
            };
          },
        },
      ],
    },
    {
      title: (
        <Row className={classes.priceIndexRow}>
          <Image
            src={getirLogo}
            alt="Getir"
            className={classes.priceIndexImage}
          />
          <span>
            {competitorType === 'multiple' ? t('GETIR') : t('GETIR_PRICE_INDEX')}
          </span>
        </Row>
      ),
      dataIndex: 'getir_price_new_index',
      key: 'getir_price_new_index',
      sorter: (a, b) => a.getir_price_new_index - b.getir_price_new_index,
      sortDirections: ['descend', 'ascend'],
      width: 100,
      render: (text, record) => {
        if (record?.count === 0 || !text || text === '') {
          return {
            props: {
              style: {
                fontWeight: 'bolder',
                backgroundColor: '#eeeeee',
                color: '#f4511e',
                fontStyle: 'italic',
              },
            },
            children: (
              <div>
                {competitorType === 'multiple'
                  ? t('NO_COMMON_PRODUCT_WAS_FOUND')
                  : t('NO_MATCHED_PRODUCT_WAS_FOUND')}
              </div>
            ),
          };
        }
        return {
          props: {
            style: {
              fontWeight: 'bolder',
              backgroundColor:
                text && backgroundColorCategoryFinder(text?.toFixed(1)),
              color: text && colorCategoryFinder(text?.toFixed(1)),
            },
          },
          children: (
            <div>
              {text && parseFloat(text)?.toFixed(1)}
              {record?.getir_price_index !== record?.getir_price_new_index &&
                record?.getir_price_index && (
                  <div className={classes.struckPrice}>
                    {parseFloat(record?.getir_price_index)?.toFixed(1)}
                  </div>
              )}
            </div>
          ),
        };
      },
      align: 'center',
    },
  ];

  const addTableProperties = () => {
    return (
      currentCompetitorList?.length > 0
        ? currentCompetitorList?.map(competitor => {
          const tempCompetitor = competitor?.split('-')[0];
          return tableProperties.push({
            title: (
              <Row className={classes.priceIndexRow}>
                {COMPETITORS[competitor] ? (
                  <>
                    <Image
                      src={COMPETITORS[competitor][1]}
                      alt={tempCompetitor}
                      className={classes.priceIndexImage}
                    />
                    <span>{COMPETITORS[competitor][0]}</span>
                  </>
                ) : (
                  <>
                    <Image
                      src={noPicture}
                      alt={tempCompetitor}
                      className={classes.priceIndexImage}
                    />
                    <span>{competitor}</span>
                  </>
                )}
              </Row>
            ),
            dataIndex: `${tempCompetitor?.toLowerCase()}_price_index`,
            key: 'price_index',
            sorter: (a, b) => a[`${tempCompetitor?.toLowerCase()}_price_index`] -
              b[`${tempCompetitor?.toLowerCase()}_price_index`],
            sortDirections: ['descend', 'ascend'],
            width: 100,
            render: (text, record) => {
              if (record?.count === 0 || !text || text === '') {
                return {
                  props: {
                    style: {
                      fontWeight: 'bolder',
                      backgroundColor: '#eeeeee',
                      color: '#f4511e',
                      fontStyle: 'italic',
                    },
                  },
                  children: (
                    <div>
                      {competitorType === 'multiple'
                        ? t('NO_COMMON_PRODUCT_WAS_FOUND')
                        : t('NO_MATCHED_PRODUCT_WAS_FOUND')}
                    </div>
                  ),
                };
              }
              return {
                props: {
                  style: {
                    fontWeight: 'bolder',
                    backgroundColor: text && backgroundColorCategoryFinder(text?.toFixed(1)),
                    color: text && colorCategoryFinder(text?.toFixed(1)),
                  },
                },
                children: text && <div>{parseFloat(text)?.toFixed(1)}</div>,
              };
            },
            align: 'center',
          });
        })
        : ''
    );
  };

  if (competitorType === 'multiple') {
    addTableProperties();
  }
  return tableProperties;
};

export default CategoryColumns;
