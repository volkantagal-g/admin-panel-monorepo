import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Modal, Button, Table } from '@shared/components/GUI';
import { getBundleProductsTableColumns } from './config';
import { getMarketProductBundlesDataSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';

const BundleProductsModal = ({ onClose }) => {
  const { t } = useTranslation('marketProductPageV2');
  const productBundlesData = useSelector(getMarketProductBundlesDataSelector.getData);
  const productBundlesTableData = useMemo(() => {
    return productBundlesData.map(
      product => ({ _id: product._id, name: product.name, status: product.status }),
    );
  }, [productBundlesData]);

  const columns = useMemo(() => getBundleProductsTableColumns(t), [t]);

  return (
    <Modal
      visible
      centered
      title={t('PRODUCT_SETTINGS.BUNDLE_PRODUCTS_MODAL.TITLE')}
      onCancel={onClose}
      footer={(
        <Button key="back" color="primary" onClick={onClose}>
          {t('button:CLOSE')}
        </Button>
      )}
    >
      <Table
        data={productBundlesTableData}
        columns={columns}
      />
    </Modal>
  );
};

export default BundleProductsModal;
