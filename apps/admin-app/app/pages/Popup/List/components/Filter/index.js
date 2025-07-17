import { memo, useEffect, useMemo } from 'react';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { Creators } from '@app/pages/Popup/List/redux/actions';
import { FILTER_FORM } from '@app/pages/Popup/List/components/Filter/filterForm';
import { initialValues, manipulateValuesAfterSubmit } from '@app/pages/Popup/List/components/Filter/formHelpers';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isObjectIdValid } from '@shared/utils/common';

const FieldWrapper = ({ field }) => {
  const Component = field.component;
  return (
    <Form.Item className="flex-grow-1 lg-w-100" name={field.props.name}>
      <Component {...field.props} />
    </Form.Item>
  );
};

const PopupFilter = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketing');

  const fields = useMemo(() => FILTER_FORM({ t }), [t]);

  const setTableFilters = useMemo(
    () => debounce(values => {
      if (!(values.id && !isObjectIdValid(values.id))) {
        dispatch(Creators.setTableFilters({ filters: manipulateValuesAfterSubmit(values) }));
      }
    }, DEFAULT_DEBOUNCE_MS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    // Init results with default form values on component mount
    dispatch(Creators.getResultsRequest({}));
  }, [dispatch]);

  return (
    <Form
      initialValues={initialValues}
      form={form}
      layout="inline"
      onValuesChange={(changedVal, values) => {
        setTableFilters(values);
      }}
      className="filter mt-5 mb-4"
    >
      {/* Map fields from filter form obj */}
      {Object.keys(fields).map(k => <FieldWrapper key={k} field={fields[k]} />)}
    </Form>
  );
};

export default memo(PopupFilter);
