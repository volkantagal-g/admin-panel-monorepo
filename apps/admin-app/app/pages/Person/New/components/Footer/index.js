import { Space, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

function Footer({ isPending = false, handleSubmit = () => null }) {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <Space className={classes.stickySpace} direction="vertical" align="end">
      <Popconfirm
        title={t('COMMON_CONFIRM_TEXT')}
        onConfirm={handleSubmit}
        okText={t('YES')}
        cancelText={t('NO')}
        disabled={isPending}
      >
        <Button type="primary" htmlType="submit" form="new-person" disabled={isPending}>
          {t('CREATE')}
        </Button>
      </Popconfirm>
    </Space>
  );
}

export default Footer;
