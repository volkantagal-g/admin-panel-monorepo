import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { generateColumns } from '@app/pages/GetirFood/OrderDetail//components/ivrActionsTable/config';

const IvrActionsTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('foodOrderPage');
  const ivrActionTable = get(orderDetail, 'ivrActionResults', []);

  const tableColumns = useMemo(() => {
    return generateColumns({ t });
  }, [t]);

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
