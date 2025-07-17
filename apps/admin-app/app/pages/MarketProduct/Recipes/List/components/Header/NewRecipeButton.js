import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Button } from '@shared/components/GUI';
import NewRecipeModal from 'pages/MarketProduct/Recipes/List/components/Header/NewRecipeModal';
import { Creators } from 'pages/MarketProduct/Recipes/List/redux/actions';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from 'pages/MarketProduct/Recipes/List/redux/reducer';
import saga from 'pages/MarketProduct/Recipes/List/redux/saga';
import { REDUX_KEY } from '@shared/shared/constants';

const NewRecipeButton = memo(() => {
  const reduxKey = REDUX_KEY.MARKET_PRODUCT.RECIPES.LIST;

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');

  return (
    <>
      <Button
        onClick={() => dispatch(Creators.openNewRecipeModal())}
      >
        {t('NEW_RECIPE.BUTTON')}
      </Button>
      <NewRecipeModal />
    </>
  );
});

export default NewRecipeButton;
