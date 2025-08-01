import AddPlatformModal from '@app/pages/MarketProductChainManagement/components/Modals/AddPlatformModal';
import DeletePlatformModal from '@app/pages/MarketProductChainManagement/components/Modals/DeletePlatformModal';
import FreezeColumnsModal from '@app/pages/MarketProductChainManagement/components/Modals/FreezeColumnsModal';
import ManageColumnsModal from '@app/pages/MarketProductChainManagement/components/Modals/ManageColumnsModal';

const Modals = ({ modals, activeTab }) => (
  <>
    <FreezeColumnsModal
      openFreezeColumnsModal={modals.openFreezeColumnsModal}
      setOpenFreezeColumnsModal={modals.setOpenFreezeColumnsModal}
      options={modals.renderModalOptions()}
      selectedFreezeColumns={modals.selectedFreezeColumns}
      setSelectedFreezeColumns={modals.setSelectedFreezeColumns}
    />
    <ManageColumnsModal
      openManageColumnsModal={modals.openManageColumnsModal}
      setOpenManageColumnsModal={modals.setOpenManageColumnsModal}
      options={modals.renderModalOptions()}
      selectedManageColumns={modals.selectedManageColumns}
      setSelectedManageColumns={modals.setSelectedManageColumns}
      activeTab={activeTab}
    />
    <DeletePlatformModal
      openDeletePlatformModal={modals.openDeletePlatformModal}
      setOpenDeletePlatformModal={modals.setOpenDeletePlatformModal}
      deletePlatformRecord={modals.deletePlatformRecord}
      setDeletePlatformRecord={modals.setDeletePlatformRecord}
    />
    <AddPlatformModal
      openAddPlatformModal={modals.openAddPlatformModal}
      setOpenAddPlatformModal={modals.setOpenAddPlatformModal}
    />
  </>
);

export default Modals;
