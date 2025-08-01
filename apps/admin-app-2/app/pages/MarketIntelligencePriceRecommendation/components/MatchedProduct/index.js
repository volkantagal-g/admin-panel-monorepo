import { Badge, Card, Col, Image, Row, Tag, Tooltip } from 'antd';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';
import downArrow from '@app/pages/MarketIntelligencePriceRecommendation/img/down-arrow.png';

import { COMPETITORS, INDIRECT_TYPE } from '../../constants';
import { getSelectedCountryCurrencySymbol } from '@shared/redux/selectors/countrySelection';

const { Meta } = Card;

const MatchedProduct = ({ matchedData, competitor, classes, productData, isCompetitor }) => {
  const countryCurrency = getSelectedCountryCurrencySymbol();

  return (
    <Card
      hoverable
      className={classes.matchedProductCard}
      cover={(
        <Badge.Ribbon
          text={COMPETITORS[competitor] && COMPETITORS[competitor][0]}
          color={isCompetitor ? 'rgb(255, 152, 0)' : '#5d3ebc'}
        >
          <Image
            fallback={noPicture}
            alt={
              isCompetitor && matchedData?.competitor_product_name
                ? matchedData?.competitor_product_name
                : productData?.product_name
            }
            src={
              isCompetitor && matchedData?.competitor_image
                ? matchedData?.competitor_image
                : productData?.picurl
            }
            className={classes.matchedProductCardImg}
          />
        </Badge.Ribbon>
      )}
    >
      <Meta
        title={
          isCompetitor && matchedData?.competitor_product_name
            ? matchedData?.competitor_product_name
            : productData?.product_name
        }
        description={(
          <Col>
            <div
              className={classes.cardFrontTagWrapper}
            >
              {matchedData?.competitor_indirect_label ? (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col span={16} className={classes.indirectDDetailProductCol}>
                    {matchedData?.competitor_indirect_label?.length > 0 &&
                      matchedData?.competitor_indirect_label.map(
                        label => label && (
                        <Tag
                          id="ant-tag-indirect"
                          color={INDIRECT_TYPE[label?.toUpperCase()]?.color}
                          className={classes.tagIndirectColumn}
                        >
                          {INDIRECT_TYPE[label?.toUpperCase()]?.name}
                        </Tag>
                        ),
                      )}
                  </Col>
                  {matchedData?.competitor_parameter &&
                  matchedData?.competitor_parameter !== 0 ? (
                    <Col span={8} className={classes.indirectDDetailProductCol}>
                      <Tooltip placement="bottom" title="Parameter">
                        <div
                          style={{
                            display: 'flex',
                            fontSize: '8px',
                            color:
                              matchedData?.competitor_parameter < 0
                                ? 'red'
                                : 'green',
                            fontWeight: 'bold',
                          }}
                        >
                          ({' '}
                          {`${
                            matchedData?.competitor_parameter < 0
                              ? `-%${matchedData.competitor_parameter * -1}`
                              : `+%${matchedData.competitor_parameter}`
                          }`}{' '}
                          )
                        </div>
                      </Tooltip>
                    </Col>
                    ) : (
                      ''
                    )}
                </div>
              ) : (
                ''
              )}
            </div>

            <Row>
              <Col span={6} className={classes.downArrowCard}>
                {isCompetitor &&
                  matchedData &&
                  matchedData?.competitor_discounted_price &&
                  parseFloat(matchedData?.competitor_discounted_price) <
                    matchedData?.competitor_price && (
                    <img
                      src={downArrow}
                      alt="down"
                      className={classes.currentPriceImg}
                    />
                )}
              </Col>
              <Col
                span={12}
                justify="start"
                align="center"
                direction="column"
                className={classes.columnDiv}
              >
                <div className={classes.competitorCurrentPrice}>
                  {countryCurrency}{' '}
                  {parseFloat(
                    isCompetitor
                      ? matchedData?.competitor_price
                      : productData?.price,
                  )?.toFixed(2)}
                  <div className={classes.currentPriceDiv}>
                    {matchedData?.competitor_indirect_label &&
                      isCompetitor &&
                      `(${(
                        ((100 + matchedData.competitor_parameter) *
                          matchedData.competitor_price) /
                        100
                      )?.toFixed(2)})`}
                  </div>
                </div>
                {isCompetitor &&
                matchedData &&
                productData?.is_direct_match &&
                matchedData?.competitor_discounted_price &&
                matchedData?.competitor_discounted_price <
                  matchedData?.competitor_price ? (
                    <div className={classes.currentPriceDiv}>
                      {`${countryCurrency} ${parseFloat(
                        matchedData?.competitor_discounted_price,
                      )?.toFixed(2)} `}
                    </div>
                  ) : null}
              </Col>
            </Row>
          </Col>
        )}
      />
    </Card>
  );
};

export default MatchedProduct;
