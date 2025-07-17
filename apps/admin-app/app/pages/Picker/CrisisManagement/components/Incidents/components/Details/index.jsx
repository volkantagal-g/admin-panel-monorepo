import {
  DeleteOutlined,
  PaperClipOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Typography,
  Upload,
} from 'antd';
import { useFormik } from 'formik';
import { get, isEqual } from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { validate } from '@shared/yup';
import { MIME_TYPE } from '@shared/shared/constants';
import AntSelect from '@shared/components/UI/AntSelect';
import { createReadFileList, crisisMgmtTopics } from '../../../../helpers';
import { Creators } from '../../redux/actions';
import {
  attachmentSelector,
  pickerCrisisSaveSelector,
  pickerCrisisUploadSelector,
} from '../../redux/selectors';
import useStyles from './styles';
import {
  formatCrisisPayload,
  formatFormValues,
  getValidationSchema,
} from './utils';

export default function Details({ data, user, onSubmit }) {
  const [form] = Form.useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('pickerDetailPage');
  const [filesToUpload, setFilesToUpload] = useState([]);

  const currentUploadFile = useSelector(
    pickerCrisisUploadSelector.getCurrentFile,
  );
  const allUploadsCompleted = useSelector(
    pickerCrisisUploadSelector.getIsCompleted,
  );
  const detailsSaved = useSelector(pickerCrisisSaveSelector.getIsCompleted);
  const detailsSaving = useSelector(pickerCrisisSaveSelector.getIsPending);
  const downloadingAttachment = useSelector(
    attachmentSelector.getIsDownloading,
  );
  const deletingAttachment = useSelector(attachmentSelector.getIsDeleting);
  const deletedFile = useSelector(attachmentSelector.getDeletedFile);

  useEffect(() => {
    if (currentUploadFile) {
      setFilesToUpload(_files => {
        const prevFiles = _files.map(m => ({ ...m }));
        const found = prevFiles.find(f => f.uid === currentUploadFile.uid);
        if (found) {
          found.status = currentUploadFile.status;
          found.fileName = currentUploadFile.name;
          found.fileType = currentUploadFile.type;
          found.uploadedFileName = currentUploadFile.uploadedFileName;
        }
        return [...prevFiles];
      });
    }
  }, [currentUploadFile]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(getValidationSchema),
    initialValues: { ...data, files: data?.files || [] },
    onSubmit: async () => {
      if (filesToUpload.length) {
        const filesToUploadAfterRead = await createReadFileList(filesToUpload);
        dispatch(
          Creators.uploadPickerCrisisFilesStart({
            files: filesToUploadAfterRead,
            user,
          }),
        );
      }
      else {
        // eslint-disable-next-line no-use-before-define
        saveCrisisDetails();
      }
    },
  });

  useEffect(() => {
    setFilesToUpload([]);
    const latestData = formatFormValues(data);
    formik.setValues(latestData);
    form.setFieldsValue(latestData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = formik;

  const saveCrisisDetails = useCallback(
    files => {
      const details = formatCrisisPayload(
        data,
        { ...values, files: files ?? values.files },
        user,
      );
      dispatch(Creators.savePickerCrisisRequest({ details }));
    },
    [dispatch, data, user, values],
  );

  useEffect(() => {
    if (allUploadsCompleted && filesToUpload.length) {
      const completed = filesToUpload.filter(f => f.status === 'success');
      const pendingOrFailed = filesToUpload.filter(
        f => f.status !== 'success',
      );
      if (completed.length) {
        setFilesToUpload(pendingOrFailed);
        const updatedFileList = [...values.files, ...completed];
        setFieldValue('files', updatedFileList);
        setTimeout(() => saveCrisisDetails(updatedFileList), 0);
      }
    }
  }, [
    filesToUpload,
    allUploadsCompleted,
    saveCrisisDetails,
    values,
    setFieldValue,
  ]);

  const handleCancel = useCallback(() => {
    formik.resetForm();
    form.resetFields();
    onSubmit({ refresh: false, data: null });
  }, [formik, form, onSubmit]);

  useEffect(() => {
    if (detailsSaved) {
      handleCancel();
      dispatch(Creators.savePickerCrisisReset());
      onSubmit({ refresh: true, data: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsSaved, dispatch]);

  const getFieldItemProps = useCallback(
    name => {
      const isTouched = get(touched, name);
      const err = get(errors, name);
      return {
        name,
        'data-testid': `label-${name}`,
        help: isTouched ? err : undefined,
        // eslint-disable-next-line no-nested-ternary
        validateStatus: isTouched ? (err ? 'error' : 'success') : undefined,
      };
    },
    [errors, touched],
  );

  useEffect(() => {
    if (!deletingAttachment && deletedFile && values?.files?.length) {
      const filesAfterRemoval = values.files.filter(
        f => !isEqual(f, deletedFile),
      );
      if (filesAfterRemoval.length !== values.files.length) {
        setFieldValue('files', filesAfterRemoval);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedFile, deletingAttachment, values]);

  const updateFieldValue = name => value => {
    setFieldTouched(name);
    setFieldValue(name, value);
  };

  const downloadAttachment = useCallback(
    file => {
      dispatch(Creators.downloadAttachmentRequest({ file }));
    },
    [dispatch],
  );

  const deleteAttachment = useCallback(
    file => {
      dispatch(Creators.deleteAttachmentRequest({ file }));
    },
    [dispatch],
  );

  const disabled = Boolean(detailsSaving || downloadingAttachment || deletingAttachment);

  return (
    <Modal
      visible={!!data}
      onCancel={handleCancel}
      maskClosable={disabled}
      title={t(data?._id ? 'CRISIS_MGMT.EDIT_CARD' : 'CRISIS_MGMT.NEW_CARD')}
      footer={[
        <Button key="back" onClick={handleCancel} disabled={disabled}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          disabled={disabled}
          form="picker-crisis-details"
        >
          {t('button:SAVE')}
        </Button>,
      ]}
    >
      <Form
        form={form}
        autoComplete="off"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        id="picker-crisis-details"
      >
        <Spin spinning={disabled}>
          <Form.Item label={t('CRISIS_MGMT.RECORDED_PERSON')}>
            <Typography.Text data-testid="name">
              {values?.createdBy?.name || user.name}
            </Typography.Text>
          </Form.Item>

          <Form.Item
            required
            label={t('global:DATE')}
            {...getFieldItemProps('incidentDate')}
          >
            <DatePicker
              disabled={disabled}
              data-testid="incidentDate"
              value={values?.incidentDate}
              disabledDate={current => current.isAfter(moment())}
              onChange={updateFieldValue('incidentDate')}
            />
          </Form.Item>

          <Form.Item
            required
            label={t('CRISIS_MGMT.SELECT_TOPIC')}
            {...getFieldItemProps('topic')}
          >
            <AntSelect
              required
              allowClear
              disabled={disabled}
              data-testid="topic"
              value={values?.topic}
              options={crisisMgmtTopics}
              placeholder={t('CRISIS_MGMT.SELECT_TOPIC')}
              onChange={updateFieldValue('topic')}
            />
          </Form.Item>

          <Form.Item
            required
            label={t('CRISIS_MGMT.NOTES')}
            {...getFieldItemProps('note')}
          >
            <Input.TextArea
              required
              data-testid="note"
              disabled={disabled}
              value={values?.note}
              placeholder={t('CRISIS_MGMT.NOTES')}
              onChange={({ target: { value } }) => updateFieldValue('note')(value)}
            />
          </Form.Item>

          <Form.Item label={`${t('global:IMAGE')} / ${t('CRISIS_MGMT.VIDEO')}`}>
            {Boolean(values?.files?.length) && (
              <>
                <ul
                  className={classes.fileList}
                  data-testid="fileList-uploaded"
                >
                  {values.files?.map(m => (
                    <li
                      key={m.fileName}
                      className={classes.fileListItem}
                      data-testid={`file-${m.fileName}`}
                    >
                      <button
                        type="button"
                        disabled={disabled}
                        className={classes.fileName}
                        onClick={() => downloadAttachment(m)}
                        data-testid={`file-${m.fileName}-download`}
                      >
                        <PaperClipOutlined />
                        <div>{m.fileName}</div>
                      </button>

                      <Popconfirm
                        disabled={disabled}
                        okText={t('YES')}
                        cancelText={t('NO')}
                        onConfirm={() => deleteAttachment(m)}
                        title={t('CRISIS_MGMT.DELETE_CONFIFM')}
                      >
                        <DeleteOutlined data-testid={`file-${m.fileName}-delete`} />
                      </Popconfirm>
                    </li>
                  ))}
                </ul>
                <Divider />
              </>
            )}

            <Upload
              multiple
              type="select"
              disabled={disabled}
              customRequest={() => {}}
              fileList={filesToUpload}
              data-testid="fileList-pending"
              accept={[MIME_TYPE.ALL_IMAGES, MIME_TYPE.ALL_VIDEOS]}
              onChange={info => setFilesToUpload(
                info.fileList.map(m => ({ ...m, status: 'done' })),
              )}
            >
              <Button icon={<UploadOutlined />} disabled={disabled}>
                {t('CRISIS_MGMT.CHOOSE_FILES')}
              </Button>
            </Upload>
          </Form.Item>

          <Row className={classes.note}>
            <Typography.Text>{t('CRISIS_MGMT.NOTE_FILE')}</Typography.Text>
          </Row>
        </Spin>
      </Form>
    </Modal>
  );
}
