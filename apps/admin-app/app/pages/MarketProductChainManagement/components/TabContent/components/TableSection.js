import { useCallback } from 'react';

import { Button } from '@shared/components/GUI';
import DraggableTable from '@app/pages/MarketProductChainManagement/components/DraggableTable';

const TableSection = ({
  classes,
  pageType,
  modals,
}) => {
  const {
    handleOpenFreezeColumnsModal,
    handleOpenManageColumnsModal,
  } = modals;

  const handleFreezeColumnsClick = useCallback(() => {
    handleOpenFreezeColumnsModal();
  }, [handleOpenFreezeColumnsModal]);

  const handleManageColumnsClick = useCallback(() => {
    handleOpenManageColumnsModal();
  }, [handleOpenManageColumnsModal]);

  return (
    <div className={classes.tableSection}>
      <div className={classes.tableActions}>
        <Button onClick={handleFreezeColumnsClick}>
          Freeze Columns
        </Button>
        <Button onClick={handleManageColumnsClick}>
          Manage Columns
        </Button>
      </div>

      <DraggableTable
        pageType={pageType}
        classes={classes}
      />
    </div>
  );
};

export default TableSection;
