import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Form, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { getStepTagColor } from '@app/pages/CourierPlan/utils';
import useStyles from './styles';

const { Item } = Form;

function DownloadButton({
  step,
  isPending,
  outputFile = false,
  onDownloadCallback = () => null,
}) {
  const classes = useStyles();
  const { t } = useTranslation(['courierPlanPage']);

  return (
    <Item
      label={outputFile && t('STEP_LABELS.OUTPUT')}
      className={classes.fullWidth}
    >
      {outputFile ? (
        <Button
          type="primary"
          htmlType="button"
          form={`courier-plan-step-${step.key}`}
          disabled={isPending}
          onClick={onDownloadCallback}
          icon={<CloudDownloadOutlined />}
        >
          {t('DOWNLOAD_EXCEL_FILE')}
        </Button>
      ) : (
        <Tag
          key={t('STEP_LABELS.OUTPUT')}
          color={getStepTagColor(step)}
        >
          {t(`STEP_STATES.${step.state}`)}
        </Tag>
      )}
    </Item>
  );
}

export default DownloadButton;
