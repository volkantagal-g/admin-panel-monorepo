import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useState } from 'react';
import { Button, Row, Card, Col, Radio, Form, Input, Select, Divider, Image, DatePicker, InputNumber, Spin, Typography } from 'antd';

import _ from 'lodash';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import {
  TIME_GRANULARITY_OPTIONS,
  TASK_TYPES, GOAL_COMPARITION_OPTIONS,
  DEFAULT_MAX_VALUE_FOR_KPI_VALUES,
  TASK_IMAGE_URL_BUCKET_NAME,
  TASK_IMAGE_URL_FOLDER_PATH,
  AWARD_OPTIONS,
  getOneYearFromToday,
  maxImageSizeInMB,
  taskImageRatios,
  supportedFileTypes, TASK_IMAGE_TYPES,
} from '../../constant';
import useStyles from './styles';

import { Creators } from '../../Create/redux/actions';

import SelectTaskKPI from '../SelectTaskKPI';
import AntCard from '@shared/components/UI/AntCard';

import PLACEHOLDER_IMAGE from '@shared/assets/images/not-found.png';
import ImageUploader from '@shared/components/UI/ImageUploader';

import { courierGamificationKPISelector } from '../SelectTaskKPI/redux/selectors';
import { createCourierGamificationTaskSelector } from '../../Create/redux/selectors';
import ValidityHours from '../ValidityHours';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Text } = Typography;

const TaskDetails = (
  {
    values,
    touched,
    errors,
    handleChangeForm,
    isEditMode = false,
    onDetail = false,
    isVisibleRangePicker,
    setIsVisibleRangePicker,
    isDisable,
    choosenKPI,
    setChoosenKPI,
    choosenConditionKPI,
    setChoosenConditionKPI,
    setTaskTimeRanges,
  },
) => {
  const { t } = useTranslation('courierGamificationPage');
  const dispatch = useDispatch();
  const classes = useStyles();
  const [withDeadline, setWithDeadline] = useState(TASK_TYPES.WITH_DEADLINE);
  const kpis = useSelector(courierGamificationKPISelector.getData);
  const pendingStateForImageUploadToS3 = useSelector(createCourierGamificationTaskSelector.getPendingStateForImageUploadToS3);

  const handleWithDeadlineChange = value => {
    setWithDeadline(value);

    if (setIsVisibleRangePicker && onDetail) {
      setIsVisibleRangePicker(value === TASK_TYPES.WITH_DEADLINE);
    }

    if (!onDetail) {
      setIsVisibleRangePicker(value === TASK_TYPES.WITH_DEADLINE);
      handleChangeForm('endDate', getOneYearFromToday().toISOString());
    }

    if (values?.endDate && value !== TASK_TYPES.WITH_DEADLINE) {
      handleChangeForm('endDate', getOneYearFromToday().toISOString());
    }
    if (values?.endDate && value === TASK_TYPES.WITH_DEADLINE) {
      handleChangeForm('endDate', moment().add(1, 'day').toISOString());
    }
  };

  const handleGoalKpiChanges = val => {
    handleChangeForm('goal.kpi', val);
    handleChangeForm('goal.value', null);

    setChoosenKPI(kpis?.find(aKpi => aKpi?.key === val));

    if (!onDetail && values?.goal?.comparisonOperator !== null) {
      handleChangeForm('goal.comparisonOperator', null);
      handleChangeForm('adminOptions.earlyFail', null);
      handleChangeForm('adminOptions.earlySuccess', null);
    }
  };

  const disabledDate = current => {
    return current && current < moment().subtract(1, 'days');
  };

  const disabledDateForRange = current => {
    const today = moment().startOf('day');
    const oneMonthLater = moment().add(1, 'month').endOf('day');
    return current && (current < today || current > oneMonthLater);
  };

  const handleUpload = (loadedImage, file, imageType) => {
    dispatch(Creators.uploadCourierTaskImageRequest({
      contentType: file?.type,
      fileName: `${file?.originFileObj?.name}_courierGamification_${Date.now()}`,
      // Date.now() added because the name needs to be unique
      folderPath: TASK_IMAGE_URL_FOLDER_PATH,
      bucketName: TASK_IMAGE_URL_BUCKET_NAME,
      loadedImage,
      imageType,
    }));
  };

  const handleUseSamePhotoForThumbnail = () => {
    handleChangeForm('thumbnailUrl', values?.imageUrl);
  };

  const hasConditionError = _.get(touched, 'conditions[0].kpi') ||
                          _.get(touched, 'conditions[0].comparisonOperator') ||
                          _.get(touched, 'conditions[0].value');
  const comparisonOperatorError = _.get(errors, 'conditions[0].comparisonOperator');
  const goalValueError = _.get(errors, 'conditions[0].value');

  const goalRange = choosenConditionKPI
    ? `(${choosenConditionKPI?.minValue ?? '∞'} - ${choosenConditionKPI?.maxValue !== null ? choosenConditionKPI?.maxValue : '∞'})`
    : '';

  return (
    <Card size="small" title={t('CREATE.TASK_DETAIL.TITLE')}>
      <Row span={24} justify="space-between" align="middle">
        <Col span={11}>
          <Row>
            <Col xs={24}>
              <Form.Item
                help={_.get(touched, 'title') && _.get(errors, 'title')}
                validateStatus={_.get(touched, 'title') && _.get(errors, 'title') ? 'error' : 'success'}
                name="title"
                label={t('CREATE.TASK_DETAIL.NAME')}
                valuePropName="values"
              >
                <Input
                  value={values?.title}
                  onChange={e => {
                    handleChangeForm('title', e?.target?.value);
                  }}
                  name="title"
                  disabled={!isEditMode && onDetail}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                help={_.get(touched, 'description') && _.get(errors, 'description')}
                validateStatus={_.get(touched, 'description') && _.get(errors, 'description') ? 'error' : 'success'}
                label={t('CREATE.TASK_DETAIL.DESCRIPTION')}
              >
                <TextArea
                  autoSize={{
                    minRows: 2,
                    maxRows: 5,
                  }}
                  rows={5}
                  value={values?.description}
                  onChange={e => {
                    handleChangeForm('description', e?.target?.value);
                  }}
                  disabled={!isEditMode && onDetail}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={2} />
        <Col span={11}>
          <Row gutter={24}>
            <Col xs={24}>
              <Form.Item label={t('CREATE.TASK_DETAIL.PROGRESS_TYPE')}>
                <Radio.Group
                  disabled={isDisable}
                  onChange={e => {
                    handleWithDeadlineChange(e?.target?.value);
                  }}
                  value={withDeadline}
                  className="flex-column"
                >
                  <Radio value={TASK_TYPES.WITH_DEADLINE}>
                    {t('CREATE.TASK_DETAIL.WITH_DEADLINE')}
                  </Radio>
                  <Radio value={TASK_TYPES.WITHOUT_DEADLINE}>
                    {t('CREATE.TASK_DETAIL.WITHOUT_DEADLINE')}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                help={() => {
                  const startDateHelp = _.get(touched, 'startDate') && _.get(errors, 'startDate');
                  const endDateHelp = _.get(touched, 'endDate') && _.get(errors, 'endDate');

                  return isVisibleRangePicker ? startDateHelp || endDateHelp : startDateHelp;
                }}
                validateStatus={() => {
                  const startDateError = _.get(touched, 'startDate') && _.get(errors, 'startDate');
                  const endDateError = _.get(touched, 'endDate') && _.get(errors, 'endDate');

                  if (isVisibleRangePicker) {
                    return startDateError || endDateError ? 'error' : 'success';
                  }

                  return startDateError ? 'error' : 'success';
                }}
                label={t(isVisibleRangePicker ? 'CREATE.TASK_DETAIL.DATE_RANGE' : 'CREATE.TASK_DETAIL.START_DATE')}
              >
                {
                  isVisibleRangePicker ? (
                    <RangePicker
                      allowClear
                      disabled={isDisable}
                      className="w-100"
                      value={
                        values?.startDate === null
                          ? null
                          : [moment(values?.startDate, 'YYYY-MM-DD'), moment(values?.endDate, 'YYYY-MM-DD')]
                      }
                      onChange={val => {
                        if (val?.length === 2) {
                          const startDate = moment(val[0]).startOf('day').add(3, 'hours');
                          let endDate = moment(val[1]).startOf('day').add(3, 'hours');

                          if (endDate.isSame(startDate, 'day')) {
                            endDate = startDate.clone().add(1, 'days');
                          }

                          handleChangeForm('startDate', startDate.toISOString());
                          handleChangeForm('endDate', endDate.toISOString());
                        }
                      }}
                      format={DEFAULT_DATE_FORMAT}
                      disabledDate={disabledDateForRange}
                    />
                  )
                    : (
                      <DatePicker
                        disabledDate={disabledDate}
                        disabled={isDisable}
                        value={values?.startDate === null ? null : moment(values?.startDate, 'YYYY-MM-DD')}
                        onChange={e => {
                          handleChangeForm('startDate', moment(e).startOf('day').add(3, 'hours').toISOString());
                        }}
                        format={DEFAULT_DATE_FORMAT}
                        placeholder={t('CREATE.TASK_DETAIL.START_DATE')}
                        className="w-100"
                      />
                    )
                }
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Row gutter={24} justify="space-between" align="start">
        <Col span={8}>
          <Text className="mb-2">{t('LIST.TASK_KPI')}</Text>
          <SelectTaskKPI
            disabled={isDisable}
            selectKey="goal.kpi"
            fieldName="goal.kpi"
            errors={errors}
            touched={touched}
            value={values?.goal?.kpi}
            onChangeCallback={handleGoalKpiChanges}
          />
        </Col>
        <Col span={8}>
          <Row gutter={24} justify="center" align="middle">
            <Form.Item
              help={_.get(touched, 'goal.comparisonOperator') && _.get(errors, 'goal.comparisonOperator')}
              validateStatus={_.get(touched, 'goal.comparisonOperator') && _.get(errors, 'goal.comparisonOperator') ? 'error' : 'success'}
              name="golType"
              label={t('CREATE.TASK_DETAIL.GOAL_TYPE')}
            >
              <Select
                disabled={(!choosenKPI) || isDisable}
                placeholder={t('CREATE.TASK_DETAIL.GOAL_TYPE')}
                onChange={e => {
                  handleChangeForm('goal.comparisonOperator', e);
                }}
                allowClear
                value={values?.goal?.comparisonOperator}
                defaultValue={values?.goal?.comparisonOperator}
                options={GOAL_COMPARITION_OPTIONS}
              />
            </Form.Item>
            <Form.Item
              help={_.get(touched, 'goal.value') && _.get(errors, 'goal.value')}
              validateStatus={_.get(touched, 'goal.value') && _.get(errors, 'goal.value') ? 'error' : 'success'}
              name="goalValue"
              label={t('CREATE.TASK_DETAIL.GOAL_VALUE') +
               (choosenKPI ? (`(${!choosenKPI?.minValue ? choosenKPI?.minValue : '∞'} - ${choosenKPI?.maxValue !== null ? choosenKPI?.maxValue : '∞'})`) : '')}
              className="ml-4"
              valuePropName="values"
            >
              <InputNumber
                disabled={(!choosenKPI) || isDisable}
                type="number"
                max={choosenKPI?.maxValue ? choosenKPI?.maxValue : DEFAULT_MAX_VALUE_FOR_KPI_VALUES}
                min={choosenKPI?.minValue}
                value={values?.goal?.value}
                onChange={e => {
                  handleChangeForm('goal.value', Number(e));
                }}
              />
            </Form.Item>
          </Row>
        </Col>
        <Col span={8}>
          <Form.Item
            name="adminOptions"
            help={_.get(touched, 'adminOptions') && _.get(errors, 'adminOptions')}
            validateStatus={_.get(touched, 'adminOptions') && _.get(errors, 'adminOptions') ? 'error' : 'success'}
          >
            <AntCard
              bordered={false}
              title={(
                <Row>
                  {t('CREATE.TASK_DETAIL.EARLY_SUCC_FAIL_TITLE')}
                </Row>
              )}
            >
              <Row justify="space-between" align="middle">
                <Radio.Group
                  disabled={(!choosenKPI?.adminQuestions?.askEarlyFailEnabled || choosenKPI === null) || isDisable}
                  onChange={e => {
                    handleChangeForm('adminOptions.earlyFail', e?.target?.value);
                  }}
                  value={values?.adminOptions?.earlyFail}
                >
                  <Row span={24}>
                    <Col span={12}>
                      <Radio value>
                        {t('CREATE.TASK_DETAIL.IF_FAIL_MAKE_FAIL')}
                      </Radio>
                    </Col>
                    <Col span={12}>
                      <Radio value={false}>
                        {t('CREATE.TASK_DETAIL.IF_FAIL_NOT_MAKE_FAIL')}
                      </Radio>
                    </Col>
                  </Row>
                </Radio.Group>
                <Divider />
                <Radio.Group
                  disabled={(!choosenKPI?.adminQuestions?.askEarlySuccessEnabled || choosenKPI === null) || isDisable}
                  onChange={e => {
                    handleChangeForm('adminOptions.earlySuccess', e?.target?.value);
                  }}
                  value={values?.adminOptions?.earlySuccess}
                >
                  <Row span={24}>
                    <Col span={12}>
                      <Radio value>
                        {t('CREATE.TASK_DETAIL.IF_SUCC_MAKE_SUCC')}
                      </Radio>
                    </Col>
                    <Col span={12}>
                      <Radio value={false}>
                        {t('CREATE.TASK_DETAIL.IF_SUCC_NOT_MAKE_SUCC')}
                      </Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Row>
            </AntCard>
          </Form.Item>
        </Col>
      </Row>
      {
        withDeadline &&
      values?.startDate &&
       values?.endDate &&
       (!onDetail ?
         choosenKPI?.timeGranularity === TIME_GRANULARITY_OPTIONS.TIME && TASK_TYPES.WITH_DEADLINE === withDeadline
         : values?.taskTimeRanges?.length > 0)
       &&
       <ValidityHours values={values} setTaskTimeRanges={setTaskTimeRanges} onDetail={onDetail} />
      }
      <Divider />
      <Row gutter={24} justify="space-between" align="middle">
        <Col span={8}>
          <Text className="mb-2">{t('LIST.CONDITION_KPI')}</Text>
          <SelectTaskKPI
            isConditions
            value={values?.conditions?.[0]?.kpi}
            disabled={isDisable}
            selectKey="conditions[0].kpi"
            fieldName="conditions[0].kpi"
            errors={errors}
            touched={touched}
            onChangeCallback={val => {
              if (val) {
                if (!values?.conditions?.length) {
                  handleChangeForm('conditions', [{ kpi: val, comparisonOperator: null, value: null }]);
                }
                else {
                  handleChangeForm('conditions[0].kpi', val);
                }
                setChoosenConditionKPI(kpis?.find(aKpi => aKpi?.key === val));
              }
              else {
                handleChangeForm('conditions', []);
                setChoosenConditionKPI(null);
              }
            }}
          />
        </Col>
        <Col span={8}>
          <Row gutter={24} justify="center" align="middle">
            <Form.Item
              name="conditionsGolType"
              label={t('CREATE.TASK_DETAIL.GOAL_TYPE')}
              help={hasConditionError && comparisonOperatorError}
              validateStatus={hasConditionError && comparisonOperatorError ? 'error' : 'success'}
            >
              <Select
                disabled={isDisable}
                placeholder={t('CREATE.TASK_DETAIL.GOAL_TYPE')}
                onChange={e => {
                  if (!values?.conditions?.length) {
                    handleChangeForm('conditions', [{ kpi: null, comparisonOperator: e, value: null }]);
                  }
                  else {
                    handleChangeForm('conditions[0].comparisonOperator', e);
                  }
                }}
                allowClear
                options={GOAL_COMPARITION_OPTIONS}
                value={values?.conditions?.[0]?.comparisonOperator}
                defaultValue={values?.conditions?.[0]?.comparisonOperator}
              />
            </Form.Item>

            <Form.Item
              name="conditionsGoalValue"
              label={`${t('CREATE.TASK_DETAIL.GOAL_VALUE')} ${goalRange}`}
              className="ml-4"
              help={hasConditionError && goalValueError}
              validateStatus={hasConditionError && goalValueError ? 'error' : 'success'}
              valuePropName="values"
            >
              <InputNumber
                disabled={!choosenConditionKPI || isDisable}
                max={choosenConditionKPI?.maxValue}
                min={choosenConditionKPI?.minValue}
                type="number"
                value={values?.conditions?.[0]?.value}
                onChange={e => {
                  if (!values?.conditions?.length) {
                    handleChangeForm('conditions', [{ kpi: null, comparisonOperator: null, value: Number(e) }]);
                  }
                  else {
                    handleChangeForm('conditions[0].value', Number(e));
                  }
                }}
              />
            </Form.Item>
          </Row>
        </Col>
        <Col span={8} />
      </Row>
      <Divider />
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            help={_.get(touched, 'reward.type') && _.get(errors, 'reward.type')}
            validateStatus={_.get(touched, 'reward.type') && _.get(errors, 'reward.type') ? 'error' : 'success'}
            name="awardType"
            label={t('CREATE.TASK_DETAIL.AWARD_TYPE')}
          >
            <Select
              placeholder={t('CREATE.TASK_DETAIL.AWARD_TYPE')}
              onChange={e => {
                handleChangeForm('reward.type', e);
              }}
              disabled={isDisable}
              allowClear
              options={AWARD_OPTIONS}
              value={values?.reward?.type}
              defaultValue={values?.reward?.type}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="reward.amount"
            help={_.get(touched, 'reward.amount') && _.get(errors, 'reward.amount')}
            validateStatus={_.get(touched, 'reward.amount') && _.get(errors, 'reward.amount') ? 'error' : 'success'}
            label={t('CREATE.TASK_DETAIL.AMOUNT')}
            className="ml-4"
            valuePropName="values"
          >
            <InputNumber
              disabled={isDisable}
              type="number"
              name="reward.amount"
              onChange={e => {
                handleChangeForm('reward.amount', Number(e));
              }}
              value={values?.reward?.amount}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Spin spinning={pendingStateForImageUploadToS3 || false}>
            <Form.Item
              help={_.get(touched, 'imageUrl') && _.get(errors, 'imageUrl')}
              validateStatus={_.get(touched, 'imageUrl') && _.get(errors, 'imageUrl') ? 'error' : 'success'}
              name="imageUrl"
              className="w-50 justify-content-center align-items-center"
            >
              <AntCard
                title={t('CREATE.TASK_DETAIL.UPLOAD_IMAGE')}
                bordered
                className={classes.card}
              >
                <>
                  <Image
                    src={values?.imageUrl || PLACEHOLDER_IMAGE}
                  />
                  <ImageUploader
                    supportedFileTypes={supportedFileTypes}
                    modalTitle={t('CREATE.TASK_DETAIL.IMAGE_UPLOAD_EDIT')}
                    buttonText={t('CREATE.TASK_DETAIL.UPLOAD_IMAGE')}
                    maxImageSizeInMB={maxImageSizeInMB}
                    validImageRatios={taskImageRatios}
                    minWidth={300}
                    minHeight={225}
                    disabled={isDisable}
                    isAppliedToOtherLanguagesCheckboxVisible
                    onOkayClick={(loadedImage, file) => {
                      handleUpload(loadedImage, file, TASK_IMAGE_TYPES.MAIN);
                    }}
                  />
                </>
              </AntCard>
            </Form.Item>
          </Spin>
        </Col>
      </Row>
      <Button
        type="text"
        size="small"
        onClick={handleUseSamePhotoForThumbnail}
        className="mb-2"
        disabled={values?.imageUrl === '' || values?.thumbnailUrl !== ''}
      >
        {t('CREATE.TASK_DETAIL.USE_SAME_PHOTO_FOR_THUMB')}
      </Button>
      <Row gutter={24}>
        <Col span={12}>
          <Spin spinning={pendingStateForImageUploadToS3 || false}>
            <Form.Item
              help={_.get(touched, 'thumbnailUrl') && _.get(errors, 'thumbnailUrl')}
              validateStatus={_.get(touched, 'thumbnailUrl') && _.get(errors, 'thumbnailUrl') ? 'error' : 'success'}
              name="thumbnailUrl"
              className="w-50 justify-content-center align-items-center"
            >
              <AntCard
                title={t('CREATE.TASK_DETAIL.UPLOAD_THUMBNAIL_IMAGE')}
                bordered
                className={classes.card}
              >
                <>
                  <Image
                    src={values?.thumbnailUrl || PLACEHOLDER_IMAGE}
                  />
                  <ImageUploader
                    supportedFileTypes={supportedFileTypes}
                    modalTitle={t('CREATE.TASK_DETAIL.IMAGE_UPLOAD_EDIT')}
                    buttonText={t('CREATE.TASK_DETAIL.UPLOAD_THUMBNAIL_IMAGE')}
                    maxImageSizeInMB={maxImageSizeInMB}
                    validImageRatios={taskImageRatios}
                    minWidth={300}
                    minHeight={225}
                    disabled={isDisable}
                    isAppliedToOtherLanguagesCheckboxVisible
                    onOkayClick={(loadedImage, file) => {
                      handleUpload(loadedImage, file, TASK_IMAGE_TYPES.THUMBNAIL);
                    }}
                  />
                </>
              </AntCard>
            </Form.Item>
          </Spin>
        </Col>
      </Row>
    </Card>
  );
};

export default TaskDetails;
