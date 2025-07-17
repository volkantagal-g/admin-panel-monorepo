import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectReducer from '@shared/utils/injectReducer';
import injectSaga from '@shared/utils/injectSaga';
import { BulkModalForm } from './components';
import reducer from './redux/reducer';
import saga from './redux/saga';

const PromoBulkPage = () => {
  const { t } = useTranslation('promoPage');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleModal}
      >
        {t('BULK_PROMO.TITLE')}
      </Button>
      <BulkModalForm visible={isModalVisible} onCancel={handleModal} />
    </>
  );
};

const reduxKey = REDUX_KEY.PROMO.BULK;

const withSaga = injectSaga({
  key: reduxKey,
  saga,
});
const withReducer = injectReducer({
  key: reduxKey,
  reducer,
});

export default compose(withReducer, withSaga)(PromoBulkPage);
