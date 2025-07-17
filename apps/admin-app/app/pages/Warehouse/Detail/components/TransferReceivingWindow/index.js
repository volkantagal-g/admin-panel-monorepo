import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@shared/components/UI/AntCard';
import { Creators } from '../../redux/actions';
import { warehouseSelector } from '../../redux/selectors';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { TRANSFER_RECEIVING_WINDOWS_MIN_RANGE } from './constants';
import WorkingHoursSelect from '@shared/components/UI/WorkingHoursSelect';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { SelectWrapper } from '@shared/components/UI/Form';

const TransferReceiving = props => {
  const { timezone, transferReceiving, updateTransferReceivingWindow, isPending } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const selectWrapperRef = useRef(null);
  const warehouseSearchResult = useSelector(warehouseSelector.filteredWarehouses);

  const [selectedHelperWarehouse, setSelectedHelperWarehouse] = useState();
  const [updatedTransferReceiving, setUpdatedTransferReceiving] = useState(null);

  const [parentWorkingHoursEditableCold, setParentWorkingHoursEditableCold] = useState(false);
  const [parentWorkingHoursEditableAmbient, setParentWorkingHoursEditableAmbient] = useState(false);

  const hasAccessToEdit = canAccess(permKey.PAGE_WAREHOUSE_DETAIL_COMPONENT_UPDATE_TRANSFER_RECEIVING_WINDOWS);

  const isInRange = useCallback((source, value) => {
    return source?.some(timeObject => {
      return value > timeObject.startMin && timeObject.endMin >= value;
    });
  }, []);

  const handleWarehouseSelect = useCallback(id => {
    const helperWh = warehouseSearchResult.find(wh => wh.id === id);
    if (helperWh?.transferReceivingWindows) {
      setParentWorkingHoursEditableCold(true);
      setParentWorkingHoursEditableAmbient(true);
      setSelectedHelperWarehouse(helperWh);
    }
    else {
      setParentWorkingHoursEditableCold(false);
      setParentWorkingHoursEditableAmbient(false);
      setSelectedHelperWarehouse(transferReceiving);
    }
  }, [transferReceiving, warehouseSearchResult]);

  const handleSearch = useCallback(searchValue => {
    dispatch(Creators.getWarehousesFilterRequest({ name: searchValue, fields: 'name transferReceivingWindows' }));
  }, [dispatch]);

  const { debouncedCallback } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const onSearch = useCallback(searchValue => {
    if (searchValue?.trim().length > 2) {
      debouncedCallback(searchValue);
    }
    else {
      debouncedCallback.cancel();
    }
  }, [debouncedCallback]);

  const getAvailableTimes = useCallback(availableTimes => {
    return Array.from({ length: (24 * 7 * 60) / TRANSFER_RECEIVING_WINDOWS_MIN_RANGE }).reduce((sumObject, tempValue, tempIndex) => {
      const timeValue = (tempIndex * TRANSFER_RECEIVING_WINDOWS_MIN_RANGE) + TRANSFER_RECEIVING_WINDOWS_MIN_RANGE;
      return {
        ...sumObject,
        [tempIndex]: isInRange(availableTimes, timeValue),
      };
    }, {});
  }, [isInRange]);

  const handleWorkingHoursSubmit = async ({ updateData, id }) => {
    const { hours } = updateData;
    const reqBody = { timezone: hours.timezone, timeWindows: hours.availableTimes, transferType: id };

    await updateTransferReceivingWindow(reqBody);
  };

  const handleWorkingHoursEditableChange = useCallback((type, isEditable) => {
    if (type === 'cold') {
      setParentWorkingHoursEditableCold(isEditable);
    }
    else if (type === 'ambient') {
      setParentWorkingHoursEditableAmbient(isEditable);
    }
  }, []);

  useEffect(() => {
    if (!isPending && updatedTransferReceiving) {
      setSelectedHelperWarehouse(updatedTransferReceiving);
      setUpdatedTransferReceiving(null);
    }
  }, [isPending, transferReceiving, updatedTransferReceiving]);

  const currentTransferReceiving = useMemo(() => {
    let transferReceivingEdit = transferReceiving;
    if (selectedHelperWarehouse && selectedHelperWarehouse.transferReceivingWindows) {
      transferReceivingEdit = selectedHelperWarehouse.transferReceivingWindows;
    }
    if (updatedTransferReceiving) {
      transferReceivingEdit = updatedTransferReceiving.transferReceivingWindows;
    }
    return {
      cold: parentWorkingHoursEditableCold ? transferReceivingEdit.cold : transferReceiving.cold,
      ambient: parentWorkingHoursEditableAmbient ? transferReceivingEdit.ambient : transferReceiving.ambient,
    };
  }, [parentWorkingHoursEditableAmbient, parentWorkingHoursEditableCold, selectedHelperWarehouse,
    transferReceiving, updatedTransferReceiving]);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const selectElement = selectWrapperRef.current?.querySelector('.ant-select-selector');
    if (selectElement) {
      selectElement.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (selectElement) {
        selectElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  const renderSelectWrapper = () => (
    <div ref={selectWrapperRef}>
      <SelectWrapper
        selectKey="refStore"
        dataTestId="reference-warehouse-select"
        label={t('warehousePage:REFERENCE_STORE')}
        value={selectedHelperWarehouse?._id}
        optionsData={warehouseSearchResult}
        optionLabelProp="name"
        optionValueProp="_id"
        onChangeCallback={handleWarehouseSelect}
        allowClear
        onSearch={onSearch}
        itemStyle={{ width: 'calc(100% - 40px)' }}
      />
    </div>
  );

  const renderTransferReceivingByTypes = (type, parentEditable) => {
    return (
      <WorkingHoursSelect
        key={type}
        id={type}
        header={t(`warehousePage:${type.toUpperCase()}`)}
        availableTimes={getAvailableTimes(currentTransferReceiving[type]?.availableTimes)}
        collapsePanelKey={type}
        submitWorkingHours={handleWorkingHoursSubmit}
        isEditable
        timezone={timezone}
        hasAccessToEditWorkingHours={hasAccessToEdit}
        hasAccessToEditWorkingHoursMessage={false}
        mins={TRANSFER_RECEIVING_WINDOWS_MIN_RANGE}
        headerSelectable
        messageObject={{}}
        submitWorkingHoursMessage={() => {}}
        parentWorkingHoursEditable={parentEditable}
        onParentWorkingHoursEditableChange={isEditable => handleWorkingHoursEditableChange(type, isEditable)}
      />
    );
  };

  return (
    <Card title={t('warehousePage:TRANSFER_RECEIVING_WINDOWS')}>
      {renderSelectWrapper()}
      {renderTransferReceivingByTypes('cold', parentWorkingHoursEditableCold)}
      {renderTransferReceivingByTypes('ambient', parentWorkingHoursEditableAmbient)}
    </Card>
  );
};

export default TransferReceiving;
