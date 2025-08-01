import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import NewProductButton from '@app/pages/MarketProduct/containers/NewProductButton';

const Header = () => {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();

  return (
    <Row className="mb-3">
      <Col flex={1}>
        <span className={classes.title}>{t('global:PAGE_TITLE.MARKET_PRODUCT.LIST')}</span>
      </Col>
      <Col>
        <NewProductButton />
      </Col>
    </Row>
  );
};

export default Header;
