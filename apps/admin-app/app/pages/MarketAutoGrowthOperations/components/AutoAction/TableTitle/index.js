import { Row } from 'antd';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketAutoGrowthOperations/redux/actions';
import { actionSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { TitleButtons } from '@app/pages/MarketAutoGrowthOperations/components/TitleButtons';
import useStyles from '@app/pages/MarketAutoGrowthOperations/styles';

const TableTitle = (
  editMode,
  setEditMode,
  dispatch,
  setOpenDifference,
  setErrorMessage,
  setOpen,
  actionTableData,
  actionWarehouseList,
  setSelectedReason,
) => {
  const classes = useStyles();
  const { t } = useTranslation('marketAutoGrowthOperations');

  const initialPacket = '0';

  const updateActionListAdd = useSelector(actionSelector.updateActionListAdd);
  const updateActionListDelete = useSelector(
    actionSelector.updateActionListDelete,
  );
  const updateActionListUpdate = useSelector(
    actionSelector.updateActionListUpdate,
  );

  const handleCancel = () => {
    setEditMode(false);
    dispatch(Creators.setCancelActionChanges({}));
  };

  const checkFinalization = () => {
    const zeroIndex = [];
    const actions = [];
    let hasOrder = true;
    let hasEqual = false;
    let hasExternalZero = false;

    actionTableData.forEach(actionElement => {
      actions.push(actionElement?.action);
      if (actionElement?.packet?.toString() === initialPacket) {
        zeroIndex.push(actionElement);
      }
    });

    const tableDataWithoutId = actionTableData.map(({ id, ...rest }) => ({ ...rest }));
    tableDataWithoutId.forEach((data, dataIndex) => {
      if (isEqual(data, tableDataWithoutId[dataIndex - 1])) hasEqual = true;
    });

    actions.sort((a, b) => a - b);
    actions.forEach((inputNumber, indexInput) => {
      if (
        actions[indexInput - 1] !== undefined &&
        inputNumber - actions[indexInput - 1] !== 1 &&
        inputNumber - actions[indexInput - 1] !== -1 &&
        inputNumber - actions[indexInput - 1] !== 0
      ) {
        hasOrder = false;
      }
    });

    const allPacketSame = zeroIndex.every(
      (value, _, array) => value?.action === array[0]?.action,
    );

    if (allPacketSame) {
      const zeroAction = zeroIndex[0]?.action;
      hasExternalZero = actionTableData.some(
        value => value?.action === zeroAction &&
          value?.packet?.toString() !== initialPacket,
      );
    }

    let tempActionWarehouse = [];
    actionWarehouseList.forEach(warehouse => {
      tempActionWarehouse = { ...tempActionWarehouse, [warehouse]: false };
      zeroIndex.forEach(element => {
        if (element?.warehouseType === warehouse) {
          tempActionWarehouse[warehouse] = true;
        }
      });
    });
    const hasAllWarehouse = Object.values(tempActionWarehouse).some(
      item => item === false,
    );

    const groups = actionTableData.reduce(
      (action, item) => ({
        ...action,
        [item?.action]: [...(action[item?.action] || []), item],
      }),
      {},
    );

    let hasOtherPacket = false;
    Object.values(groups)?.forEach(group => {
      group.forEach((item, itemIndex) => {
        if (itemIndex > 0 && item?.packet !== group[itemIndex - 1].packet) {
          hasOtherPacket = true;
        }
      });
    });
    return {
      zeroIndex,
      hasOrder,
      allPacketSame,
      hasAllWarehouse,
      hasEqual,
      hasExternalZero,
      hasOtherPacket,
    };
  };

  const handleSave = () => {
    setOpenDifference(true);
    setErrorMessage('');
    setSelectedReason(null);

    const {
      zeroIndex,
      hasOrder,
      allPacketSame,
      hasAllWarehouse,
      hasEqual,
      hasExternalZero,
      hasOtherPacket,
    } = checkFinalization();
    if (zeroIndex?.length === 0) {
      setErrorMessage(t('ACTION_ERROR_MESSAGES.INITIAL_PACKAGE_REQUIRED'));
    }
    else if (!allPacketSame) {
      setErrorMessage(
        t('ACTION_ERROR_MESSAGES.INITIAL_PACKAGE_MUST_SAME_ACTION'),
      );
    }
    else if (hasExternalZero) {
      setErrorMessage(
        t('ACTION_ERROR_MESSAGES.MUST_NOT_OTHER_ACTION_IN_INITIAL_PACKAGE'),
      );
    }
    else if (hasAllWarehouse) {
      setErrorMessage(
        t('ACTION_ERROR_MESSAGES.INITIAL_PACKAGE_MUST_CONTAIN_ALL_WAREHOUSE'),
      );
    }
    else if (!hasOrder) {
      setErrorMessage(t('ACTION_ERROR_MESSAGES.ACTIONS_MUST_ORDER'));
    }
    else if (hasEqual) {
      setErrorMessage(t('ACTION_ERROR_MESSAGES.MUST_NOT_SAME_LINES'));
    }
    else if (hasOtherPacket) {
      setErrorMessage(
        t('ACTION_ERROR_MESSAGES.MUST_NOT_OTHER_PACKAGE_SAME_ACTION'),
      );
    }
    else setErrorMessage('');
  };

  return (
    <Row className={classes.tableButtonContainer}>
      <TitleButtons
        hasAdd
        addButtonContent={t('ADD_ACTION')}
        editMode={editMode}
        setOpen={setOpen}
        hasNoChange={
          updateActionListAdd?.length <= 0 &&
          updateActionListDelete?.length <= 0 &&
          updateActionListUpdate?.length <= 0
        }
        handleSave={handleSave}
        handleCancel={handleCancel}
        setEditMode={setEditMode}
        disabled={false}
        tableData={actionTableData}
        hasDeleteAll={false}
      />
    </Row>
  );
};
export default TableTitle;
