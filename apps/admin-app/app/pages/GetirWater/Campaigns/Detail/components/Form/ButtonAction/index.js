import { Col, Form, Input, Row, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { convertConstantValuesToSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import AntCard from '@shared/components/UI/AntCard';
import { buttonActionTypeList, buttonActionTypeListValues } from '../../../../constants';
import { validationSchema } from '../formHelper';
import { brandsSelector } from '@app/pages/GetirWater/Campaigns/Detail/redux/selectors';
import { Creators } from '@app/pages/GetirWater/Campaigns/Detail/redux/actions';
import createCampaignBody from '@app/pages/GetirWater/Campaigns/utils/createCampaignBody';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Campaigns/utils/createCardActionButtons';

const ButtonAction = ({ values, availableTimes }) => {
  const { id } = useParams();
  const [buttonActionForm] = Form.useForm();
  const { t } = useTranslation('getirWaterCampaignsPage');
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const brandList = useSelector(brandsSelector.getBrands).map(brand => ({
    label: brand.brandName,
    value: brand.id,
  }));
  const dispatch = useDispatch();

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.BUTTON_ACTION.TITLE', 'edit-button-action');

  useEffect(() => {
    dispatch(Creators.getBrandsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(values).length > 0) {
      buttonActionForm.setFieldsValue({
        isButtonEnabled: _.get(values, ['button', 'active'], false),
        buttonActionTextTr: _.get(values, ['button', 'textTr'], undefined),
        buttonActionTextEn: _.get(values, ['button', 'textEn'], undefined),
        buttonActionType: _.get(values, ['button', 'actionType'], undefined),
        buttonActionRedirectTo: _.get(values, ['button', 'redirectTo'], undefined),
      });
    }
  }, [values, buttonActionForm]);

  const typeListOptions = convertConstantValuesToSelectOptions(buttonActionTypeList);

  const onFinishButtonAction = finishValues => {
    const resultData = createCampaignBody(finishValues, availableTimes, 'button');
    dispatch(
      Creators.updateCampaignRequest({
        data: { buttonDetailSection: resultData },
        campaignId: id,
      }),
    );
  };

  return (
    <Form
      id="edit-button-action"
      onFinish={onFinishButtonAction}
      layout="vertical"
      form={buttonActionForm}
      defaultValue={{ buttonActionType: buttonActionTypeListValues.BRAND_PAGE }}
    >
      <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
        <Row gutter={[8, 8]}>
          <Col span={4}>
            <Form.Item name="isButtonEnabled" label={t('FORM.BANNER_DETAILS.STATUS.TITLE')} valuePropName="checked">
              <Switch
                onChange={setButtonEnabled}
                checked={isButtonEnabled}
                checkedChildren={t('global:ACTIVE')}
                unCheckedChildren={t('global:INACTIVE')}
                disabled={!isEditable}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              rules={validationSchema.getDynamicTitleValidator(isButtonEnabled).titleTr}
              name="buttonActionTextTr"
              label={t('FORM.BUTTON_ACTION.TEXT.TITLE_TR')}
            >
              <Input suffix="TR" disabled={!isEditable} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              rules={validationSchema.getDynamicTitleValidator(isButtonEnabled).titleEn}
              name="buttonActionTextEn"
              label={t('FORM.BUTTON_ACTION.TEXT.TITLE_EN')}
            >
              <Input suffix="EN" disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align="bottom">
          <Col span={12}>
            <Form.Item
              name="buttonActionType"
              label={t('FORM.BUTTON_ACTION.TYPE.TITLE')}
            >
              <Select options={typeListOptions} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              rules={validationSchema.getDynamicRedirectToValidator(isButtonEnabled)}
              name="buttonActionRedirectTo"
              label={t('FORM.BUTTON_ACTION.REDIRECT_TO.TITLE')}
            >
              <Select filterOption={getSelectFilterOption} showSearch options={brandList} disabled={!isEditable} />
            </Form.Item>
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default ButtonAction;
