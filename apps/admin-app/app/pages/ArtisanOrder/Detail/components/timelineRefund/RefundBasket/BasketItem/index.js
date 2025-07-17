import Text from 'antd/lib/typography/Text';
import { Image } from 'antd';

import notFound from '@shared/assets/images/not-found.png';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/RefundBasket/BasketItem/styles';

const BasketItem = ({ product }) => {
  const classes = useStyles();

  return (
    <div className={classes.basketItem}>
      <Image
        className={classes.itemImg}
        preview={false}
        src={product.imageUrl}
        fallback={notFound}
      />
      <div>
        <Text className={classes.itemPrice} strong>
          {product.totalPriceText}
        </Text>
        <Text className={classes.itemText}>
          {product.productName} - {product.quantity}
        </Text>
      </div>
    </div>
  );
};

export default BasketItem;
