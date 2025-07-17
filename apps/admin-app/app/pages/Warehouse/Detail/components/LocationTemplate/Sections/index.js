import { useEffect, useState } from 'react';
import { Collapse, Typography, Popover, Button, Space, Divider, Switch } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { EditFilled } from '@ant-design/icons';

import Section from '../Section';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { WAREHOUSE_INACTIVE_STATE } from '@shared/shared/constants';
import NewBlock from '../NewBlock';
import Blocks from '../Blocks';
import { createMap } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const { Text, Title } = Typography;
const { Panel } = Collapse;

function Sections(props) {
  const {
    sections,
    sectionTemplates,
    blockTemplates,
    updateSelfCodeRequest,
    submitBlockRequest,
    updateActivateRequest,
    updateDeactivateRequest,
    updateAllowedForTransferRequest,
    updateArchiveRequest,
    updateWriteOffEnabledRequest,
    errorNotification,
  } = props;
  const { t } = useTranslation('warehousePage');
  const classes = useStyles();

  const { canAccess } = usePermission();

  const [sectionsState, setSectionsState] = useState([]);

  const handleInActiveButton = warehouseLocationId => {
    return event => {
      event.stopPropagation();
      event.preventDefault();

      updateDeactivateRequest({ warehouseLocationId });
    };
  };

  const handleActiveButton = warehouseLocationId => {
    return event => {
      event.stopPropagation();
      event.preventDefault();

      updateActivateRequest({ warehouseLocationId });
    };
  };

  const handleArchiveButton = warehouseLocationId => {
    return event => {
      event.stopPropagation();
      event.preventDefault();

      updateArchiveRequest({ warehouseLocationId });
    };
  };

  const handleTransferButton = data => {
    return event => {
      event.stopPropagation();
      event.preventDefault();

      updateAllowedForTransferRequest(data);
    };
  };

  const handleWriteOffEnabledUpdate = (event, checked, sectionId) => {
    event.stopPropagation();
    event.preventDefault();

    updateWriteOffEnabledRequest({ isAllowed: checked, warehouseLocationId: sectionId });
  };

  const getOptionsButton = section => {
    const sectionState = _.get(section, 'state', '');
    const sectionId = _.get(section, '_id', '');
    const writeOffEnabled = _.get(section, 'isAllowedForWriteOff', false);
    const isActive = sectionState !== WAREHOUSE_INACTIVE_STATE;
    const { isAllowedForTransfer } = section;
    return (
      <Space direction="vertical">
        {isActive ? (
          <Button block type="default" onClick={handleInActiveButton(sectionId)}>
            {t('DEACTIVATE')}
          </Button>
        ) : (
          <Space direction="vertical">
            <Button block type="default" onClick={handleActiveButton(sectionId)}>
              {t('ACTIVATE')}
            </Button>
            <Button block type="default" onClick={handleArchiveButton(sectionId)}>
              {t('ARCHIVE')}
            </Button>
          </Space>
        )}
        <Button
          block
          type="default"
          onClick={handleTransferButton({
            locationId: sectionId,
            isAllowed: !isAllowedForTransfer,
          })}
        >
          {isAllowedForTransfer ? t('PREVENT_FOR_TRANSFER') : t('ALLOWED_FOR_TRANSFER')}
        </Button>
        {canAccess(permKey.PAGE_WAREHOUSE_DETAIL_UPDATE_LOCATION_ALLOWANCE_FOR_WRITE_OFF) && (
          <Space direction="horizontal">
            <Switch
              size="small"
              checked={writeOffEnabled}
              title={t('WRITE_OFF')}
              onChange={(checked, event) => handleWriteOffEnabledUpdate(event, checked, sectionId)}
            />
            {t('WRITE_OFF')}
          </Space>
        )}
      </Space>
    );
  };

  const handlePopoverClick = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const getSectionOptions = section => {
    return (
      <Popover placement="bottom" content={getOptionsButton(section)} trigger="click">
        <Button onClick={handlePopoverClick} icon={<EditFilled />} />
      </Popover>
    );
  };

  const getHeader = section => {
    const warehouseLocationTemplate = _.get(section, 'warehouseLocationTemplate', '');
    const name = _.get(sectionTemplates, `${warehouseLocationTemplate}.name.${getLangKey()}`, '');
    const selfCode = _.get(section, 'selfCode', '');
    const code = _.get(section, 'code', '');
    return (
      <Text className={classes.panelHeader}>
        {name}
        <small> - {selfCode} - </small>
        <small>{code}</small>
      </Text>
    );
  };

  const handleBlockSubmitRequest = sectionId => {
    return params => {
      submitBlockRequest({
        ...params,
        sectionId,
      });
    };
  };

  const handleSelfCodeUpdateRequest = (sectionId, isEditable) => {
    return params => {
      if (!isEditable) {
        errorNotification({ message: t('error:SECTION_SHOULD_BE_INACTIVE') });
        return false;
      }
      updateSelfCodeRequest({
        ...params,
        warehouseLocationId: sectionId,
      });
      return true;
    };
  };

  const checkSectionState = section => {
    const sectionStateValue = _.get(section, 'state', '');
    return sectionStateValue === WAREHOUSE_INACTIVE_STATE;
  };

  const renderSections = () => {
    return sectionsState.map(section => {
      const blocks = _.get(section, 'blocks', []);
      const isEditable = checkSectionState(section);
      const isAvailableForStock = _.get(section, 'isAvailableForStock', false);
      return (
        <Panel
          key={section._id}
          header={getHeader(section)}
          extra={getSectionOptions(section)}
          className={isEditable ? classes.panelWrapperDanger : classes.panelWrapperSuccess}
        >
          <Section selfCode={section.selfCode} submitRequest={handleSelfCodeUpdateRequest(section._id, isEditable)} />
          {!isAvailableForStock ? (
            <>
              <Divider />
              <Title level={4}>{t('BLOCKS')}</Title>
              <Blocks
                blocks={blocks}
                blockTemplates={createMap(blockTemplates)}
                locationTemplates={blockTemplates}
                submitRequest={submitBlockRequest}
                updateSelfCodeRequest={updateSelfCodeRequest}
                updateActivateRequest={updateActivateRequest}
                updateDeactivateRequest={updateDeactivateRequest}
                updateAllowedForTransferRequest={updateAllowedForTransferRequest}
                updateArchiveRequest={updateArchiveRequest}
                errorNotification={errorNotification}
                isParentSectionEditable={isEditable}
              />
              <NewBlock locationTemplates={blockTemplates} submitRequest={handleBlockSubmitRequest(section._id)} />
            </>
          ) : null}
        </Panel>
      );
    });
  };

  useEffect(() => {
    setSectionsState(sections);
  }, [sections]);

  return (
    <Collapse>{renderSections()}</Collapse>
  );
}

export default Sections;
