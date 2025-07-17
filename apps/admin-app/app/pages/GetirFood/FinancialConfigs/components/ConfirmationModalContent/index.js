import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';

const ConfirmationModalContent = ({ changedItems }) => {
  const { t } = useTranslation('foodFinancialConfigsPage');
  return (
    <AntTableV2
      data={changedItems}
      columns={tableColumns(t)}
      showFooter={false}
    />
  );
};

export default ConfirmationModalContent;
