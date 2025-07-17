import { Badge, Card, Image } from 'antd';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

const { Meta } = Card;

const FamilyLeadProduct = ({ familyData, classes, size = 2 }) => {
  return (familyData ? (
    <Card
      hoverable
      className={
        size === 1 ? classes.familyProductCardSmall : classes.familyProductCard
      }
      cover={
        familyData?.is_family_lead_product ? (
          <Badge.Ribbon text="Lead" color="volcano">
            <Image
              fallback={noPicture}
              alt={familyData?.product_name}
              src={familyData?.picurl}
              className={size === 1 ? classes.familyProductCardImgSmall : classes.familyProductCardImg}
            />
          </Badge.Ribbon>
        ) : (
          <Image
            fallback={noPicture}
            alt={familyData?.product_name}
            src={familyData?.picurl}
            className={size === 1 ? classes.familyProductCardImgSmall : classes.familyProductCardImg}
          />
        )
      }
    >
      <Meta
        title={(
          <div className={classes.productCardName}>
            <a
              href={`https://admin.getir.com/marketProduct/detail/${familyData?.getir_product_id}`}
              target="_blank"
              rel="noreferrer"
              className={classes.productLink}
            >
              <div
                className={size === 1 ? classes.productNameLeadProduct : null}
              >
                {familyData?.product_name}
              </div>
            </a>
          </div>
        )}
      />
    </Card>
  )
    : ''
  );
};

export default FamilyLeadProduct;
