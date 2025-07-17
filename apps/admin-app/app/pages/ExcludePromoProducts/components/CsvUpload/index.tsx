import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { ProductItem } from '../../interfaces';

type CsvUploadProps = {
  onProductsImport: ({ data }: { data: ProductItem[] }) => void;
}

const CsvUpload: FC<CsvUploadProps> = ({ onProductsImport }) => {
  const { t } = useTranslation('excludePromoProducts');
  const [isImportProductsModalVisible, setIsImportProductsModalVisible] = useState(false);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="mb-1"
      style={{ border: 'none' }}
      onClick={() => setIsImportProductsModalVisible(true)}
    >
      <CsvImporter
        onOkayClick={onProductsImport}
        hasNestedHeaderKeys
        isVisible={isImportProductsModalVisible}
        importButtonText={t('UPLOAD_CSV')}
        buttonType="primary"
        isButton
      />
    </div>
  );
};

export default CsvUpload;
