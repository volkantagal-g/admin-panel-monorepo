import { Card, Col, Divider, Image, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

import { getSelectedCountryCurrencySymbol } from '@shared/redux/selectors/countrySelection';

const { Meta } = Card;

const BundleDetailCard = ({ singleData, bundleData, classes }) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const countryCurrency = getSelectedCountryCurrencySymbol();

  return (
    <Card
      hoverable
      className={`${classes.bundleProductCard} ${
        bundleData.bundle_status
          ? classes.bundleStatusTrue
          : classes.bundleStatusFalse
      }`}
      cover={(
        <Tooltip title={t('INDEX_FORMULA')} placement="bottom">
          <div
            className={`${classes.bundleDetailCardIndex} ${
              bundleData.bundle_status
                ? classes.bundleIndexStatusTrue
                : classes.bundleIndexStatusFalse
            }`}
          >
            {t('INDEX')} {parseFloat(bundleData.bundle_index).toFixed(2)}
          </div>
          <Divider />
        </Tooltip>
      )}
    >
      <Meta
        title={(
          <Row gutter={24}>
            <Col span={11} className={classes.bundleDetailProductCol}>
              <div>
                <Image
                  fallback={noPicture}
                  alt={singleData?.product_name}
                  src={singleData?.picurl}
                  className={classes.matchedProductCardImg}
                />
                <div className={classes.productCardNameBundle}>
                  <Tooltip title={singleData?.product_name} placement="bottom">
                    <Link
                      to={`/marketProduct/detail/${singleData.getir_product_id}`}
                      className={classes.productLinkBundle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {singleData?.product_name}
                    </Link>
                  </Tooltip>
                </div>
                <div className={classes.competitorCurrentPriceBundle}>
                  <Tooltip title={t('PRODUCT_NEW_PRICE')} placement="bottom">
                    {countryCurrency}{' '}
                    {parseFloat(singleData?.new_price)?.toFixed(2)}
                  </Tooltip>
                </div>

                <div className={classes.productColumn}>
                  {singleData?.price &&
                    singleData?.new_price &&
                    singleData?.new_price.toFixed(2) !==
                      singleData?.price.toFixed(2) && (
                      <Tooltip
                        title={t('PRODUCT_CURRENT_PRICE')}
                        placement="bottom"
                      >
                        <div className={classes.struckPriceBundleDetail}>
                          {countryCurrency}{' '}
                          {parseFloat(singleData?.price)?.toFixed(2)}
                        </div>
                      </Tooltip>
                  )}
                </div>
              </div>
            </Col>
            <Col span={2} className={classes.bundleDetailDivider}>
              <Divider
                type="vertical"
                className={classes.bundleDetailColDivider}
              />
            </Col>
            <Col span={11} className={classes.bundleDetailProductCol}>
              <div>
                <Image
                  fallback={noPicture}
                  alt={bundleData?.bundle_product_name}
                  src={bundleData?.bundle_image}
                  className={classes.matchedProductCardImg}
                />
                <div className={classes.productCardNameBundle}>
                  <Tooltip
                    title={bundleData?.bundle_product_name}
                    placement="bottom"
                  >
                    <Link
                      to={`/marketProduct/detail/${bundleData.bundle_id}`}
                      className={classes.productLinkBundle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {bundleData?.bundle_product_name}
                    </Link>
                  </Tooltip>
                </div>
                <div className={classes.competitorCurrentPriceBundle}>
                  {countryCurrency}{' '}
                  {parseFloat(bundleData?.bundle_price)?.toFixed(2)}
                </div>
                <div className={classes.currentPriceDiv}>
                  {bundleData?.bundle_product_price && (
                    <Tooltip
                      title={t('BUNDLE_PRODUCT_PRICE')}
                      placement="bottom"
                    >
                      {countryCurrency}{' '}
                      {parseFloat(bundleData?.bundle_product_price)?.toFixed(2)}
                    </Tooltip>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        )}
      />
    </Card>
  );
};

export default BundleDetailCard;
