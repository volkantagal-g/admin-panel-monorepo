import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { orderDetailSelector } from '../../../../redux/selectors';
import { getLangKey } from '@shared/i18n';
import { currencyFormat } from '@shared/utils/localization';
import useStyles from '../../styles';
import { getProductTotalAmount } from '../../../utils';

/**
 * Displays bundled and non-bundled items.
 * Has different views for:
 *  - Bundled parent/child items without provision
 *  - Non-bundled items with provision
 *  - Non-bundled items without provision
 */
const BasketItem = ({ product, picked, isChild }) => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isoCountryCode = get(orderDetail, 'country.currency.code.alpha', 'TRY');
  const { format: currencyFormatter } = currencyFormat({ currency: isoCountryCode, maxDecimal: 4 });

  const classes = useStyles();

  const { fullName, totalAmount, children, provision, price, weightInfo, totalAmountWithBasketDiscount } = product;
  let { count } = product;
  if (weightInfo) count = 1;
  const totalWeightInKg = weightInfo ? `${(product.count ?? weightInfo.initialWeight) / 1000}kg` : '';
  const productWeight = weightInfo ? `${weightInfo?.initialWeightText ?? `${(weightInfo?.initialWeight ?? 0) / 1000}kg`}` : '';
  const totalProductAmount = getProductTotalAmount({ totalAmount, totalAmountWithBasketDiscount, count, price });
  const nameWithAmount = `
    ${count}x ${productWeight} 
    - 
    ${`${fullName[getLangKey()]} (${currencyFormatter(price)})`} 
    - 
    ${`${currencyFormatter(totalProductAmount)}`}
  `;
  const nameWithoutAmount = `
    ${count}x ${totalWeightInKg} 
    - 
    ${fullName[getLangKey()]}
  `;
  const preProvisionName = `
  ${count}x ${productWeight} 
    - 
    ${`${fullName[getLangKey()]} (${currencyFormatter(price)})`} 
    - 
  `;
  const postProvisionName = `
    ${`${count}x ${totalWeightInKg}`} 
    - 
    ${`${fullName[getLangKey()]}`} 
    - 
    ${currencyFormatter(totalProductAmount)}
  `;
  const pickedCount = picked > count ? count : picked;

  return (
    <>
      {(!children && !isChild && !provision) && (
        <li data-testid="normal-basket-item">
          <span>{nameWithAmount}</span>

          <strong>
            - ({pickedCount || 0}/{count})
          </strong>
        </li>
      )}
      {(children && !provision) && (
        <li data-testid="parent-basket-item">
          <span>{nameWithAmount}</span>
        </li>
      )}
      {(isChild && !provision) && (
      <li data-testid="child-basket-item">
        <span>
          {nameWithoutAmount}
          <strong>
            - ({pickedCount || 0}/{count})
          </strong>
        </span>
      </li>
      )}
      {(provision && !children && !isChild) && (
        <>
          <li data-testid="provisioned-basket-item-pre">
            <span>{preProvisionName}</span>
            <span className={classes.initialTotalAmount}>{currencyFormatter(provision?.initialTotalAmount)}</span>
          </li>
          <ul>
            <li data-testid="provisioned-basket-item-post">
              {postProvisionName}
              <strong>
                - ({pickedCount || 0}/{count})
              </strong>
            </li>
          </ul>
        </>
      )}
    </>
  );
};
BasketItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
  picked: PropTypes.number,
};
BasketItem.defaultProps = { picked: 0 };

export default BasketItem;
