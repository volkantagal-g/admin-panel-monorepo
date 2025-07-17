import { Col, Row, Typography } from 'antd';
import { get } from 'lodash';

import { InputWrapper } from '@shared/components/UI/Form';
import { t } from '@shared/i18n';

const { Text } = Typography;

const NumberInputQuestion = ({ formik, handleChange, isPending }) => {

  return (
    <Row>
      <Col span={24}>
        <Text>{t('kdsQuestionPage:NUMBER_OPTION')}</Text>
        <InputWrapper
          inputKey="answerOptions"
          value={formik.values.answerOptions}
          isTouched={get(formik.touched, 'answerOptions')}
          hasError={get(formik.errors, 'answerOptions')}
          handleChange={handleChange}
          disabled={isPending}
          setFieldValue={formik.setFieldValue}
          mode="number"
        />
      </Col>
    </Row>
  );
};

export default NumberInputQuestion;
