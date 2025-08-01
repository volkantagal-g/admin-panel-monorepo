import { Divider, Radio, Space } from 'antd';
import Title from 'antd/lib/typography/Title';

import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';

import useStyles from './GroupReasons.styles';

const GroupReasons = ({
  title,
  handleRadioChange,
  reasons,
  divider,
  selected,
  hasError,
  isFeedbackDetails,
  reasonMessageInfo = null,
}) => {
  const { t } = useTranslation('marketOrderPage');
  const styles = useStyles();

  return (
    <>
      {divider && (
        <Divider data-testid="market-order-agent-actions-group-reasons-divider" />
      )}
      <Title
        level={5}
        data-testid={`market-order-agent-actions-group-title-${title.toLowerCase()}`}
      >
        {title}
        {hasError && (
          <span className={styles.requiredField}>
            ({t('AGENT_ACTIONS.MODAL.REQUIRED_FIELD')})
          </span>
        )}
      </Title>
      <Radio.Group
        onChange={event => handleRadioChange(event.target.value)}
        className={isFeedbackDetails ? styles.disabledSelectedButton : ''}
        size="large"
        value={selected || ''}
        disabled={isFeedbackDetails}
      >
        <Space size={[8, 16]} wrap>
          {reasons?.map(reason => {
            const label = reason[getLangKey()] || reason.name;
            if (isFeedbackDetails) {
              return reason.id === selected ? (
                <Radio.Button
                  key={reason.key}
                  value={reason.id ?? ''}
                  data-testid={`market-order-agent-actions-group-radio-button-${reason.key?.toLowerCase()}`}
                >
                  {label}
                </Radio.Button>
              ) : null;
            }

            return (
              <Radio.Button
                key={reason.key}
                value={reason.id ?? ''}
                data-testid={`market-order-agent-actions-group-radio-button-${reason.key?.toLowerCase()}`}
              >
                {label}
              </Radio.Button>
            );
          })}
        </Space>
      </Radio.Group>
      {reasonMessageInfo}
    </>
  );
};

export default GroupReasons;
