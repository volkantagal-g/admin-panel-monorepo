import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';

import useStyles from './styles';

type DayShortcutButtonProps = {
  dayIndex: number;
  onSelectedDaysOfWeekChange: (data: { id: number }) => void;
  isFormEditable: boolean;
};

const DayShortcutButton = ({ dayIndex, onSelectedDaysOfWeekChange, isFormEditable }: DayShortcutButtonProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleDayChange = () => {
    onSelectedDaysOfWeekChange({ id: dayIndex });
  };
  return (
    <Button
      id={String(dayIndex)}
      className={classes.customButton}
      onClick={handleDayChange}
      disabled={!isFormEditable}
      size="small"
    >
      <Tooltip title={t(`batAlertConditionCommon:DAY_OF_WEEKS_TOOLTIP:${dayIndex}`)}>
        {t(`global:DAY_OF_WEEKS_SHORT:${dayIndex}`)}
      </Tooltip>
    </Button>
  );
};

export default DayShortcutButton;
