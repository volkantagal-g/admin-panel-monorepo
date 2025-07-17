import { useTranslation } from 'react-i18next';
import { Button, Modal, Tabs } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import React, { useState } from 'react';

import {
  PromoOption,
  PromoSelectionPane,
  SelectionMode,
} from '@app/pages/Promo/components/AddRemoveRelationalPromosModal/PromoSelectionPane';
import { useAddRemoveRelationalPromosModalStyles } from '@app/pages/Promo/components/AddRemoveRelationalPromosModal/styles';

type PropTypes = {
  onOk: (mode: SelectionMode) => void;
  onCancel: () => void;
  onModeChange: (mode: SelectionMode) => void;
  onOpen: () => void;
  visible: boolean;
  loading: boolean;
  onChange: (values: MongoIDType[]) => void;
  value: MongoIDType[]
  existingOptions: PromoOption[]
  isParentPromo?: boolean
  slice: string
}

export function AddRemoveRelationalPromosModal({
  onOk,
  onCancel,
  onModeChange,
  onOpen,
  visible,
  loading,
  onChange,
  value,
  existingOptions,
  isParentPromo,
  slice,
}: PropTypes) {
  const { t } = useTranslation('promoPage');
  const styles = useAddRemoveRelationalPromosModalStyles();
  const [activeMode, setActiveMode] = useState<SelectionMode>('add');

  const handleTabChange = (key: string) => {
    onModeChange?.(key as SelectionMode);
    setActiveMode(key as SelectionMode);
  };

  return (
    <>
      <Button onClick={onOpen} type="primary" icon={<PlusOutlined />}>{t('CHILD_PROMOS.ADD_REMOVE_PROMOS')}</Button>
      <Modal
        visible={visible}
        onCancel={onCancel}
        title={t('CHILD_PROMOS.ADD_REMOVE_PROMOS')}
        className={styles.wrapper}
        centered
        onOk={() => onOk(activeMode)}
        okButtonProps={{ loading, disabled: loading }}
        cancelButtonProps={{ disabled: loading }}
        destroyOnClose
      >
        <Tabs activeKey={activeMode} onChange={handleTabChange}>
          <Tabs.TabPane tab={<><PlusCircleOutlined /> {t('CHILD_PROMOS.ADD_PROMOS')}</>} key="add" disabled={loading}>
            <PromoSelectionPane
              slice={`${slice}-add`}
              mode="add"
              isPending={loading}
              onChange={onChange}
              value={value}
              existingOptions={existingOptions}
              isParentPromo={isParentPromo}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<><MinusCircleOutlined /> {t('CHILD_PROMOS.REMOVE_PROMOS')}</>}
            key="remove"
            disabled={loading}
          >
            <PromoSelectionPane
              slice={`${slice}-remove`}
              mode="remove"
              isPending={loading}
              onChange={onChange}
              value={value}
              existingOptions={existingOptions}
              isParentPromo={isParentPromo}
            />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
}
