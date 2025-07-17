import { useCallback, useEffect, useState } from 'react';
import { Modal, Button, Checkbox, Divider, Typography, Popconfirm, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getBaseInputComponent, validateValueByType } from '../../../utils';
import {
  MAX_RESPONSIBLE_SQUAD_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_RESPONSIBLE_SQUAD_LENGTH,
} from '../../../New/components/Form/formHelper';

const { Text } = Typography;

const EditModal = ({
  config,
  saveDisabled,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation(['configPage', 'global', 'button']);

  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [isCustomEnabledInput, setIsCustomEnabledInput] = useState(config.isCustomEnabled);
  const [descriptionInput, setDescriptionInput] = useState(config.description || '');
  const [responsibleSquadInput, setResponsibleSquadInput] = useState(config.responsibleSquad || '');
  const [configInput, setConfigInput] = useState(config.value);

  useEffect(() => {
    let modalTitle = `${t('global:EDIT')} - (${config.key})`;
    if (config.isChild && config.country) {
      modalTitle = `${t('global:EDIT')} - (${config.parentConfig} - ${config.country.name} (${config.country.code}))`;
    }
    setTitle(modalTitle);
  }, [config, t]);

  const handleSave = () => {
    if (!validateValueByType({ ...config, value: configInput })) {
      return dispatch(ToastCreators.error({ message: t('configPage:ERR_TYPE_AND_VALUE_DOES_NOT_MATCH') }));
    }

    if (config.isParent) {
      if (descriptionInput.length < MIN_DESCRIPTION_LENGTH) {
        return dispatch(ToastCreators.error(
          { message: `${t('configPage:SHORT_DESCRIPTION')} ${t('baseYupError:STRING.MIN', { min: MIN_DESCRIPTION_LENGTH })}` },
        ));
      }

      if (responsibleSquadInput.length < MIN_RESPONSIBLE_SQUAD_LENGTH) {
        return dispatch(ToastCreators.error(
          { message: `${t('configPage:RESPONSIBLE_SQUAD')} ${t('baseYupError:STRING.MIN', { min: MIN_RESPONSIBLE_SQUAD_LENGTH })}` },
        ));
      }

      if (responsibleSquadInput.length > MAX_RESPONSIBLE_SQUAD_LENGTH) {
        return dispatch(ToastCreators.error(
          { message: `${t('configPage:RESPONSIBLE_SQUAD')} ${t('baseYupError:STRING.MAX', { max: MAX_RESPONSIBLE_SQUAD_LENGTH })}` },
        ));
      }
    }

    let val = configInput;
    if (config.inputType === 'object') {
      val = JSON.parse(configInput);
    }

    const confirmParameters = { value: val, isCustomEnabled: !!isCustomEnabledInput };
    if (config.isParent) {
      confirmParameters.description = descriptionInput;
      confirmParameters.responsibleSquad = responsibleSquadInput;
    }

    return onConfirm(confirmParameters);
  };

  const getInputComponent = useCallback(({ isDisabled }) => {
    let { value } = config;
    if (config.inputType === 'object') {
      value = JSON.stringify(JSON.parse(config.value), null, 2);
    }

    const BaseInputComponent = getBaseInputComponent({
      inputType: config.inputType,
      isDisabled,
      value,
      onChange: val => setConfigInput(val),
    });

    if (BaseInputComponent) {
      return BaseInputComponent;
    }

    return (
      <>
        {t('global:ERROR')}
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </>
    );
  }, [config, t]);

  return (
    <Modal
      centered
      title={title}
      visible
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t('button:CANCEL')}
        </Button>,
        <Popconfirm
          key="submit"
          title={t('global:COMMON_CONFIRM_TEXT')}
          onConfirm={handleSave}
          disabled={saveDisabled}
        >
          <Button
            key="save"
            type="success"
            disabled={saveDisabled}
            className="ml-2"
          >
            {t('button:SAVE')}
          </Button>
        </Popconfirm>,
      ]}
    >
      {
        config.isParent && (
          <>
            <Checkbox
              checked={isCustomEnabledInput}
              onChange={event => {
                setIsCustomEnabledInput(event?.target?.checked);
              }}
            >
              {t('global:COUNTRY_BASED')}
            </Checkbox>
            <Divider />
          </>
        )
      }
      {config.isParent && (
        <><Text strong>{t('SHORT_DESCRIPTION')}</Text>
          <br />
          <Input
            defaultValue={descriptionInput}
            onChange={event => setDescriptionInput(event.target.value)}
          />
          {
            descriptionInput.length < MIN_DESCRIPTION_LENGTH && (
            <span className="text-danger">
              {t('baseYupError:STRING.MIN', { min: MIN_DESCRIPTION_LENGTH })}
            </span>
            )
          }
          <Divider />
          <Text strong>{t('RESPONSIBLE_SQUAD')}</Text>
          <br />
          <Input
            defaultValue={responsibleSquadInput}
            onChange={event => setResponsibleSquadInput(event.target.value)}
          />
          {
            responsibleSquadInput.length < MIN_RESPONSIBLE_SQUAD_LENGTH && (
            <span className="text-danger">
              {t('baseYupError:STRING.MIN', { min: MIN_RESPONSIBLE_SQUAD_LENGTH })}
            </span>
            )
          }
          {
            responsibleSquadInput.length > MAX_RESPONSIBLE_SQUAD_LENGTH && (
            <span className="text-danger">
              {t('baseYupError:STRING.MAX', { max: MAX_RESPONSIBLE_SQUAD_LENGTH })}
            </span>
            )
          }
          <Divider />
        </>
      )}
      <Text strong>{t('OLD_VALUE')}</Text>
      <br />
      {getInputComponent({ isDisabled: true })}
      <Divider />
      <Text strong>{t('NEW_VALUE')}</Text>
      <br />
      {getInputComponent({})}
    </Modal>
  );
};

export default EditModal;
