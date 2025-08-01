import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Card,
  Skeleton,
  Image,
  FormItemProps,
  FormInstance,
} from 'antd';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import moment, { Moment } from 'moment';
import { isEmpty as _isEmpty, isEqual as _isEqual } from 'lodash';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { employeeSelector, mainSelector, updatePersonalInfoSelector } from '../../redux/selectors';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import ImageUploader from '@shared/components/UI/ImageUploader';
import SelectGender from '../../../components/Select/Gender';
import SelectCountryCode from '../../../components/Select/Country';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import ActionButtons from '../ActionButtons';
import { Creators } from '../../redux/actions';
import { IPersonalInfoFormValues } from '../../types';
import { isEligibleForEmployment } from '../../../utils';
// @ts-ignore
import NOT_FOUND_IMAGE from '@shared/assets/images/not-found.png';

const PersonalInfoFormSection = ({ setShowWarning }: { setShowWarning: Function }) => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: employeeId } = useParams();
  const { canAccess } = usePermission();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [isBEValidationPending, setIsBEValidationPending] = useState<boolean>(false);
  const [employeePicInfo, setEmployeePicInfo] = useState<{ loadedImage?: string, file?: { type: string } }>({});
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const isPending = useSelector(updatePersonalInfoSelector.getIsPending);
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const personalInfoFormData = useSelector(employeeSelector.getPersonalInfoFormData);
  const companyInfoFormData = useSelector(employeeSelector.getCompanyInfoFormData);
  const hasEditAccess = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EDIT_EMPLOYEE);

  useEffect(() => {
    if (personalInfoFormData && !_isEmpty(personalInfoFormData)) {
      form.setFieldsValue(personalInfoFormData);
      setIsFormEditable(false);
      setIsSaveDisabled(true);
    }
  }, [form, personalInfoFormData]);

  const uniqueIdentifierIsUSedBeforeCheck = useCallback(({
    uniqueIdentifier,
    onSuccess,
    onError,
  }) => {
    setIsBEValidationPending(true);
    dispatch(Creators.checkUniqueIdentifierUsedStatusRequest({
      uniqueIdentifier,
      onSuccess,
      onError,
    }));
  }, [dispatch]);

  const { debouncedCallback: debouncedUniqueIdentifierIsUSedBeforeCheck }: {
    debouncedCallback: (args: {
      uniqueIdentifier: string,
      onSuccess: (isUsed: boolean, opts: { employeeId: MongoIDType }) => void,
      onError: (error: Error) => void,
    }) => void;
  } = useDebouncedCallback({
    callback: uniqueIdentifierIsUSedBeforeCheck,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const uniqueIdentifierUsedBeforeValidation = {
    async validator() {
      try {
        return new Promise((resolve, reject) => {
          const uniqueIdentifier = form.getFieldValue('uniqueIdentifier');
          if (_isEmpty(uniqueIdentifier) || (uniqueIdentifier === personalInfoFormData?.uniqueIdentifier)) {
            resolve('');
          }
          else {
            debouncedUniqueIdentifierIsUSedBeforeCheck({
              uniqueIdentifier,
              onSuccess: (isUsed: boolean, opts: { employeeId: MongoIDType }) => {
                setIsBEValidationPending(false);
                if (isUsed && opts.employeeId !== employeeId) {
                  return reject(new Error(t('employeePage:ERROR.UNIQUE_IDENTIFIER_USED_BEFORE')));
                }
                return resolve('resolve');
              },
              onError: (error: Error) => {
                setIsBEValidationPending(false);
                return reject(new Error(error?.message));
              },
            });
          }
        });
      }
      catch (error: Error | any) {
        return Promise.reject(new Error(error?.message));
      }
    },
  };

  const disabledDateAfterToday = (current: Moment) => {
    return current && current.endOf('day').valueOf() > moment().valueOf();
  };

  const handleBirthdayChange = (_: any, dateString: string) => {
    return isEligibleForEmployment({ birthdate: dateString, workStartDate: companyInfoFormData.workStartDate, setShowWarning });
  };

  const handleSubmit = (formValues: IPersonalInfoFormValues): void => {
    dispatch(Creators.updatePersonalInfoRequest({
      values: formValues,
      changedPicURL: employeePicInfo.loadedImage,
      imageType: employeePicInfo.file?.type,
      onSuccess: () => {
        setIsFormEditable(false);
        setEmployeePicInfo({});
      },
    }));
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
    form.validateFields();
    setShowWarning(false);
  };
  const handleCancelClick = () => {
    setIsFormEditable(false);
    setEmployeePicInfo({});
    setIsSaveDisabled(true);
    form.resetFields();
    setShowWarning(false);
  };
  const handleSaveClick = () => {
    let hasError = false;
    const fieldErrors = form.getFieldsError();
    fieldErrors.forEach(fieldError => {
      if (fieldError.errors.length > 0) {
        hasError = true;
      }
    });
    if (!hasError) {
      form.submit();
      setShowWarning(false);
    }
  };

  const handleValuesChange = (_: any, formValues: any) => {
    const formValuesToCompare = {
      ...formValues,
      ...(formValues?.picURL ? { picURL: formValues.picURL } : { picURL: undefined }),
    };

    const hasFormValuesChanged = !_isEqual(formValuesToCompare, personalInfoFormData);

    setIsSaveDisabled(!hasFormValuesChanged);
  };

  const formEditableProps = isFormEditable ?
    {
      hasFeedback: true,
      required: true,
      rules,
    } :
    { validateStatus: undefined, disabled: true };

  if (!isFirstLoadDone && isEmployeeDataPending) {
    return (
      <Skeleton
        paragraph={{ rows: 8 }}
        active
        loading
      />
    );
  }

  return (
    <Form
      form={form}
      name="employeeDetailPersonalInfoForm"
      id="employeeDetailPersonalInfoForm"
      layout="vertical"
      initialValues={personalInfoFormData}
      onFinish={handleSubmit}
      onValuesChange={handleValuesChange}
    >
      <Card
        bordered
        className={classes.cardContainer}
        title={t('employeePage:PERSONAL_INFORMATION')}
        actions={hasEditAccess ? [
          <ActionButtons
            isFormEditable={isFormEditable}
            isPending={isPending || isBEValidationPending}
            onEdit={handleEditClick}
            onCancel={handleCancelClick}
            onSave={handleSaveClick}
            isSaveDisabled={isSaveDisabled}
          />,
        ] : undefined}
      >
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24, order: 1 }} md={{ span: 6, order: 1 }} style={{ display: 'grid', placeItems: 'Center' }}>
            <div className={classes.profilePictureWrapper}>
              <Image src={employeePicInfo.loadedImage || personalInfoFormData.picURL || NOT_FOUND_IMAGE} alt="avatar" className={classes.profilePictureImage} />
              {
                isFormEditable && (
                  // TODO: Find a better way to react changes in ImageUploader component
                  <Form.Item name="picURL">
                    <ImageUploader
                      isAppliedToOtherLanguagesCheckboxVisible
                      shouldUseSupportedFileTypesAsAcceptedTypes
                      maxImageSizeInMB={5}
                      disabled={!isFormEditable}
                      onOkayClick={(loadedImage: any, file: any) => {
                        form.setFieldsValue({ picURL: file?.name });
                        handleValuesChange(undefined, form.getFieldsValue());

                        setEmployeePicInfo({
                          loadedImage,
                          file,
                        });
                      }}
                    />
                  </Form.Item>
                )
              }
            </div>
          </Col>
          <Col xs={{ span: 24, order: 2 }} md={{ span: 18, order: 1 }}>
            <Form.Item
              {...formEditableProps}
              label={t('employeePage:NAME')}
              name={['name']}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:NAME')} className={classes.inputContainer} />
            </Form.Item>
            <Form.Item
              {...formEditableProps}
              name={['surname']}
              label={t('employeePage:SURNAME')}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:SURNAME')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} order={3}>
            <Form.Item
              {...formEditableProps}
              name={['uniqueIdentifier']}
              label={t('employeePage:UNIQUE_IDENTIFIER')}
              rules={[
                // @ts-ignore
                ...(rules && rules),
                uniqueIdentifierUsedBeforeValidation,
              ]}
            >
              <Input
                disabled={!isFormEditable}
                placeholder={t('employeePage:UNIQUE_IDENTIFIER')}
                className={classes.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} order={4}>
            <Form.Item
              {...formEditableProps}
              name={['birthdate']}
              label={t('employeePage:BIRTHDAY')}
            >
              <DatePicker
                disabled={!isFormEditable}
                disabledDate={disabledDateAfterToday}
                placeholder={t('employeePage:BIRTHDAY')}
                allowClear={false}
                className={`${classes.inputContainer} w-100`}
                onChange={handleBirthdayChange}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} order={5}>
            <Form.Item
              {...formEditableProps}
              name={['gender']}
              label={t('employeePage:GENDER')}
            >
              {/* onChange is passed to the SelectGender component by Form.Item
                @ts-ignore */}
              <SelectGender disabled={!isFormEditable} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24} order={6}>
            <Form.Item
              {...formEditableProps}
              name={['nationality']}
              label={t('employeePage:NATIONALITY')}
            >
              {/* @ts-ignore */}
              <SelectCountryCode disabled={!isFormEditable} showTurkeyFirst placeholder={t('NATIONALITY')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default PersonalInfoFormSection;
