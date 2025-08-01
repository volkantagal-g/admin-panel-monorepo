import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector } from '@shared/redux/selectors/common';

import { executiveStatsSelector, filtersSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import useStyles from './styles';
import { TEST_ID } from '../../testing';

const PromoTable = () => {
  const { t } = useTranslation('activeOrdersForExecutiveDashboardPage');
  const classes = useStyles();

  const selectedDomainType = useSelector(filtersSelector.getDomainType);

  const columns = useMemo(() => tableColumns(selectedDomainType), [selectedDomainType]);

  const data = useSelector(executiveStatsSelector.getFormattedPromoData);
  const isPending = useSelector(executiveStatsSelector.getIsPending);
  const isDomainAvailabilityLoading = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const isIntegrationAvailabilityLoading = useSelector(availableIntegrationTypesForCountrySelector.getIsPending);

  return (
    <AntTableV2
      title={t('global:PROMOS')}
      data={data}
      columns={columns}
      loading={isPending || isDomainAvailabilityLoading || isIntegrationAvailabilityLoading}
      className={classes.antTable}
      data-testid={TEST_ID.PROMO_TABLE}
    />
  );
};

export default PromoTable;
