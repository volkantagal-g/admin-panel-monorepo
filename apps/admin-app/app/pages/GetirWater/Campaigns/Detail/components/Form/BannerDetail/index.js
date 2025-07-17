import { Button, Form, Upload, Row, Col, Select, InputNumber, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Campaigns/utils/createCardActionButtons';
import useImageProps from '@app/pages/GetirWater/utils/uploadImageProps';

import { typeList, redirectToList } from '../../../../constants';
import { Creators } from '../../../redux/actions';
import useStyles from './styles';
import createCampaignBody from '@app/pages/GetirWater/Campaigns/utils/createCampaignBody';

const BannerDetail = ({ values, availableTimes }) => {
  const { id } = useParams();
  const [bannerForm] = Form.useForm();
  const { t } = useTranslation('getirWaterCampaignsPage');
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    bannerForm.setFieldsValue({
      bannerPriority: get(values, ['banner', 'priority'], undefined),
      bannerPictureUrlTr: get(values, ['banner', 'picURLTr']) && [
        {
          uid: '-1',
          url: values.banner.picURLTr,
        },
      ],
      bannerPictureUrlEn: get(values, ['banner', 'picURLEn']) && [
        {
          uid: '-1',
          url: values.banner.picURLEn,
        },
      ],
      bannerActionType: get(values, ['banner', 'action', 'actionType'], undefined),
      bannerRedirectTo: get(values, ['banner', 'action', 'redirectType'], undefined),
      isBannerEnabled: get(values, 'isBannerEnabled', undefined),
    });
  }, [bannerForm, values]);

  const typeListOptions = convertConstantValuesToSelectOptions(typeList);
  const redirectToListOptions = convertConstantValuesToSelectOptions(redirectToList);

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.BANNER_DETAILS.TITLE', 'edit-banner-detail');

  const onFinishBanner = formValues => {
    const resultData = createCampaignBody(formValues, availableTimes, 'banner');
    dispatch(
      Creators.updateCampaignRequest({
        data: { bannerDetailSection: resultData },
        campaignId: id,
      }),
    );
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const { defaultImageProps } = useImageProps(Creators);

  const imageProps = { ...defaultImageProps, className: classes.imageUploader };

  return (
    <Form id="edit-banner-detail" onFinish={onFinishBanner} layout="vertical" form={bannerForm}>
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
                  <Form.Item name="bannerPriority" label={t('FORM.BANNER_DETAILS.PRIORITY.TITLE')}>
                    <InputNumber className="w-100" disabled={!isEditable} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="bannerPictureUrlTr"
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
                    name="bannerPictureUrlEn"
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
    </Form>
  );
};

export default BannerDetail;
