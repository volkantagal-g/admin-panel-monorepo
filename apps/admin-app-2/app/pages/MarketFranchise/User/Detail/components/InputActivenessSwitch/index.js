import { Popconfirm, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { usePermission } from '@shared/hooks';
import useStyles from './styles';

const InputActivenessSwitch = ({ isPending, isUserActivated, editPermKey, handleActiveness }) => {
  const { t } = useTranslation(['personPage', 'button']);
  const classes = useStyles();

  const { Can } = usePermission();

  const handleConfirm = () => handleActiveness({ status: !isUserActivated });

  return (
    <div className={classes.wrapperItem}>
      <Can permKey={editPermKey}>
        <Popconfirm
          onConfirm={handleConfirm}
          okText={t('YES')}
          cancelText={t('CANCEL')}
          disabled={isPending}
          title={t('COMMON_CONFIRM_TEXT')}
        >
          <Switch loading={isPending} checkedChildren={t('ACTIVE')} unCheckedChildren={t('INACTIVE')} checked={isUserActivated} />
        </Popconfirm>
      </Can>
    </div>
  );
};

InputActivenessSwitch.defaultProps = {
  isPending: false,
  isUserActivated: false,
  editPermKey: '',
  handleActiveness: () => null,
};

InputActivenessSwitch.propTypes = {
  isPending: PropTypes.bool,
  isUserActivated: PropTypes.bool,
  editPermKey: PropTypes.string,
  handleActiveness: PropTypes.func,
};

export default InputActivenessSwitch;
