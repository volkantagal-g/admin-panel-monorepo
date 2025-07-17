import { Button, Form, Upload, Row, Col, Select, InputNumber, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import useImageProps from '@app/pages/GetirWater/utils/uploadImageProps';

import { typeList, redirectToList } from '../../../../constants';
import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const BannerDetail = () => {
  const { t } = useTranslation('getirWaterCampaignsPage');
  const classes = useStyles();

  const typeListOptions = convertConstantValuesToSelectOptions(typeList);
  const redirectToListOptions = convertConstantValuesToSelectOptions(redirectToList);

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const { defaultImageProps } = useImageProps(Creators);

  const imageProps = { ...defaultImageProps, className: classes.imageUploader };

  return (
    <AntCard bordered={false} title={t('FORM.BANNER_DETAILS.TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <AntCard bordered title={t('FORM.BANNER_DETAILS.GENERAL_INFO')}>
            <Row gutter={[8, 8]}>
              <Col span={2}>
                <Form.Item name="isBannerEnabled" label={t('FORM.BANNER_DETAILS.STATUS.TITLE')} valuePropName="checked">
                  <Switch
                    checkedChildren={t('global:ACTIVE')}
                    unCheckedChildren={t('global:INACTIVE')}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item name="bannerPriority" label={t('FORM.BANNER_DETAILS.PRIORITY.TITLE')}>
                  <InputNumber className="w-100" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="bannerPictureUrlTr"
                  label={t('FORM.BANNER_DETAILS.PICTURE.TITLE_TR')}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload {...imageProps} listType="picture">
                    <Button type="primary" className="w-100">
                      {t('FORM.BANNER_DETAILS.PICTURE.CHANGE_TR')}
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="bannerPictureUrlEn"
                  label={t('FORM.BANNER_DETAILS.PICTURE.TITLE_EN')}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload {...imageProps} listType="picture">
                    <Button type="primary" className="w-100">
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
                <Form.Item name="bannerActionType" label={t('FORM.BANNER_DETAILS.TYPE.TITLE')}>
                  <Select disabled options={typeListOptions} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="bannerRedirectTo" label={t('FORM.BANNER_DETAILS.REDIRECT.TITLE')}>
                  <Select disabled options={redirectToListOptions} />
                </Form.Item>
              </Col>
            </Row>
          </AntCard>
        </Col>
      </Row>
    </AntCard>
  );
};

export default BannerDetail;
