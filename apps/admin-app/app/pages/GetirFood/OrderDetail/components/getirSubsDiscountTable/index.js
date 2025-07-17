import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import { get } from 'lodash';

import { currency } from '@shared/utils/common';
import useStyles from './styles';
import { orderDetailSelector } from '@app/pages/GetirFood/OrderDetail/redux/selectors';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import Card from '@shared/components/UI/AntCard';
import { tableColumns, subsTableData } from './config';

const GetirSubsDiscountTable = () => {
  const { Text } = Typography;
  const classes = useStyles();
  const { t } = useTranslation('foodOrderPage');
  const orderDetail = useSelector(orderDetailSelector.getData);
  const isPending = useSelector(orderDetailSelector.getIsPending);
  const subsId = get(orderDetail, 'subscriptionId', '');
  const totalDiscount = get(orderDetail, 'totalDiscountUsed', 0);

  const getTableColumns = useMemo(
    () => tableColumns({ t }),
    [t],
  );

  const getSubsTableData = useMemo(
    () => subsTableData({ t, order: orderDetail }),
    [t, orderDetail],
  );

  return (
    <Card>
      <div className={classes.tableTitle}>
        <Text>{t('GETIR_SUBS_TABLE.TITLE')}</Text> <Text strong>{subsId}</Text>
      </div>
      <AntTableV2
        dataSource={getSubsTableData}
        columns={getTableColumns}
        loading={isPending}
        showFooter={false}
      />
      {
        !!totalDiscount && (
          <div className={classes.tableFooter}>
            <Text>{t('GETIR_SUBS_TABLE.TOTAL_AMOUNT_USED')}</Text> <Text strong>{`${totalDiscount.toFixed(2)} ${currency()}`}</Text>
          </div>
        )
      }
    </Card>
  );
};

export default GetirSubsDiscountTable;
