import { Button, Dropdown, Menu, Popconfirm, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { PUBLISH_TYPES } from '@app/pages/CourierPlan/constants';
import useStyles from './styles';

export default function Footer({
  stepKey,
  isPending = false,
  isLastStep = false,
  hideSaveButton = false,
  isBackButtonDisabled = false,
  isSaveButtonDisabled = false,
  isContinueButtonDisabled = false,
  onBackClick = () => null,
  onSaveClick = () => null,
  onPublishClick = () => null,
  onContinueClick = () => null,
}) {
  const classes = useStyles();
  const { t } = useTranslation(['courierPlanPage']);

  const handlePublishButtonClick = menuItem => {
    onPublishClick(menuItem.key);
  };

  const publishButtonOptions = (
    <Menu onClick={handlePublishButtonClick}>
      {PUBLISH_TYPES.map(type => (
        <Menu.Item key={type} disabled={isPending}>
          {t(`PUBLISH_TYPE.${type}`)}
        </Menu.Item>
      ))}
    </Menu>
  );

  const isSaveDisabled = isSaveButtonDisabled || isPending;

  return (
    <Space className={classes.fullWidth} direction="vertical" align="end">
      <Space className={classes.fullWidth} direction="horizontal">
        <Button
          type="danger"
          htmlType="button"
          onClick={onBackClick}
          form={`courier-plan-step-${stepKey}`}
          disabled={isBackButtonDisabled || isPending}
        >
          {t('global:BACK')}
        </Button>

        {!hideSaveButton && (
          <Popconfirm
            title={t('SAVE_STEP_QUESTION')}
            onConfirm={onSaveClick}
            okText={t('global:YES')}
            cancelText={t('global:NO')}
            disabled={isSaveDisabled}
          >
            <Button
              type="primary"
              htmlType="button"
              form={`courier-plan-step-${stepKey}`}
              disabled={isSaveDisabled}
            >
              {t('global:SAVE')}
            </Button>
          </Popconfirm>
        )}

        {isLastStep ? (
          <Dropdown
            overlay={publishButtonOptions}
            disabled={!isSaveDisabled}
          >
            <Button
              type="success"
              htmlType="button"
              form={`courier-plan-step-${stepKey}`}
              disabled={!isSaveDisabled}
            >
              {t('global:PUBLISH')}
            </Button>
          </Dropdown>
        ) : (
          <Button
            type="success"
            htmlType="button"
            form={`courier-plan-step-${stepKey}`}
            disabled={isContinueButtonDisabled || isPending}
            onClick={onContinueClick}
          >
            {t('global:CONTINUE')}
          </Button>
        )}
      </Space>
    </Space>
  );
}
