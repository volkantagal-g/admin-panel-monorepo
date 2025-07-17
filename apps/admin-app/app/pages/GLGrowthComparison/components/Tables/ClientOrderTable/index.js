import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntTable from '@shared/components/UI/AntTable';
import { constantRules } from './config';
import { clientOrderDataSelector, requestedDateSelector } from '../../../redux/selectors';

const ClientOrderTable = () => {
  const { t } = useTranslation('glGrowthComparisonPage');
  const clientOrderData = useSelector(clientOrderDataSelector.getData);
  const clientOrderDataIsPending = useSelector(clientOrderDataSelector.getIsPending);
  const requestedDate1 = useSelector(requestedDateSelector.getSelectedDate1);
  const requestedDate2 = useSelector(requestedDateSelector.getSelectedDate2);

  return (
    <AntTable
      title={t('CLIENT_ORDERS')}
      data={clientOrderData}
      columns={constantRules(requestedDate1, requestedDate2, t)}
      loading={clientOrderDataIsPending}
    />
  );
};

export default ClientOrderTable;
