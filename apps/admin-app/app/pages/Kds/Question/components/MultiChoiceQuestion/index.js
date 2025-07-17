import { Button, Checkbox, Col, Row } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import useStyles from './styles';
import { NotApplicableOptionType } from '@app/pages/Kds/constant';

const MultiChoiceQuestion = ({ answerOptions, formik, isPending, isFormEditable = true, form, setFieldValue }) => {
  const classes = useStyles();

  const handleAddClick = () => {
    const list = [...answerOptions];
    list.unshift({ tr: '', en: '', isHighlighted: false });
    formik.setFieldValue('answerOptions', list);
  };

  const handleRemoveClick = index => {
    const list = [...answerOptions];
    list.splice(index, 1);
    formik.setFieldValue('answerOptions', list);
  };

  const handleIsHiglighted = (value, index) => {
    const { checked } = value.target;

    form.setFieldsValue(`answerOptions.${index}.isHighlighted`, checked);
    setFieldValue(`answerOptions.${index}.isHighlighted`, checked);
  };

  return (
    answerOptions.map((answerOption, index) => {
      const isNAOption = answerOption[getLangKey()] === NotApplicableOptionType[getLangKey()];
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Row key={index}>
          <Col span={14}>
            <MultiLanguageInput
              fieldPath={['answerOptions', index]}
              disabled={isPending || !isFormEditable || isNAOption}
              formik={formik}
              label={t('kdsQuestionPage:ANSWER_OPTION')}
            />
          </Col>
          <Col span={4}>
            <Checkbox
              checked={get(answerOptions, `${index}.isHighlighted`)}
              onChange={value => handleIsHiglighted(value, index)}
              disabled={isPending || !isFormEditable}
              className={classes.highlightCheckbox}
              name="isHighlighted"
            >{t('kdsQuestionPage:HIGHLIGHT')}
            </Checkbox>
          </Col>
          <Col span={6} className={classes.choicesListButtonsWrapper}>
            {answerOptions.length !== 1 && (
              <Button
                type="primary"
                className={classes.choicesListButton}
                onClick={() => handleRemoveClick(index)}
                icon={<MinusOutlined />}
                disabled={isPending || !isFormEditable || isNAOption}
              />
            )}
            <Button
              type="primary"
              className={classes.choicesListButton}
              icon={<PlusOutlined />}
              onClick={handleAddClick}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
      );
    })
  );
};

export default MultiChoiceQuestion;
