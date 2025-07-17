import { useTranslation } from 'react-i18next';
import { Tooltip, Row } from 'antd';

import getirlogo from '@app/pages/MarketIntelligencePriceIndex/img/assets/getirlogo.png';
import { colorCategoryFinder, backgroundColorCategoryFinder } from '@app/pages/MarketIntelligencePriceIndex/utils/colorFinder';
import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

import noPicture from '@app/pages/MarketIntelligencePriceIndex/img/assets/no-pictures.png';

const CategoryColumns = currentCompetitorList => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const competitorType = currentCompetitorList.length > 1 ? 'multiple' : 'single';
  const tableProperties = [
    {
      title: t('CATEGORIES'),
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => {
        if ('category' in a) return a.category.localeCompare(b.category);
        return null;
      },
      ellipsis: true,
      width: competitorType === 'multiple' ? '30vh' : 300,
      align: 'left',
      render: (text, record) => {
        return {
          children: (
            <Tooltip
              placement="topRight"
              title={<div className={classes.tooltipTitle}>{text}</div>}
            >
              <span>
                <img
                  className={competitorType === 'multiple' ? classes.tooltipImage : classes.tooltipImageSec}
                  alt=""
                  src={record.picurl}
                />
                {text}
              </span>
            </Tooltip>
          ),
        };
      },
    },
    {
      title: t('PRODUCTS'),
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
      sortDirections: ['descend', 'ascend'],
      align: 'center',
    },
    {
      title: t('MATCHES'),
      dataIndex: 'matched',
      key: 'matched',
      sorter: (a, b) => a.matched - b.matched,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
      align: 'center',
      render: (text, record) => {
        return {
          children: (
            <span>
              {text}
              <span className={classes.matchedSpan}>
                {' '}
                (
                {`${(
                  (100 * parseFloat(text)) /
                  parseFloat(record.count)
                ).toFixed(1)}%)`}
              </span>
            </span>
          ),
        };
      },
    },
    {
      title: (
        <Row className={classes.priceIndexRow}>
          <img
            src={getirlogo}
            alt="Getir"
            className={classes.priceIndexImage}
          />
          <span>{t(competitorType === 'multiple' ? 'GETIR' : 'GETIR_PRICE_INDEX')}</span>
        </Row>
      ),
      dataIndex: competitorType === 'multiple' ? 'getir_price_index' : 'price_index',
      key: competitorType === 'multiple' ? 'getir_price_index' : 'price_index',
      sorter: (a, b) => (competitorType === 'multiple'
        ? a.getir_price_index - b.getir_price_index
        : a.price_index - b.price_index),
      sortDirections: ['descend', 'ascend'],
      render: text => {
        if (text === 0) {
          return {
            props: {
              style: {
                fontWeight: 'bolder',
                backgroundColor: '#eeeeee',
                color: '#f4511e',
                fontStyle: 'italic',
              },
            },
            children: <div>{t(competitorType === 'multiple' ? 'NO_COMMON_PRODUCT_WAS_FOUND' : 'NO_MATCHED_PRODUCT_WAS_FOUND')}</div>,
          };
        }
        return {
          props: {
            style: {
              fontWeight: 'bolder',
              backgroundColor: backgroundColorCategoryFinder(text),
              color: colorCategoryFinder(text),
            },
          },
          children: <div>{parseFloat(text).toFixed(1)}</div>,
        };
      },
      align: 'center',
    },
  ];

  const addTableProperties = () => {
    return (
      currentCompetitorList.length > 0
        ? currentCompetitorList.map(competitor => {
          const tempCompetitor = competitor.split('-')[0];
          return tableProperties.push({
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
            dataIndex: `${tempCompetitor.toLowerCase()}_price_index`,
            key: 'price_index',
            sorter: (a, b) => a[`${tempCompetitor.toLowerCase()}_price_index`] -
              b[`${tempCompetitor.toLowerCase()}_price_index`],
            sortDirections: ['descend', 'ascend'],
            render: text => {
              if (text === 0) {
                return {
                  props: {
                    style: {
                      fontWeight: 'bolder',
                      backgroundColor: '#eeeeee',
                      color: '#f4511e',
                      fontStyle: 'italic',
                    },
                  },
                  children: <div>{t('NO_COMMON_PRODUCT_WAS_FOUND')}</div>,
                };
              }
              return {
                props: {
                  style: {
                    fontWeight: 'bolder',
                    backgroundColor: backgroundColorCategoryFinder(text),
                    color: colorCategoryFinder(text),
                  },
                },
                children: <div>{parseFloat(text).toFixed(1)}</div>,
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
