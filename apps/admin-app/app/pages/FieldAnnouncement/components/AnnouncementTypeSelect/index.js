import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { announcementTypeSelectOptions } from './options';
import useStyles from './styles';

const AnnouncementTypeSelect = ({ onChange }) => {
  const classes = useStyles();
  const { t } = useTranslation('fieldAnnouncementPage');

  return (
    <Select
      placeholder={t('SELECT_ANNOUNCEMENT_TYPE')}
      onChange={onChange}
      options={announcementTypeSelectOptions}
      className={classes.announcementTypeSelect}
    />
  );
};

export default AnnouncementTypeSelect;
