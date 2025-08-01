import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import GetirMoneySpendingDetail from './GetirMoneySpendingDetail';

const GetirFinanceServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_FINANCE_SERVICE_DETAIL')} activeKey="getirFinance">
      <GetirMoneySpendingDetail />
    </CollapsePanel>
  );
};

export default GetirFinanceServiceDetail;
