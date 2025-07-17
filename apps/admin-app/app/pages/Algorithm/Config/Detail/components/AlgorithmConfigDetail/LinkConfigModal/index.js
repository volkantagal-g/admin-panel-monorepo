import { Button, Col, Modal, Popconfirm, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Creators } from '../../../redux/actions';
import useStyles from './styles';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { configDetailSelector, customConfigListSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import CustomConfigSummary from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/LinkConfigModal/customConfigSummary';

const LinkConfigModal = ({
  visible,
  setVisible,
}) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedConfig, setSelectedConfig] = useState(null);
  const customConfigList = useSelector(customConfigListSelector.getData);
  const customConfigListIsPending = useSelector(customConfigListSelector.getIsPending);
  const namespace = useSelector(configDetailSelector.getNamespace);
  const configData = useSelector(configDetailSelector.getData);

  const customConfigOptions = useMemo(() => {
    const currentLinkedConfigKeys = configData?.customConfigs?.map(config => config.key) || [];
    if (!customConfigList) {
      return [];
    }
    return customConfigList
      .filter(config => !currentLinkedConfigKeys.includes(config.key))
      .map(config => {
        return {
          value: config?.key,
          label: config?.key,
        };
      });
  }, [configData, customConfigList]);

  const handleCancel = () => {
    setSelectedConfig(null);
    setVisible(false);
  };

  const handleSearch = useCallback(searchVal => {
    dispatch(Creators.searchCustomConfigRequest({ namespace, searchTerm: searchVal }));
  }, [dispatch, namespace]);

  useEffect(() => {
    if (visible) {
      handleSearch('');
    }
  }, [handleSearch, visible]);

  const onSelect = selectedConfigKey => {
    if (customConfigList) {
      const selectedConfigObject = customConfigList.find(config => config?.key === selectedConfigKey);
      setSelectedConfig(selectedConfigObject);
    }
  };

  const handleLink = () => {
    dispatch(Creators.linkCustomConfigRequest({ namespace, leftKey: configData.key, rightKey: selectedConfig.key }));
    setSelectedConfig(null);
    setVisible(false);
  };

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const footerButtons = [
    <Button key="back" type="danger" onClick={handleCancel}>
      {t('global:CANCEL')}
    </Button>,
    <Popconfirm
      disabled={!selectedConfig}
      title={t('algorithmConfigPage:SURE_ATTACH')}
      okText={t('OK')}
      cancelText={t('CANCEL')}
      onConfirm={handleLink}
      key="linkCustomConfigPopConfirm"
    >
      <Button
        type="success"
        disabled={!selectedConfig}
        className={classes.modalConfirmButton}
      >
        {t('algorithmConfigPage:ATTACH')}
      </Button>
    </Popconfirm>,
  ];

  return (
    <Modal
      title={t('algorithmConfigPage:ATTACH_CONFIG')}
      visible={visible}
      centered
      onCancel={handleCancel}
      footer={footerButtons}
    >
      <Row>
        <Col span={24}>
          <Select
            placeholder={t('global:SEARCH')}
            className={classes.wrapper}
            showSearch
            onSearch={debouncedHandleSearch}
            onSelect={onSelect}
            options={customConfigOptions}
            loading={customConfigListIsPending}
            value={selectedConfig?.key}
            allowClear
            onClear={() => setSelectedConfig(null)}
          />
          <CustomConfigSummary selectedCustomConfig={selectedConfig} />
        </Col>
      </Row>
    </Modal>
  );
};

export default LinkConfigModal;
