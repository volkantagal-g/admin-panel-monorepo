import { Button, Modal } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { getDiscountCodeUsageClients } from '../../redux/selectors';

const DiscountCodeUsageModal = ({ isModalVisible, discountCodeUsages, handleModal }) => {
  const dispatch = useDispatch();
  const clientData = useSelector(getDiscountCodeUsageClients.getData);
  const isClientDataPending = useSelector(getDiscountCodeUsageClients.getIsPending);
  const { t } = useTranslation('discountCodePage');

  const columns = [
    {
      title: t('global:CLIENT'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('global:DETAIL'),
      key: '_id',
      render: record => (
        <Link to={`/client/detail/${record._id}`} target="_blank">
          {t('global:DETAIL')}
        </Link>
      ),
    },
  ];

  useEffect(() => {
    if (discountCodeUsages?.length) {
      const clientIds = discountCodeUsages.map(({ client }) => client);
      dispatch(Creators.getDiscountCodeUsedClientsRequest({ clientIds }));
    }
  }, [dispatch, discountCodeUsages]);

  return (
    <Modal
      centered
      title={t('DISCOUNT_CODE_USED_CLIENTS')}
      visible={isModalVisible}
      onCancel={handleModal}
      footer={[
        <Button key="back" onClick={handleModal}>
          {t('button:CLOSE')}
        </Button>,
      ]}
    >
      <AntTableV2
        columns={columns}
        data={clientData}
        loading={isClientDataPending}
        total={clientData.length}
      />
    </Modal>
  );
};

export default DiscountCodeUsageModal;
