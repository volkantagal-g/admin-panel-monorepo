import { PageHeader, Col, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { PlusOutlined, SendOutlined } from '@ant-design/icons';

import { useState } from 'react';

import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes.ts';

import { usePermission } from '@shared/hooks';
import SegmentInfoModal from '@app/pages/Segment/List/components/SegmentInfoModal';

const Header = () => {
  const { t } = useTranslation('segment');
  const { Can } = usePermission();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { canAccess } = usePermission();
  return (
    <Row gutter={24}>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.SEGMENT.LIST')}
        />
      </Col>
      <Col>
        <Row gutter={24}>
          <Col>
            {canAccess(permKey.PAGE_SEGMENT_LIST_COMPONENT_CAN_SEND_SEGMENT_STATS_MAIL) && (
              <Button
                type="primary"
                onClick={() => {
                  setIsModalVisible(true);
                }}
                icon={<SendOutlined />}

              >
                {t('SEND_SEGMENT_INFO_EMAIL')}
              </Button>
            )}
          </Col>
          <Col>
            <Can permKey={permKey.PAGE_SEGMENT_NEW}>
              <Link to={ROUTE.SEGMENT_NEW.path}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                >
                  {t('NEW_SEGMENT')}
                </Button>
              </Link>
            </Can>
          </Col>
        </Row>
      </Col>

      {canAccess(permKey.PAGE_SEGMENT_LIST_COMPONENT_CAN_SEND_SEGMENT_STATS_MAIL) && (
        <SegmentInfoModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
        />
      )}

    </Row>
  );
};

export default Header;
