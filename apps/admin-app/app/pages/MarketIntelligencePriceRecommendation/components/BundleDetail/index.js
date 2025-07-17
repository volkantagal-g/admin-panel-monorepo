import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import BundleDetailCard from '../BundleDetailCard';

const BundleDetail = ({
  bundleData,
  showBundleStatusDetailModal,
  setShowBundleStatusDetailModal,
  classes,
}) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  return (
    <Modal
      title={t('SINGLE_BUNDLE_IX')}
      visible={showBundleStatusDetailModal}
      footer={null}
      closable
      onCancel={() => setShowBundleStatusDetailModal(false)}
      width={600}
    >
      <div className={classes.bundleDetailModal}>
        {bundleData?.bundle_product_infos &&
          bundleData?.bundle_product_infos?.length > 0 &&
          bundleData?.bundle_product_infos?.map(bundle => {
            return (
              <BundleDetailCard
                singleData={bundleData}
                bundleData={bundle}
                classes={classes}
              />
            );
          })}
      </div>
    </Modal>
  );
};
export default BundleDetail;
