import { Button, Form, Upload, Row, Col, Select, InputNumber, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Announcements/utils/createCardButtonActions';
import useImageProps from '@app/pages/GetirWater/utils/uploadImageProps';
import { defaultTypeObj } from '@app/pages/GetirWater/Announcements/constants';
import { Creators } from '@app/pages/GetirWater/Announcements/Detail/redux/actions';

import useStyles from './styles';

const BannerDetails = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const classes = useStyles();

  const typeListOptions = convertConstantValuesToSelectOptions(defaultTypeObj);
  const redirectToListOptions = convertConstantValuesToSelectOptions(defaultTypeObj);

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.BANNER_DETAILS.TITLE', 'banner');

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
        <Col span={24}>
          <AntCard bordered title={t('FORM.BANNER_DETAILS.GENERAL_INFO')}>
            <Row gutter={[8, 8]}>
              <Col span={2}>
                <Form.Item name="isBannerEnabled" label={t('FORM.BANNER_DETAILS.STATUS.TITLE')} valuePropName="checked">
                  <Switch
                    checkedChildren={t('global:ACTIVE')}
                    unCheckedChildren={t('global:INACTIVE')}
                    disabled={!isEditable}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="priority" label={t('FORM.BANNER_DETAILS.PRIORITY.TITLE')}>
                  <InputNumber className="w-100" disabled={!isEditable} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="pictureUrlTr"
                  label={t('FORM.BANNER_DETAILS.PICTURE.TITLE_TR')}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload {...imageProps} listType="picture" disabled={!isEditable}>
                    <Button type="primary" className="w-100" disabled={!isEditable}>
                      {t('FORM.BANNER_DETAILS.PICTURE.CHANGE_TR')}
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="pictureUrlEn"
                  label={t('FORM.BANNER_DETAILS.PICTURE.TITLE_EN')}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload {...imageProps} listType="picture" disabled={!isEditable}>
                    <Button type="primary" className="w-100" disabled={!isEditable}>
                      {t('FORM.BANNER_DETAILS.PICTURE.CHANGE_EN')}
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </AntCard>
        </Col>
        <Col span={24}>
          <AntCard bordered title={t('FORM.BANNER_DETAILS.BANNER_ACTION')}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name="type" label={t('FORM.BANNER_DETAILS.TYPE.TITLE')}>
                  <Select options={typeListOptions} disabled={!isEditable} allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="redirectTo" label={t('FORM.BANNER_DETAILS.REDIRECT.TITLE')}>
                  <Select options={redirectToListOptions} disabled={!isEditable} allowClear />
                </Form.Item>
              </Col>
            </Row>
          </AntCard>
        </Col>
      </Row>
    </AntCard>
  );
};

export default BannerDetails;
