import { useTranslation } from 'react-i18next';
import { Col, Form } from 'antd';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import Announcement from '@shared/containers/Select/Announcement';

export function OpenAnnouncementAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');
  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('OPEN_ANNOUNCEMENT')}
        className="d-inline"
      >
        <Announcement
          mode="single"
          disabled={disabled}
          value={{
            value: value.data.announcementId,
            label: value.data.announcementTitle,
          }}
          onChange={(val: MongoIDType, label: string) => onChange({ ...value, data: { announcementId: val, announcementTitle: label } })}
        />
      </Form.Item>
    </Col>
  );
}
