import { Upload, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { FormikProps, FormikErrors, FormikTouched } from 'formik';

import Card from '@shared/components/UI/AntCard';
import { IWarehouseProposalFormValues } from '@app/pages/WarehouseProposal/interfaces';
import { onPreview, getBase64 } from './helper';

interface PhotoType {
  name?: string;
  url: string;
  type?: string;
}

interface EnhancedUploadFile extends UploadFile<any> {
  originalBase64?: string;
}

interface PhotosProps {
  formik: FormikProps<IWarehouseProposalFormValues>;
  isDisabled: boolean;
  touched: FormikTouched<IWarehouseProposalFormValues>;
  errors: FormikErrors<IWarehouseProposalFormValues>;
  photos?: PhotoType[] | string[];
  onDetail?: boolean;
}

const Photos: React.FC<PhotosProps> = ({ formik, isDisabled, touched, errors, photos = [], onDetail = false }) => {
  const { t } = useTranslation('fieldAnnouncementPage');

  const { values, setFieldValue } = formik;

  const handleChange = async (event: UploadChangeParam) => {
    const fileList = [...event.fileList] as EnhancedUploadFile[];

    const updatedFileList = await Promise.all(
      fileList.map(async file => {
        if (file.originFileObj && !file.originalBase64) {
          try {
            const base64 = await getBase64(file.originFileObj);
            return {
              ...file,
              originalBase64: base64,
            };
          }
          catch (error) {
            return file;
          }
        }
        return file;
      }),
    );
    setFieldValue('photos', updatedFileList);
  };

  const fileList = useMemo(() => {
    return photos.map((file, index) => {
      if (typeof file === 'string') {
        return {
          uid: index.toString(),
          name: `file-${index}`,
          url: file,
          type: 'image/png',
          status: 'done',
        };
      }
      return {
        uid: index.toString(),
        name: file.name || `file-${index}`,
        url: file.url,
        type: file.type || 'image/png',
        status: 'done',
      };
    });
  }, [photos]);

  return (
    <Col span={24}>
      <Card title={t('warehouseProposalPage:ADD_OR_EDIT_PHOTOS')}>
        <Form.Item
          help={touched?.photos && errors?.photos}
          validateStatus={touched?.photos && errors?.photos ? 'error' : 'success'}
        >
          <Upload
            listType="picture-card"
            fileList={onDetail ? fileList : values?.photos}
            beforeUpload={() => false}
            onChange={event => handleChange(event)}
            onPreview={onPreview}
            disabled={isDisabled}
            accept="image/*"
          >
            {t('SELECT_FILE')}
          </Upload>
        </Form.Item>
      </Card>
    </Col>
  );
};

export default Photos;
