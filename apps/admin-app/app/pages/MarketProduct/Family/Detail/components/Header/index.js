import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const Header = ({ data }) => {
  const { t } = useTranslation('marketProductFamilyPage');
  const classes = useStyles();

  return (
    <>
      <Row className="mb-3">
        <Col flex={1}>
          <span className={classes.title}>{t('TITLES.DETAIL_PAGE')}</span>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col flex={1}>
          <span className={classes.subTitle}>{data.name}</span>
        </Col>
      </Row>
    </>
  );
};

export default Header;
