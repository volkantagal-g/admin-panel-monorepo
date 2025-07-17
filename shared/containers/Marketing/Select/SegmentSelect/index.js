import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { debounce } from 'lodash';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSegments } from '@shared/api/segments';

const convertSegmentOptions = segments => {
  return segments?.map(item => ({
    value: item?.segment,
    label: `${item?.segment} - ${item?.description}`,
  }));
};

const SegmentSelect = ({ fieldName, disabled, onChange, rules, mode = 'multiple', label, inline = false }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const [isSegmentsLoading, setIsSegmentsLoading] = useState(false);
  const [segments, setSegments] = useState([]);
  const placeholder = `${label} ${t('SEGMENTS_PLEASE_TYPE_FOR_SEARCH')}` || t('SEGMENTS_PLEASE_TYPE_FOR_SEARCH');

  const searchSegment = value => {
    if (value.length > 0) {
      setIsSegmentsLoading(true);
      getSegments(
        { limit: 20, offset: 0, search: value },
      ).then(({ segments: segmentRecords }) => {
        setSegments(convertSegmentOptions(segmentRecords));
      }).catch(error => {
        dispatch(ToastCreators.error({ error }));
      }).finally(() => {
        setIsSegmentsLoading(false);
      });
    }
    return false;
  };

  return (
    <Form.Item
      name={fieldName}
      label={inline ? null : label}
      className={inline ? 'd-inline-block w-100' : ''}
      rules={rules}
      tooltip={t('PLEASE_TYPE_FOR_SEARCH', { letterCount: 1 })}
    >
      <Select
        mode={mode}
        maxTagCount={10}
        maxTagTextLength={12}
        disabled={disabled}
        loading={(isSegmentsLoading)}
        placeholder={placeholder}
        options={[{ value: 0, label: t('ALL_USERS') }, ...segments]}
        notFoundContent={(
          <div className="text-center my-3">
            {(isSegmentsLoading) ?
              <LoadingOutlined spin className="mr-4" /> :
              t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 1 })}
          </div>
        )}
        autoComplete="off"
        onSearch={debounce(searchSegment, DEFAULT_DEBOUNCE_MS)}
        onChange={onChange}
        filterOption={false}
      />
    </Form.Item>
  );
};

export default SegmentSelect;
