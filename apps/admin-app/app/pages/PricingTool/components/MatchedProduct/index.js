import { Badge, Card, Col, Image, Row } from 'antd';

import noPicture from '../../assets/img/no-pictures.png';
import downArrow from '../../assets/img/down-arrow.png';
import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const { Meta } = Card;

const country = getSelectedCountry();
const currency = country.currency.symbol;

const MatchedProduct = ({ matchedData, competitor, classes, t }) => {
  return (
    <Card
      hoverable
      className={classes.matchedProductCard}
      cover={(
        <Badge.Ribbon text={COMPETITORS[competitor][0]} color="#E3E5E5">
          <Image
            fallback={noPicture}
            alt={matchedData.competitor_product_name}
            src={matchedData.competitor_image}
            className={classes.matchedProductCardImg}
          />
        </Badge.Ribbon>
      )}
    >
      <Meta
        title={matchedData.competitor_product_name}
        description={(
          <Row>
            <Col span={6} className={classes.downArrowCard}>
              {matchedData.competitor_discounted_price &&
                parseFloat(matchedData.competitor_discounted_price) <
                  matchedData.competitor_price && (
                  <img
                    src={downArrow}
                    alt={t('DOWN')}
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
              <div>
                {parseFloat(matchedData.competitor_price).toFixed(2)} {currency}
              </div>
              {matchedData.competitor_discounted_price &&
              matchedData.competitor_discounted_price <
                matchedData.competitor_price ? (
                  <div className={classes.currentPriceDiv}>
                    {`${parseFloat(
                      matchedData.competitor_discounted_price,
                    ).toFixed(2)} ${currency}`}
                  </div>
                ) : null}
            </Col>
          </Row>
        )}
      />
    </Card>
  );
};

export default MatchedProduct;
