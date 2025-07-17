import { useDispatch, useSelector } from 'react-redux';

import { Button, Card, Input } from 'antd';

import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { EditOutlined, FileSearchOutlined, HighlightOutlined, SaveOutlined } from '@ant-design/icons';

import { configDetailSelector, validateConfigValueSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';
import { Creators } from '@app/pages/Algorithm/Config/Detail/redux/actions';
import { usePermission } from '@shared/hooks';
import { getPermKeyByNamespace } from '@app/pages/Algorithm/Config/utils';
import ConfigSchemaModal from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/ConfigSchemaModal';
import ConfigSchemaWarningModal from '@app/pages/Algorithm/Config/Detail/components/AlgorithmConfigDetail/ConfigSchemaWarningModal';

const { TextArea } = Input;

const ConfigValueCard = () => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const [editMode, setEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [showValidationWarningModal, setShowValidationWarningModal] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [valid, setValid] = useState(false);
  const { Can } = usePermission();

  const dispatch = useDispatch();

  const configDetailData = useSelector(configDetailSelector.getData);
  const namespace = useSelector(configDetailSelector.getNamespace);
  const configDetailIsPending = useSelector(configDetailSelector.getIsPending);
  const configDataUpdating = useSelector(configDetailSelector.dataUpdating);
  const validationData = useSelector(validateConfigValueSelector.getData);
  const validationIsPending = useSelector(validateConfigValueSelector.getIsPending);

  useEffect(() => {
    if (configDetailData?.value) {
      setTempValue(JSON.stringify(configDetailData.value, null, 2));
    }
  }, [configDetailData]);

  const onChange = useCallback(e => {
    setTempValue(e.target.value);
    try {
      JSON.parse(e.target.value);
      setValid(true);
    }
    catch {
      setValid(false);
    }
  }, []);

  const pretty = useCallback(() => {
    setTempValue(JSON.stringify(JSON.parse(tempValue), null, 2));
  }, [tempValue]);

  const updateConfig = useCallback(() => {
    setIsEditing(false);
    setEditMode(false);
    dispatch(Creators.updateConfigValueRequest({
      namespace: configDetailData.namespace,
      key: configDetailData.key,
      value: JSON.parse(tempValue),
    }));
  }, [configDetailData, dispatch, tempValue]);

  const validateValue = useCallback(() => {
    setIsEditing(true);
    dispatch(Creators.validateConfigValueRequest({
      namespace: configDetailData.namespace,
      value: JSON.parse(tempValue),
    }));
  }, [configDetailData, dispatch, tempValue]);

  useEffect(() => {
    if (isEditing && !validationIsPending) {
      if (validationData?.valid) {
        updateConfig();
      }
      else {
        setShowValidationWarningModal(true);
      }
    }
  }, [isEditing, updateConfig, validationData, validationIsPending]);

  const cancelUpdateAttempt = () => {
    setEditMode(false);
    setTempValue(JSON.stringify(configDetailData.value, null, 2));
  };

  return (
    <Card
      style={{ height: '100%' }}
      title={t('algorithmConfigPage:CONFIG_VALUE')}
      loading={configDetailIsPending || configDataUpdating || validationIsPending}
      extra={(
        <>
          <Button
            className="mr-1"
            type="info"
            onClick={() => setShowSchemaModal(true)}
            icon={<FileSearchOutlined />}
          >{t('algorithmConfigPage:SCHEMA')}
          </Button>
          {!editMode && (
            <Can permKey={getPermKeyByNamespace({ namespace })}>
              <Button onClick={() => setEditMode(!editMode)} icon={<EditOutlined />}>{t('EDIT')}</Button>
            </Can>
          )}
          {editMode && (
            <>
              {valid && (
                <Button
                  className="mr-1"
                  type="info"
                  onClick={pretty}
                  icon={<HighlightOutlined />}
                >{t('algorithmConfigPage:REFORMAT')}
                </Button>
              )}
              <Button
                className="mr-1"
                type="warning"
                onClick={cancelUpdateAttempt}
              >{t('CANCEL')}
              </Button>
              <Button
                onClick={validateValue}
                type="success"
                disabled={!valid}
                icon={<SaveOutlined />}
              >{t('SAVE')}
              </Button>
            </>
          )}
        </>
      )}
    >
      <ConfigSchemaModal visible={showSchemaModal} setVisible={setShowSchemaModal} />
      <ConfigSchemaWarningModal
        visible={showValidationWarningModal}
        setVisible={setShowValidationWarningModal}
        setIsEditing={setIsEditing}
        updateConfig={updateConfig}
      />
      {editMode && (
        <TextArea
          size="large"
          autoSize
          onChange={onChange}
          value={tempValue}
        />
      )}
      {!editMode && (
        <pre style={{ height: '100%' }}>{JSON.stringify(configDetailData?.value, null, 2)}</pre>
      )}
    </Card>
  );
};

export default ConfigValueCard;
