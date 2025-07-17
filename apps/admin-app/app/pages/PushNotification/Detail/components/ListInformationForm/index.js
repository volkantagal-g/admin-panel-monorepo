import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import DraftImporter from '@shared/components/Marketing/DraftImporter';
import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { fileUploadSelector } from '@app/pages/PushNotification/Detail/redux/selectors';
import { NOTIFICATION_OPTION_TYPES } from '@app/pages/PushNotification/constants';

const ListInformationForm = ({ form, isFormEditable }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isTemplateFileUploading = useSelector(fileUploadSelector.isTemplateFileUploading);
  const isExcludedTemplateFileUploading = useSelector(fileUploadSelector.isExcludedTemplateFileUploading);

  const handleDraftUpload = (file, stateKey) => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataBase64 = e?.target?.result;
      dispatch(Creators.uploadFilesToS3Request({ file: { base64: dataBase64, name: file.nameWithTimeStamp }, fileStateKey: stateKey }));
    };
    reader.onerror = () => {
      const message = t('UPLOAD_ERROR');
      dispatch(ToastCreators.error({ message }));
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <AntCard footer={false} bordered={false} title={t('LIST_INFORMATION')}>
      <Row gutter={24}>
        <DraftImporter
          required
          disabled={!isFormEditable || form.getFieldValue('notificationType') === NOTIFICATION_OPTION_TYPES.AI}
          name="template"
          loading={isTemplateFileUploading}
          label={t('DRAFT')}
          handleDraftUpload={handleDraftUpload}
          form={form}
          btnLabel={t('CSV_UPLOAD')}
          searchNotFoundErrorText={t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}
          placeholder={t('SEARCH_CLIENT_LIST_TEMPLATE')}
          requiredErrorText={t('error:REQUIRED')}
        />
      </Row>

      <Row gutter={24}>
        <DraftImporter
          disabled={!isFormEditable}
          name="excludedTemplate"
          loading={isExcludedTemplateFileUploading}
          label={t('EXCLUDED_DRAFT')}
          form={form}
          handleDraftUpload={handleDraftUpload}
          btnLabel={t('CSV_UPLOAD')}
          searchNotFoundErrorText={t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 3 })}
          placeholder={t('SEARCH_CLIENT_LIST_TEMPLATE')}
          requiredErrorText={t('error:REQUIRED')}
        />
      </Row>
    </AntCard>
  );
};

export default memo(ListInformationForm);
