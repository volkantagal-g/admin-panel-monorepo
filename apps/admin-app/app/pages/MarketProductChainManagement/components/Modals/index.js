import AddPlatformModal from '@app/pages/MarketProductChainManagement/components/Modals/AddPlatformModal';
import DeletePlatformModal from '@app/pages/MarketProductChainManagement/components/Modals/DeletePlatformModal';
import FreezeColumnsModal from '@app/pages/MarketProductChainManagement/components/Modals/FreezeColumnsModal';
import ManageColumnsModal from '@app/pages/MarketProductChainManagement/components/Modals/ManageColumnsModal';

const Modals = ({ modals }) => (
  <>
    <AddPlatformModal
      openAddPlatformModal={modals.openAddPlatformModal}
      setOpenAddPlatformModal={modals.setOpenAddPlatformModal}
    />
    <DeletePlatformModal
      deletePlatformRecord={modals.deletePlatformRecord}
      setDeletePlatformRecord={modals.setDeletePlatformRecord}
      openDeletePlatformModal={modals.openDeletePlatformModal}
      setOpenDeletePlatformModal={modals.setOpenDeletePlatformModal}
    />
    <FreezeColumnsModal
      openFreezeColumnsModal={modals.openFreezeColumnsModal}
      setOpenFreezeColumnsModal={modals.setOpenFreezeColumnsModal}
      options={modals.options}
      selectedFreezeColumns={modals.selectedFreezeColumns}
      setSelectedFreezeColumns={modals.setSelectedFreezeColumns}
    />
    <ManageColumnsModal
      openManageColumnsModal={modals.openManageColumnsModal}
      setOpenManageColumnsModal={modals.setOpenManageColumnsModal}
      options={modals.options}
      selectedManageColumns={modals.selectedManageColumns}
      setSelectedManageColumns={modals.setSelectedManageColumns}
      activeTab={modals.activeTab}
    />
  </>
);

export default Modals;
