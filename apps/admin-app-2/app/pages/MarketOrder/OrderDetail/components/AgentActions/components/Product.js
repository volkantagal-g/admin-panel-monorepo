import cn from 'classnames';
import { Tooltip } from 'antd';

import useStyles from './Product.styles';

const Product = ({ className, name, image, price, discountedPrice }) => {
  const styles = useStyles();

  return (
    <div className={cn(styles.product, className)}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>

      <div className={styles.content}>
        <div className={styles.price}>
          <div className={styles.price}>
            {
              discountedPrice ? (
                <div className={styles.discounted}>
                  <span>{discountedPrice}</span>
                  <del>{price}</del>
                </div>
              ) : (
                <> { price } </>
              )
            }
          </div>
        </div>

        <Tooltip title={name} getPopupContainer={triggerNode => triggerNode.parentElement}>
          <div className={styles.name}>{name}</div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Product;
