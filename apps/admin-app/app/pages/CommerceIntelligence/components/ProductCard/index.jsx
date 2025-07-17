import { memo } from 'react';

import useStyles from './styles';

const ProductCard = ({ title, subtitle, image, competitor }) => {
  const classes = useStyles();

  return (
    <div className={classes.productContainer}>
      <img
        src={image}
        alt={title}
        className={classes.productImage}
      />
      <div className={classes.productInfo}>
        <div>{title}</div>
        <div className={classes.productSize}>{subtitle}</div>
        {competitor?.image && (
          <img
            src={competitor.image}
            alt={competitor.name}
            className={classes.competitorImage}
          />
        )}
      </div>
    </div>
  );
};

export default memo(ProductCard);
