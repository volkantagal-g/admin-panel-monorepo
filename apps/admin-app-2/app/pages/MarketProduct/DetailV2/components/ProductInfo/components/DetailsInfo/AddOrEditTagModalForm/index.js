import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validate } from '@shared/yup';
import Image from '@shared/components/UI/Image';
import {
  createMarketProductTagSelector,
  getMarketProductTagsSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { FORM_MODE } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { canSubmit } from '@shared/utils/formHelper';
import { getFileExtension } from '@shared/utils/common';
import { Button, Modal, MultiLanguageInput } from '@shared/components/GUI';
import ImageUploader from '@shared/components/GUI/ImageUploader';
import trash from '@shared/assets/GUI/Icons/Solid/Trash.svg';

const AddOrEditTagModalForm = props => {
  const dispatch = useDispatch();
  const {
    visible,
    onCancel,
    onAfterClose,
    params,
  } = props;
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const isCreatePending = useSelector(createMarketProductTagSelector.getIsPending);
  const tags = useSelector(getMarketProductTagsSelector.getData);

  const initialValues = useMemo(
    () => getInitialValues(params.tagId, tags),
    [params.tagId, tags],
  );

  const handleCancel = () => {
    onCancel();
  };

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const loadedImage = get(values, 'imageObject.loadedImage');
      const extension = getFileExtension(values?.imageObject?.file?.name);
      if (params.mode === FORM_MODE.ADD && !loadedImage && !extension) {
        return dispatch(ToastCreators.error({ message: t('DETAILS_INFO.ERROR.ADD_IMAGE') }));
      }
      const marketProductTagData = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      const submitData = { marketProductTagData, loadedImage, extension };
      if (params.mode === FORM_MODE.ADD) {
        dispatch(Creators.createMarketProductTagRequest(submitData));
      }
      else {
        dispatch(Creators.updateMarketProductTagRequest({ id: params.tagId, ...submitData }));
      }
      return handleCancel();
    },
  });

  const { handleSubmit, values, setFieldValue, dirty, isValid } = formik;

  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const isDirtyAndValid = dirty && isValid;

  const handleAfterModalClose = () => {
    formik.resetForm();
    form.resetFields();
    onAfterClose();
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, visible, form]);

  const modalTitle = params.mode === FORM_MODE.ADD ? t('DETAILS_INFO.NEW_TAG') : t('DETAILS_INFO.EDIT_TAG');
  const modalButtonText = params.mode === FORM_MODE.ADD ? t('button:ADD') : t('button:SAVE');

  return (
    <Modal
      centered
      title={modalTitle}
      visible={visible}
      onCancel={handleCancel}
      afterClose={handleAfterModalClose}
      footer={[
        <Button key="back" onClick={handleCancel}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          disabled={!canBeSubmittable || !isDirtyAndValid}
          key="submit"
          type="primary"
          form="add-new-tag"
          htmlType="submit"
          loading={isCreatePending}
        >
          {modalButtonText}
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="add-new-tag"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row align="middle" className="flex-nowrap">
          <Col className="mb-3" span={4}>{t('global:NAME_1')}</Col>
          <Col>
            <MultiLanguageInput
              colProps={{ className: 'mb-3' }}
              fieldPath={['name']}
              formik={formik}
            />
          </Col>
        </Row>

        <Row align="middle">
          <Col span={4}>{t('DETAILS_INFO.IMAGE')}</Col>
          <Col>
            <Image
              width={100}
              src={values.imageObject.loadedImage}
            />
          </Col>
          <Col className="align-self-end ml-2">
            {values.imageObject.file ? (
              <div>{values.imageObject.file.name}
                <img
                  role="presentation"
                  src={trash}
                  className="ml-2 pointer"
                  alt="remove-icon"
                  onClick={() => setFieldValue('imageObject', initialValues.imageObject)}
                />
              </div>
            ) : (
              <ImageUploader
                okText={t('global:ADD_IMAGE')}
                onOkayClick={(loadedImage, file) => {
                  setFieldValue('imageObject', {
                    loadedImage,
                    file,
                  });
                }}
                modalTitle={t('global:ADD_IMAGE')}
                buttonText={t('global:CHOOSE_FILE')}
              />
            )}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditTagModalForm;
