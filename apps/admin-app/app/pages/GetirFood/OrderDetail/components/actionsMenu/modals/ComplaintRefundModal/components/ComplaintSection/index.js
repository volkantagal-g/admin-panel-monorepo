import { Form, Checkbox, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  DESCRIPTION_MAX_LENGTH,
  rules,
} from '@app/pages/GetirFood/OrderDetail/components/actionsMenu/modals/ComplaintRefundModal/formHelper';

const ComplaintSection = ({ hasComplaint, setHasComplaint }) => {
  const { t } = useTranslation('foodOrderPage');

  const handleHasComplaintChange = e => {
    setHasComplaint(e.target.checked);
  };
  return (
    <>
      <Form.Item>
        <Checkbox
          checked={hasComplaint}
          onChange={handleHasComplaintChange}
        >
          {t('COMPLAINT_REFUND_MODAL.COMPLAINT')}
        </Checkbox>
      </Form.Item>
      {hasComplaint && (
        <Form.Item
          rules={rules.complaintDescription}
          label={t('COMPLAINT_REFUND_MODAL.DESCRIPTION_MANDATORY')}
          name="complaintDescription"
        >
          <Input.TextArea
            placeholder={t('COMPLAINT_REFUND_MODAL.DESCRIPTION')}
            showCount
            maxLength={DESCRIPTION_MAX_LENGTH}
          />
        </Form.Item>
      )}
    </>
  );
};

export default ComplaintSection;
