import _ from 'lodash';
import { Col, Row, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo } from 'react';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import GeneralInfo from '../GeneralInfo';
import AddressInfo from '../AddressInfo';
import WarehouseType from '../WarehouseType';
import DomainTypes from '../DomainTypes';
import MainStoreInfo from '../MainStoreInfo';
import NonagreementWarehouseInfo from '../NonagreementWarehouseInfo';
import BudgetInfo from '../BudgetInfo';
import ManpowerInfo from '../ManpowerInfo';
import TransferGroupInfo from '../TransferGroupInfo';
import SurfaceAreaInfo from '../SurfaceAreaInfo';
import FranchiseInfo from '../FranchiseInfo';
import FixtureInfo from '../FixtureInfo';
import FoodOrderSettings from '../FoodOrderSettings';
import DomainConfigs from '../DomainConfigs';
import Couriers from '../Couriers';
import Pickers from '../Pickers';
import WarehouseState from '../WarehouseState';
import WarehouseStatus from '../WarehouseStatus';
import WorkingHours from '../WorkingHours';
import PeakHours from '../PeakHours';
import TransferReceiving from '../TransferReceivingWindow';
import LocationTemplate from '../LocationTemplate';
import AlgorithmConfig from '../AlgorithmConfig';
import DeliveryFeeSegmentInfo from '../DeliveryFeeSegmentInfo';
import ProductPricingSegmentInfo from '../ProductPricingSegmentInfo';
import PromoAggressionLevel from '../PromoAggressionLevel';
import WarehouseTestStatus from '../WarehouseTestStatus';
import AcceptReturns from '../AcceptReturns';
import { SAPReferenceProvider } from '../SAPReferenceContext';
import { Creators } from '../../redux/actions';

import useStyles from './styles';
import { STORE_CONVERSION_WAREHOUSE_TYPE, MAIN_WAREHOUSE_TYPE, VIRTUAL_WAREHOUSE_TYPE } from '@shared/shared/constants';
import { getEmployeesSelector, warehouseSelector } from '../../redux/selectors';
import {
  getCitiesSelector,
  getMarketFranchisesSelector,
  getTransferGroupsSelector,
  mainStoresSelector,
  nonagreementWarehousesSelector,
  regionsSelector,
} from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators as FranchiseCommonCreators } from '@shared/redux/actions/franchiseCommon';
import { getFranchiseAreasSelector } from '@shared/redux/selectors/franchiseCommon';

import {
  isBudgetItemInfoValid,
  isManHourFeeGroupInfoValid,
  isFranchiseInfoValid,
  isGeneralInfoValid,
  isOvenInfoValid,
  isSurfaceAreaInfoValid,
  isWarehouseAddressValid,
} from './detailValidation';
import ShippingData from '../ShippingData';
import FranchiseAreaInfo from '../FranchiseAreaInfo';

function FormWrapper() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const { t } = useTranslation('warehousePage');
  const { Can, canAccess } = usePermission();

  const warehouse = {
    generalInfo: useSelector(warehouseSelector.getGeneralInfo),
    addressInfo: useSelector(warehouseSelector.getAddressInfo),
    warehouseType: useSelector(warehouseSelector.getWarehouseType),
    domainTypes: useSelector(warehouseSelector.getDomainTypes),
    mainStore: useSelector(warehouseSelector.getMainStore),
    nonagreementWarehouse: useSelector(warehouseSelector.getNonagreementWarehouse),
    budgetInfo: useSelector(warehouseSelector.getBudgetInfo),
    manHourFeeGroup: useSelector(warehouseSelector.getManHourFeeGroup),
    transferGroup: useSelector(warehouseSelector.getTransferGroup),
    surfaceAreaInfo: useSelector(warehouseSelector.getSurfaceAreaInfo),
    franchise: useSelector(warehouseSelector.getFranchise),
    fixtureInfo: useSelector(warehouseSelector.getFixtureInfo),
    foodOrderSettings: useSelector(warehouseSelector.getFoodOrderSettings),
    domainConfigs: useSelector(warehouseSelector.getDomainConfigs),
    couriers: useSelector(warehouseSelector.getCouriers),
    pickers: useSelector(warehouseSelector.getPickers),
    state: useSelector(warehouseSelector.getState),
    status: useSelector(warehouseSelector.getStatus),
    isTestWarehouse: useSelector(warehouseSelector.getTestStatus),
    acceptReturns: useSelector(warehouseSelector.getAcceptReturns),
    workingHours: useSelector(warehouseSelector.getWorkingHours),
    peakHours: useSelector(warehouseSelector.getPeakHours),
    transferReceiving: useSelector(warehouseSelector.getTransferReceiving),
    baseWorkingHourType: useSelector(warehouseSelector.getBaseWorkingHourType),
    basePeakHourType: useSelector(warehouseSelector.getBasePeakHourType),
    timezone: useSelector(warehouseSelector.getTimezone),
    blockTemplates: useSelector(warehouseSelector.getBlockTemplates),
    pickerBasketTemplates: useSelector(warehouseSelector.getPickerBasketTemplates),
    sectionTemplates: useSelector(warehouseSelector.getSectionTemplates),
    sections: useSelector(warehouseSelector.getSections),
    pickerBaskets: useSelector(warehouseSelector.getPickerBaskets),
    algorithmConfig: useSelector(warehouseSelector.getAlgorithmConfig),
    deliveryFeeSegmentId: useSelector(warehouseSelector.getDeliveryFeeSegmentId),
    productPricingSegmentId: useSelector(warehouseSelector.getProductPricingSegmentId),
    deliveryFeeSegments: useSelector(warehouseSelector.getDeliveryFeeSegments),
    productPricingSegments: useSelector(warehouseSelector.getProductPricingSegments),
    isAllowedForNegativeStock: useSelector(warehouseSelector.getIsAllowedForNegativeStock),
    mainWarehouses: useSelector(warehouseSelector.getMainWarehouses),
    promoAggressionLevel: useSelector(warehouseSelector.getPromoAggressionLevel),
    shipmentPreparations: useSelector(warehouseSelector.getWarehouseShipmentPreparations),
    shipmentFrequencies: useSelector(warehouseSelector.getWarehouseShipmentFrequencies),
    franchiseAreaId: useSelector(warehouseSelector.getFranchiseAreaId),
    isWarehousePending: useSelector(warehouseSelector.getIsPending),
  };

  useEffect(() => {
    if (warehouse.warehouseType) {
      dispatch(Creators.getWarehouseLocationTemplatesRequest({ warehouseType: warehouse.warehouseType }));
    }
  }, [dispatch, warehouse.warehouseType]);

  const cities = useSelector(getCitiesSelector.getData);
  const regions = useSelector(regionsSelector.getData);
  const mainStores = useSelector(mainStoresSelector.getData);
  const nonagreementWarehouses = useSelector(nonagreementWarehousesSelector.getData);
  const transferGroups = useSelector(getTransferGroupsSelector.getActiveGroups);
  const pureFranchises = useSelector(getMarketFranchisesSelector.getData);
  const storeConversionFranchises = useSelector(getMarketFranchisesSelector.getStoreConversionFranchises);
  const franchiseAreas = useSelector(getFranchiseAreasSelector.getData);
  const employees = useSelector(getEmployeesSelector.getData);

  const transferReceivingRef = useMemo(() => (
    Object.keys(warehouse.transferReceiving).length ? warehouse.transferReceiving : { cold: {}, ambient: {} }
  ), [warehouse.transferReceiving]);

  const updateWarehouseInfoRequest = updateData => {
    dispatch(Creators.updateWarehouseInfoRequest({ id, updateData }));
  };

  const updateWarehouseBudgetInfoRequest = updatedBudgetInfoData => {
    dispatch(Creators.updateWarehouseBudgetInfoRequest({ id, SAPReferenceCode: warehouse.generalInfo.SAPReferenceCode, updatedBudgetInfoData }));
  };

  const updateWarehouseAcceptReturnsRequest = acceptReturns => {
    dispatch(Creators.updateWarehouseAcceptReturnsRequest({ id, acceptReturns }));
  };

  const updateWarehouseTestStatusRequest = isTestWarehouse => {
    dispatch(Creators.updateWarehouseTestStatusRequest({ id, isTestWarehouse }));
  };

  const updateWarehouseManpowerRequest = updateData => {
    dispatch(Creators.updateWarehouseManpowerRequest({ id, updateData }));
  };

  const addWarehouseShipmentPreparationRequest = shipmentPreparation => {
    dispatch(Creators.addWarehouseShipmentPreparationRequest({ warehouseId: id, shipmentPreparation }));
  };

  const addWarehouseShipmentFrequencyRequest = shipmentFrequency => {
    dispatch(Creators.addWarehouseShipmentFrequencyRequest({ warehouseId: id, shipmentFrequency }));
  };

  const updateWarehouseShipmentPreparationRequest = shipmentPreparation => {
    dispatch(Creators.updateWarehouseShipmentPreparationRequest({ warehouseId: id, shipmentPreparation }));
  };

  const updateWarehouseShipmentFrequencyRequest = shipmentFrequency => {
    dispatch(Creators.updateWarehouseShipmentFrequencyRequest({ warehouseId: id, shipmentFrequency }));
  };

  const updateWarehouseAddressRequest = updateData => {
    dispatch(Creators.updateWarehouseAddressRequest({ id, updateData }));
  };

  const updateWarehouseTypeRequest = updateData => {
    dispatch(Creators.updateWarehouseTypeRequest({ id, updateData }));
  };

  const updateWarehouseDomainTypesRequest = updateData => {
    dispatch(Creators.updateWarehouseDomainTypesRequest({ id, updateData }));
  };

  const updateWarehouseMainStoreRequest = updateData => {
    dispatch(Creators.updateWarehouseMainStoreRequest({ id, updateData }));
  };

  const unassignFranchiseRequest = franchiseId => {
    dispatch(Creators.unassignFranchiseRequest({ id, franchiseId }));
  };

  const assignFranchiseRequest = franchiseId => {
    dispatch(Creators.assignFranchiseRequest({ id, franchiseId }));
  };

  const assignFranchiseAreaRequest = franchiseAreaId => {
    dispatch(Creators.assignFranchiseAreaRequest({ warehouseId: id, franchiseAreaId }));
  };

  const updateWarehouseBusinessDecisionsRequest = updateData => {
    dispatch(Creators.updateWarehouseBusinessDecisionsRequest({ id, updateData }));
  };

  const updateWarehouseConfigRequest = updateData => {
    dispatch(Creators.updateWarehouseConfigRequest({ id, updateData }));
  };

  const archiveWarehouseRequest = () => {
    dispatch(Creators.archiveWarehouseRequest({ id }));
  };

  const deactivateWarehouseRequest = () => {
    dispatch(Creators.deactivateWarehouseRequest({ id }));
  };

  const activateWarehouseRequest = () => {
    dispatch(Creators.activateWarehouseRequest({ id }));
  };

  const updateWarehouseStatusRequest = updateData => {
    dispatch(Creators.updateWarehouseStatusRequest({ id, updateData }));
  };

  const updateTransferGroupOfWarehouseRequest = transferGroup => {
    dispatch(Creators.updateTransferGroupOfWarehouseRequest({ warehouse: id, ...transferGroup }));
  };

  const deleteTransferGroupOfWarehouseRequest = () => {
    dispatch(Creators.deleteTransferGroupOfWarehouseRequest({ warehouse: id }));
  };

  const updateBaseWorkingHoursTypeRequest = updateData => {
    dispatch(Creators.updateBaseWorkingHoursTypeRequest({ id, updateData }));
  };

  const updateWorkingHoursRequest = requestBody => {
    dispatch(Creators.updateWorkingHoursRequest(requestBody));
  };

  const updateWorkingHoursMessageRequest = requestBody => {
    dispatch(Creators.updateWorkingHoursMessageRequest(requestBody));
  };

  const createNewSectionRequest = params => {
    dispatch(Creators.createNewSectionRequest({ warehouseId: id, ...params }));
  };

  const updateBasePeakHoursTypeRequest = updateData => {
    dispatch(Creators.updateBasePeakHoursTypeRequest({ id, updateData }));
  };

  const updatePeakHoursRequest = requestBody => {
    dispatch(Creators.updatePeakHoursRequest(requestBody));
  };

  const updatePeakHoursMessageRequest = requestBody => {
    dispatch(Creators.updatePeakHoursMessageRequest(requestBody));
  };

  const updateWarehousePromoAggressionLevel = updateData => {
    dispatch(Creators.updateWarehousePromoAggressionLevelRequest({ id, updateData }));
  };

  const createNewBlockRequest = params => {
    dispatch(Creators.createNewBlockRequest({ warehouseId: id, ...params }));
  };

  const updateWarehouseLocationActivateRequest = params => {
    dispatch(Creators.updateWarehouseLocationActivateRequest(params));
  };

  const updateWarehouseLocationDeactivateRequest = params => {
    dispatch(Creators.updateWarehouseLocationDeactivateRequest(params));
  };

  const updateWarehouseLocationAllowedForTransferRequest = params => {
    dispatch(Creators.updateWarehouseLocationAllowedForTransferRequest(params));
  };

  const updateWarehouseLocationArchiveRequest = params => {
    dispatch(Creators.updateWarehouseLocationArchiveRequest(params));
  };

  const updateWarehouseDeliveryFeeSegmentRequest = ({ segmentId }) => {
    dispatch(Creators.updateWarehouseDeliveryFeeSegmentRequest({ warehouseId: id, segmentId }));
  };

  const updateWarehouseProductPricingSegmentRequest = ({ segmentId }) => {
    dispatch(Creators.updateWarehouseProductPricingSegmentRequest({ warehouseId: id, segmentId }));
  };

  const saveWarehouseLocationSelfCodeRequest = params => {
    dispatch(Creators.saveWarehouseLocationSelfCodeRequest(params));
  };

  const updateLocationWriteOffEnabledRequest = params => {
    dispatch(Creators.updateLocationWriteOffEnabledRequest(params));
  };

  const updateAlgoritmConfigRequest = ({ algorithmConfig }) => {
    dispatch(Creators.updateAlgorithmConfigRequest({ warehouseId: id, algorithmConfig }));
  };

  const updateTransferReceivingWindowRequest = (updateData => {
    dispatch(Creators.updateTransferReceivingRequest({ id, updateData }));
  });

  const getCitiesRequest = useCallback(params => dispatch(CommonCreators.getCitiesRequest(params)), [dispatch]);

  const getRegionsRequest = useCallback(params => dispatch(CommonCreators.getRegionsRequest(params)), [dispatch]);

  const getFranchiseAreasRequest = useCallback(() => {
    if (warehouse.franchise) {
      dispatch(FranchiseCommonCreators.getFranchiseAreasRequest({ franchiseId: warehouse.franchise }));
    }
  }, [dispatch, warehouse.franchise]);

  const errorNotification = errorObject => {
    dispatch(ToastCreators.error(errorObject));
  };

  const franchises = () => {
    const activeFranchises = pureFranchises.filter(franchise => franchise.isActivated);
    const isStoreConversion = warehouse.warehouseType === STORE_CONVERSION_WAREHOUSE_TYPE;
    return isStoreConversion ? storeConversionFranchises : activeFranchises;
  };

  const isWarehouseValid = () => {
    const warehouseAddressStatus = _.isEmpty(isWarehouseAddressValid({
      ...warehouse.addressInfo,
      warehouseType: warehouse.warehouseType,
    }));

    const generalInfoStatus = _.isEmpty(isGeneralInfoValid({
      ...warehouse.generalInfo,
      warehouseType: warehouse.warehouseType,
    }));

    const budgetItemInfoStatus = _.isEmpty(isBudgetItemInfoValid({
      ...warehouse.budgetInfo,
      warehouseType: warehouse.warehouseType,
    }));

    const manHourFeeGroupInfoStatus = _.isEmpty(isManHourFeeGroupInfoValid({
      manHourFeeGroup: warehouse.manHourFeeGroup,
      warehouseType: warehouse.warehouseType,
    }));

    const surfaceAreaInfoStatus = _.isEmpty(isSurfaceAreaInfoValid({
      ...warehouse.surfaceAreaInfo,
      warehouseType: warehouse.warehouseType,
    }));

    const ovenInfoStatus = _.isEmpty(isOvenInfoValid({
      ...warehouse.fixtureInfo,
      warehouseType: warehouse.warehouseType,
    }));

    const franchiseInfoStatus = _.isEmpty(isFranchiseInfoValid({
      franchise: warehouse.franchise,
      warehouseType: warehouse.warehouseType,
    }));
    switch (false) {
      case warehouseAddressStatus:
        errorNotification({ message: t('warehousePage:ADDRESS_INFO_ERROR') });
        return false;
      case generalInfoStatus:
        errorNotification({ message: t('warehousePage:GENERAL_INFO_ERROR') });
        return false;
      case budgetItemInfoStatus:
        errorNotification({ message: t('warehousePage:BUDGET_ITEM_INFO_ERROR') });
        return false;
      case manHourFeeGroupInfoStatus:
        errorNotification({ message: t('warehousePage:MAN_HOUR_FEE_GROUP_INFO_ERROR') });
        return false;
      case surfaceAreaInfoStatus:
        errorNotification({ message: t('warehousePage:SURFACE_AREA_INFO_ERROR') });
        return false;
      case ovenInfoStatus:
        errorNotification({ message: t('warehousePage:OVEN_INFO_ERROR') });
        return false;
      case franchiseInfoStatus:
        errorNotification({ message: t('warehousePage:FRANCHISE_INFO_ERROR') });
        return false;
      default:
        return true;
    }
  };

  const isMainWarehouse = warehouse.warehouseType === MAIN_WAREHOUSE_TYPE;

  const hasSAPReferenceCode = !!warehouse.generalInfo.SAPReferenceCode;

  return (
    <SAPReferenceProvider SAPReferenceCode={warehouse.generalInfo.SAPReferenceCode}>
      <Row>
        <GeneralInfo
          {...warehouse.generalInfo}
          employees={employees}
          submitRequest={updateWarehouseInfoRequest}
        />
        <Col span={6}>
          <Space
            direction="vertical"
            className={classes.spaceWrapper}
          >
            <WarehouseState
              state={warehouse.state}
              archiveRequest={archiveWarehouseRequest}
              deactivateRequest={deactivateWarehouseRequest}
              activateRequest={activateWarehouseRequest}
              isWarehouseValid={isWarehouseValid}
              hasSAPReferenceCode={hasSAPReferenceCode}
              domainTypes={warehouse.domainTypes}
            />
            <WarehouseStatus
              status={warehouse.status}
              submitRequest={updateWarehouseStatusRequest}
              isWarehouseValid={isWarehouseValid}
            />
            <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_EDIT_TEST_WAREHOUSE_FLAG}>
              <WarehouseTestStatus
                isTestWarehouse={warehouse.isTestWarehouse}
                updateWarehouseTestStatusRequest={updateWarehouseTestStatusRequest}
              />
            </Can>
            {warehouse.warehouseType === VIRTUAL_WAREHOUSE_TYPE && (
              <AcceptReturns
                updateWarehouseAcceptReturnsRequest={updateWarehouseAcceptReturnsRequest}
                acceptReturns={warehouse.acceptReturns}
              />
            )}
          </Space>
        </Col>
      </Row>
      <AddressInfo
        cities={cities}
        regions={regions}
        getCitiesRequest={getCitiesRequest}
        getRegionsRequest={getRegionsRequest}
        {...warehouse.addressInfo}
        submitRequest={updateWarehouseAddressRequest}
      />
      <WarehouseType
        franchises={franchises()}
        franchise={warehouse.franchise}
        warehouseType={warehouse.warehouseType}
        submitRequest={updateWarehouseTypeRequest}
        errorNotification={errorNotification}
        warehouseState={warehouse.state}
        isAllowedForNegativeStock={warehouse.isAllowedForNegativeStock}
        hasSAPReferenceCode={hasSAPReferenceCode}
      />
      <ShippingData
        shippingFrequency={warehouse.shipmentFrequencies}
        transferPreparation={warehouse.shipmentPreparations}
        onCreateShipmentFrequency={addWarehouseShipmentFrequencyRequest}
        onCreateShipmentPreparation={addWarehouseShipmentPreparationRequest}
        onUpdateShipmentFrequency={updateWarehouseShipmentFrequencyRequest}
        onUpdateShipmentPreparation={updateWarehouseShipmentPreparationRequest}
      />
      <DomainTypes
        franchise={warehouse.franchise}
        warehouseState={warehouse.state}
        errorNotification={errorNotification}
        domainTypes={warehouse.domainTypes}
        submitRequest={updateWarehouseDomainTypesRequest}
        addressInfo={warehouse.addressInfo}
      />
      {isMainWarehouse ? (
        <NonagreementWarehouseInfo
          nonagreementWarehouse={warehouse.nonagreementWarehouse}
          nonagreementWarehouses={nonagreementWarehouses}
          submitRequest={() => { }} // @TODO
        />
      )
        : (
          <MainStoreInfo
            mainStore={warehouse.mainStore}
            mainStores={mainStores}
            submitRequest={updateWarehouseMainStoreRequest}
            mainWarehouses={warehouse.mainWarehouses}
          />
        )}
      <BudgetInfo
        {...warehouse.budgetInfo}
        domainTypes={warehouse.domainTypes}
        submitRequest={updateWarehouseBudgetInfoRequest}
        hasSAPReferenceCode={hasSAPReferenceCode}
      />
      {
        canAccess(permKey.PAGE_WAREHOUSE_DETAIL_UPDATE_PROMO_AGGRESSION_LEVEL) &&
        <PromoAggressionLevel promoAggressionLevel={warehouse.promoAggressionLevel} submitRequest={updateWarehousePromoAggressionLevel} />
      }
      <ManpowerInfo manHourFeeGroup={warehouse.manHourFeeGroup} submitRequest={updateWarehouseManpowerRequest} />
      <TransferGroupInfo
        transferGroup={warehouse.transferGroup}
        transferGroups={transferGroups}
        submitRequest={updateTransferGroupOfWarehouseRequest}
        removeRequest={deleteTransferGroupOfWarehouseRequest}
      />
      <SurfaceAreaInfo
        {...warehouse.surfaceAreaInfo}
        submitRequest={updateWarehouseInfoRequest}
      />
      <FranchiseAreaInfo
        franchiseArea={warehouse.franchiseAreaId}
        franchiseAreas={franchiseAreas}
        submitRequest={assignFranchiseAreaRequest}
        getFranchiseAreasRequest={getFranchiseAreasRequest}
      />
      <FranchiseInfo
        franchise={warehouse.franchise}
        franchises={franchises()}
        submitRequest={assignFranchiseRequest}
        removeRequest={unassignFranchiseRequest}
        warehouseState={warehouse.state}
        errorNotification={errorNotification}
        hasSAPReferenceCode={hasSAPReferenceCode}
      />
      <FixtureInfo
        {...warehouse.fixtureInfo}
        submitRequest={updateWarehouseInfoRequest}
      />
      <FoodOrderSettings
        {...warehouse.foodOrderSettings}
        submitRequest={updateWarehouseBusinessDecisionsRequest}
      />
      <DomainConfigs
        domainTypes={warehouse.domainTypes}
        configs={warehouse.domainConfigs}
        submitRequest={updateWarehouseConfigRequest}
        warehouseId={id}
      />
      <DeliveryFeeSegmentInfo
        deliveryFeeSegmentId={warehouse.deliveryFeeSegmentId}
        segments={warehouse.deliveryFeeSegments}
        submitRequest={updateWarehouseDeliveryFeeSegmentRequest}
      />
      <ProductPricingSegmentInfo
        productPricingSegmentId={warehouse.productPricingSegmentId}
        segments={warehouse.productPricingSegments}
        submitRequest={updateWarehouseProductPricingSegmentRequest}
      />
      <LocationTemplate
        sections={warehouse.sections}
        sectionTemplates={warehouse.sectionTemplates}
        pickerBaskets={warehouse.pickerBaskets}
        pickerBasketTemplates={warehouse.pickerBasketTemplates}
        blockTemplates={warehouse.blockTemplates}
        createNewSectionRequest={createNewSectionRequest}
        createNewBlockRequest={createNewBlockRequest}
        updateWarehouseLocationActivateRequest={updateWarehouseLocationActivateRequest}
        updateWarehouseLocationDeactivateRequest={updateWarehouseLocationDeactivateRequest}
        updateWarehouseLocationAllowedForTransferRequest={updateWarehouseLocationAllowedForTransferRequest}
        updateWarehouseLocationArchiveRequest={updateWarehouseLocationArchiveRequest}
        saveWarehouseLocationSelfCodeRequest={saveWarehouseLocationSelfCodeRequest}
        updateLocationWriteOffEnabledRequest={updateLocationWriteOffEnabledRequest}
        errorNotification={errorNotification}
      />
      <Couriers
        couriers={warehouse.couriers}
      />
      <Pickers
        pickers={warehouse.pickers}
      />
      <WorkingHours
        workingHours={warehouse.workingHours}
        baseWorkingHourType={warehouse.baseWorkingHourType}
        domainTypes={warehouse.domainTypes}
        updateBaseWorkingHoursType={updateBaseWorkingHoursTypeRequest}
        updateWorkingHours={updateWorkingHoursRequest}
        updateWorkingHoursMessage={updateWorkingHoursMessageRequest}
        timezone={warehouse.timezone}
      />
      <PeakHours
        peakHours={warehouse.peakHours}
        basePeakHourType={warehouse.basePeakHourType}
        domainTypes={warehouse.domainTypes}
        updateBasePeakHoursType={updateBasePeakHoursTypeRequest}
        updatePeakHours={updatePeakHoursRequest}
        updatePeakHoursMessage={updatePeakHoursMessageRequest}
        timezone={warehouse.timezone}
      />
      <TransferReceiving
        timezone={warehouse.timezone}
        transferReceiving={transferReceivingRef}
        updateTransferReceivingWindow={updateTransferReceivingWindowRequest}
        isPending={warehouse.isWarehousePending}
      />
      <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_EDIT_ALGORITHM_CONFIG}>
        <AlgorithmConfig
          algorithmConfig={warehouse.algorithmConfig}
          submitRequest={updateAlgoritmConfigRequest}
        />
      </Can>
    </SAPReferenceProvider>
  );
}

export default FormWrapper;
