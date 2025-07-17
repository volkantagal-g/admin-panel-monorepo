import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer(props) {
  const { t } = useTranslation('transferGroupPage');

  const classes = useStyles();

  return (
    <>
      <Space
        className={classes.stickySpace}
        direction="vertical"
        align="end"
      >
        <Button
          type="primary"
          htmlType="submit"
          form="new-warehouse"
        >
          {t('global:CREATE')}
        </Button>
      </Space>
    </>
  );
}

Footer.propTypes = {};

export default Footer;
