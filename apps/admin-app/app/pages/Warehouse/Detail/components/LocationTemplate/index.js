import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';
import NewSection from './NewSection';
import NewPickerBasket from './NewPickerBasket';
import Sections from './Sections';
import { createMap } from '@shared/utils/common';
import PickerBaskets from './PickerBaskets';

const { TabPane } = Tabs;

function LocationTemplate(props) {
  const {
    sections,
    sectionTemplates,
    pickerBaskets,
    pickerBasketTemplates,
    blockTemplates,
    createNewSectionRequest,
    createNewBlockRequest,
    updateWarehouseLocationActivateRequest,
    updateWarehouseLocationDeactivateRequest,
    updateWarehouseLocationAllowedForTransferRequest,
    updateWarehouseLocationArchiveRequest,
    saveWarehouseLocationSelfCodeRequest,
    updateLocationWriteOffEnabledRequest,
    errorNotification,
  } = props;
  const { t } = useTranslation('warehousePage');

  return (
    <Card title={t('LOCATION_ARCHITECTURE')}>
      <Tabs defaultActiveKey="1">
        <TabPane tab={t('SECTIONS')} key="1">
          <Sections
            sections={sections}
            locationTemplates={sectionTemplates}
            sectionTemplates={createMap(sectionTemplates)}
            blockTemplates={blockTemplates}
            updateSelfCodeRequest={saveWarehouseLocationSelfCodeRequest}
            submitBlockRequest={createNewBlockRequest}
            updateActivateRequest={updateWarehouseLocationActivateRequest}
            updateDeactivateRequest={updateWarehouseLocationDeactivateRequest}
            updateAllowedForTransferRequest={updateWarehouseLocationAllowedForTransferRequest}
            updateArchiveRequest={updateWarehouseLocationArchiveRequest}
            updateWriteOffEnabledRequest={updateLocationWriteOffEnabledRequest}
            errorNotification={errorNotification}
          />
          <NewSection
            locationTemplates={sectionTemplates}
            submitRequest={createNewSectionRequest}
          />
        </TabPane>
        <TabPane tab={t('PICKER_BASKETS')} key="2">
          <PickerBaskets
            pickerBaskets={pickerBaskets}
            pickerBasketTemplates={createMap(pickerBasketTemplates)}
            updateSelfCodeRequest={saveWarehouseLocationSelfCodeRequest}
            updateActivateRequest={updateWarehouseLocationActivateRequest}
            updateDeactivateRequest={updateWarehouseLocationDeactivateRequest}
            updateArchiveRequest={updateWarehouseLocationArchiveRequest}
            errorNotification={errorNotification}
          />
          <NewPickerBasket
            locationTemplates={pickerBasketTemplates}
            submitRequest={createNewSectionRequest}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
}

export default LocationTemplate;
