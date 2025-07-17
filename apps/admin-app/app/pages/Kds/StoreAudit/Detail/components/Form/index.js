import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Tag, InputNumber, DatePicker, Col, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { get, cloneDeep } from 'lodash';

import classNames from 'classnames';

import Card from '@shared/components/UI/AntCard';
import SelectQualityDepartmentPeople from '@shared/containers/Select/QualityDepartmentPeople';
import { Creators } from '../../redux/actions';
import { storeAuditDetailSelector } from '../../redux/selectors';
import { Footer } from '../index';
import QuestionGroup from '../QuestionGroup';
import { AUDIT_FORM_STATUSES, AUDIT_TYPE_NAME_COLOR } from '../../constant';
import { validateForm } from './formHelper';
import { getStoreAuditDetailRequestParams } from './utils';
import useStyles from './styles';
import { AuditStatusColorsMap, StoreAuditStatuses } from '@app/pages/Kds/constant';
import { getLangKey } from '@shared/i18n';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const UpdateStoreAuditDetailForm = () => {
  const classes = useStyles();
  const { canAccess } = usePermission();

  const isPowerUser = canAccess(permKey.PAGE_STORE_AUDIT_DETAIL_COMPONENT_UPDATE);

  const { t } = useTranslation('storeAuditPage');
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isError, setIsError] = useState(false);
  const [auditData, setAuditData] = useState({});
  const [expandedQuestionGroupIds, setExpandedQuestionGroupIds] = useState([]);
  const [expandedQuestionIds, setExpandedQuestionIds] = useState([]);
  const [isSendToFranchise, setIsSendToFranchise] = useState(true);
  const [isFilteringHighlightedAnswers, setIsFilteringHighlightedAnswers] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(storeAuditDetailSelector.getData);
  const initialData = useSelector(storeAuditDetailSelector.getInitialData);
  const isPending = useSelector(storeAuditDetailSelector.getIsPending);
  const auditTypeName = useSelector(storeAuditDetailSelector.getAuditTypeName);

  const shouldShowHighlights = auditData?.status && auditData?.status !== AUDIT_FORM_STATUSES.IN_PROGRESS;

  useEffect(() => {
    setAuditData(data);
    if (data?.isSendToFranchise !== undefined) {
      setIsSendToFranchise(data?.isSendToFranchise);
    }
  }, [data]);

  const renderErrorText = () => {
    if (isError) {
      return (
        <div className={classes.errorText}>{t('ERROR_TEXT')}</div>
      );
    }
    return null;
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    dispatch(Creators.getStoreAuditDetailSuccess({ data: initialData, initialData: cloneDeep(initialData) }));
    setAuditData(initialData);
    setIsFormEditable(false);
  };

  const makeValidation = () => {
    const isValid = validateForm(auditData);
    if (isValid) {
      setIsError(false);
    }
    else {
      setIsError(true);
    }
    return isValid;
  };

  const updateStoreAuditDetailRequest = status => {
    const isSendToFranchiseProp = get(auditData, 'isSendToFranchise', true);
    const requestObject = getStoreAuditDetailRequestParams({
      ...auditData,
      status,
      isSendToFranchise: isSendToFranchiseProp,
      isPowerUser,
    });
    dispatch(Creators.updateStoreAuditDetailRequest({ data: requestObject, isPowerUserRequest: isPowerUser }));
  };

  const handleSave = () => {
    setIsFormEditable(false);
    updateStoreAuditDetailRequest(AUDIT_FORM_STATUSES.IN_PROGRESS);
  };

  const handleComplete = () => {
    const isValid = makeValidation();
    if (isValid) {
      updateStoreAuditDetailRequest(AUDIT_FORM_STATUSES.COMPLETE);
    }
  };

  const handleSendToFranchise = () => {
    const isValid = makeValidation();
    if (isValid) {
      updateStoreAuditDetailRequest(AUDIT_FORM_STATUSES.SENT_TO_FRANCHISE);
    }
  };

  const handleInProgress = () => {
    updateStoreAuditDetailRequest(AUDIT_FORM_STATUSES.IN_PROGRESS);
  };

  const handleInactivate = () => {
    updateStoreAuditDetailRequest(AUDIT_FORM_STATUSES.INACTIVE);
  };

  const handleChangeAuditor = (_auditorId, auditor) => {
    const newAuditor = { id: auditor.value, name: auditor.label };
    setAuditData({ ...auditData, auditor: newAuditor });
  };

  const handleRoundNumberChange = value => {
    setAuditData({ ...auditData, round: value });
  };

  const handleEmptyRoundValue = event => {
    const { value } = event.target;
    const checkDigitRegex = /^\d+$/;

    if (!value || !checkDigitRegex.test(value)) {
      setAuditData({ ...auditData, round: initialData.round });
    }
  };

  const handleAuditTime = value => {
    setAuditData({ ...auditData, auditDate: value });
  };

  const renderTitle = () => {
    return (
      <Row className={classes.rowContainer} gutter={[4, 4]} justify="middle" align="middle">
        <Col xl={15} lg={24} xs={24}>
          <Row gutter={[8, 8]} align="middle">
            <Col xl={5} xs={24}>{t(auditData?.warehouse?.name)}</Col>
            <Col xl={5} xs={8}>
              <DatePicker
                value={moment(auditData?.auditDate)}
                onChange={handleAuditTime}
                className={classes.dateInput}
                clearIcon={false}
                format="DD/MM/YYYY HH:mm"
                showTime={{ format: 'HH:mm', defaultValue: moment('00:00:00', 'HH:mm') }}
                disabled={isPending || !isFormEditable || !canAccess(permKey.PAGE_STORE_AUDIT_DETAIL_COMPONENT_UPDATE)}
              />
            </Col>

            <Col xl={6} xs={8}>
              <SelectQualityDepartmentPeople
                value={auditData?.auditor?.id}
                placeholder={t('FILTER')}
                onChange={handleChangeAuditor}
                allowClear={false}
                disabled={isPending || !isFormEditable}
              />
            </Col>
            <Col xl={8} xs={8}>
              <InputNumber
                addonBefore={t('ROUND_NUMBER')}
                className={classes.numberInput}
                min={0}
                max={100}
                precision={0}
                step={1}
                defaultValue={0}
                placeholder={t('ROUND_NUMBER')}
                value={auditData?.round}
                onChange={handleRoundNumberChange}
                onBlur={handleEmptyRoundValue}
                disabled={isPending || !isFormEditable || !canAccess(permKey.PAGE_STORE_AUDIT_DETAIL_COMPONENT_UPDATE)}
              />
            </Col>
          </Row>
        </Col>

        <Col xl={9} lg={24} xs={24}>
          <Row gutter={[8, 8]} justify="end" align="center">
            <Col className={classes.totalScore}>
              <Tag color="green">
                <span>{t('TOTAL_SCORE')}:</span>{get(auditData, 'totalScore', 0).toFixed(2)}
              </Tag>
            </Col>
            <Col>
              <Tag color={AUDIT_TYPE_NAME_COLOR}>{auditTypeName}</Tag>
            </Col>
            <Col>
              <Tag color={AuditStatusColorsMap[auditData?.status]}>{StoreAuditStatuses[auditData?.status]?.[getLangKey()]}</Tag>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const handleExpandCollapseButtonClick = () => {
    if (expandedQuestionGroupIds.length) {
      setExpandedQuestionGroupIds([]);
      setExpandedQuestionIds([]);
    }
    else {
      const questionIds = [];
      const questionGroupIds = [];

      auditData?.questionGroups?.forEach(questionGroup => {
        questionGroupIds.push(questionGroup._id);
        questionGroup?.questions?.forEach(question => questionIds.push(question._id));
      });
      setExpandedQuestionGroupIds(questionGroupIds);
      setExpandedQuestionIds(questionIds);
    }
  };

  const questionGroups = useMemo(() => {
    if (!isFilteringHighlightedAnswers) return auditData?.questionGroups;

    // Pick the question groups that at least includes a single question which answered with highlighted answer
    const filteredQuestionGroups = auditData?.questionGroups.filter(questionGroup => {
      return questionGroup?.questions?.some(question => question?.answer?.isHighlighted);
    });

    // Filter out the question that does not have an highlighted answer
    return filteredQuestionGroups.map(questionGroup => ({
      ...questionGroup,
      questions: questionGroup?.questions?.filter(question => question?.answer?.isHighlighted),
    }));
  }, [auditData?.questionGroups, isFilteringHighlightedAnswers]);

  useEffect(() => {
    // When we enable highlighted filtering,
    // we also need to filter out "ghost" ids that are still in expanded state but not visible in UI
    // So "Collapse All / Expand All" button will act according to currently visible groups and questions
    if (isFilteringHighlightedAnswers) {
      const displayedQuestionIds = [];
      const displayedGroupIds = questionGroups.map(questionGroup => questionGroup._id);
      questionGroups.forEach(questionGroup => questionGroup.questions.forEach(question => displayedQuestionIds.push(question._id)));

      setExpandedQuestionGroupIds(items => items.filter(questionGroupId => displayedGroupIds.includes(questionGroupId)));
      setExpandedQuestionIds(items => items.filter(questionId => displayedQuestionIds.includes(questionId)));
    }
  }, [isFilteringHighlightedAnswers, questionGroups]);

  return (
    <Card
      className={isError ? classes.error : classes.card}
      title={renderTitle()}
      loading={isPending}
      footer={(
        <Footer
          status={auditData?.status}
          handleSave={handleSave}
          handleCancelClick={handleCancelClick}
          handleEditClick={handleEditClick}
          handleComplete={handleComplete}
          handleSendToFranchise={handleSendToFranchise}
          handleInProgress={handleInProgress}
          handleInactivate={handleInactivate}
          isFormEditable={isFormEditable}
          isSendToFranchise={isSendToFranchise}
        />
      )}
      extra={renderErrorText()}
    >
      <Row>
        <Space>
          <Button
            className={classes.expandButton}
            onClick={handleExpandCollapseButtonClick}
            size="small"
          >
            {expandedQuestionGroupIds.length ? t('COLLAPSE_ALL') : t('EXPAND_ALL')}
          </Button>
          {shouldShowHighlights && (
            <Button
              className={classNames(classes.highlightButton, isFilteringHighlightedAnswers && classes.highlightButtonActive)}
              onClick={() => setIsFilteringHighlightedAnswers(!isFilteringHighlightedAnswers)}
              size="small"
            >
              <span>{isFilteringHighlightedAnswers ? t('SHOW_ALL') : t('SHOW_ONLY_HIGHLIGHTED')}</span>
            </Button>
          )}
        </Space>
        <QuestionGroup
          isError={isError}
          questionGroups={questionGroups}
          expandedQuestionGroupIds={expandedQuestionGroupIds}
          expandedQuestionIds={expandedQuestionIds}
          setExpandedQuestionGroupIds={setExpandedQuestionGroupIds}
          setExpandedQuestionIds={setExpandedQuestionIds}
          shouldShowHighlights={shouldShowHighlights}
          disabled={isPending || !isFormEditable}
        />
      </Row>
    </Card>
  );
};

export default UpdateStoreAuditDetailForm;
