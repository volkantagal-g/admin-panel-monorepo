import { Form, Input, Row, Col, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import getSelectList from '@app/pages/GetirWater/Announcements/utils/getSelectList';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { buttonActionTypeList, brandActionType, productActionType } from '@app/pages/GetirWater/Announcements/constants';
import { Creators } from '@app/pages/GetirWater/Announcements/New/redux/actions';
import {
  isBrandsChangedToggle, vendorsSelector, vendorsProductsSelector,
  brandsSelector, isVendorChangedToggle,
} from '@app/pages/GetirWater/Announcements/New/redux/selectors';

import { validationSchema } from '../formHelper';

const ButtonAction = ({ form }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const [isButtonActionEnabled, setIsButtonActionEnabled] = useState(false);
  const [buttonActionType, setButtonActionType] = useState();
  const [buttonRedirectType, setButtonRedirectType] = useState();
  const brands = useSelector(brandsSelector.getBrands);
  const vendors = useSelector(vendorsSelector.getVendors);

  const vendorsProducts = useSelector(vendorsProductsSelector.getVendorsProducts);
  const isVendorsProductsLoading = useSelector(vendorsProductsSelector.getVendorsProductsIsPending);
  const isBrandsToggled = useSelector(isBrandsChangedToggle.getIsBrandsChangedToggle);
  const isVendorsToggled = useSelector(isVendorChangedToggle.getIsVendorChangedToggle);
  const typeListOptions = convertConstantValuesToSelectOptions(buttonActionTypeList);
  const productsOptions = useMemo(
    () => {
      const mappedArray = getSelectList(vendorsProducts, 'productShortName', 'productId');

      return mappedArray;
    },
    [vendorsProducts],
  );

  const isButtonActionHandler = value => {
    setIsButtonActionEnabled(value);

    if (!value) {
      form.setFields([
        {
          name: 'buttonTextTr',
          errors: [],
        },
        {
          name: 'buttonTextEn',
          errors: [],
        }, {
          name: 'buttonActionType',
          errors: [],
        }, {
          name: 'buttonRedirectTo',
          errors: [],
        },
      ]);
    }
  };

  const selectedBrands = useMemo(() => {
    const selectedFilterBrands = form.getFieldValue('brandIdList');
    if (!selectedFilterBrands) return [];
    const filteredArray = brands.filter(value => selectedFilterBrands.includes(value.id));
    const mappedArray = getSelectList(filteredArray, 'brandName', 'id');
    return mappedArray;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrandsToggled, form]);

  const selectedVendors = useMemo(() => {
    const selectedFilterVendors = form.getFieldValue('vendorIds');
    if (!selectedFilterVendors) return [];

    const filteredArray = vendors.filter(value => selectedFilterVendors.includes(value.id));

    const mappedArray = getSelectList(filteredArray, 'vendorName', 'id');
    return mappedArray;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVendorsToggled, form]);

  useEffect(() => {
    form.setFields([
      {
        name: 'buttonRedirectTo',
        errors: [],
        value: undefined,
      }]);
    setButtonRedirectType(undefined);
  }, [form, isBrandsToggled]);

  const typeChangeHandler = value => {
    if (value !== buttonActionType) {
      setButtonActionType(value);
      form.setFields([
        {
          name: 'buttonRedirectTo',
          errors: [],
          value: undefined,
        }]);
      setButtonRedirectType(undefined);
    }
    if (value === productActionType) {
      dispatch(Creators.vendorsProductsRequest({ data: { vendorIds: selectedVendors.map(vendorItem => vendorItem.value) } }));
    }
  };

  const redirectChangeHandler = value => {
    setButtonRedirectType(value);
  };

  return (
    <AntCard bordered={false} title={t('FORM.BANNER_DETAILS.BUTTON_ACTION')}>
      <Row gutter={[8, 8]}>
        <Col span={2}>
          <Form.Item name="isButtonEnabled" rules={validationSchema.isButtonEnabled} label={t('FORM.BANNER_DETAILS.BUTTON_ACTION')} valuePropName="checked">
            <Switch
              onChange={isButtonActionHandler}
              defaultChecked={isButtonActionEnabled}
              checkedChildren={t('global:ACTIVE')}
              unCheckedChildren={t('global:INACTIVE')}
            />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="buttonTextTr" rules={isButtonActionEnabled && validationSchema.buttonTextTr} label={t('FORM.BANNER_DETAILS.BUTTON.BUTTON_TEXT_TR')}>
            <Input disabled={!isButtonActionEnabled} suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item name="buttonTextEn" rules={isButtonActionEnabled && validationSchema.buttonTextEn} label={t('FORM.BANNER_DETAILS.BUTTON.BUTTON_TEXT_EN')}>
            <Input disabled={!isButtonActionEnabled} suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="buttonActionType" rules={isButtonActionEnabled && validationSchema.buttonActionType} label={t('FORM.BANNER_DETAILS.TYPE.TITLE')}>
            <Select options={typeListOptions} onChange={typeChangeHandler} disabled={!isButtonActionEnabled} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="buttonRedirectTo" rules={isButtonActionEnabled && validationSchema.buttonRedirectTo} label={t('FORM.BANNER_DETAILS.REDIRECT.TITLE')}>
            <Select
              options={buttonActionType === brandActionType ? selectedBrands : productsOptions}
              loading={buttonActionType === brandActionType ? false : isVendorsProductsLoading}
              disabled={!isButtonActionEnabled}
              onChange={redirectChangeHandler}
              value={buttonRedirectType}
            />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default ButtonAction;
