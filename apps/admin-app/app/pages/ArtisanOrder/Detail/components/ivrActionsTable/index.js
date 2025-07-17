import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { orderDetailSelector } from '../../redux/selectors';
import AntTable from '@shared/components/UI/AntTableV2';
import Card from '@shared/components/UI/AntCard';
import { tableColumns } from './config';

const IvrActionsTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('artisanOrderPage');
  const ivrActionTable = orderDetail.ivrActions || [];

  return (
    <Card>
      <AntTable
        title={t('IVR_ACTION.TITLE')}
        data={ivrActionTable}
        columns={tableColumns}
        loading={isPending}
      />
    </Card>
  );
};

export default IvrActionsTable;
