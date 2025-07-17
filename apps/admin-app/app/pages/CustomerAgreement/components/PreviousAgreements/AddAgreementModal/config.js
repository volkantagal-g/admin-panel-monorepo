// lib imports
import { Space, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// local imports
import { Creators } from '../../../redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { uploadDocMaker } from '@app/pages/CustomerAgreement/utils';

// constants
const translatePrefix = 'LATEST_AGREEMENT.ADD_AGREEMENT_MODAL.TABLE';

export const tableColumns = ({
  t,
  dispatch,
  selectedAgreementType,
}) => [
  {
    title: t(`${translatePrefix}.COLUMNS.LANGUAGE`),
    width: 100,
    render: record => {
      const { fileLanguage: lang } = record;
      const langIdentifier = lang.toUpperCase();
      return <span>{langIdentifier}</span>;
    },
  },
  {
    title: t(`${translatePrefix}.COLUMNS.ACTION`),
    render: record => {
      const { fileLanguage: lang } = record;
      const uploadAgreementProps = {
        accept: '.html',
        action: false,
        beforeUpload: file => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            const fileContent = reader.result;
            const doc = uploadDocMaker(lang)(fileContent);
            dispatch(Creators.setUploadUrlsRequest({
              agreementType: selectedAgreementType,
              agreementLanguage: lang,
              doc,
            }));
            const successMessage = t('LATEST_AGREEMENT.MESSAGES.UPLOAD.READY');
            dispatch(ToastCreators.success({ message: successMessage }));
          };

          reader.onerror = () => {
            const errMessage = t('LATEST_AGREEMENT.MESSAGES.UPLOAD.ERROR');
            dispatch(ToastCreators.error({ message: errMessage }));
          };
          return false;
        },
      };

      return (
        <Space>
          <Upload {...uploadAgreementProps}>
            <Button
              type="primary"
              icon={<UploadOutlined />}
            >
              {t('button:UPLOAD')}
            </Button>
          </Upload>
        </Space>
      );
    },
  },
  {
    title: t(`${translatePrefix}.COLUMNS.AGREEMENT_FILE`),
    render: record => {
      const { uploadDetails } = record;
      const { name } = uploadDetails;

      return (<span>{name}</span>);
    },
  },
];
