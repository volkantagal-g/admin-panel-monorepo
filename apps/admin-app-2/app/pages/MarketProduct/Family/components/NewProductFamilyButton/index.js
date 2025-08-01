import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button } from '@shared/components/GUI';
import NewProductFamilyModal from 'pages/MarketProduct/Family/components/NewProductFamilyButton/NewProductFamilyModal';
import { Creators } from 'pages/MarketProduct/Family/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from '@app/pages/MarketProduct/Family/redux/reducer';
import saga from '@app/pages/MarketProduct/Family/redux/saga';
import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.MARKET_PRODUCT.FAMILY;

const NewProductFamilyButton = memo(() => {
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductFamilyPage');

  return (
    <>
      <Button
        onClick={() => dispatch(Creators.openNewFamilyModal())}
      >
        {t('PRODUCT_FAMILY_LIST.NEW_PRODUCT_FAMILY')}
      </Button>
      <NewProductFamilyModal />
    </>
  );
});

export default NewProductFamilyButton;
