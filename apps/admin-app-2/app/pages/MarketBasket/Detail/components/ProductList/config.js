import { getLangKey } from '@shared/i18n';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

export const getTableColumns = t => [
  {
    title: '#',
    dataIndex: 'picUrls',
    render: picUrls => (
      <img src={picUrls?.[getLangKey()]} alt="" height="50" />
    ),
  },
  {
    title: t('global:NAME'),
    dataIndex: 'names',
    render: name => name?.[getLangKey()],
  },
  {
    title: t('global:PRICE'),
    dataIndex: 'priceText',
  },
  {
    title: t('global:QUANTITY'),
    dataIndex: 'quantity',
  },
  {
    title: t('global:TOTAL'),
    dataIndex: 'totalPriceText',
  },
  {
    title: t('global:ACTION'),
    render: ({ id }) => {
      const basketDetailsUrl = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(
        ':id',
        id,
      );
      return (
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={basketDetailsUrl}
          permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL}
          target="_blank"
          data-testid="market-product-detail-link"
          size="small"
          type="primary"
        />
      );
    },
  },
];
