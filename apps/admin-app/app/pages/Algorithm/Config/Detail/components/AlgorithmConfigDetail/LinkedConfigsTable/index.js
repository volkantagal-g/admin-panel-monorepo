import { useSelector } from 'react-redux';

import { Button, Card } from 'antd';

import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { LinkOutlined } from '@ant-design/icons';

import { configDetailSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import RelatedTableBase from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/RelatedTableBase';
import LinkConfigModal from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/LinkConfigModal';
import { usePermission } from '@shared/hooks';
import { getPermKeyByNamespace } from '@app/pages/Algorithm/Config/utils';

const LinkedConfigsTable = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const { Can } = usePermission();
  const [linkConfigModalVisible, setLinkConfigModalVisible] = useState(false);
  const configDetailData = useSelector(configDetailSelector.getData);
  const namespace = useSelector(configDetailSelector.getNamespace);
  const configDetailIsPending = useSelector(configDetailSelector.getIsPending);
  const configLinking = useSelector(configDetailSelector.configLinking);
  const configUnlinking = useSelector(configDetailSelector.configUnlinking);

  return (
    <>
      <LinkConfigModal
        visible={linkConfigModalVisible}
        setVisible={setLinkConfigModalVisible}
      />
      <Card
        title={t('algorithmConfigPage:LINKED_CONFIGS')}
        extra={(
          <Can permKey={getPermKeyByNamespace({ namespace })}>
            <Button
              onClick={() => setLinkConfigModalVisible(true)}
              type="info"
              icon={<LinkOutlined />}
              loading={configLinking || configUnlinking}
            >{t('ATTACH')}
            </Button>
          </Can>
        )}
      >
        <RelatedTableBase
          data={configDetailData?.customConfigs}
          isPending={configDetailIsPending || configLinking || configUnlinking}
          unlinkButton
        />
      </Card>
    </>
  );
};

export default LinkedConfigsTable;
