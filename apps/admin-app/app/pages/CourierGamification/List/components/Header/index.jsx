import { useTranslation } from 'react-i18next';

import { Button, Col, PageHeader, Row } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const CourierGamificationTaskList = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('courierGamificationPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_COURIER_GAMIFICATION_TASK_CREATE}>
        <Col>
          <Button href="/courier/gamificationTask/create" type="primary" icon={<PlusOutlined />}>
            {t('LIST.NEW_COURIER_GAMIFICATION_TASK')}
          </Button>
        </Col>
      </Can>
    </Row>
  );
};

export default CourierGamificationTaskList;
