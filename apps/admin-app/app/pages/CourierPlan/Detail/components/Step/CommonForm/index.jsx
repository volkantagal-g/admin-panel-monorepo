import { Col, Form, Row } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { FileUploadWrapper } from '@shared/components/UI/Form';
import { CSV_TYPES } from '@app/pages/CourierPlan/constants';

import {
  getDefaultFileList,
  getProceedCourierPlanRequestParams,
  getPublishCourierPlanRequestParams,
} from '../../../../utils';
import { Creators } from '../../../redux/actions';
import DownloadButton from '../../DownloadButton';
import Footer from '../../Footer';
import { validationFns } from './formHelper';
// eslint-disable-next-line no-unused-vars
import * as Types from '../../../type';

const { useForm } = Form;

/**
 * Use this component as a BASE to create step-based forms
 * @param {Types.CommonForm} props
 * @returns () => JSX.Element
 */
export default function CommonForm({
  step,
  children,
  isPending,
  formikConfig,
  plan: { _id: planId },
  stepChange = () => null,
  toggleFileUploadVisibility = () => true,
  renderAboveUpload,
  renderBelowUpload,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation('courierPlanPage');
  const [form] = useForm();
  const [hasFileUploadTriggered, setFileUploadTriggered] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    onSubmit: async values => {
      const requestParams = await getProceedCourierPlanRequestParams({
        ...values,
        planId,
        step,
      });
      if (Object.keys(requestParams.uploadParams).length) {
        dispatch(Creators.uploadCourierPlanExcelFileRequest(requestParams));
      }
      else {
        dispatch(Creators.proceedCourierPlanProcessRequest(requestParams));
      }
    },
    ...formikConfig,
  });

  const { handleSubmit, values = {}, errors, setFieldValue, submitForm } = formik;

  const onFileListChange = list => setFieldValue('fileList', list);
  const onFinalFileListChange = list => setFieldValue('finalFileList', list);

  const resetFileList = () => {
    setFileUploadTriggered(true);
    onFileListChange([]);
    onFinalFileListChange([]);
  };

  const onDownloadCallback = fileName => {
    dispatch(Creators.downloadSignedFileRequest({ key: fileName }));
  };

  const onBackClick = () => stepChange(step.prev);
  const onContinueClick = () => stepChange(step.next);
  const onPublishClick = publishType => dispatch(
    Creators.publishCourierPlanProcessRequest(
      getPublishCourierPlanRequestParams({ publishType, planId }),
    ),
  );

  const derivedState = useMemo(() => {
    const stateDerived = {
      isFileUploaderReadonly: validationFns.isFileUploaderReadonly(
        values?.fileList,
      ),
      isFinalFileUploaderReadonly: validationFns.isFileUploaderReadonly(
        values?.finalFileList,
      ),
      isBackButtonDisabled:
        validationFns.isBackButtonDisabled(step) || hasFileUploadTriggered,
      isContinueButtonDisabled:
        validationFns.isContinueButtonDisabled(step) || hasFileUploadTriggered,
      isLastStep: validationFns.isLastStep(step),
      hideSaveButton: validationFns.hideSaveButton(step),
      isDone: validationFns.isDone(step),
    };
    return {
      ...stateDerived,
      isSaveButtonDisabled: false,
    };
  }, [values.fileList, values.finalFileList, step, hasFileUploadTriggered]);

  useEffect(() => {
    const inputFile = step.data?.input?.file;
    if (inputFile) {
      setFieldValue('fileList', getDefaultFileList(inputFile));
    }
  }, [setFieldValue, step.data]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  const outputFile = step.data?.output?.file;

  const visibleFileUpload = useMemo(() => toggleFileUploadVisibility(formik), [toggleFileUploadVisibility, formik]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      id={`courier-plan-step-${step.key}-form`}
    >
      {derivedState.isLastStep ? children : (
        <Row gutter={[16]} align="top">
          {renderAboveUpload?.({ formik, resetFileList })}

          {
            visibleFileUpload && (
            <Col xs={24}>
              <FileUploadWrapper
                inputKey="fileList"
                label={t('STEP_LABELS.SELECT_HINT')}
                hasError={get(errors, 'fileList')}
                hintLabel={t('STEP_LABELS.UPLOAD_HINT')}
                onChangeCallback={onFileListChange}
                onDownloadCallback={file => onDownloadCallback(file.name)}
                accept={CSV_TYPES}
                fileList={values.fileList}
                readonly={derivedState.isFileUploaderReadonly}
                disabled={isPending}
              />
            </Col>
            )
          }

          {renderBelowUpload?.({ formik, resetFileList })}

          <Col xs={24}>
            <DownloadButton
              step={step}
              isPending={isPending}
              outputFile={outputFile}
              onDownloadCallback={() => onDownloadCallback(outputFile)}
            />
          </Col>

          <Col xs={24}>
            <FileUploadWrapper
              inputKey="finalFileList"
              label={t('STEP_LABELS.SELECT_FINAL_HINT')}
              hasError={get(errors, 'finalFileList')}
              hintLabel={t('STEP_LABELS.UPLOAD_FINAL_HINT')}
              onChangeCallback={onFinalFileListChange}
              onDownloadCallback={file => onDownloadCallback(file.name)}
              accept={CSV_TYPES}
              fileList={values.finalFileList}
              readonly={derivedState.isFinalFileUploaderReadonly}
              disabled={isPending}
            />
          </Col>
        </Row>
      )}

      <Footer
        stepKey={step.key}
        isBackButtonDisabled={derivedState.isBackButtonDisabled}
        isContinueButtonDisabled={derivedState.isContinueButtonDisabled}
        isLastStep={derivedState.isLastStep}
        isSaveButtonDisabled={derivedState.isSaveButtonDisabled}
        hideSaveButton={derivedState.hideSaveButton}
        isPending={isPending}
        onBackClick={onBackClick}
        onContinueClick={onContinueClick}
        onPublishClick={onPublishClick}
        onSaveClick={submitForm}
      />
    </Form>
  );
}
