import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import useStyles from './styles';

function NewButton() {

  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Button
        size="small"
        variant="contained"
        type="primary"
        icon={<PlusOutlined />}
        className={classes.newButton}
      >
        <Link to="/warehouse/new">
          {t('global:NEW_WAREHOUSE')}
        </Link>
      </Button>
    </>
  );
}

NewButton.propTypes = {};

export default NewButton;
