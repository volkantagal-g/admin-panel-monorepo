import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import { Switch } from '@shared/components/GUI';
import { Creators } from '@app/pages/MarketProduct/Recipes/Detail/redux/actions';
import useConfirmationModal from './useConfirmationModal';

import useStyles from './styles';
import { getRecipeByIdSelector, updateRecipeSelector } from '../../../../redux/selectors';
import { RECIPE_STATUSES } from '@app/pages/MarketProduct/Recipes/constants';

const RecipeStatus = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('recipesPage');
  const recipe = useSelector(getRecipeByIdSelector.getData);
  const isGetPending = useSelector(getRecipeByIdSelector.getIsPending);
  const isUpdatePending = useSelector(updateRecipeSelector.getIsPending);
  const [showConfirmationModal, confirmationModal] = useConfirmationModal();
  const classes = useStyles();

  const isActive = recipe.status === RECIPE_STATUSES.ACTIVE;
  const isPending = isUpdatePending || isGetPending;

  const handleActiveStatusChange = newIsActive => {
    const newStatus = newIsActive ? RECIPE_STATUSES.ACTIVE : RECIPE_STATUSES.INACTIVE;

    const message = newIsActive ?
      t('DETAILS.RECIPE_STATUS.MODAL_POSITIVE') :
      t('DETAILS.RECIPE_STATUS.MODAL_NEGATIVE');

    showConfirmationModal({
      message,
      onOk: () => {
        dispatch(Creators.updateRecipeRequest({
          id: get(recipe, '_id'),
          body: { status: newStatus },
        }));
      },
    });

    return null;
  };

  return (
    <>
      <p className={classes.title}>{t('DETAILS.RECIPE_STATUS.TITLE')}</p>
      <Row className="justify-content-end">
        <label className="ml-3">
          <span className="mr-2">{t('DETAILS.RECIPE_STATUS.ACTIVE')}</span>
          <Switch
            checked={isActive}
            onClick={handleActiveStatusChange}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            disabled={isPending}
          />
        </label>
      </Row>
      {confirmationModal}
    </>
  );
};

export default RecipeStatus;
