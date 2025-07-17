import { useSelector } from 'react-redux';
import { forwardRef, ForwardedRef } from 'react';

import {
  Card,
  Skeleton,
} from 'antd';
import { orderBy as _orderBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  employeeSelector,
  employeeSurveyHistorySelector,
  mainSelector,
} from '../../redux/selectors';
import useStyles from '../../styles';
import OnboardingForm from './Form';

const OnBoardingInfoFormSection = forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const surveyHistoryData = useSelector(employeeSurveyHistorySelector.getData)?.surveyHistory;
  const isSurveyHistoryPending = useSelector(employeeSurveyHistorySelector.getIsPending);

  if (!isFirstLoadDone && (isEmployeeDataPending || isSurveyHistoryPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 5 }}
        active
        loading
      />
    );
  }

  return (
    <div
      ref={ref}
    >
      <Card
        bordered
        className={classes.cardContainer}
        title={t('employeePage:EXIT_SURVEY')}
      >
        {
          surveyHistoryData?.length > 0 && _orderBy(surveyHistoryData, 'workEndDate', 'desc').map((surveyData: any) => (
            <OnboardingForm mode="edit" surveyHistoryData={surveyData} key={surveyData._id} />
          ))
        }
        {/* for now comment out add functionality */}
        {/* if we need to add new survey data, we can just uncomment this */}
        {/* <OnboardingForm mode="add" /> */}
      </Card>
    </div>
  );
});

export default OnBoardingInfoFormSection;
