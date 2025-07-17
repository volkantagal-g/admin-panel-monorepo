import { useEffect, useState } from 'react';
import { Form, Row, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { updateAnnouncementSelector } from '../Detail/redux/selectors';

export const CreateCardActionButtons = (titleName, componentName, isEditButtonVisible = false) => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');

  const data = useSelector(updateAnnouncementSelector.getData);

  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = value => {
    setIsEditable(value);
  };

  useEffect(() => {
    if (data && data.status === 200) {
      setIsEditable(false);
    }
  }, [data]);

  const cardTitle = (
    <Row justify="space-between" className="w-100">
      <span>{t(titleName)}</span>

      {!isEditable && !isEditButtonVisible && (
        <Button size="small" form="campaign-edit" type="default" onClick={() => toggleEditable(true)}>
          {t('button:EDIT')}
        </Button>
      )}
    </Row>
  );

  const cardFooter = (
    <Row justify="end">
      {isEditable && (
        <Space size="small">
          <Form.Item className="m-0">
            <Button size="small" form="campaign-cancel" type="default" onClick={() => toggleEditable(false)}>
              {t('button:CANCEL')}
            </Button>
          </Form.Item>

          <Form.Item className="m-0">
            <Button size="small" form={componentName} type="primary" htmlType="submit">
              {t('button:SAVE')}
            </Button>
          </Form.Item>
        </Space>
      )}
    </Row>
  );

  return {
    cardTitle,
    cardFooter,
    isEditable,
  };
};
