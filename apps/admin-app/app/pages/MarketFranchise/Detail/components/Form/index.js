import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import FranchiseStatus from '../FranchiseStatus';
import FranchiseType from '../FranchiseType';
import FranchiseInfo from '../FranchiseInfo';
import FranchiseSAPInfo from '../FranchiseSAPInfo';
import OwnerInfo from '../OwnerInfo';
import Warehouses from '../Warehouses';
import WarehouseHistory from '../WarehouseHistory';
import Ownership from '../Ownership';
import StoreConversionInfo from '../StoreConversionInfo';
import { CrisesManagement } from '../CrisesManagement';
import { STORE_CONVERSION_MARKET_FRANCHISE_TYPE } from '@shared/shared/constants';
import CommissionRates from '../CommissionRates';
import { marketFranchisesSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getSuppliersSelector, getCompaniesSelector } from '@shared/redux/selectors/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import FranchiseAreas from '../FranchiseAreas';

function FormWrapper() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const marketFranchise = {
    isActivated: useSelector(marketFranchisesSelector.getIsActivated),
    generalInfo: useSelector(marketFranchisesSelector.getGeneralInfo),
    warehouses: useSelector(marketFranchisesSelector.getWarehouses),
    warehouseHistory: useSelector(marketFranchisesSelector.getWarehouseHistory),
    owners: useSelector(marketFranchisesSelector.getOwners),
    ownerInfo: useSelector(marketFranchisesSelector.getOwnerInfo),
    name: useSelector(marketFranchisesSelector.getName),
    supplier: useSelector(marketFranchisesSelector.getSupplier),
    companyId: useSelector(marketFranchisesSelector.getCompanyId),
    commissionRates: useSelector(marketFranchisesSelector.getCommissionRates),
    isPending: useSelector(marketFranchisesSelector.getIsPending),
  };
  const [isIntegrateSAP, setIsIntegrateSAP] = useState(!!marketFranchise.generalInfo.referenceCode);

  const suppliers = useSelector(getSuppliersSelector.getStoreConversionData);
  const companies = useSelector(getCompaniesSelector.getData);

  useEffect(() => {
    setIsIntegrateSAP(!!marketFranchise.generalInfo.referenceCode);
  }, [marketFranchise.generalInfo.referenceCode]);

  const handleUpdateRequest = (updateData = {}) => {
    if (isIntegrateSAP) {
      dispatch(Creators.updateMarketFranchiseWithSAPRequest({
        referenceCode: marketFranchise.generalInfo.referenceCode,
        updateData,
      }));
    }
    else {
      dispatch(Creators.updateMarketFranchiseRequest({
        id,
        updateData,
      }));
    }
  };

  const handleUpdateCommissionRatesRequest = (updateData = {}) => {
    dispatch(Creators.updateCommissionRatesRequest({
      id,
      updateData,
    }));
  };

  const handleErrorNotifications = errorObject => {
    dispatch(ToastCreators.error(errorObject));
  };

  const renderStoreConversionInfo = () => {
    if (marketFranchise.generalInfo.franchiseType !== STORE_CONVERSION_MARKET_FRANCHISE_TYPE) {
      return null;
    }
    return (
      <StoreConversionInfo
        isActivated={marketFranchise.isActivated}
        supplier={marketFranchise.supplier}
        suppliers={suppliers}
        companyId={marketFranchise.companyId}
        companies={companies}
        errorNotification={handleErrorNotifications}
        submitRequest={handleUpdateRequest}
      />
    );
  };

  const renderCommissionRates = () => {
    if (marketFranchise.generalInfo.franchiseType !== STORE_CONVERSION_MARKET_FRANCHISE_TYPE) {
      return null;
    }
    return (
      <CommissionRates
        settings={marketFranchise.commissionRates}
        isActivated={marketFranchise.isActivated}
        errorNotification={handleErrorNotifications}
        submitRequest={handleUpdateCommissionRatesRequest}
      />
    );
  };

  return (
    <>
      <FranchiseStatus
        isActivated={marketFranchise.isActivated}
        supplier={marketFranchise.supplier}
        submitRequest={handleUpdateRequest}
        errorNotification={handleErrorNotifications}
        {...marketFranchise.generalInfo}
      />
      <FranchiseType
        isActivated={marketFranchise.isActivated}
        errorNotification={handleErrorNotifications}
        submitRequest={handleUpdateRequest}
        {...marketFranchise.generalInfo}
      />
      {renderStoreConversionInfo()}
      {marketFranchise.generalInfo.referenceCode && (
        <FranchiseSAPInfo
          referenceCode={marketFranchise.generalInfo.referenceCode}
          submitRequest={handleUpdateRequest}
        />
      )}
      <FranchiseInfo
        submitRequest={handleUpdateRequest}
        name={marketFranchise.name}
        {...marketFranchise.generalInfo}
        isIntegrateSAP={isIntegrateSAP}
      />
      <Ownership owners={marketFranchise.owners} />
      <OwnerInfo
        {...marketFranchise.ownerInfo}
        submitRequest={handleUpdateRequest}
      />
      <FranchiseAreas franchiseId={id} />
      <Warehouses warehouses={marketFranchise.warehouses} />
      <WarehouseHistory warehouseHistory={marketFranchise.warehouseHistory} />
      {renderCommissionRates()}
      <CrisesManagement isPending={marketFranchise.isPending} />
    </>
  );
}

export default FormWrapper;
