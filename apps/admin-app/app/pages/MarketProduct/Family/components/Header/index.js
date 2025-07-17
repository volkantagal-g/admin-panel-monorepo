import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import NewProductFamilyButton from '@app/pages/MarketProduct/Family/components/NewProductFamilyButton';

const Header = () => {
  const { t } = useTranslation('marketProductFamilyPage');
  const classes = useStyles();

  return (
    <Row className="mb-3">
      <Col flex={1}>
        <span className={classes.title}>{t('TITLES.PAGE')}</span>
      </Col>
      <Col>
        <NewProductFamilyButton />
      </Col>
    </Row>
  );
};

export default Header;
