import { useEffect, useState } from 'react';
import { Form, Row, Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { updateCampaignSelector } from '../Detail/redux/selectors';

export const CreateCardActionButtons = (titleName, componentName) => {
  const { t } = useTranslation('getirWaterCampaignsPage');

  const updateData = useSelector(updateCampaignSelector.getData);

  const [isEditable, setIsEditable] = useState(false);

  const toggleEditable = value => {
    setIsEditable(value);
  };

  useEffect(() => {
    if (updateData && updateData.data) {
      setIsEditable(false);
    }
  }, [updateData]);

  const cardTitle = (
    <Row justify="space-between" className="w-100">
      <span>{t(titleName)}</span>

      {!isEditable && (
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
