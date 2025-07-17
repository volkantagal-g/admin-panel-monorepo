import { useSelector } from 'react-redux';

import { domainSummaryTableDataSelector } from '../../redux/selectors';
import useParentStyles from '../styles';

import TheTable from '../TheTable';
import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import { GROWTH_DASHBOARD_DOMAIN_TYPES } from './constant';

const GrowthDomainSummaryTable = () => {
  const parentClasses = useParentStyles();

  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GROWTH_DASHBOARD_DOMAIN_TYPES));
  const formattedData = useSelector(domainSummaryTableDataSelector.getFormattedData(parentClasses, availableDomainTypes));
  const isDomainSummaryTableDataPending = useSelector(domainSummaryTableDataSelector.getIsPending);

  return <TheTable data={formattedData?.domainSummaryTableData} isPending={isDomainSummaryTableDataPending} />;
};

export default GrowthDomainSummaryTable;
