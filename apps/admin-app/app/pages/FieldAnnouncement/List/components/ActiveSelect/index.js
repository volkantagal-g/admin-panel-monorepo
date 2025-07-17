import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { activeSelectOptions } from './options';
import { ALL_VALUE } from '../../constants';
import useStyles from './styles';

const ActiveSelect = ({ onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation('fieldAnnouncementPage');

  return (
    <Select
      defaultValue={ALL_VALUE}
      placeholder={t('SELECT_ACTIVENESS')}
      onChange={onChange}
      options={activeSelectOptions(t)}
      className={classes.activeSelect}
    />
  );
};

export default ActiveSelect;
