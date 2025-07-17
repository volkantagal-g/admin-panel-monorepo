import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import RecipeSummary from '@app/pages/MarketProduct/Recipes/Detail/components/RecipeSummary';

import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import reducer from '@app/pages/MarketProduct/Recipes/Detail/redux/reducer';
import saga from '@app/pages/MarketProduct/Recipes/Detail/redux/saga';

import { Content } from '@shared/components/GUI';
import Header from '@app/pages/MarketProduct/Recipes/Detail/components/Header';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { getRecipeByIdSelector } from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';
import Spinner from '@shared/components/Spinner';
import RecipeInfo from '@app/pages/MarketProduct/Recipes/Detail/components/RecipeDetails';

const reduxKey = REDUX_KEY.MARKET_PRODUCT.RECIPES.DETAIL;

const RecipeDetailPage = () => {
  const dispatch = useDispatch();
  const { id: recipeId } = useParams();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const recipe = useSelector(getRecipeByIdSelector.getData);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(
      Creators.getRecipeByIdRequest({ recipeId }),
    );
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, recipeId]);

  return !Object.keys(recipe).length ? (
    <Spinner />
  ) : (
    <Content>
      <Header />
      <RecipeSummary />
      <RecipeInfo />
    </Content>
  );
};

export default RecipeDetailPage;
