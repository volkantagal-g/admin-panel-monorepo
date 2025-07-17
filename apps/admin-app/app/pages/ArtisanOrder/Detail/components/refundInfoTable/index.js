import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { orderDetailSelector } from '../../redux/selectors';
import AntTable from '@shared/components/UI/AntTable';
import Card  from '@shared/components/UI/AntCard';
import { tableColumns } from './config';
import { formatDate } from '@shared/utils/dateHelper';
import Spinner from '@shared/components/Spinner';

const RefundInfoTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const user = orderDetail.refundedBy?.user;
  const { t } = useTranslation('artisanOrderPage');

  const refundedDate = orderDetail.refundedBy?.refundedDate ? formatDate(orderDetail.refundedBy?.refundedDate) : null;
  const refundedName = user?.name;
  const refundInfoData = [{
    date: refundedDate,
    name: refundedName,
  }];

  if (_.isNull(refundedDate)) return null;

  if (refundInfoData.length) {
    <Spinner />;
  };

  return(
    <>
      <Card>
        <AntTable
          title={t('ACTION.REFUND_INFO')}
          data={refundInfoData}
          columns={tableColumns}
          loading={isPending}>
        </AntTable>
      </Card>
    </>
  );
};

export default RefundInfoTable;
