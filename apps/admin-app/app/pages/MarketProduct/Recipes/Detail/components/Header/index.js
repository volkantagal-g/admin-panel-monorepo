import { memo } from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import useStyles from './styles';

const Header = memo(() => {
  const { t } = useTranslation('recipesPage');
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Row gutter={theme.spacing(3)} className="mb-4">
      <Col span={12}>
        <span className={classes.title}>{t('DETAILS.TITLE')}</span>
      </Col>
    </Row>
  );
});

export default Header;
