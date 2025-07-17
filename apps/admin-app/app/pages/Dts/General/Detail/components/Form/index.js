import { useEffect, useState, useCallback } from 'react';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Row, Col, Form, Typography, Tag, Input } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import Card from '@shared/components/UI/AntCard';
import Footer from '@shared/shared/components/Footer';
import { validate } from '@shared/yup';
import { Creators } from '../../redux/actions';
import { defaultValues, validationSchema } from './formHelper';
import { DatePickerWrapper, SelectWrapper, InputWrapper, FileUploadWrapper } from '@shared/components/UI/Form';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import { SelectRule, SelectFeedbackSource, SelectEmployee } from '../../../components';
import { convertSelectOptions } from '@shared/utils/common';
import { getDtsDetailSelector } from '../../redux/selector';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';
import { DtsStatusCodes, DtsStatusCodeEnum, DATE_TIME_FORMAT } from '../../../constant';
import { preparePayload } from './utils';
import Apology from '../Apology';
import Decision from '../Decision';
import useStyles from './styles';

const { Text } = Typography;

const DetailForm = ({ id }) => {
  const { t } = useTranslation('dts');
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isFormEditButtonVisible, setIsFormEditButtonVisible] = useState(true);

  const dispatch = useDispatch();
  const data = useSelector(getDtsDetailSelector.getData);
  const isPending = useSelector(getDtsDetailSelector.getIsPending);

  const reporter = get(data, ['reporter', 'user', 'name'], '') || get(data, 'email', '-');
  const createdAt = moment(get(data, 'createdAt')).format(DATE_TIME_FORMAT);
  const activityOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

  const classes = useStyles();

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    validateOnChange: false,
    onSubmit: values => {
      const payload = preparePayload(values);
      dispatch(Creators.updateDtsDetailRequest({ data: { ...payload, id } }));
    },
  });

  const { handleSubmit, handleChange, values, touched, errors, setFieldValue, setValues } = formik;

  const handleSelectChange = fieldName => {
    return (selectedItems, all) => {
      if (fieldName === 'rule') {
        setFieldValue('ruleDescription', all?.data?.description?.[getLangKey()]);
        setFieldValue('ruleCategory', all?.data?.category?.title?.[getLangKey()]);
        setFieldValue('rulePriority', all?.data?.priority?.title?.[getLangKey()]);
        form.setFieldsValue({ ruleDescription: all?.data?.description?.[getLangKey()] });
        form.setFieldsValue({ ruleCategory: all?.data?.category?.title?.[getLangKey()] });
        form.setFieldsValue({ rulePriority: all?.data?.priority?.title?.[getLangKey()] });
      }
      setFieldValue(fieldName, selectedItems);
    };
  };

  const initForm = useCallback(() => {
    const {
      rule,
      description,
      feedbackSource,
      person,
      realized,
      warehouse,
      files,
      isActive,
      status,
    } = data;
    form.setFieldsValue({
      rule: rule?._id,
      description,
      ruleDescription: rule?.description?.[getLangKey()],
      rulePriority: rule?.priority?.title?.[getLangKey()],
      ruleCategory: rule?.category?.title?.[getLangKey()],
      feedbackSource: feedbackSource?._id,
      person,
      realized: moment(realized),
      warehouse,
      files,
      isActive,
    });
    setValues({
      rule,
      description,
      ruleDescription: rule?.description?.[getLangKey()],
      rulePriority: rule?.priority?.title?.[getLangKey()],
      ruleCategory: rule?.category?.title?.[getLangKey()],
      feedbackSource,
      person,
      realized: moment(realized),
      warehouse,
      files,
      isActive,
    });
    setIsFormEditButtonVisible(status === DtsStatusCodeEnum.WAITING_APOLOGY);
  }, [data, setValues, form]);

  useEffect(() => {
    initForm();
  }, [initForm]);

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    initForm();
    setIsFormEditable(false);
  };

  const onDownloadCallback = fileUrl => {
    dispatch(Creators.downloadSignedFileRequest({ url: fileUrl }));
  };

  const renderHeaderInformations = () => {
    return (
      <div className={classes.infoBoxContainer}>
        {
          data?.status === DtsStatusCodeEnum.CLOSED && (
          <Switch
            checked={values.isActive}
            onChange={value => {
              setFieldValue('isActive', value);
              handleSubmit();
            }}
            checkedChildren={t('global:ACTIVE')}
            unCheckedChildren={t('global:INACTIVE')}
            className={
              values.isActive ? 'bg-success' : 'bg-danger'
            }
            disabled={isPending}
          />
          )
        }
        <Tag color="purple">{DtsStatusCodes[data.status]?.[getLangKey()]}</Tag>
      </div>
    );
  };

  return (
    <>
      <Form form={form} onFinish={handleSubmit}>
        <Card
          title={t('DTS_DETAIL')}
          extra={renderHeaderInformations()}
          footer={isFormEditButtonVisible && (
            <Footer
              handleSubmit={handleSubmit}
              handleCancelClick={handleCancelClick}
              handleEditClick={handleEditClick}
              isFormEditable={isFormEditable}
              isPending={isPending}
            />
          )}
        >
          <Row gutter={[12, 12]}>
            <Col lg={12} xs={24}>
              <Text>{t('RULE_NUMBER')}</Text>
              <SelectRule
                selectKey="rule"
                fieldName="rule"
                formik={formik}
                disabled={isPending || !isFormEditable}
                value={values.rule}
                onChangeCallback={handleSelectChange('rule')}
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('RULE_DESCRIPTION')}</Text>
              <InputWrapper
                setDefaultValue={false}
                inputKey="ruleDescription"
                value={values.ruleDescription}
                isTouched={get(touched, 'ruleDescription')}
                hasError={get(errors, 'ruleDescription')}
                handleChange={() => { }}
                disabled
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('RULE_CATEGORY')}</Text>
              <InputWrapper
                setDefaultValue={false}
                inputKey="ruleCategory"
                value={values.ruleCategory}
                isTouched={get(touched, 'ruleCategory')}
                hasError={get(errors, 'ruleCategory')}
                handleChange={() => { }}
                disabled
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('RULE_PRIORITY')}</Text>
              <InputWrapper
                setDefaultValue={false}
                inputKey="rulePriority"
                value={values.rulePriority}
                isTouched={get(touched, 'rulePriority')}
                hasError={get(errors, 'rulePriority')}
                handleChange={() => { }}
                disabled
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('global:DATE')}</Text>
              <DatePickerWrapper
                selectKey="realized"
                value={values.realized}
                format={DATE_TIME_FORMAT}
                hasError={get(errors, 'realized')}
                isTouched={get(touched, 'realized')}
                onChangeCallback={handleSelectChange('realized')}
                disabled={isPending || !isFormEditable}
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('global:WAREHOUSE')}</Text>
              <Form.Item
                help={get(errors, 'warehouse')}
                validateStatus={get(errors, 'warehouse') ? 'error' : 'success'}
                name="warehouse"
                className={get(errors, 'warehouse') ? '' : 'mb-2'}
              >
                <SelectWarehouse
                  fieldName="warehouse"
                  formik={formik}
                  value={values.warehouse}
                  onChange={handleSelectChange('warehouse')}
                  isDisabled={isPending || !isFormEditable}
                />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('EMPLOYEE')}</Text>
              <SelectEmployee
                selectKey="person"
                fieldName="person"
                formik={formik}
                allowClear
                disabled={isPending || !isFormEditable}
                value={values.person}
                onChangeCallback={handleSelectChange('person')}
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('global:DESCRIPTION')}</Text>
              <InputWrapper
                mode="textarea"
                setDefaultValue={false}
                inputKey="description"
                value={values.description}
                placeholder={t('global:DESCRIPTION')}
                isTouched={get(touched, 'description')}
                hasError={get(errors, 'description')}
                handleChange={handleChange}
                disabled={isPending || !isFormEditable}
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('FEEDBACK_SOURCE')}</Text>
              <SelectFeedbackSource
                selectKey="feedbackSource"
                fieldName="feedbackSource"
                formik={formik}
                disabled={isPending || !isFormEditable}
                value={values.feedbackSource}
                onChangeCallback={handleSelectChange('feedbackSource')}
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('global:ACTIVENESS')}</Text>
              <SelectWrapper
                selectKey="isActive"
                value={values.isActive}
                hasError={get(errors, 'isActive')}
                isTouched={get(touched, 'isActive')}
                optionsData={activityOptions}
                onChangeCallback={handleSelectChange('isActive')}
                shouldMapOptionsData
                disabled={isPending || !isFormEditable}
              />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('REPORTER')}</Text>
              <Input disabled value={reporter} />
            </Col>
            <Col lg={12} xs={24}>
              <Text>{t('global:CREATED_AT')}</Text>
              <Input disabled value={createdAt} />
            </Col>
            <Col xs={24}>
              <Text>{t('FILES')}</Text>
              <FileUploadWrapper
                inputKey="files"
                hasError={get(errors, 'files')}
                onChangeCallback={handleSelectChange('files')}
                fileList={values.files}
                onPreviewCallback={file => onDownloadCallback(file.url)}
                disabled={isPending || !isFormEditable}
              />
            </Col>
          </Row>
        </Card>
      </Form>
      {
        data?.status !== DtsStatusCodeEnum.WAITING_APOLOGY && (
          <>
            <Apology apology={data?.apology} />
            <Decision decision={data?.decision} rule={data?.rule} dtsStatus={data?.status} id={id} />
          </>
        )
      }
    </>
  );
};

export default DetailForm;
