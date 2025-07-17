import PropTypes from 'prop-types';
import { Collapse, Typography, Popover, Button, Space, Divider } from 'antd';
import { get as lget } from 'lodash';
import { useTranslation } from 'react-i18next';
import { EditFilled } from '@ant-design/icons';

import Block from '../Block';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { WAREHOUSE_INACTIVE_STATE } from '@shared/shared/constants';
import { createMap } from '@shared/utils/common';
import Cells from '../Cells';

const { Text, Title } = Typography;
const { Panel } = Collapse;

function Blocks(props) {
  const {
    blocks,
    blockTemplates,
    locationTemplates,
    errorNotification,
    updateActivateRequest,
    updateDeactivateRequest,
    updateAllowedForTransferRequest,
    updateSelfCodeRequest,
    updateArchiveRequest,
    isParentSectionEditable,
  } = props;
  const { t } = useTranslation('warehousePage');
  const classes = useStyles();

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

      if (isParentSectionEditable) {
        errorNotification({ message: t('error:PARENT_SECTION_SHOULD_BE_ACTIVE') });
        return false;
      }

      updateActivateRequest({ warehouseLocationId });
      return true;
    };
  };

  const handleArchiveButton = warehouseLocationId => {
    return event => {
      event.stopPropagation();
      event.preventDefault();

      updateArchiveRequest({ warehouseLocationId });
    };
  };

  const getOptionsButton = block => {
    const blockState = lget(block, 'state', '');
    const blockId = lget(block, '_id', '');
    const isActive = blockState !== WAREHOUSE_INACTIVE_STATE;
    return (
      isActive ? (
        <Button
          block
          type="default"
          onClick={handleInActiveButton(blockId)}
        >
          {t('DEACTIVATE')}
        </Button>
      )
        :
        (
          <Space direction="vertical">
            <Button
              block
              type="default"
              onClick={handleActiveButton(blockId)}
            >
              {t('ACTIVATE')}
            </Button>
            <Button
              block
              type="default"
              onClick={handleArchiveButton(blockId)}
            >
              {t('ARCHIVE')}
            </Button>
          </Space>
        )
    );
  };

  const handlePopoverClick = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const getBlockOptions = block => {
    return (
      <Popover
        placement="bottom"
        content={getOptionsButton(block)}
        trigger="click"
      >
        <Button
          onClick={handlePopoverClick}
          icon={<EditFilled />}
        />
      </Popover>
    );
  };

  const getHeader = block => {
    const warehouseLocationTemplate = lget(block, 'warehouseLocationTemplate', '');
    const name = lget(blockTemplates, `${warehouseLocationTemplate}.name.${getLangKey()}`, '');
    const selfCode = lget(block, 'selfCode', '');
    const code = lget(block, 'code', '');
    return (
      <Text className={classes.panelHeader}>
        {name}
        <small> - {selfCode} - </small>
        <small>{code}</small>
      </Text>
    );
  };

  const handleSelfCodeUpdateRequest = (blockId, isEditable) => {
    return params => {
      if (!isEditable) {
        errorNotification({ message: t('error:BLOCK_SHOULD_BE_INACTIVE') });
        return false;
      }
      updateSelfCodeRequest({
        ...params,
        warehouseLocationId: blockId,
      });
      return true;
    };
  };

  const checkBlockState = block => {
    const blockStateValue = lget(block, 'state', '');
    return blockStateValue === WAREHOUSE_INACTIVE_STATE;
  };

  const renderBlocks = () => {
    return blocks.map(block => {
      const cells = lget(block, 'cells', []);
      const isEditable = checkBlockState(block);
      return (
        <Panel
          key={block._id}
          header={getHeader(block)}
          extra={getBlockOptions(block)}
          className={isEditable ? classes.panelWrapperDanger : classes.panelWrapperSuccess}
        >
          <Block
            selfCode={block.selfCode}
            submitRequest={handleSelfCodeUpdateRequest(block._id, isEditable)}
          />
          <Divider />
          <Title level={4}>
            {t('CELLS')}
          </Title>
          <Cells
            cells={cells}
            cellTemplates={createMap(locationTemplates)}
            locationTemplates={locationTemplates}
            submitRequest={updateSelfCodeRequest}
            updateActivateRequest={updateActivateRequest}
            updateDeactivateRequest={updateDeactivateRequest}
            updateAllowedForTransferRequest={updateAllowedForTransferRequest}
            updateArchiveRequest={updateArchiveRequest}
            errorNotification={errorNotification}
            isParentBlockEditable={isEditable}
          />
        </Panel>
      );
    });
  };

  return (
    <Collapse>
      {renderBlocks()}
    </Collapse>
  );
}

Blocks.propTypes = {
  blocks: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  blockTemplates: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  errorNotification: PropTypes.func,
  locationTemplates: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  updateSelfCodeRequest: PropTypes.func,
  updateActivateRequest: PropTypes.func,
  updateDeactivateRequest: PropTypes.func,
  updateAllowedForTransferRequest: PropTypes.func,
  updateArchiveRequest: PropTypes.func,
  isParentSectionEditable: PropTypes.bool,
};

// TODO: correct these default props
Blocks.defaultProps = {
  blocks: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  blockTemplates: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  errorNotification: PropTypes.func,
  locationTemplates: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  updateSelfCodeRequest: PropTypes.func,
  updateActivateRequest: PropTypes.func,
  updateDeactivateRequest: PropTypes.func,
  updateAllowedForTransferRequest: PropTypes.func,
  updateArchiveRequest: PropTypes.func,
  isParentSectionEditable: PropTypes.bool,
};

export default Blocks;
