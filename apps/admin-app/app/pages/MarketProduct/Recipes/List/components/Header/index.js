import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import NewRecipeButton from '@app/pages/MarketProduct/Recipes/List/components/Header/NewRecipeButton';

const Header = () => {
  const { t } = useTranslation('recipesPage');
  const classes = useStyles();

  return (
    <Row className="mb-3">
      <Col flex={1}>
        <span className={classes.title}>{t('global:PAGE_TITLE.RECIPES.LIST')}</span>
      </Col>
      <Col>
        <NewRecipeButton />
      </Col>
    </Row>
  );
};

export default Header;
