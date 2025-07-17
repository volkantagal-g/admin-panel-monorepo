import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import {
  getMarketProductAllPriceSelector,
  getSellingPriceListSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

import { Table, Modal } from '@shared/components/GUI';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { useColumnsForNormalProduct, useColumnsForBundleProduct } from './config';
import { useMergeBundlePricings } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceList/helper';
import { EditSellingPriceDrawer } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceList/components/EditSellingPriceDrawer';
import { usePermission } from '@shared/hooks';

export const SellingPriceList = memo(function SellingPriceList({ activationErrorsForSellingPrice }) {
  const { t } = useTranslation('marketProductPageV2');
  const dispatch = useDispatch();
  const { data } = useSelector(getSellingPriceListSelector.getData);
  const isPending = useSelector(getSellingPriceListSelector.getIsPending);
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const { isBundled } = useSelector(getMarketProductAllPriceSelector.getData);

  const { canAccess } = usePermission();

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const [deleteItem, setDeleteItem] = useState({
    id: null,
    isDiscounted: null,
  });

  const { id: productId } = useParams();

  const [selectedRow, setSelectedRow] = useState({});

  const handleOpenDrawer = record => {
    setVisible(true);
    setSelectedRow(record);
  };

  const handleCloseDrawer = () => {
    setVisible(false);
    setSelectedRow({});
  };

  const handleDelete = ({ id, isDiscounted }) => {
    setOpen(true);
    setDeleteItem({ id, isDiscounted });
  };

  const handleApprove = () => {
    const { id, isDiscounted } = deleteItem;
    if (isDiscounted) {
      dispatch(Creators.deleteDiscountedPriceRequest({ discountedPriceId: id, productId }));
    }
    setOpen(false);
  };

  const columnsForBundleProduct = useColumnsForBundleProduct({ t, warehouses });
  const columnsForNormalProduct = useColumnsForNormalProduct({ t, canAccess, warehouses, handleOpenDrawer, handleDelete });
  const mergeBundlePricings = useMergeBundlePricings(data);

  const columns = isBundled ? columnsForBundleProduct : columnsForNormalProduct;
  const dataSource = isBundled ? mergeBundlePricings : data;

  return (
    <>
      <Table
        data-testid="selling-price-table"
        columns={columns}
        data={dataSource || []}
        pagination
        loading={isPending}
      />
      <Modal
        centerTitle={false}
        onCancel={() => setOpen(false)}
        onOk={handleApprove}
        visible={open}
        title={t('ARE_YOU_SURE')}
      >
        <div>{t('DELETE_TEXT')}</div>
      </Modal>
      {!isBundled && Object.keys(selectedRow)?.length > 0 && (
        <EditSellingPriceDrawer
          visible={visible}
          onCloseDrawer={handleCloseDrawer}
          selectedRow={selectedRow}
          activationErrorsForSellingPrice={activationErrorsForSellingPrice}
        />
      )}
    </>
  );
});
