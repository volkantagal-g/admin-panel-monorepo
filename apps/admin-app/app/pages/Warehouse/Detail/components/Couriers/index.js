import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';
import { usePermission } from '@shared/hooks';
import AntTableV2 from '@shared/components/UI/AntTableV2';

function Couriers(props) {
  const { couriers } = props;
  const { t } = useTranslation();
  const { canAccess } = usePermission();
  return (
    <Card>
      <AntTableV2
        title={t('warehousePage:COURIERS')}
        data={couriers}
        columns={tableColumns(canAccess)}
      />
    </Card>
  );
}

export default Couriers;
