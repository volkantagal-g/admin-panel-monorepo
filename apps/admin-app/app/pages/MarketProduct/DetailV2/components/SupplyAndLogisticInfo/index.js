import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import { DemandAndStorageInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/DemandAndStorageInfo';
import { GeneralInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/GeneralInfo';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { ExpiryDateInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/ExpiryDateInfo';
import { TransferInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/TransferInfo';
import { Segment2Info } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/Segment2Info';
import { TRANSFER_GROUP_STATUS } from '@shared/shared/constants';
import { MasterCategoryV2Info } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/MasterCategoryV2Info';
import { PackagingInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/PackagingInfo';
import { BrandInfo } from '@app/pages/MarketProduct/DetailV2/components/SupplyAndLogisticInfo/components/BrandInfo';
import { MASTER_CATEGORY_PAYLOAD_FIELDS, MASTER_CATEGORY_STATUS } from '@app/pages/MarketProduct/constants';

function SupplyAndLogiscticInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(Creators.getSupplyLogisticInfoRequest({ id }));
    dispatch(Creators.getTransferGroupsRequest({ status: TRANSFER_GROUP_STATUS.ACTIVE }));
    dispatch(Creators.getSupplyBrandsRequest({ limit: 20 }));
    dispatch(Creators.getMasterCategoriesV2Request({
      level: MASTER_CATEGORY_PAYLOAD_FIELDS.LEVEL4,
      status: MASTER_CATEGORY_STATUS.ACTIVE,
      limit: 20,
    }));
    dispatch(Creators.getMarketProductAllPriceRequest({ id }));
    dispatch(Creators.getProductTransferGroupsByProductRequest({ productId: id }));
  }, [dispatch, id]);
  return (
    <>
      <BrandInfo />
      <MasterCategoryV2Info />
      <Segment2Info />
      <TransferInfo />
      <PackagingInfo />
      <DemandAndStorageInfo />
      <GeneralInfo />
      <ExpiryDateInfo />
    </>
  );
}

export default SupplyAndLogiscticInfo;
