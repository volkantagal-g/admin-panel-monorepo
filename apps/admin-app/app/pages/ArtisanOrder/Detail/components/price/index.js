import PropTypes from 'prop-types';

import { currency } from '@shared/utils/common';
import { priceFormatter } from '@app/pages/ArtisanOrder/Detail/util';

import useStyles from '@app/pages/ArtisanOrder/Detail/components/price/styles';

const Price = ({ strikethroughPrice, price }) => {
  const classes = useStyles();

  // no-restricted-globals rule is disabled to be able to use just isNaN method instead of Number.isNaN
  // isNaN just checks whether the passed value is not a number or cannot be converted into a Number.
  // Number.isNaN on the other hand only checks if the value is equal to NaN
  // eslint-disable-next-line no-restricted-globals
  const combinePriceAndCurrency = value => (isNaN(value) ? value : `${priceFormatter(value)}${currency()}`);
  // eslint-disable-next-line no-restricted-globals
  const showStrikePrice = !isNaN(strikethroughPrice) ? strikethroughPrice > 0 : strikethroughPrice.replace(/\D/g, '') > 0;

  return (
    <div className={classes.priceContainer}>
      {showStrikePrice && (
        <span className={classes.strikethrough}>
          {combinePriceAndCurrency(strikethroughPrice)}
        </span>
      )}
      <span>
        {combinePriceAndCurrency(price)}
      </span>
    </div>
  );
};

Price.propTypes = {
  strikethroughPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Price.defaultProps = { strikethroughPrice: null };

export default Price;
