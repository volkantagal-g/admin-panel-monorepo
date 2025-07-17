import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer({ disabled }) {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <Space
      className={classes.footer}
      direction="vertical"
      align="end"
    >
      <Button
        type="primary"
        htmlType="submit"
        form="new-location-write-off"
        disabled={disabled}
      >
        {t('global:CREATE')}
      </Button>
    </Space>
  );
}

Footer.propTypes = {};

export default Footer;
