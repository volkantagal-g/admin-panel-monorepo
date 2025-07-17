import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from '@app/pages/Planogram/Warehouses/components/Header/styles';

const Header = () => {
  const { t } = useTranslation('planogramPage');
  const classes = useStyles();

  return (
    <Row className="mb-3">
      <Col flex={1}>
        <span className={classes.title}>
          {t('global:PAGE_TITLE.PLANOGRAM.WAREHOUSES_LIST')}
        </span>
      </Col>
    </Row>
  );
};

export default Header;
