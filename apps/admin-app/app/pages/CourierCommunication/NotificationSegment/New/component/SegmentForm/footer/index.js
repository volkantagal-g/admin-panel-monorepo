import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import { createSegment } from '@app/pages/CourierCommunication/NotificationSegment/New/redux/selector';

const Footer = ({ steps, prev, next, current, handleSegment }) => {
  const classes = useStyles();
  const courierIdPending = useSelector(createSegment?.getCourierIdsDataIsPending);
  const { t } = useTranslation(['courierSegment', 'global']);

  const handleDone = () => {
    handleSegment();
  };

  return (
    <div className={classes.actionButtons}>
      {current > 0 && (
        <Button
          className={classes.backButton}
          onClick={() => prev()}
        >
          {t('BACK')}
        </Button>
      )}
      {current < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          {t('NEXT')}
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button disabled={courierIdPending} type="primary" onClick={handleDone}>
            {t('DONE')}
        </Button>
      )}
    </div>
  );
};

export default Footer;
