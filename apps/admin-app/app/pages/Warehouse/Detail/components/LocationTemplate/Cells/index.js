import PropTypes from 'prop-types';
import { Collapse, Typography, Popover, Button, Space } from 'antd';
import { get as lget } from 'lodash';
import { useTranslation } from 'react-i18next';
import { EditFilled } from '@ant-design/icons';

import Cell from '../Cell';
import useStyles from './styles';
import { PICKING_LOCATION_OPERATION_TYPE, WAREHOUSE_INACTIVE_STATE } from '@shared/shared/constants';

const { Text } = Typography;
const { Panel } = Collapse;

function Cells(props) {
  const {
    cells,
    submitRequest,
    updateActivateRequest,
    updateDeactivateRequest,
    updateAllowedForTransferRequest,
    updateArchiveRequest,
    errorNotification,
    isParentBlockEditable,
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

      if (isParentBlockEditable) {
        errorNotification({ message: t('error:PARENT_BLOCK_SHOULD_BE_ACTIVE') });
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

  const handleAllowedForTransferButton = (locationId, isAllowed) => {
    return event => {
      event.stopPropagation();
      event.preventDefault();

      updateAllowedForTransferRequest({ locationId, isAllowed });
    };
  };

  const getOptionsButton = cell => {
    const cellState = lget(cell, 'state', '');
    const cellId = lget(cell, '_id', '');
    const isActive = cellState !== WAREHOUSE_INACTIVE_STATE;
    const operationType = lget(cell, 'operationType', '');
    const transferStatus = lget(cell, 'isAllowedForTransfer', false);
    const isAllowedForTransfer = operationType === PICKING_LOCATION_OPERATION_TYPE && transferStatus;
    return (
      <Space direction="vertical">
        {
          isActive ? (
            <Button
              block
              type="default"
              onClick={handleInActiveButton(cellId)}
            >
              {t('DEACTIVATE')}
            </Button>
          )
            : [
              <Button
                key="activate"
                block
                type="default"
                onClick={handleActiveButton(cellId)}
              >
                {t('ACTIVATE')}
              </Button>,
              <Button
                key="archive"
                block
                type="default"
                onClick={handleArchiveButton(cellId)}
              >
                {t('ARCHIVE')}
              </Button>,
            ]
        }
        <Button
          block
          type="default"
          onClick={handleAllowedForTransferButton(cellId, !isAllowedForTransfer)}
        >
          {t(`${isAllowedForTransfer ? 'PREVENT' : 'ALLOWED'}_FOR_TRANSFER`)}
        </Button>
      </Space>
    );
  };

  const handlePopoverClick = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  const getCellOptions = cell => {
    return (
      <Popover
        placement="bottom"
        content={getOptionsButton(cell)}
        trigger="click"
      >
        <Button
          onClick={handlePopoverClick}
          icon={<EditFilled />}
        />
      </Popover>
    );
  };

  const getHeader = cell => {
    const name = t('CELL');
    const selfCode = lget(cell, 'selfCode', '');
    const code = lget(cell, 'code', '');
    return (
      <Text className={classes.panelHeader}>
        {name}
        <small> - {selfCode} - </small>
        <small>{code}</small>
      </Text>
    );
  };

  const handleSelfCodeUpdateRequest = (cellId, isEditable) => {
    return params => {
      if (!isEditable) {
        errorNotification({ message: t('error:CELL_SHOULD_BE_INACTIVE') });
        return false;
      }
      submitRequest({
        ...params,
        warehouseLocationId: cellId,
      });
      return true;
    };
  };

  const checkCellState = block => {
    const blockStateValue = lget(block, 'state', '');
    return blockStateValue === WAREHOUSE_INACTIVE_STATE;
  };

  const renderCells = () => {
    return cells.map(cell => {
      const isEditable = checkCellState(cell);
      return (
        <Panel
          key={cell._id}
          header={getHeader(cell)}
          extra={getCellOptions(cell)}
          className={isEditable ? classes.panelWrapperDanger : classes.panelWrapperSuccess}
        >
          <Cell selfCode={cell.selfCode} submitRequest={handleSelfCodeUpdateRequest(cell._id, isEditable)} />
        </Panel>
      );
    });
  };

  return (
    <Collapse>
      {renderCells()}
    </Collapse>
  );
}

Cells.propTypes = {
  cells: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  submitRequest: PropTypes.func,
  updateActivateRequest: PropTypes.func,
  updateDeactivateRequest: PropTypes.func,
  updateAllowedForTransferRequest: PropTypes.func,
  updateArchiveRequest: PropTypes.func,
  errorNotification: PropTypes.func,
  isParentBlockEditable: PropTypes.bool,
};

// TODO: correct these default values
Cells.defaultProps = {
  cells: undefined,
  submitRequest: undefined,
  updateActivateRequest: undefined,
  updateDeactivateRequest: undefined,
  updateAllowedForTransferRequest: undefined,
  updateArchiveRequest: undefined,
  errorNotification: undefined,
  isParentBlockEditable: undefined,
};

export default Cells;
