import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { newPromotionsSaga } from './redux/saga';
import { AddModalForm } from './components';
import { NewPromotionSlice } from '@app/pages/Promo/New/redux/slice';

export default function PromoNewPage() {
  const { t } = useTranslation('promoPage');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useInjectReducer({ key: NewPromotionSlice.reducerPath, reducer: NewPromotionSlice.reducer });
  useInjectSaga({ key: NewPromotionSlice.reducerPath, saga: newPromotionsSaga });

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Button
        id="btn-new-promo"
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleModal}
      >
        {t('NEW_PROMO.TITLE')}
      </Button>
      <AddModalForm
        visible={isModalVisible}
        onCancel={handleModal}
      />
    </>
  );
}
