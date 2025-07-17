import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer({ disabled, isLoading }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Space className={classes.footer} direction="vertical" align="end">
      <Button
        type="primary"
        htmlType="submit"
        form="customer-satisfaction-request"
        loading={isLoading}
        disabled={disabled}
      >
        {t('customerSatisfactionPage:CREATE_DELETE_CODE')}
      </Button>
    </Space>
  );
}

Footer.propTypes = {};

export default Footer;
