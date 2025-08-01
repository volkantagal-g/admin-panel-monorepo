import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import {
  Space,
  Tag,
  Skeleton,
  Button,
  Popconfirm,
  Alert,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import {
  EMPLOYMENT_STATUSES,
  EMPLOYMENT_STATUSES_TAG_COLORS,
} from '@app/pages/Employee/constants';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import permKey from '@shared/shared/permKey.json';

import TerminateEmployeeModal from './components/TerminateEmployeeModal';
import RehireEmployeeModal from './components/RehireEmployeeModal';
import PersonalInfoForm from './components/PersonalInfoForm';
import ContactInfoForm from './components/ContactInfoForm';
import EmployeeInfoForm from './components/EmployeeInfoForm';
import OrganizationInfoForm from './components/OrganizationInfoForm';
import CompanyInfoForm from './components/CompanyInfoForm';
import EducationInfoForm from './components/EducationInfoForm';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import {
  employeeSelector,
  mainSelector,
  employeeSurveyHistorySelector,
} from './redux/selectors';
import useStyle from './styles';
import OnBoardingInfoFormSection from './components/OnboardingInfoForm';

const reduxKey = REDUX_KEY.EMPLOYEE.DETAIL;

const EmployeeDetailPage = () => {
  const { t } = useTranslation(['employeePage', 'global']);
  const dispatch = useDispatch();
  const classes = useStyle();
  const { id: employeeId } = useParams();

  const { Can, canAccess } = usePermission();
  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_DETAIL.name, squad: ROUTE.EMPLOYEE_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [showWarning, setShowWarning] = useState(false);

  const employeeData = useSelector(employeeSelector.getData);
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const surveyData = useSelector(employeeSurveyHistorySelector.getData)?.surveyHistory;
  const companyFormData = useSelector(employeeSelector.getCompanyInfoFormData);

  // const hasAccessToSurveyHistory: boolean = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EXIT_SURVEY_PERMIT);
  const hasAccessToTerminateAndRehireComp: boolean = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_TERMINATE_AND_REHIRE);
  const shouldDisplayExitSurvey = !!surveyData?.length;
  const [terminateEmployeeModalOpen, setTerminateEmployeeModalOpen] = useState<boolean>(false);
  const [rehireEmployeeModalOpen, setRehireEmployeeModalOpen] = useState<boolean>(false);
  const targetRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChangeTerminateEmployeeModalVisibility = (isOpen: boolean) => {
    setTerminateEmployeeModalOpen(isOpen);
  };

  const handleChangeRehireEmployeeModalVisibility = (isOpen: boolean) => {
    setRehireEmployeeModalOpen(isOpen);
  };

  useEffect(() => {
    if (employeeId) {
      dispatch(Creators.getEmployeeRequest({ employeeId }));
      dispatch(Creators.getEmployeeEducationsRequest({ employeeId }));
      dispatch(Creators.getEmployeeSurveyHistoryRequest({
        values:
          { employeeId },
      }));
    }
  }, [dispatch, employeeId]);

  const handleCancelTermination = () => {
    dispatch(Creators.updateCompanyInfoRequest({
      values: {
        workStartDate: companyFormData.workStartDate,
        seniorityStartDate: companyFormData.seniorityStartDate,
        annualLeaveCalculationStartDate: companyFormData.annualLeaveCalculationStartDate,
        mainWorkLocation: companyFormData.mainWorkLocation,
        employmentType: companyFormData.employmentType,
        contractType: companyFormData.contractType,
        workEndDate: null,
        isTerminationCancelled: true,
      },
      onSuccess: () => {
        // if cancel termination is successful, we need to re-fetch the survey history
        // because latest survey history's updated in the service
        dispatch(Creators.getEmployeeSurveyHistoryRequest({ values: { employeeId } }));
      },
    }));
  };

  return (
    <>
      <PageTitleHeader title={employeeData?.fullName || t('global:PAGE_TITLE.EMPLOYEE.DETAIL')} />
      <div className={classes.pageContainer}>
        <header className={classes.pageHeader}>
          {
            !isFirstLoadDone && isEmployeeDataPending ? (
              <Skeleton.Button active={!employeeData?.fullName} shape="round" size="small" className="w-100" />
            ) : (
              <>
                <div className="d-flex align-items-center">
                  <Link to={ROUTE.EMPLOYEE_LIST.path} className="mr-2">
                    <ArrowLeftOutlined />
                  </Link>
                  {/*
                  @ts-ignore */}
                  <Tag
                    className={classes.borderRad6}
                    color={EMPLOYMENT_STATUSES_TAG_COLORS[employeeData?.employmentStatus]}
                  >
                    {t(`employeePage:EMPLOYMENT_STATUSES.${employeeData?.employmentStatus}`)}
                  </Tag>
                  {
                    (employeeData?.workEndDate && employeeData?.employmentStatus !== EMPLOYMENT_STATUSES.NOT_WORKING && (
                      <Tag
                        className={classes.borderRad6}
                        color={EMPLOYMENT_STATUSES_TAG_COLORS[EMPLOYMENT_STATUSES.NOT_WORKING]}
                      >
                        {t('employeePage:DURING_TERMINATION_PROCESS')} - {moment(employeeData?.workEndDate).format('DD.MM.YYYY')}
                      </Tag>
                    ))
                  }
                  <Tag className={classes.borderRad6}>{employeeData?.fullName}</Tag>
                  <Can permKey={permKey.PAGE_EMPLOYEE_LOGS}>
                    <Link to={`${ROUTE.EMPLOYEE_LOGS.path}?employee=${employeeId}`} className="d-flex">
                      <Button size="small" className={classes.borderRad6}>{t('employeePage:EMPLOYEE_LOGS')}</Button>
                    </Link>
                  </Can>
                </div>
                <div className="d-flex align-items-center">
                  {
                    (employeeData?.workEndDate && employeeData?.employmentStatus !== EMPLOYMENT_STATUSES.NOT_WORKING && hasAccessToTerminateAndRehireComp) && (
                      <Popconfirm
                        onConfirm={handleCancelTermination}
                        okText={t('button:YES')}
                        cancelText={t('button:CANCEL')}
                        title={t('employeePage:CONFIRM_CANCEL_TERMINATION_ARE_YOU_SURE')}
                      >
                        <Button
                          loading={isEmployeeDataPending}
                          size="middle"
                          className={classes.cancelTerminationButton}
                        >
                          {t('CANCEL_TERMINATION')}
                        </Button>
                      </Popconfirm>
                    )
                  }
                  {
                    shouldDisplayExitSurvey && (
                      <Button
                        type="primary"
                        className={classes.surveyActionButton}
                        onClick={handleScroll}
                      >
                        {t('employeePage:EXIT_SURVEY')}
                      </Button>
                    )
                  }
                  {
                    hasAccessToTerminateAndRehireComp && (employeeData?.employmentStatus !== EMPLOYMENT_STATUSES.NOT_WORKING && !employeeData?.workEndDate) && (
                    <Button
                      danger
                      type="primary"
                      onClick={() => {
                        setTerminateEmployeeModalOpen(true);
                      }}
                    >
                      {t('employeePage:TERMINATE_EMPLOYEE')}
                    </Button>
                    )
                  }
                  {
                    hasAccessToTerminateAndRehireComp && employeeData?.employmentStatus === EMPLOYMENT_STATUSES.NOT_WORKING && (
                    <Button
                      type="primary"
                      onClick={() => {
                        setRehireEmployeeModalOpen(true);
                      }}
                    >
                      {t('employeePage:REHIRE_EMPLOYEE')}
                    </Button>
                    )
                  }
                </div>
              </>
            )
          }
        </header>
        <Space direction="vertical" className="w-100">
          {
            showWarning && (
            <Alert
              message={t('employeePage:EMPLOYEE_SHOULD_BE_GREATER_THAN_16')}
              type="warning"
              showIcon
              className={classes.warningContainer}
            />
            )
          }
          <PersonalInfoForm
            setShowWarning={setShowWarning}
          />
          <ContactInfoForm />
          <EmployeeInfoForm />
          <OrganizationInfoForm />
          <CompanyInfoForm
            setShowWarning={setShowWarning}
          />
          <EducationInfoForm />
          {shouldDisplayExitSurvey && (
          <OnBoardingInfoFormSection
            ref={targetRef}
          />
          )}
        </Space>
      </div>
      {
        hasAccessToTerminateAndRehireComp && terminateEmployeeModalOpen && (
          <TerminateEmployeeModal
            open={terminateEmployeeModalOpen}
            onChangeVisibility={handleChangeTerminateEmployeeModalVisibility}
          />
        )
      }
      {
        hasAccessToTerminateAndRehireComp && rehireEmployeeModalOpen && (
          <RehireEmployeeModal
            open={rehireEmployeeModalOpen}
            onChangeVisibility={handleChangeRehireEmployeeModalVisibility}
          />
        )
      }
    </>
  );
};

export default EmployeeDetailPage;
