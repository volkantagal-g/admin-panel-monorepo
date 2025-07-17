import { Upload, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { FormikProps, FormikErrors, FormikTouched } from 'formik';

import Card from '@shared/components/UI/AntCard';
import { IWarehouseProposalFormValues } from '@app/pages/WarehouseProposal/interfaces';
import { onPreview, getBase64 } from './helper';

interface VideoType {
  name?: string;
  url: string;
  signedUrl?: string;
  type?: string;
}

interface EnhancedUploadFile extends UploadFile<any> {
  originalBase64?: string;
}

interface VideosProps {
  formik: FormikProps<IWarehouseProposalFormValues>;
  isDisabled: boolean;
  touched: FormikTouched<IWarehouseProposalFormValues>;
  errors: FormikErrors<IWarehouseProposalFormValues>;
  videos?: VideoType[] | string[];
  onDetail?: boolean;
}

const Videos: React.FC<VideosProps> = ({ formik, isDisabled, touched, errors, videos = [], onDetail = false }) => {
  const { t } = useTranslation('warehouseProposalPage');

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
    setFieldValue('videos', updatedFileList);
  };

  const fileList = useMemo(() => {
    return videos.map((video, index) => {
      if (typeof video === 'string') {
        return {
          uid: index.toString(),
          name: `video-${index}`,
          url: video,
          type: 'video/mp4',
          status: 'done',
        };
      }
      return {
        uid: index.toString(),
        name: video.name || `video-${index}`,
        url: video.signedUrl || video.url,
        type: video.type || 'video/mp4',
        status: 'done',
      };
    });
  }, [videos]);

  return (
    <Col span={24}>
      <Card title={t('ADD_OR_EDIT_VIDEOS')}>
        <Form.Item
          help={touched?.videos && errors?.videos}
          validateStatus={touched?.videos && errors?.videos ? 'error' : 'success'}
        >
          <Upload
            listType="picture-card"
            fileList={onDetail ? fileList : values?.videos}
            beforeUpload={() => false}
            onChange={event => handleChange(event)}
            onPreview={onPreview}
            disabled={isDisabled}
            accept="video/*"
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: !isDisabled,
              showDownloadIcon: false,
            }}
          >
            {/* TODO: upload will be added later */}
            {false && !isDisabled && t('SELECT_VIDEO_FILE')}
          </Upload>
        </Form.Item>
      </Card>
    </Col>
  );
};

export default Videos;
