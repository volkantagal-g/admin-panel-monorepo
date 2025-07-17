import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';

function Pickers(props) {
  const { pickers } = props;
  const { t } = useTranslation();
  const { canAccess } = usePermission();

  return (
    <Card>
      <AntTableV2
        title={t('warehousePage:PICKERS')}
        data={pickers}
        columns={tableColumns(canAccess)}
      />
    </Card>
  );
}

export default Pickers;
