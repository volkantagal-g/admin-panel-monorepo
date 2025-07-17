import { Col, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import useStyles from '@app/pages/Planogram/Products/Detail/components/Header/styles';

const Header = () => {
  const { t } = useTranslation('planogramPage');
  const classes = useStyles();
  return (
    <Row className="mb-3">
      <Col flex={1}>
        <span className={classes.title}>{t('PRODUCT_DETAIL')}</span>
      </Col>
      <Col>
        <Link to={ROUTE.PLANOGRAM_PRODUCTS.path}>
          <Button icon={<LeftOutlined />} type="link">
            {t('global:BACK')}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
