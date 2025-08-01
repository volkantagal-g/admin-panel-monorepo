import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import permKey from '@shared/shared/permKey.json';
import { getProductTotalAmount } from '../utils';

export const getTableColumns = (t, classes, currencyFormatter) => [
  {
    title: '#',
    width: 300,
    dataIndex: 'picURL',
    render: picURL => (
      <img
        className={classes.image}
        src={picURL?.[getLangKey()]}
        alt=""
        height="50"
      />
    ),
  },
  {
    title: t('NAME'),
    dataIndex: 'fullName',
    width: '50%',
    render: fullName => fullName?.[getLangKey()],
  },
  {
    title: t('PRICE'),
    dataIndex: 'price',
    render: (_, product) => {
      const discountedPrice =
        product.discountedPrice || product.discountedTotalAmount;
      if (discountedPrice) {
        return (
          <div className={classes.priceWithDiscount}>
            <span className={classes.price}>
              {currencyFormatter(discountedPrice)}
            </span>
            <del>{currencyFormatter(product.price)}</del>
          </div>
        );
      }

      return (
        <span className={classes.price}>
          {currencyFormatter(product.price)}
        </span>
      );
    },
  },
  {
    title: t('QTY'),
    dataIndex: 'count',
    key: 'count',
    render: (count, { weight }) => <span>{weight ?? count}</span>,
  },
  {
    title: t('TOTAL_PRICE'),
    dataIndex: 'totalAmount',
    render: (_, product) => {
      const {
        totalAmountWithBasketDiscount,
        discountedTotalAmount,
        totalAmount,
        price,
        count,
        weightInfo,
      } = product ?? {};
      const totalPrice = weightInfo ? (price * count) : getProductTotalAmount({
        totalAmount,
        totalAmountWithBasketDiscount,
        price,
        count,
        discountedTotalAmount,
      });
      return (
        <span className={classes.price}>{currencyFormatter(totalPrice || 0)}</span>
      );
    },
  },
  {
    title: '',
    dataIndex: 'product',
    render: product => {
      const productPath = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(
        ':id',
        product,
      );
      return (
        <RedirectButtonV2
          to={productPath}
          target="_blank"
          text={t('global:DETAIL')}
          permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL}
        />
      );
    },
  },
];
