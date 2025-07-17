import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isNull, get } from 'lodash';

import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { generateColumns } from './config';
import { formatDate } from '@shared/utils/dateHelper';

const RefundInfoTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const refDate = get(orderDetail, 'refundedBy.refundedDate', null);
  const user = get(orderDetail, 'refundedBy.user', {});
  const { t } = useTranslation('foodOrderPage');

  const refundedDate = refDate ? formatDate(refDate) : null;
  const refundedName = get(user, 'name', '');
  const refundInfoData = [{
    date: refundedDate,
    name: refundedName,
  }];

  const tableColumns = useMemo(() => {
    return generateColumns({ t });
  }, [t]);

  if (isNull(refundedDate)) return null;

  return (
    <Card>
      <AntTable
        title={t('ACTION.REFUND_INFO')}
        data={refundInfoData}
        columns={tableColumns}
        loading={isPending}
      />
    </Card>
  );
};

export default RefundInfoTable;
