import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyle from '../../styles';

const DeleteButton = ({ onClick, disabled }: { onClick: () => void; disabled: boolean}) => {
  const { t } = useTranslation(['global']);
  const classes = useStyle();

  return (
    <Popconfirm
      onConfirm={() => onClick()}
      okText={t('button:YES')}
      cancelText={t('button:CANCEL')}
      title={t('global:COMMON_CONFIRM_TEXT')}
    >
      <Button
        danger
        disabled={disabled}
        type="primary"
        size="middle"
        className={classes.buttonBase}
      >
        {t('global:DELETE')}
      </Button>
    </Popconfirm>
  );
};

export default DeleteButton;
