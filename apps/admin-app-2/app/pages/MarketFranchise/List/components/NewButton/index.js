import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';
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
        <Link to={ROUTE.MARKET_FRANCHISE_NEW.path}>
          {t('global:NEW_MARKET_FRANCHISE')}
        </Link>
      </Button>
    </>
  );
}

NewButton.propTypes = {};

export default NewButton;
