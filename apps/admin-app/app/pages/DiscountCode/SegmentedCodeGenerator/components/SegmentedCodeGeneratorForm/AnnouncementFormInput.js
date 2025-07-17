import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import AnnouncementSelect from '@shared/containers/Select/Announcement';
import { createSegmentedCodeByBulkSelector } from '../../redux/selectors';
import useStyles from './styles';

const SegmentFormInput = ({ formik }) => {
  const { t } = useTranslation(['global', 'segmentedCodeGeneratorPage']);
  const classes = useStyles();

  const createSegmentedCodeByBulkIsPending = useSelector(createSegmentedCodeByBulkSelector.getIsPending);

  const { setFieldValue, setFieldTouched, touched, errors } = formik;

  return (
    <Form.Item
      label={t('segmentedCodeGeneratorPage:SELECT_ANNOUNCEMENT')}
      name={['announcement']}
      help={get(touched, 'announcement') && get(errors, 'announcement')}
      validateStatus={get(touched, 'announcement') && get(errors, 'announcement') ? 'error' : 'success'}
      className={classes.formItem}
    >
      <AnnouncementSelect
        onChange={id => setFieldValue('announcement', id || '')}
        mode="single"
        placeholder={t('segmentedCodeGeneratorPage:SELECT_ANNOUNCEMENT')}
        disabled={createSegmentedCodeByBulkIsPending}
        onBlur={() => setFieldTouched('announcement')}
      />
    </Form.Item>
  );
};

export default SegmentFormInput;
