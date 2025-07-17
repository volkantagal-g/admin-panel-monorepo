import { t } from '@shared/i18n';

export const extractErrorMessages = errors => {
  const checkUploadedDocumentMessage = t('foodRestaurantExternalTransaction:BULK_TRANSACTION.CHECK_UPLOADED_DOCUMENT');
  const result = (
    <div>
      {checkUploadedDocumentMessage}
      <br />
      {errors.map(error => <div key={error}>{error}<br /></div>)}
    </div>
  );
  return result;
};

export const extractSingleTransactionErrorsMessages = errors => errors.map(({ message }) => message).join('\n');
