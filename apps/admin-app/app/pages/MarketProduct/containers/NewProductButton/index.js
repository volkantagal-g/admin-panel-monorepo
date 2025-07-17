import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button } from '@shared/components/GUI';
import NewProductModal from 'pages/MarketProduct/containers/NewProductButton/NewProductModal';
import { Creators } from 'pages/MarketProduct/containers/NewProductButton/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from 'pages/MarketProduct/containers/NewProductButton/redux/reducer';
import saga from 'pages/MarketProduct/containers/NewProductButton/redux/saga';
import { reduxKey } from 'pages/MarketProduct/containers/NewProductButton/constants';

const NewProductButton = memo(() => {
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');

  return (
    <>
      <Button
        onClick={() => dispatch(Creators.openModal())}
      >
        {t('PRODUCT_DETAILS.NEW_PRODUCT')}
      </Button>
      <NewProductModal />
    </>
  );
});

export default NewProductButton;
