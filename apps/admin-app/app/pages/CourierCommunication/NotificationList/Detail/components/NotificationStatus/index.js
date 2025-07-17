import { useTranslation } from 'react-i18next';

import { convertStatusCodeToString } from '@app/pages/CourierCommunication/NotificationList/Detail/components/NotificationStatus/utils';
import useStyles from '@app/pages/CourierCommunication/NotificationList/Detail/components/NotificationStatus/styles';

const NotificationStatus = ({ status }) => {
  const { t } = useTranslation(['courierCommunication']);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={`${classes.statusText} ${classes[`${status}`]}`}>
        {convertStatusCodeToString(status, t)}
      </span>
    </div>
  );
};

export default NotificationStatus;
