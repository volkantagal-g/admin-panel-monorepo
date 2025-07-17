import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col, Popconfirm } from 'antd';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import CollapsePanel from '@app/pages/ClientTargeting/components/common/CollapsePanel';
import ImageUploader from '@shared/components/GUI/ImageUploader';
import { Button, Image } from '@shared/components/GUI';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { getMarketProductGroupSelector, updateMarketProductGroupSelector } from '@app/pages/MarketProduct/Group/Detail/redux/selectors';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/Group/Detail/redux/actions';
import { canSubmit } from '@shared/utils/formHelper';
import { getFileExtension } from '@shared/utils/common';
import { validate } from '@shared/yup';
import edit from '@shared/assets/GUI/Icons/Solid/Edit.svg';
import { PRODUCT_GROUP_COMPONENT_ID } from '@app/pages/MarketProduct/constants';

const ImageInfo = () => {
  const dispatch = useDispatch();
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductGroupSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductGroupPage');
  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => getInitialValues(marketProductGroup),
    [marketProductGroup],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const modifiedValues = getOnlyModifiedValuesBeforeSubmit({
        initialValues,
        values,
      });
      if (!modifiedValues) {
        setIsFormEditable(false);
        return;
      }
      let body = {};
      const isDeleting = get(modifiedValues, 'imageObject.isDeleting', false);
      if (isDeleting) {
        body = { picURL: null };
      }
      const loadedImage = get(modifiedValues, 'imageObject.loadedImage');
      const extension = getFileExtension(modifiedValues?.imageObject?.file?.name);
      dispatch(Creators.updateMarketProductGroupRequest({
        id: get(marketProductGroup, '_id'),
        body,
        loadedImage: isDeleting ? null : loadedImage,
        extension: isDeleting ? null : extension,
      }));
    },
  });

  const { handleSubmit, values, setFieldValue, setValues, resetForm } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffectOnRequestFinished(
    updateMarketProductGroupSelector,
    () => {
      setIsFormEditable(false);
    },
    () => {
      setValues(initialValues);
      setIsFormEditable(false);
    },
  );

  const handleCancelClick = () => {
    setIsFormEditable(false);
    resetForm({ values: initialValues });
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleImageUpload = (loadedImage, file) => {
    setFieldValue('imageObject', {
      loadedImage,
      file,
      isDeleting: false,
    });
  };

  const handleImageRemove = () => {
    if (values.imageObject.file) {
      setFieldValue('imageObject', {
        loadedImage: get(marketProductGroup, 'picURL', ''),
        file: null,
        isDeleting: false,
      });
    }
  };

  const handleImageDelete = () => {
    setFieldValue('imageObject', {
      loadedImage: '',
      file: null,
      isDeleting: true,
    });
  };

  const hasExistingImage = get(marketProductGroup, 'picURL', '');
  const isDeleting = get(values, 'imageObject.isDeleting', false);
  const hasUploadedFile = values.imageObject.file;
  const isDisabled = isUpdatePending || !isFormEditable;

  const placeholderStyle = {
    width: 160,
    height: 160,
    border: '1px dashed #ccc',
    padding: '8px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '12px',
    color: '#999',
  };

  const renderImageContent = () => {
    if (isDeleting) {
      return (
        <div style={placeholderStyle}>
          {t('IMAGE_WILL_BE_DELETED')}
        </div>
      );
    }
    if (values.imageObject.loadedImage) {
      return (
        <Image
          width={160}
          src={values.imageObject.loadedImage}
        />
      );
    }
    return (
      <div style={placeholderStyle}>
        {t('NO_IMAGE')}
      </div>
    );
  };

  const renderActionButtons = () => {
    if (hasUploadedFile) {
      return (
        <div className="text-center">
          <span className="d-block mb-1" style={{ fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>
            {values.imageObject.file.name}
          </span>
          <Button
            danger
            onClick={handleImageRemove}
            disabled={isDisabled}
            className="w-100 px-3 py-2"
          >
            {t('REMOVE_UPLOAD')}
          </Button>
        </div>
      );
    }

    if (isDeleting) {
      return (
        <Button
          type="text"
          onClick={() => setFieldValue('imageObject', {
            loadedImage: get(marketProductGroup, 'picURL', ''),
            file: null,
            isDeleting: false,
          })}
          disabled={isDisabled}
          className="w-100 px-3 py-2"
        >
          {t('UNDO')}
        </Button>
      );
    }

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateRows: hasExistingImage ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
          gap: '8px',
        }}
      >
        <ImageUploader
          okText={t('ADD_IMAGE')}
          onOkayClick={handleImageUpload}
          validImageRatios={[]}
          modalTitle={t('ADD_IMAGE')}
          buttonText={hasExistingImage ? t('CHANGE_IMAGE') : t('ADD_IMAGE')}
          buttonProps={{ style: { minWidth: '160px', padding: '6px 12px' } }}
          disabled={isDisabled}
        />

        {hasExistingImage && (
          <Popconfirm
            title={t('ARE_YOU_SURE')}
            description={t('IMAGE_DELETE_CONFIRMATION')}
            onConfirm={handleImageDelete}
            okText={t('global:YES')}
            cancelText={t('global:NO')}
            disabled={isDisabled}
          >
            <Button
              type="primary"
              danger
              disabled={isDisabled}
              className="w-100"
              style={{ minWidth: '160px', padding: '6px 18px' }}
            >
              {t('DELETE_IMAGE')}
            </Button>
          </Popconfirm>
        )}
      </div>
    );
  };

  return (
    <CollapsePanel header={t('IMAGE_PANEL_TITLE')} isParent key="imageInfo">
      <Form
        form={form}
        id={PRODUCT_GROUP_COMPONENT_ID.IMAGE_INFO}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row>
          <Col style={{ width: 160 }}>
            {renderImageContent()}
            <div className="flex flex-column gap-2 mt-2">
              {isFormEditable && <div className="w-100">{renderActionButtons()}</div>}
              <Row justify="end" style={{ width: '100%' }}>
                {isFormEditable ? (
                  <div style={{
                    width: '100%',
                    marginTop: '8px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                  }}
                  >
                    <Button
                      data-testid="cancel-button"
                      size="small"
                      color="secondary"
                      onClick={handleCancelClick}
                      disabled={isUpdatePending}
                    >
                      {t('global:CANCEL')}
                    </Button>
                    <Button
                      data-testid="save-button"
                      size="small"
                      form={PRODUCT_GROUP_COMPONENT_ID.IMAGE_INFO}
                      htmlType="submit"
                      disabled={!canBeSubmittable}
                      loading={isUpdatePending}
                    >
                      {t('global:SAVE')}
                    </Button>
                  </div>
                ) : (
                  <Col span={24}>
                    <Button
                      data-testid="edit-button"
                      size="small"
                      style={{ minWidth: '160px', padding: '6px 18px' }}
                      icon={(<img src={edit} alt="edit-icon" />)}
                      onClick={handleEditClick}
                      loading={isUpdatePending}
                    >
                      {t('global:EDIT')}
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Form>
    </CollapsePanel>
  );
};

export default ImageInfo;
