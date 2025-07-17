import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import AnnouncementTypeSelect from '@app/pages/FieldAnnouncement/components/AnnouncementTypeSelect';

const Filter = ({ setAnnouncementType }) => {
  const { t } = useTranslation('fieldAnnouncementPage');

  const handleAnnouncementType = type => {
    setAnnouncementType(type);
  };

  return (
    <Card title={t('ANNOUNCEMENT_TYPE')} bordered={false}>
      <Row gutter={[16]}>
        <Col md={12} sm={12} xs={24}>
          <AnnouncementTypeSelect onChange={handleAnnouncementType} />
        </Col>
      </Row>
    </Card>
  );
};

export default Filter;
