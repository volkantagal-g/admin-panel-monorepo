import { useTranslation } from 'react-i18next';

import CollapsePanel from '../common/CollapsePanel';
import ConsentApprovalDetail from './ConsentApprovalDetail';
import VisitorDetail from './VisitorDetail';

const GetirN11ServiceDetail = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <CollapsePanel isParent header={t('N11')} activeKey="getirN11">
      <ConsentApprovalDetail />
      <VisitorDetail />
    </CollapsePanel>
  );
};

export default GetirN11ServiceDetail;
