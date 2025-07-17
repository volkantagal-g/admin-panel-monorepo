import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import Card from '@shared/components/UI/AntCard';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

import { orderDetailSelector } from '../../redux/selectors';

import { tableColumns } from './config';

const PaymentCartInfoTable = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const { t } = useTranslation('waterOrderPage');

  const tableData = [
    {
      bankName: _.get(orderDetail, 'bankName', ''),
      cardNo: _.get(orderDetail, 'cardNo', ''),
      posBank: _.get(orderDetail, 'posBank', ''),
      transactionId: _.get(orderDetail, 'transactionId', ''),
    },
  ];

  const { Can } = usePermission();

  return (
    <Can permKey={permKey.PAGE_WATER_ORDER_DETAIL_CREDIT_CARD_INFO}>
      <Card>
        <AntTable title={t('CARD.INFO')} data={tableData} columns={tableColumns(t)} loading={isPending} />
      </Card>
    </Can>
  );
};

export default PaymentCartInfoTable;
