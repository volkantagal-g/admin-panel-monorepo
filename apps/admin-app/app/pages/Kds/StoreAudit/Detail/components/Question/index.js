import { useSelector, useDispatch } from 'react-redux';
import { Collapse, Popover, Radio, InputNumber, Input } from 'antd';
import { InfoCircleOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { set, get, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { getLangKey } from '@shared/i18n';
import { QuestionTypes } from '@app/pages/Kds/constant';
import { validateQuestion } from '../Form/formHelper';
import { Creators } from '../../redux/actions';
import { storeAuditDetailSelector } from '../../redux/selectors';
import { UploadImage } from '../index';
import useStyles from './styles';

const { Panel } = Collapse;
const { TextArea } = Input;

const Question = ({ question, questionGroupId, disabled, isError, expandedQuestionIds, setExpandedQuestionIds, shouldShowHighlights }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('storeAuditPage');

  const uploadedImageCollapsePanel = useSelector(storeAuditDetailSelector.getUploadedImageCollapsePanel);

  const renderHeader = () => {
    return (
      <div className={classes.questionTextWrapper}>
        {
          question.isPhotoForced && (
            <div className={classes.photoForcedIconContainer}>
              <Popover content={t('REQUIRED_PHOTO_TOOLTIP')}>
                <WarningOutlined className={classes.warningIcon} />
              </Popover>
            </div>
          )
        }
        {
          !isEmpty(question.answer) && (
            <div className={classes.photoForcedIconContainer}>
              <Popover content={t('ANSWERED_QUESTION')}>
                <CheckCircleOutlined className={classes.checkIcon} />
              </Popover>
            </div>
          )
        }
        <Popover content={get(question, ['tooltip', getLangKey()], '-')}>
          <InfoCircleOutlined className={classes.infoIcon} />
        </Popover>
        <span className={classes.questionText}>
          {get(question, ['name', getLangKey()], '-')}
        </span>
        {shouldShowHighlights && (
          <span className={classNames(classes.questionHeaderAnswer, question?.answer?.isHighlighted && classes.questionHeaderAnswerIsHighlighted)}>
            {get(question, ['answer', getLangKey()], '-')}
          </span>
        )}
      </div>
    );
  };

  const handleSelectQuestion = e => {
    set(question, 'answer', JSON.parse(e.target.value));
    dispatch(Creators.updateStoreAuditAnswerRequest({ questionGroupId, question }));
  };

  const handleInputChange = value => {
    set(question, 'answer.value', Math.ceil(value));
    dispatch(Creators.updateStoreAuditAnswerRequest({ questionGroupId, question }));
  };

  const onQuestionNoteChange = value => {
    set(question, 'notes', value);
    dispatch(Creators.updateStoreAuditNoteRequest({ questionGroupId, question }));
  };

  const renderMultipleChoice = () => {
    return (
      <>
        <div className={classes.answerOptionsContainer}>
          <Radio.Group
            disabled={disabled}
            value={JSON.stringify(question?.answer)}
            onChange={e => handleSelectQuestion(e)}
          >
            {
              question.answerOptions.map((answerOption, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                  <Radio value={JSON.stringify(answerOption)}>{get(answerOption, getLangKey(), '-')}</Radio>
                </div>
              ))
            }
          </Radio.Group>
        </div>
        <div className={classes.auditNoteContainer}>
          <TextArea
            value={get(question, 'notes', '')}
            onChange={({ target }) => onQuestionNoteChange(target.value)}
            disabled={disabled}
          />
        </div>
        <div className={classes.auditImageUploadContainer}>
          <UploadImage questionGroupId={questionGroupId} question={question} disabled={disabled} />
        </div>
      </>
    );
  };

  const renderNumberInput = () => {
    return (
      <>
        <InputNumber
          type="number"
          disabled={disabled}
          value={question?.answer?.value}
          onChange={e => handleInputChange(e)}
        />
        <div className={classes.auditNoteContainer}>
          <TextArea
            value={get(question, 'notes', '')}
            onChange={({ target }) => onQuestionNoteChange(target.value)}
            disabled={disabled}
          />
        </div>
      </>
    );
  };

  return (
    <Collapse
      className={classes.questionWrapper}
      defaultActiveKey={uploadedImageCollapsePanel?.questionIds}
      activeKey={expandedQuestionIds}
      onChange={val => setExpandedQuestionIds(val)}
    >
      <Panel
        className={!validateQuestion(question) && isError && classes.error}
        showArrow={false}
        header={renderHeader()}
        key={question._id}
      >
        {question?.questionType === QuestionTypes.MULTIPLE_CHOICE ? renderMultipleChoice() : renderNumberInput()}
      </Panel>
    </Collapse>
  );
};

export default Question;
