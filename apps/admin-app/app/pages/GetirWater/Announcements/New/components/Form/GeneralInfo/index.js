import { useState } from 'react';
import { Form, Input, Row, Col, Select, InputNumber, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import { EyeOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';

import AntCard from '@shared/components/UI/AntCard';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import PreviewHTMLContentModal from '@shared/components/PreviewHTMLContentModal';
import { createPromoContentHTML } from '@app/pages/GetirWater/Campaigns/utils/createPromoContentHTML';
import { targetList } from '@app/pages/GetirWater/Announcements/constants';

import { validationSchema } from '../formHelper';
import useStyles from './styles';

const GeneralInfo = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [announcementHTMLTr, setAnnouncementHTMLTr] = useState('');
  const [announcementHTMLEn, setAnnouncementHTMLEn] = useState('');
  const [previewModalContent, setPreviewModalContent] = useState('');

  const targetListOptions = convertConstantValuesToSelectOptions(targetList);

  const openPreviewHTML = content => {
    const contentHTML = createPromoContentHTML(content, '');
    setPreviewModalContent(contentHTML);
    setIsModalVisible(true);
  };

  const handleAnnouncementontentHTMLTr = value => {
    setAnnouncementHTMLTr(value);
  };

  const handleAnnouncementContentHTMLEn = value => {
    setAnnouncementHTMLEn(value);
  };

  const handleModalVisible = value => {
    setIsModalVisible(value);
  };

  const createLabel = (label, previewContent) => {
    return (
      <div className={classes.labelWrapper}>
        <div>{t(label)}</div>
        <Button className={classes.iconWrapper} onClick={() => openPreviewHTML(previewContent)}>
          <EyeOutlined />
          {t('PREVIEW')}
        </Button>
      </div>
    );
  };

  return (
    <AntCard bordered={false} title={t('FORM.GENERAL_INFO.HEAD_TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="target" label={t('FORM.GENERAL_INFO.TARGET.TITLE')}>
            <Select options={targetListOptions} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="announcementPriority" label={t('FORM.GENERAL_INFO.PRIORITY.TITLE')} rules={validationSchema.announementPriority}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="titleTr" rules={validationSchema.titleTr} label={t('FORM.GENERAL_INFO.TITLE.TITLE_TR')}>
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="titleEn" rules={validationSchema.titleEn} label={t('FORM.GENERAL_INFO.TITLE.TITLE_EN')}>
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item name="descriptionTr" rules={validationSchema.descriptionTr} label={t('FORM.GENERAL_INFO.DESCRIPTION.TITLE_TR')}>
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="descriptionEn" rules={validationSchema.descriptionEn} label={t('FORM.GENERAL_INFO.DESCRIPTION.TITLE_EN')}>
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="accessibilityLabelTr"
            rules={validationSchema.accessibilityLabelTr}
            label={t('FORM.GENERAL_INFO.ACCESS_LABEL.TITLE_TR')}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="accessibilityLabelEn"
            rules={validationSchema.accessibilityLabelEn}
            label={t('FORM.GENERAL_INFO.ACCESS_LABEL.TITLE_EN')}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="promoPageTitleTr"
            label={t('FORM.GENERAL_INFO.PROMO_PAGE_TITLE.TITLE_TR')}
            rules={validationSchema.promoPageTitleTr}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="promoPageTitleEn"
            label={t('FORM.GENERAL_INFO.PROMO_PAGE_TITLE.TITLE_EN')}
            rules={validationSchema.promoPageTitleEn}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name="promoContentSectionTitleTr"
            label={t('FORM.GENERAL_INFO.PROMO_CONTENT_SECTION_TITLE.TITLE_TR')}
            rules={validationSchema.promoContentSectionTitleTr}
          >
            <Input suffix="TR" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="promoContentSectionTitleEn"
            label={t('FORM.GENERAL_INFO.PROMO_CONTENT_SECTION_TITLE.TITLE_EN')}
            rules={validationSchema.promoContentSectionTitleEn}
          >
            <Input suffix="EN" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            initialValue=""
            name="promoContentHTMLTr"
            label={createLabel('FORM.GENERAL_INFO.PROMO_CONTENT_HTML.TITLE_TR', announcementHTMLTr)}
            rules={validationSchema.promoContentHTMLTr}
            className={classes.formItemWrapper}
          >
            <ReactQuill theme="snow" onChange={handleAnnouncementontentHTMLTr} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            initialValue=""
            name="promoContentHTMLEn"
            label={createLabel('FORM.GENERAL_INFO.PROMO_CONTENT_HTML.TITLE_EN', announcementHTMLEn)}
            rules={validationSchema.promoContentHTMLEn}
            className={classes.formItemWrapper}
          >
            <ReactQuill theme="snow" onChange={handleAnnouncementContentHTMLEn} />
          </Form.Item>
        </Col>
      </Row>
      <PreviewHTMLContentModal
        isModalVisible={isModalVisible}
        content={previewModalContent}
        getModalVisible={handleModalVisible}
        modalTitle={t('PREVIEW')}
      />
    </AntCard>
  );
};

export default GeneralInfo;
