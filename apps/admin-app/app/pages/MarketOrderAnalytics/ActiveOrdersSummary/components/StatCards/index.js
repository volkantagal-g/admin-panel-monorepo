import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { executiveStatsSelector } from '../../redux/selectors';

import StatCard from '../StatCard';
import useStyles from './styles';
import { numberFormatWithoutDecimal, currencyFormat } from '@shared/utils/localization';

const baseCurrencyFormatter = currencyFormat({ maxDecimal: 2 });

export default function StatCards() {
  const classes = useStyles();
  const { t } = useTranslation('activeOrdersForExecutiveDashboardPage');
  const financialStats = useSelector(executiveStatsSelector.getFinancials);
  return (
    <div className={classes.statCards}>
      <StatCard
        title={t('ACTIVE_ORDERS')}
        value={numberFormatWithoutDecimal.format(financialStats?.totalOrder)}
        tooltip={t('RESERVED_NOT_INCLUDED_TOOLTIP')}
      />
      <StatCard
        title={t('SCHEDULED_ONLY')}
        value={financialStats?.scheduledOrderCount}
        tooltip={t('RESERVED_NOT_INCLUDED_TOOLTIP')}
      />
      <StatCard
        title={t('TOTAL_DISCOUNT')}
        value={baseCurrencyFormatter.format(financialStats?.totalDiscount)}
      />
      <StatCard
        title={t('AVG_DISCOUNT')}
        value={baseCurrencyFormatter.format(financialStats?.avgDiscount)}
      />
      <StatCard
        title={t('AVG_BASKET')}
        value={baseCurrencyFormatter.format(financialStats?.avgBasket)}
      />
    </div>
  );
}
