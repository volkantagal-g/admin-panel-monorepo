import cn from 'classnames';
import { Tooltip } from 'antd';

import useStyles from './styles';

/**
 * @param {object} Props
 * @param {string} Props.className
 * @param {string} Props.image
 * @param {string} Props.name
 * @param {string} Props.price
 */
const Product = ({ className, name, image, price }) => {
  const styles = useStyles();

  return (
    <div className={cn(styles.product, className)}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>

      <div className={styles.content}>
        <div className={styles.price}>{price}</div>

        <Tooltip title={name} getPopupContainer={triggerNode => triggerNode.parentElement}>
          <div className={styles.name}>{name}</div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Product;
