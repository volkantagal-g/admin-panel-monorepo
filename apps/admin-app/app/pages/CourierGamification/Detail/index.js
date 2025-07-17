import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useCallback } from 'react';
import { Row, Col, Modal, Form, Button, Spin } from 'antd';
import { useFormik } from 'formik';

import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage } from '@shared/hooks';
import { TASK_COVERAGE_CHOOSING_COURIER_TYPES } from '../constant';
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
import { TaskCoverage, TaskDetails, TaskHistory } from '../components/index';
import { defaultValues, validationSchema } from './formHelper';
import { validate } from '@shared/yup';

import { detailCourierGamificationTaskByIdSelector } from './redux/selectors';
import { courierGamificationKPISelector } from '../components/SelectTaskKPI/redux/selectors';

const reduxKey = REDUX_KEY.COURIER_GAMIFICATION_TASK.DETAIL;

const CourierGamificationTaskDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const [firstFormValues, setFirstFormValues] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const kpis = useSelector(courierGamificationKPISelector.getData);
  const data = useSelector(detailCourierGamificationTaskByIdSelector.getData);
  const isPending = useSelector(detailCourierGamificationTaskByIdSelector.getIsPending);
  const isAfterStart = useSelector(detailCourierGamificationTaskByIdSelector.getIsAfterStart);
  const isAfterEnd = useSelector(detailCourierGamificationTaskByIdSelector.getIsAfterEnd);
  const [isDisabledWarehouseSelectionOnCoverage, setIsDisabledWarehouseSelectionOnCoverage] = useState(false);
  const [isVisibleRangePicker, setIsVisibleRangePicker] = useState(true);
  const [isDisableTaskDetailComponents, setIsDisableTaskDetailComponents] = useState(true);
  const [isDisableTaskCoverageComponents, setIsDisableTaskCoverageComponents] = useState(true);
  const [choosenKPI, setChoosenKPI] = useState(null);
  const [choosenConditionKPI, setChoosenConditionKPI] = useState(null);
  const [radioGroupValue, setRadioGroupValue] = useState(TASK_COVERAGE_CHOOSING_COURIER_TYPES.WAREHOUSE_CHOOSE);

  usePageViewAnalytics({ name: ROUTE.COURIER_GAMIFICATION_TASK_DETAIL.name, squad: ROUTE.COURIER_GAMIFICATION_TASK_DETAIL.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [form] = Form.useForm();
  const formik = useFormik({
    initialValues: data?.taskData ? data.taskData : defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.updateTaskDetailCourierGMFCRequest({
        requestBody: isAfterStart ? {
          title: values?.title,
          description: values?.description,
          status: data?.status,
        } : {
          ...values,
          status: data?.status,
        },
      }));
    },
    validateOnMount: false,
  });

  const {
    handleSubmit,
    values, errors, touched,
    setFieldValue,
    setValues,
  } = formik;

  useEffect(() => {
    if (id !== '') {
      dispatch(Creators.detailCourierGamificationTaskByIdRequest({ currId: id }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const updateCoverageSettings = () => {
      const hasCoverage =
        values?.taskCoverage?.cityIds?.length > 0 || values?.taskCoverage?.warehouseIds?.length > 0;
      setIsDisabledWarehouseSelectionOnCoverage(!hasCoverage);
      setRadioGroupValue(
        hasCoverage
          ? TASK_COVERAGE_CHOOSING_COURIER_TYPES.WAREHOUSE_CHOOSE
          : TASK_COVERAGE_CHOOSING_COURIER_TYPES.BULK_PERSON_UPLOAD,
      );
    };

    const taskData = data?.taskData;

    if (taskData && (!firstFormValues || JSON.stringify(firstFormValues) !== JSON.stringify(taskData))) {
      setValues(taskData);
      form.setFieldsValue(taskData);
      setFirstFormValues(taskData);
      updateCoverageSettings();
    }
  }, [data, firstFormValues, setValues, form, values?.taskCoverage?.cityIds?.length, values?.taskCoverage?.warehouseIds?.length]);

  const openConfirmModal = () => {
    Modal.confirm({
      closable: true,
      maskClosable: true,
      title: t('courierGamificationPage:ARE_YOU_SURE_DELETE_TITLE'),
      content: t('courierGamificationPage:ARE_YOU_SURE_DELETE_DESC'),
      icon: null,
      okText: t('CONFIRM'),
      cancelText: t('CANCEL'),
      onOk: () => {
        dispatch(Creators.deleteTaskByIdRequest());
      },
      centered: true,
    });
  };

  const handleClickEdit = useCallback(() => {
    const handleCancelEdit = () => {
      setValues(firstFormValues);
      setIsEditMode(false);
      setIsDisableTaskDetailComponents(true);
      setIsDisableTaskCoverageComponents(true);
    };

    const openEditingCancelConfirmModal = () => {
      Modal.confirm({
        closable: true,
        maskClosable: true,
        title: t('courierGamificationPage:ARE_YOU_SURE_CANCEL_EDITING_TITLE'),
        content: t('courierGamificationPage:ARE_YOU_SURE_CANCEL_EDITING_DESC'),
        icon: null,
        okText: t('CONFIRM'),
        cancelText: t('CANCEL'),
        onOk: () => handleCancelEdit(),
        centered: true,
      });
    };

    const handleEnableEditMode = () => {
      setIsEditMode(true);
      setIsDisableTaskDetailComponents(isAfterStart);
      setIsDisableTaskCoverageComponents(isAfterStart);
      const selectedKpi = kpis?.find(aKpi => aKpi?.key === values?.goal?.kpi);
      setChoosenConditionKPI(kpis?.find(aKpi => aKpi?.key === values?.conditions[0]?.kpi));
      setChoosenKPI(selectedKpi || null);
    };

    if (isEditMode) {
      openEditingCancelConfirmModal();
    }
    else {
      handleEnableEditMode();
    }
  }, [isEditMode, setValues, firstFormValues, t, kpis, values?.goal?.kpi, values?.conditions, isAfterStart]);

  const handleClickDelete = () => {
    openConfirmModal();
  };

  if (isPending) {
    return <Spin size="small" />;
  }

  return (
    <>
      <PageTitleHeader
        title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.DETAIL')}
      />
      <Header
        title={t('global:PAGE_TITLE.COURIER_GAMIFICATION_TASK.DETAIL')}
        handleClickDelete={handleClickDelete}
        handleClickEdit={handleClickEdit}
        isEditMode={isEditMode}
        isVisibleEditAndDeleteButton={!isAfterEnd}
        isAfterEnd={isAfterEnd}
      />
      <Form
        id="gmfc-edit-form"
        onFinish={handleSubmit}
        layout="vertical"
        form={form}
      >
        <TaskCoverage
          isDisabledWarehouseSelectionOnCoverage={isDisabledWarehouseSelectionOnCoverage}
          setIsDisabledWarehouseSelectionOnCoverage={setIsDisabledWarehouseSelectionOnCoverage}
          values={values}
          touched={touched}
          errors={errors}
          handleChangeForm={setFieldValue}
          onDetail
          isDisable={isDisableTaskCoverageComponents}
          radioGroupValue={radioGroupValue}
          setRadioGroupValue={setRadioGroupValue}
        />
        <TaskDetails
          values={values}
          touched={touched}
          errors={errors}
          handleChangeForm={setFieldValue}
          isEditMode={isEditMode}
          isVisibleRangePicker={isVisibleRangePicker}
          setIsVisibleRangePicker={setIsVisibleRangePicker}
          onDetail
          isDisable={isDisableTaskDetailComponents}
          choosenKPI={choosenKPI}
          setChoosenKPI={setChoosenKPI}
          choosenConditionKPI={choosenConditionKPI}
          setChoosenConditionKPI={setChoosenConditionKPI}
        />
        {!isAfterEnd && (
        <Row gutter={24} justify="end">
          <Col span={4} justify="flex-end">
            <Form.Item className="mt-0 w-100">
              <Button
                disabled={!isEditMode}
                type="primary"
                size="small"
                htmlType="submit"
                onClick={handleSubmit}
                className="w-100"
              >
                {t('button:UPDATE')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
        )}
      </Form>
      <TaskHistory />
    </>
  );
};

export default CourierGamificationTaskDetailPage;
