import { Col, Image, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import Card from '@shared/components/UI/AntCard';
import { Creators } from '../../redux/actions';
import { pickerDetailSelector } from '../../redux/selectors';
import GeneralInfo from '../GeneralInfo';

import IsAdmin from '../IsAdmin';
import PickerMap from '../PickerMap';
import IsInventoryChecker from '../isInventoryChecker';
import Warehouse from '../Warehouse';
import EmploymentType from '../EmploymentType';
import CurrentJob from '../CurrentJob';
import CrisisManagement from '@app/pages/Picker/CrisisManagement';
import IsOperationApprover from '../IsOperationApprover';
import { PICKER_STATUSES } from '@shared/shared/constants';

const PickerDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation('pickerDetailPage');
  const dispatch = useDispatch();

  const pickerDetailData = useSelector(pickerDetailSelector.getData);

  const pickerJobData = useSelector(pickerDetailSelector.getPickerJob);

  const updatePicker = updateData => {
    dispatch(
      Creators.updatePickerRequest({
        id,
        updateData,
      }),
    );
  };
  const releasePickerFromWarehouse = updateData => {
    dispatch(
      Creators.releasePickerFromWarehouseRequest({
        id,
        updateData,
      }),
    );
  };
  const updateWarehouse = updateData => {
    dispatch(
      Creators.updateWarehouseRequest({
        id,
        updateData,
      }),
    );
  };

  const onPickerRelease = () => {
    dispatch(Creators.releasePickerJobRequest({ id }));
  };

  return (
    <Row gutter={8}>
      <Col xs={24} lg={12}>
        <Row gutter={8}>
          <Col xs={24}>
            <PickerMap
              address={pickerDetailData?.homeAddress?.description}
              coordinates={
                pickerDetailData?.homeAddress?.location?.coordinates || [
                  29.0121795, 41.0053215,
                ]
              }
            />
          </Col>
          <Col xs={24}>
            <Row gutter={8}>
              <Col xs={24} lg={8}>
                <Card title={t('PICTURE')}>
                  <Image src={pickerDetailData.picURL} />
                </Card>
              </Col>
              <Col xs={24} lg={16}>
                <GeneralInfo
                  name={pickerDetailData.name}
                  gsm={pickerDetailData.personalGsm}
                  country={pickerDetailData?.country}
                  uniqueIdentifier={pickerDetailData?.username}
                  pickerType={pickerDetailData?.pickerType}
                  createdAt={pickerDetailData.createdAt}
                  personId={pickerDetailData?.person}
                  shouldAddEmployeeDiscount={
                    pickerDetailData?.shouldAddEmployeeDiscount
                  }
                  countryGsmCode={pickerDetailData?.countryGsmCode}
                  isGorillasEmployee={pickerDetailData?.isGorillasEmployee}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={12}>
        <Warehouse
          warehouse={pickerDetailData.warehouse}
          submitRequest={updateWarehouse}
          releasePickerFromWarehouse={releasePickerFromWarehouse}
          isPickerWorking={pickerJobData?.status === PICKER_STATUSES.WORKING}
        />
        <CurrentJob
          onPickerRelease={onPickerRelease}
          job={pickerJobData}
        />
        <IsAdmin
          isAdmin={pickerDetailData.isAdmin}
          submitRequest={updatePicker}
        />
        <IsInventoryChecker
          isInventoryChecker={pickerDetailData.isInventoryChecker}
          submitRequest={updatePicker}
        />
        <IsOperationApprover
          isOperationApprover={pickerDetailData.isOperationApprover}
          submitRequest={updatePicker}
        />
        <EmploymentType
          employmentType={pickerDetailData.employmentType}
          submitRequest={updatePicker}
          personEmploymentType={pickerDetailData.personEmploymentType}
        />
      </Col>
      <Col>
        <CrisisManagement pickerId={id} />
      </Col>
    </Row>
  );
};

export default PickerDetail;
