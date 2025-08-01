import { Row } from 'antd';
import { useTranslation } from 'react-i18next';

type PropTypes = {
  importCount: number;
  failedImportCount: number;
}

export function ImportResult({ failedImportCount, importCount }: PropTypes) {
  const { t } = useTranslation('promoPage');
  return (
    <>
      {importCount ? (
        <Row className="alert alert-success mt-2 mb-0" role="alert" id="benefit-type_import-success">
          <b>
            {t('CONDITION_PRODUCTS.SUCCESS_N_PRODUCTS_IMPORT', { importCount })}
          </b>
        </Row>
      ) : null}
      {failedImportCount ? (
        <Row className="alert alert-danger mt-2 mb-0" role="alert" id="benefit-type_import-failed">
          <b>
            {t('CONDITION_PRODUCTS.FAILED_PRODUCTS_IMPORT', { failedImportCount })}
          </b>
        </Row>
      ) : null}
    </>
  );
}
