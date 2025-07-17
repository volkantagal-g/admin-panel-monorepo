import { useTranslation } from 'react-i18next';
import { Button, Typography } from 'antd';
import { EditFilled } from '@ant-design/icons';

import useStyles from '@app/pages/ArtisanOrder/Detail/components/timelineRefund/styles';
import Card from '@shared/components/Card';

const { Text } = Typography;

const EditDateCard = ({ isDisabled, selectedSlotDate, selectedSlotTime, onClick }) => {
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');

  return (
    <Card classNames={classes.refundEventCard}>
      <div>
        {isDisabled && (
          <Text type="secondary" className="d-block">
            {t('REFUND_TIMELINE.TIME_SLOT_SELECTED')}
          </Text>
        )}

        <Text strong className="d-block">
          {selectedSlotDate} {selectedSlotTime}
        </Text>
      </div>
      <Button
        className={classes.editDateBtn}
        type="default"
        size="middle"
        disabled={isDisabled}
        icon={<EditFilled />}
        onClick={onClick}
      >
        {t('REFUND_TIMELINE.EDIT_DATE')}
      </Button>
    </Card>
  );
};

export default EditDateCard;
