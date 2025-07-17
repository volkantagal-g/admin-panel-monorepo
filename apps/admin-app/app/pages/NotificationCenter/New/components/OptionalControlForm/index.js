import { memo } from 'react';
import { Form } from 'antd';

import { useSelector } from 'react-redux';

import OptionalControls from '@shared/containers/Marketing/OptionalControls';
import { pageOptionSelector } from '@app/pages/NotificationCenter/New/redux/selectors';

const OptionalControlForm = ({ form }) => {
  const pageOptions = useSelector(pageOptionSelector.getPageOptions);
  return (
    <Form.Item noStyle dependencies={['pageIds']}>
      {({ getFieldValue }) => {
        const pageIds = getFieldValue('pageIds');
        // Page options fetching from config service on ApplicationSettingComponent init phase
        // And every page has its own  active control component list

        // Get active controls related the page options and merge them
        const selectedPageOptions = pageOptions.filter(option => pageIds?.includes(option?.pageId));
        const activeControls = [...new Set([].concat(...selectedPageOptions.map(option => option?.activeControls || [])))];

        if (!activeControls.length) {
          return null;
        }

        return (
          <OptionalControls
            form={form}
            controls={activeControls}
            controlFieldName="type"
            domainTypeFieldName="domainType"
            parentFieldName="controls"
            dependencyArr={['targetDomain', 'domainType']}
          />
        );
      }}
    </Form.Item>
  );
};

export default memo(OptionalControlForm);
