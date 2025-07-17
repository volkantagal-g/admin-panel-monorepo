import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import columnsConfig from './config';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { transactionDetailSelector } from '@app/pages/Client/Detail/redux/selectors';
import { getLangKey } from '@shared/i18n';
import { Creators } from '@app/pages/Client/Detail/redux/actions';

const TransactionsModal = id => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const hasSubscriptionDetailViewPermission = canAccess(permKey.PAGE_CLIENT_DETAIL_SUBSCRIPTION_DETAILS_DISPLAY);
  const transactionData = useSelector(transactionDetailSelector.getTransactionDetails);
  const isPending = useSelector(transactionDetailSelector.isPending);
  const { t } = useTranslation('clientDetail');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const langKey = getLangKey();
  const open = () => {
    if (hasSubscriptionDetailViewPermission) {
      const { cycleId } = id;

      dispatch(Creators.getTransactionDetailsRequest({ cycleId }));
    }

    setIsModalVisible(true);
  };

  const close = () => {
    setIsModalVisible(false);
  };

  const columns = useMemo(() => columnsConfig(t, langKey), [t, langKey]);

  return (
    <>
      <Button
        type="default"
        onClick={open}
        size="small"
      >
        Transactions
      </Button>
      <Modal
        title="Transactions Plan"
        visible={isModalVisible}
        onOk={close}
        onCancel={close}
        destroyOnClose
      >
        <AntTableV2 data={transactionData?.data?.transactions} columns={columns} loading={isPending} />
      </Modal>
    </>
  );
};

export default TransactionsModal;
