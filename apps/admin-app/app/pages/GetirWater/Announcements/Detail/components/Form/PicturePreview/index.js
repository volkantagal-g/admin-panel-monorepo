import { Button, Row, Col, Upload, Form } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Announcements/utils/createCardButtonActions';
import useImageProps from '@app/pages/GetirWater/utils/uploadImageProps';
import { Creators } from '@app/pages/GetirWater/Announcements/Detail/redux/actions';

import { validationSchema } from '../formHelper';
import useStyles from './styles';

const PicturePreview = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const classes = useStyles();

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.PICTURE_PREVIEW.TITLE', 'pic-preview');

  const { defaultImageProps } = useImageProps(Creators);

  const imageProps = { ...defaultImageProps, className: classes.imageUploader };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="picturePreviewURLTr"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={validationSchema.picturePreviewURLTr}
            label={t('FORM.PICTURE_PREVIEW.TITLE_TR')}
          >
            <Upload {...imageProps} listType="picture" disabled={!isEditable}>
              <Button type="primary" className="w-100" disabled={!isEditable}>
                {t('FORM.PICTURE_PREVIEW.CHANGE_TR')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="picturePreviewURLEn"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={validationSchema.picturePreviewURLEn}
            label={t('FORM.PICTURE_PREVIEW.TITLE_EN')}
          >
            <Upload {...imageProps} listType="picture" disabled={!isEditable}>
              <Button type="primary" className="w-100" disabled={!isEditable}>
                {t('FORM.PICTURE_PREVIEW.CHANGE_EN')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default PicturePreview;
