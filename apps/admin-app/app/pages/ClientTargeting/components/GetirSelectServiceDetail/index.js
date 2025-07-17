import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import BenefitUsage from './BenefitUsageDetail';
import MembershipDate from './MembershipDate';
import MembershipDetail from './MembershipDetail';
import PaymentTypeDetail from './PaymentTypeDetail';

const GetirSelectServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('GETIR_SELECT_SERVICE_DETAIL')} activeKey="getirSelect">
      <MembershipDetail />
      <MembershipDate />
      <PaymentTypeDetail />
      <BenefitUsage />
    </CollapsePanel>
  );
};

export default GetirSelectServiceDetail;
