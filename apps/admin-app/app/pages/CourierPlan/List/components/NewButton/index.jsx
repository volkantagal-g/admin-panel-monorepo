import { Col } from 'antd';
import { useTranslation } from 'react-i18next';

import RedirectButton from '@shared/components/UI/RedirectButton';
import { ROUTE } from '@app/routes';
import useStyles from './styles';

function NewButton() {
  const { t } = useTranslation('courierPlanPage');
  const classes = useStyles();

  return (
    <Col className={classes.newButton}>
      <RedirectButton to={ROUTE.E2E_COURIER_PLAN_NEW.path} title={t('NEW_COURIER_PLAN')} />
    </Col>
  );
}

NewButton.propTypes = {};

export default NewButton;
