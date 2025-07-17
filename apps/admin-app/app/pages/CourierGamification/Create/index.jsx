import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { Row, Col, Form, Button } from 'antd';
import { useFormik } from 'formik';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import Header from '../components/Header';
import TaskCoverage from '../components/TaskCoverage';
import TaskDetails from '../components/TaskDetails';

import { validate } from '@shared/yup';
import { defaultValues, validationSchema } from './formHelper';
import { createCourierGamificationTaskSelector } from './redux/selectors';
import { TASK_COVERAGE_CHOOSING_COURIER_TYPES, TIME_GRANULARITY_OPTIONS } from '../constant';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.CREATE;

const CourierGamificationTaskCreatePage = () => {
  const { t } = useTranslation('courierGamificationPage');
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.COURIER_GAMIFICATION_TASK_CREATE.name, squad: ROUTE.COURIER_GAMIFICATION_TASK_CREATE.squad });
  const data = useSelector(createCourierGamificationTaskSelector.getData);

  const [isVisibleRangePicker, setIsVisibleRangePicker] = useState(true);
  const [isDisabledWarehouseSelectionOnCoverage, setIsDisabledWarehouseSelectionOnCoverage] = useState(false);
  const [choosenKPI, setChoosenKPI] = useState(null);
  const [choosenConditionKPI, setChoosenConditionKPI] = useState(null);
  const [radioGroupValue, setRadioGroupValue] = useState(TASK_COVERAGE_CHOOSING_COURIER_TYPES.WAREHOUSE_CHOOSE);
  const [taskTimeRanges, setTaskTimeRanges] = useState([]);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      let payload = {
        ...values,
        personIds: !isDisabledWarehouseSelectionOnCoverage ? data?.personIdsList : values?.personIds,
      };

      if (payload.conditions && payload.conditions.length > 0) {
        const filteredConditions = payload.conditions.filter(condition => condition.kpi ||
          condition.comparisonOperator ||
          (condition.value !== null && condition.value !== undefined));
        payload.conditions = filteredConditions;
      }

      if (
        values?.startDate &&
       values?.endDate &&
       choosenKPI?.timeGranularity === TIME_GRANULARITY_OPTIONS.TIME
      ) {
        payload = { ...payload, taskTimeRanges };
      }
      dispatch(Creators.createCourierGamificationTaskRequest({ requestBody: payload }));
    },
    enableReinitialize: false,
    validateOnMount: false,
  });

  const {
    handleSubmit,
    values, errors, touched,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (data?.uploadedImageCdnUrl && data?.uploadedImageCdnUrl !== '') {
      setFieldValue('imageUrl', data?.uploadedImageCdnUrl);
    }
    if (data?.uploadedThumbnailImageCdnUrl) {
      setFieldValue('thumbnailUrl', data?.uploadedThumbnailImageCdnUrl);
    }
  }, [data?.uploadedImageCdnUrl, data?.uploadedThumbnailImageCdnUrl, setFieldValue]);

  return (
    <>
      <PageTitleHeader
        title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.LIST')}
      />
      <Header title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.CREATE')} />
      <Form
        id="gmfc-create-form"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <TaskCoverage
          isDisabledWarehouseSelectionOnCoverage={isDisabledWarehouseSelectionOnCoverage}
          setIsDisabledWarehouseSelectionOnCoverage={setIsDisabledWarehouseSelectionOnCoverage}
          values={values}
          touched={touched}
          errors={errors}
          handleChangeForm={setFieldValue}
          radioGroupValue={radioGroupValue}
          setRadioGroupValue={setRadioGroupValue}
        />
        <TaskDetails
          values={values}
          touched={touched}
          errors={errors}
          handleChangeForm={setFieldValue}
          isVisibleRangePicker={isVisibleRangePicker}
          setIsVisibleRangePicker={setIsVisibleRangePicker}
          choosenKPI={choosenKPI}
          setChoosenKPI={setChoosenKPI}
          choosenConditionKPI={choosenConditionKPI}
          setChoosenConditionKPI={setChoosenConditionKPI}
          setTaskTimeRanges={setTaskTimeRanges}
        />
        <Row gutter={24} justify="end">
          <Col span={4} justify="flex-end">
            <Form.Item className="mt-0 w-100">
              <Button
                type="primary"
                size="small"
                htmlType="submit"
                onClick={handleSubmit}
                className="w-100"
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CourierGamificationTaskCreatePage;
