import { memo } from 'react';
import { Col, Row, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { get } from 'lodash';

import { Button, Space } from '@shared/components/GUI';
import { getRecipeByIdSelector } from '@app/pages/MarketProduct/Recipes/Detail/redux/selectors';
import { getSelectedLanguage } from '@shared/redux/selectors/languageSelection';
import RecipeStatus from './components/RecipeStatus';
import copy from '@shared/assets/GUI/Icons/Solid/Copy.svg';
import useStyles from './styles';
import { copyToClipboard } from '@shared/utils/common';
import { getStatusIcon } from '../../../List/config';
import notFound from '@shared/assets/images/not-found.png';

const StatusMessage = ({ recipe, classes }) => {
  const errorMessage = get(recipe, 'errorMessage', '');
  const warningMessage = get(recipe, 'warningMessage', '');

  return (
    <Tooltip title={errorMessage || warningMessage}>
      {getStatusIcon(recipe, classes)}
    </Tooltip>
  );
};

const RecipeSummary = memo(() => {
  const recipe = useSelector(getRecipeByIdSelector.getData);

  const { t } = useTranslation('recipesPage');
  const selectedLanguage = useSelector(getSelectedLanguage);
  const classes = useStyles();

  return (
    <Space>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={12}>
          <Row className="flex-nowrap">
            <img
              src={recipe.picURL?.[selectedLanguage] || notFound}
              alt="Recipe Cover"
              className={classes.image}
            />
            <div className="ml-3">
              <div className="d-flex align-items-center justify-content-center">
                <span className={`${classes.productName} mr-2`}>
                  {recipe.panelName}
                </span>
                <Tooltip title={t('DETAILS.COPY_RECIPE_ID')}>
                  <Button
                    color="secondary"
                    size="small"
                    className="px-2 py-1"
                    onClick={() => copyToClipboard(recipe._id)}
                  >
                    <img src={copy} alt="copy" />
                  </Button>
                </Tooltip>
                <span className="ml-2">
                  <StatusMessage recipe={recipe} classes={classes} />
                </span>
              </div>
              <div>
                {t('DETAILS.PANEL_NAME')}:
                <span className="ml-1 text-dark">
                  {recipe.panelName}
                </span>
              </div>
              <div>
                {t('DETAILS.NAME')}:
                <span className="ml-1 text-dark">
                  {recipe.name[selectedLanguage]}
                </span>
              </div>
            </div>
          </Row>
        </Col>
        <Col xs={24} md={12}>
          <RecipeStatus />
        </Col>
      </Row>
    </Space>
  );
});

export default RecipeSummary;
