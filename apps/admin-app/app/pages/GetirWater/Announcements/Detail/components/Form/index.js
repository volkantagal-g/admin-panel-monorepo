import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment-timezone';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import createValidTimeObject from '@app/pages/GetirWater/Announcements/utils/createValidTimeObject';
import { checkContentValues } from '@app/pages/GetirWater/utils/checkContentValues';
import createAnnouncementBody from '@app/pages/GetirWater/Announcements/utils/createAnnouncementBody';
import createValidTimes from '@app/pages/GetirWater/Announcements/utils/createValidTimes';
import GeneralInfo from './GeneralInfo';
import Filter from './Filter';
import DateInformation from './DateInformation';
import ValidTimes from './ValidTimes';
import PicturePreview from './PicturePreview';
import BannerDetails from './BannerDetails';
import { announcementDetailSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import ButtonAction from './ButtonAction';

const AnnouncementDetailForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(false);
  const [generalInfoForm] = Form.useForm();
  const [bannerForm] = Form.useForm();
  const [buttonActionForm] = Form.useForm();
  const [picPreviewForm] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [dateForm] = Form.useForm();
  const [timesForm] = Form.useForm();

  const data = useSelector(announcementDetailSelector.getData);
  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
  });

  const { values } = formik;

  const onFinishGeneralInfo = generalInfovalues => {
    const formData = {
      id,
      ...generalInfovalues,
    };
    const resultData = createAnnouncementBody(formData, 'generalInfo');
    dispatch(
      Creators.updateAnnouncementRequest({
        data: { generalInfoSection: resultData },
        announcementId: id,
      }),
    );
  };

  const onFinishPicPreview = picValues => {
    const formData = {
      id,
      ...picValues,
    };
    const resultData = createAnnouncementBody(formData, 'picPreview');
    dispatch(Creators.updateAnnouncementRequest({ data: { picturePreviewSection: resultData }, announcementId: id }));
  };

  const onFinishBanner = bannerValues => {
    const resultData = createAnnouncementBody(bannerValues, 'banner');
    dispatch(Creators.updateAnnouncementRequest({ data: { bannerSection: resultData }, announcementId: id }));
  };

  const onFinishButtonAction = buttonValues => {
    const changedData = createAnnouncementBody(buttonValues, 'button');
    dispatch(Creators.updateAnnouncementRequest({ data: { buttonDetailSection: { button: changedData } }, announcementId: id }));
  };

  const onFinishFilter = filterValues => {
    const formData = {
      id,
      ...filterValues,
    };
    const resultData = createAnnouncementBody(formData, 'filter');
    dispatch(Creators.updateAnnouncementRequest({ data: { filterSection: resultData }, announcementId: id }));
  };

  const onFinishDate = dateValues => {
    const formData = {
      id,
      ...dateValues,
    };
    const changedData = createAnnouncementBody(formData, 'dateInfo');
    dispatch(Creators.updateAnnouncementRequest({ data: changedData }));
  };

  const onFinishTimeList = listValues => {
    const validTimeList = createValidTimes(listValues);
    const finishData = { id, validTimeList };
    dispatch(Creators.updateAnnouncementRequest({ data: finishData, announcementId: id }));
  };

  useEffect(() => {
    if (Object.keys(values).length) {
      dateForm.setFieldsValue({
        startDate: moment(values.validFrom),
        endDate: moment(values.validUntil),
      });
      timesForm.setFieldsValue({ ...createValidTimeObject(_.get(values, 'validTimeList', [])) });
      picPreviewForm.setFieldsValue({
        picturePreviewURLTr: _.get(values, ['picURLTr']) && [
          {
            uid: '-1',
            url: values.picURLTr,
          },
        ],
        picturePreviewURLEn: _.get(values, ['picURLEn']) && [
          {
            uid: '-1',
            url: values.picURLEn,
          },
        ],
      });
      bannerForm.setFieldsValue({
        pictureUrlTr: _.get(values, ['banner', 'picURLTr']) && [
          {
            uid: '-1',
            url: values.banner.picURLTr,
          },
        ],
        pictureUrlEn: _.get(values, ['banner', 'picURLEn']) && [
          {
            uid: '-1',
            url: values.banner.picURLEn,
          },
        ],
        priority: _.get(values, ['banner', 'priority'], undefined),
        type: _.get(values, ['banner', 'action', 'actionType'], undefined),
        redirectTo: _.get(values, ['banner', 'action', 'redirectType'], undefined),
        isBannerEnabled: _.get(values, 'isBannerEnabled', undefined),
      });
      buttonActionForm.setFieldsValue({
        isButtonEnabled: _.get(values, ['button', 'active'], undefined),
        buttonTextTr: _.get(values, ['button', 'textTr'], undefined),
        buttonTextEn: _.get(values, ['button', 'textEn'], undefined),
        buttonActionType: _.get(values, ['button', 'actionType'], undefined),
        buttonRedirectTo: _.get(values, ['button', 'redirectTo'], undefined),
      });
      filterForm.setFieldsValue({
        platformType: values.platforms,
        brandIdList: values.brandIds,
        vendorIds: values.vendorIds,
        cityIdList: _.get(values, 'cityIds', undefined),
        g10CountMax: _.get(values, 'maxNumberOfPreviousG10Order', undefined),
        g10CountMin: _.get(values, 'minNumberOfPreviousG10Order', undefined),
        gsuCountMax: _.get(values, 'maxNumberOfPreviousGWaterMPOrder', undefined),
        gsuCountMin: _.get(values, 'minNumberOfPreviousGWaterMPOrder', undefined),
        excludeFieldStaff: _.get(values, 'isExceptForField', undefined),
        excludeWhiteCollar: _.get(values, 'isExceptForWhiteColors', undefined),
      });
      generalInfoForm.setFieldsValue({
        ...values,
        promoContentUrlTr: _.get(values, 'promoContentURLTr', undefined),
        promoContentUrlEn: _.get(values, 'promoContentURLEn', undefined),
        promoContentHTMLTr: checkContentValues(values, 'promoContentHTMLTr'),
        promoContentHTMLEn: checkContentValues(values, 'promoContentHTMLEn'),
        announcementPriority: values.priority,
      });
      setIsUpdated(true);
    }
  }, [values, generalInfoForm, filterForm, picPreviewForm, bannerForm, timesForm, dateForm, buttonActionForm]);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form name="general-info" onFinish={onFinishGeneralInfo} layout="vertical" form={generalInfoForm}>
            <GeneralInfo values={values} />
          </Form>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form name="filter" onFinish={onFinishFilter} layout="vertical" form={filterForm}>
            <Filter />
          </Form>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form name="date-info" onFinish={onFinishDate} layout="vertical" form={dateForm}>
            <DateInformation />
          </Form>
        </Col>
        <Col span={8}>
          <Form name="valid-times" onFinish={onFinishTimeList} layout="vertical" form={timesForm}>
            <ValidTimes data={data} />
          </Form>
        </Col>
        <Col span={10}>
          <Form name="pic-preview" onFinish={onFinishPicPreview} layout="vertical" form={picPreviewForm}>
            <PicturePreview />
          </Form>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form name="buttonAction" onFinish={onFinishButtonAction} layout="vertical" form={buttonActionForm}>
            <ButtonAction isUpdated={isUpdated} filterForm={filterForm} form={buttonActionForm} />
          </Form>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form name="banner" onFinish={onFinishBanner} layout="vertical" form={bannerForm}>
            <BannerDetails />
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AnnouncementDetailForm;
