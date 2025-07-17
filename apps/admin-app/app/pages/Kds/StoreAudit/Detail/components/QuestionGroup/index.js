import { useSelector } from 'react-redux';
import { Collapse, Tag } from 'antd';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { storeAuditDetailSelector } from '../../redux/selectors';
import { answeredQuestionsLength } from '../Form/formHelper';
import Question from '../Question';
import useStyles from './styles';

const { Panel } = Collapse;

const QuestionGroup = ({
  questionGroups,
  disabled,
  isError,
  expandedQuestionGroupIds,
  expandedQuestionIds,
  setExpandedQuestionGroupIds,
  setExpandedQuestionIds,
  shouldShowHighlights,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('storeAuditPage');

  const uploadedImageCollapsePanel = useSelector(storeAuditDetailSelector.getUploadedImageCollapsePanel);

  const renderHeader = questionGroup => {
    const totalQuestions = get(questionGroup, ['questions', 'length'], '-');
    const answeredQuestions = answeredQuestionsLength(questionGroup);

    return (
      <div className={classes.groupContainer}>
        <div className={`${classes.labelText} ${classes.groupNameText}`}>
          {get(questionGroup, ['name', getLangKey()], '-')} ({answeredQuestions}/{totalQuestions})
        </div>
        <div className={`${classes.labelText} ${classes.scoreText}`}>
          <Tag color="orange">
            <span>{t('CATEGORY_SCORE')}:</span>{get(questionGroup, 'score', 0).toFixed(2)}
          </Tag>
        </div>
      </div>
    );
  };

  return (
    <Collapse
      ghost
      className={classes.collapseWrapper}
      defaultActiveKey={uploadedImageCollapsePanel?.questionGroupIds}
      activeKey={expandedQuestionGroupIds}
      onChange={val => setExpandedQuestionGroupIds(val)}
    >
      {
        questionGroups?.map(questionGroup => (
          <Panel header={renderHeader(questionGroup)} key={questionGroup._id}>
            {
              questionGroup?.questions.map(question => (
                <Question
                  isError={isError}
                  key={question._id}
                  question={question}
                  questionGroupId={questionGroup._id}
                  disabled={disabled}
                  expandedQuestionIds={expandedQuestionIds}
                  setExpandedQuestionIds={setExpandedQuestionIds}
                  shouldShowHighlights={shouldShowHighlights}
                />
              ))
            }
          </Panel>
        ))
      }
    </Collapse>
  );
};

export default QuestionGroup;
