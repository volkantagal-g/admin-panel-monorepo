import { CheckCircleTwoTone } from '@ant-design/icons';

import { FEEDBACK_STATUSES } from '@shared/shared/constants';
import { feedbackStatuses } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const ModalTitle = ({ isFeedbackDetails, title, status, className }) => {
  if (!isFeedbackDetails || status !== FEEDBACK_STATUSES.RESOLVED) {
    return title;
  }
  const resolvedText = feedbackStatuses?.[status]?.[getLangKey()];
  return (
    <div>
      {title}
      <span className={className}>
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
        />
        <span>{resolvedText}</span>
      </span>

    </div>
  );
};

export default ModalTitle;
