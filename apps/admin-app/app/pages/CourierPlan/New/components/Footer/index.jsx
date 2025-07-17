import { Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

export default function Footer({ isPending = false }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Space className={classes.stickySpace} direction="vertical" align="end">
      <Button
        type="primary"
        htmlType="submit"
        form="new-courier-plan"
        disabled={isPending}
      >
        {t('global:CREATE')}
      </Button>
    </Space>
  );
}
