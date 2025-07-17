import { useState } from 'react';
import { Row, Col, Collapse, Space, Typography, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import AnnouncementTypeSelect from '@app/pages/FieldAnnouncement/components/AnnouncementTypeSelect';
import ActiveSelect from '../ActiveSelect';
import useStyles from './styles';

const { Text } = Typography;
const { Panel } = Collapse;

const Filter = ({ filters, handleSubmit }) => {
  const [title, setTitle] = useState(filters.title);
  const [active, setActive] = useState(filters.active);
  const [description, setDescription] = useState(filters.description);
  const [announcementType, setAnnouncementType] = useState(filters.announcementType);

  const { t } = useTranslation('fieldAnnouncementPage');
  const classes = useStyles();

  const submitButtonClick = () => {
    handleSubmit({
      description,
      title,
      active,
      announcementType,
    });
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('FILTER')} key="1">
            <Space direction="vertical" className={classes.filterWrapper}>
              <Text>{t('ANNOUNCEMENT_TYPE')}</Text>
              <AnnouncementTypeSelect onChange={setAnnouncementType} />
              <Text>{t('TITLE')}</Text>
              <Input
                value={title}
                placeholder={t('WRITE_TITLE')}
                onChange={event => {
                  const { value } = event.target;
                  setTitle(value);
                }}
              />
              <Text>{t('DESCRIPTION')}</Text>
              <Input
                value={description}
                placeholder={t('WRITE_DESCRIPTION')}
                onChange={event => {
                  const { value } = event.target;
                  setDescription(value);
                }}
              />
              <Text>{t('ACTIVE')}</Text>
              <ActiveSelect onChange={setActive} />
              <div className={classes.buttonContainer}>
                <Button type="primary" onClick={submitButtonClick}>
                  {t('BRING')}
                </Button>
              </div>
            </Space>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
