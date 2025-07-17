import PropTypes from 'prop-types';
import { Collapse, Typography, Popover, Button, Space } from 'antd';
import { get as lget } from 'lodash';
import { useTranslation } from 'react-i18next';
import { EditFilled } from '@ant-design/icons';

import PickerBasket from '../PickerBasket';
import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import { WAREHOUSE_INACTIVE_STATE } from '@shared/shared/constants';

const { Text } = Typography;
const { Panel } = Collapse;

function PickerBaskets(props) {
  const {
    pickerBaskets,
    pickerBasketTemplates,
    updateSelfCodeRequest,
    updateActivateRequest,
    updateDeactivateRequest,
    updateArchiveRequest,
    errorNotification,
  } = props;
  const { t } = useTranslation();
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

  const getOptionsButton = pickerBasket => {
    const pickerBasketState = lget(pickerBasket, 'state', '');
    const pickerBasketId = lget(pickerBasket, '_id', '');
    const isActive = pickerBasketState !== WAREHOUSE_INACTIVE_STATE;
    return (
      isActive ? (
        <Button
          block
          type="default"
          onClick={handleInActiveButton(pickerBasketId)}
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
              onClick={handleActiveButton(pickerBasketId)}
            >
              {t('ACTIVATE')}
            </Button>
            <Button
              block
              type="default"
              onClick={handleArchiveButton(pickerBasketId)}
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

  const getPickerBasketOptions = pickerBasket => {
    return (
      <Popover
        placement="bottom"
        content={getOptionsButton(pickerBasket)}
        trigger="click"
      >
        <Button
          onClick={handlePopoverClick}
          icon={<EditFilled />}
        />
      </Popover>
    );
  };

  const getHeader = pickerBasket => {
    const warehouseLocationTemplate = lget(pickerBasket, 'warehouseLocationTemplate', '');
    const name = lget(pickerBasketTemplates, `${warehouseLocationTemplate}.name.${getLangKey()}`, '');
    const code = lget(pickerBasket, 'code', '');
    return (
      <Text className={classes.panelHeader}>
        {name}
        <small> - {code}</small>
      </Text>
    );
  };

  const handleSelfCodeUpdateRequest = (pickerBasketId, isEditable) => {
    return params => {
      if (!isEditable) {
        errorNotification({ message: t('error:PICKER_BASKET_SHOULD_BE_INACTIVE') });
        return false;
      }
      updateSelfCodeRequest({
        ...params,
        warehouseLocationId: pickerBasketId,
      });
      return true;
    };
  };

  const checkPickerBasketState = pickerBasket => {
    const pickerBasketStateValue = lget(pickerBasket, 'state', '');
    return pickerBasketStateValue === WAREHOUSE_INACTIVE_STATE;
  };

  const renderPickerBaskets = () => {
    return pickerBaskets.map(pickerBasket => {
      const isEditable = checkPickerBasketState(pickerBasket);
      return (
        <Panel
          key={pickerBasket._id}
          header={getHeader(pickerBasket)}
          extra={getPickerBasketOptions(pickerBasket)}
          className={isEditable ? classes.panelWrapperDanger : classes.panelWrapperSuccess}
        >
          <PickerBasket
            selfCode={pickerBasket.selfCode}
            submitRequest={handleSelfCodeUpdateRequest(pickerBasket._id, isEditable)}
          />
        </Panel>
      );
    });
  };

  return (
    <Collapse>
      {renderPickerBaskets()}
    </Collapse>
  );
}

PickerBaskets.propTypes = {
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  pickerBaskets: PropTypes.array,
  pickerBasketTemplates: PropTypes.shape({}),
  updateSelfCodeRequest: PropTypes.func,
  updateActivateRequest: PropTypes.func,
  updateDeactivateRequest: PropTypes.func,
  updateArchiveRequest: PropTypes.func,
  errorNotification: PropTypes.func,
};

// TODO: correct these default props
PickerBaskets.defaultProps = {
  pickerBaskets: undefined,
  pickerBasketTemplates: undefined,
  updateSelfCodeRequest: undefined,
  updateActivateRequest: undefined,
  updateDeactivateRequest: undefined,
  updateArchiveRequest: undefined,
  errorNotification: undefined,
};

export default PickerBaskets;
