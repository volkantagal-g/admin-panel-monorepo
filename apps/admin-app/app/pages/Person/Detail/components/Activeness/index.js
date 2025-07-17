import { Popconfirm, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const Activeness = ({ isPending, handleActiveness, isActivated }) => {
  const { t } = useTranslation(['personPage', 'button']);
  const classes = useStyles();

  const handleConfirm = () => handleActiveness({ status: !isActivated });

  return (
    <div className={classes.wrapperItem}>
      <span className={classes.labelItem}>{t('ACTIVENESS')}:</span>
      <Popconfirm
        onConfirm={handleConfirm}
        okText={t('YES')}
        cancelText={t('CANCEL')}
        disabled={isPending}
        title={isActivated ? t('PROFILE.CONFIRM_DEACTIVATE_PERSON') : t('PROFILE.CONFIRM_ACTIVATE_PERSON')}
      >
        <Switch loading={isPending} checkedChildren={t('ACTIVE')} unCheckedChildren={t('INACTIVE')} checked={isActivated} />
      </Popconfirm>
    </div>
  );
};

export default Activeness;
