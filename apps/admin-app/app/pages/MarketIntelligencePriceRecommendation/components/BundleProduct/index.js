import { Card, Col, Image, Row } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';
import downArrow from '@app/pages/MarketIntelligencePriceRecommendation/img/down-arrow.png';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

const { Meta } = Card;

const BundleProduct = ({ bundleData, classes }) => {
  const countryDetail = useSelector(getSelectedCountryV2);
  const countryCurrency = countryDetail?.currency?.symbol;
  return (
    <Card
      hoverable
      className={classes.matchedProductCard}
      cover={(
        <Image
          fallback={noPicture}
          alt={bundleData?.bundle_product_name}
          src={bundleData?.bundle_image}
          className={classes.matchedProductCardImg}
        />
      )}
    >
      <Meta
        title={(
          <div className={classes.productCardName}>
            <Link
              to={`/marketProduct/detail/${bundleData.bundle_id}`}
              className={classes.productLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bundleData?.bundle_product_name}
            </Link>
          </div>
        )}
        description={(
          <Row>
            <Col span={6} className={classes.downArrowCard}>
              {bundleData &&
                bundleData?.bundle_discounted_price &&
                parseFloat(bundleData?.bundle_discounted_price) <
                  bundleData?.bundle_price && (
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
                {parseFloat(bundleData?.bundle_price)?.toFixed(2)}
              </div>
              {bundleData &&
              bundleData?.bundle_discounted_price &&
              bundleData?.bundle_discounted_price < bundleData?.bundle_price ? (
                <div className={classes.currentPriceDiv}>
                  {`${countryCurrency} ${parseFloat(
                    bundleData?.bundle_discounted_price,
                  )?.toFixed(2)} `}
                </div>
                ) : null}
            </Col>
          </Row>
        )}
      />
    </Card>
  );
};

export default BundleProduct;
