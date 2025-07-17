import { useTranslation } from 'react-i18next';
import { Row, Button } from 'antd';

import { usePermission } from '@shared/hooks';
import { LOCATION_WRITE_OFF_STATUSES } from '@shared/shared/constants';
import useStyles from './style';
import permKey from '@shared/shared/permKey.json';

const ActionButtons = ({ status, onApprove, onCancel }) => {
  const { t } = useTranslation('writeOffPage');
  const { Can } = usePermission();
  const classes = useStyles();

  const renderButtons = () => {
    if (status === LOCATION_WRITE_OFF_STATUSES.CREATED) {
      return (
        <>
          <Can permKey={permKey.PAGE_LOCATION_WRITE_OFF_DETAIL_COMPONENT_CANCEL}>
            <Button className={classes.actionButton} onClick={onCancel}>
              {t('CANCEL')}
            </Button>
          </Can>
          <Can permKey={permKey.PAGE_LOCATION_WRITE_OFF_DETAIL_COMPONENT_APPROVE}>
            <Button type="primary" className={classes.actionButton} onClick={onApprove}>
              {t('APPROVE')}
            </Button>
          </Can>
        </>
      );
    }
    return null;
  };
  return (
    <Row gutter={[8, 8]} justify="end" align="middle">
      {renderButtons()}
    </Row>
  );
};

export default ActionButtons;
