import { useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { Row } from 'antd';

import permKeys from '@shared/shared/permKey.json';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import BasketItem from '../BasketItem';
import { getProductTotalAmount } from '../../../utils';
import { ROUTE } from '@app/routes';

const BasketList = ({ orderDetail }) => {
  const { t } = useTranslation('marketOrderPage');

  const { basket, basketId, prepare, provision: orderProvision } = orderDetail ?? {};
  const provisionedProducts = get(orderProvision, 'products', []);

  const pickedCountProducts = useMemo(() => {
    const pickedProducts = prepare?.products || [];
    return pickedProducts.reduce((pickedProductMap, { selected: productId, count }) => {
      const temp = pickedProductMap;
      temp[productId] = temp[productId] || 0;
      temp[productId] += count;
      return temp;
    }, {});
  }, [prepare]);

  const basketProducts = useMemo(() => {
    const products = basket?.products || [];
    const bundleProducts = basket?.bundleProducts || [];

    const productsNoBundle = products.filter(product => !product?.bundle);
    const productsInBundle = products.filter(product => product?.bundle);
    const bundleProductsWithChildren = bundleProducts.map(bundleProduct => {
      const children = productsInBundle
        .filter(pr => pr.bundle.bundle === bundleProduct.product)
        ?.map(childProduct => ({
          ...childProduct,
          count:
          childProduct?.count > childProduct?.discountedCount
            ? childProduct?.discountedCount
            : childProduct?.count,
        }));
      return {
        ...bundleProduct,
        totalAmount: children.reduce((acc, child) => {
          const { totalAmount, totalAmountWithBasketDiscount, price, count } = child ?? {};
          return getProductTotalAmount({ totalAmount, totalAmountWithBasketDiscount, price, count }) + acc;
        }, 0),
        children,
      };
    });

    /*
      checked provisions for ALL of the products instead of checking only for the non-bundled products
      to not need a code change in the case of bundled products start having provisions in the future
    */
    const productsWithChildrenNoProvisionDetails = [...productsNoBundle, ...bundleProductsWithChildren];
    const productsWithChildrenAndProvisionDetails = productsWithChildrenNoProvisionDetails.map(product => {
      const provision = provisionedProducts.find(pProduct => pProduct._id === product.product);
      if (provision) {
        return {
          ...product,
          provision,
        };
      }
      return product;
    });

    return productsWithChildrenAndProvisionDetails;
  }, [basket, provisionedProducts]);

  const orderBasketId = basketId ?? basket?._id;
  const basketDetailRedirectLink = ROUTE.MARKET_BASKET_DETAIL.path.replace(':basketId', orderBasketId);

  return (
    <ul data-testid="basket-list">
      <Row align="center" justify="space-between" className="w-100">
        <strong>{t('TIMELINE.BASKET')}</strong>
        {basketId && (
        <RedirectButtonV2
          type="primary"
          text={t('global:DETAIL')}
          to={basketDetailRedirectLink}
          permKey={permKeys.PAGE_MARKET_BASKET_DETAIL}
          target="_blank"
          size="small"
        />
        )}
      </Row>
      {basketProducts.map(product => {
        return (
          <Fragment key={product.product}>
            <BasketItem product={product} picked={pickedCountProducts[product.product]} />
            {product.children && (
              <ul>
                {product.children.map(childProduct => {
                  return (
                    <Fragment key={childProduct}>
                      <BasketItem product={childProduct} picked={pickedCountProducts[childProduct?.product]} isChild />
                    </Fragment>
                  );
                })}
              </ul>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default BasketList;
