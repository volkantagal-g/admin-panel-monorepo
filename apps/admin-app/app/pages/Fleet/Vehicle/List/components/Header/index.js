import { useTranslation } from 'react-i18next';
import { Row, Col, PageHeader, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import RedirectButton from '@shared/components/UI/RedirectButton';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import Export from '../Export/index';
import VehicleCsvFileUploader from '../csvUpload';
import { vehicleListSelector } from '../../redux/selector';
import { Creators } from '../../redux/action';

const Header = ({ filters }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const data = useSelector(vehicleListSelector.getFailedUploadCsvVehicleLogs);

  const { Can } = usePermission();

  return (
    <Row gutter={[8, 4]}>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('PAGE_TITLE.FLEET.VEHICLE.LIST')} />
      </Col>
      <Can permKey={permKey?.PAGE_VEHICLE_NEW_COMPONENT_CSV_BULK_UPLOAD}>
        <Col>
          <VehicleCsvFileUploader buttonText={t('PAGE_TITLE.FLEET.VEHICLE.UPLOAD')} />
        </Col>
        {data?.length > 0 && (
        <Col>
          <Button
            onClick={() => dispatch(Creators.updateCsvWarningModalVisibility({ showCsvWarningModal: true }))}
          >
            {t('marketVehicle:LATEST_BULK_UPLOAD_WARNINGS_BUTTON')}
          </Button>
        </Col>
        )}

        <Col>
          <RedirectButton title={t('PAGE_TITLE.FLEET.VEHICLE.NEW')} to={ROUTE?.VEHICLE_NEW?.path} />
        </Col>
        <Col>
          <Export filters={filters} />
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
