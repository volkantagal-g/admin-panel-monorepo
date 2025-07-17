import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import { get } from 'lodash';

import { createSegmentedCodeByBulkSelector } from '../../redux/selectors';

import useStyles from './styles';

const SegmentFormInput = ({ formik }) => {
  const { t } = useTranslation(['global', 'segmentedCodeGeneratorPage']);
  const classes = useStyles();
  const createSegmentedCodeByBulkIsPending = useSelector(createSegmentedCodeByBulkSelector.getIsPending);

  const { setFieldValue, setFieldTouched, touched, errors } = formik;

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'select' || inputType === 'date') {
        setFieldValue(fieldName, param);
      }
      else if (inputType === 'checkbox') {
        setFieldValue(fieldName, param.target.checked);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  return (
    <Form.Item
      label={t('segmentedCodeGeneratorPage:SEGMENT_NUMBER')}
      name={['segment']}
      help={get(touched, 'segment') && get(errors, 'segment')}
      validateStatus={get(touched, 'segment') && get(errors, 'segment') ? 'error' : 'success'}
      className={classes.formItem}
    >
      <Input
        type="number"
        placeholder={t('segmentedCodeGeneratorPage:SEGMENT_NUMBER')}
        onChange={getHandleChange('segment')}
        onBlur={() => setFieldTouched('segment')}
        disabled={createSegmentedCodeByBulkIsPending}
      />
    </Form.Item>
  );
};

export default SegmentFormInput;
