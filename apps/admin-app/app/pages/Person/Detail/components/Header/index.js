import { useState } from 'react';
import { PageHeader, Col, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import JsonModal from '@shared/components/UI/JsonModal';
import permKey from '@shared/shared/permKey.json';

const Header = ({ data, isPending }) => {
  const { t } = useTranslation('personPage');
  const { Can } = usePermission();

  const [jsonModalVisible, setjsonModalVisible] = useState(false);

  const handleJsonModalVisible = value => {
    setjsonModalVisible(value);
  };

  return (
    <Row align="middle">
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={`${t('PAGE_TITLE.PERSON.DETAIL')} - ${data?.name || ''}`}
        />
      </Col>
      <Can permKey={permKey.PAGE_PERSON_DETAIL_JSON_BUTTON}>
        <Col>
          <Button
            size="small"
            onClick={() => handleJsonModalVisible(true)}
            disabled={isPending}
          >
            {t('JSON')}
          </Button>
          <JsonModal
            title={t('JSON')}
            data={data}
            visible={jsonModalVisible}
            handleCancel={() => handleJsonModalVisible(false)}
          />
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
