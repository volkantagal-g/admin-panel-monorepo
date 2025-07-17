import RedirectText from '@shared/components/UI/RedirectText';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

export const getTableColumns = (t, currencyFormatter) => [
  {
    title: t('SUBSCRIPTION_BENEFIT_INFO.BENEFIT_TITLE'),
    render: ({ name, promoId }) => {
      return promoId ? (
        // note: old link was to the old panel, replaced with internal promo detail link. please refactor if you want to.
        <RedirectText
          text={name}
          to={ROUTE.PROMO_DETAIL.path.replace(':id', promoId)}
          permKey={permKey.PAGE_PROMO_DETAIL}
        />
      ) : name;
    },
  },
  {
    title: t('SUBSCRIPTION_BENEFIT_INFO.AMOUNT'),
    dataIndex: 'amount',
    render: amount => currencyFormatter(amount),
  },
];
