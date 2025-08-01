import { Tag, Tooltip } from 'antd';
import { useCallback } from 'react';

const useCentralWarehouseOperations = stableCentralWarehouses => {
  const hasDefaultCentralWarehouse = useCallback(product => {
    const defaultId = product.centralWarehouse?.id;
    if (!defaultId) return false;

    const matchedWarehouse = stableCentralWarehouses.find(cw => cw.value === defaultId ||
      cw.warehouseDetails?.id === defaultId ||
      cw.warehouseDetails?.warehouseId === defaultId);

    return !!matchedWarehouse;
  }, [stableCentralWarehouses]);

  const renderCentralWarehouseTags = useCallback(productList => {
    if (!Array.isArray(productList)) return null;

    const uniqueCWNames = productList
      .map(product => product.centralWarehouse?.name)
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index);

    const visibleTags = uniqueCWNames.slice(0, 3).map(name => (
      <Tag key={`cw-${name}`}>{name}</Tag>
    ));

    if (uniqueCWNames.length > 3) {
      const remaining = uniqueCWNames.length - 3;
      const tooltipContent = uniqueCWNames.join(', ');
      return (
        <>
          {visibleTags}
          <Tooltip title={tooltipContent} placement="top">
            <Tag>{`+${remaining} more`}</Tag>
          </Tooltip>
        </>
      );
    }

    return visibleTags;
  }, []);

  return {
    hasDefaultCentralWarehouse,
    renderCentralWarehouseTags,
  };
};

export default useCentralWarehouseOperations;
