import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';
import useStyles from './styles';

function NewButton() {
  const { t } = useTranslation('fieldAnnouncementPage');
  const classes = useStyles();

  return (
    <Link to={ROUTE.FIELD_ANNOUNCEMENT_CREATE.path}>
      <Button
        size="small"
        type="primary"
        icon={<PlusOutlined />}
        className={classes.newButton}
      >
        {t('PAGE_TITLE.CREATE')}
      </Button>
    </Link>
  );
}

export default NewButton;
