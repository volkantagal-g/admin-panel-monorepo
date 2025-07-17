import { memo } from 'react';
import { Form } from 'antd';

import { useSelector } from 'react-redux';

import OptionalControls from '@shared/containers/Marketing/OptionalControls';
import { pageOptionSelector } from '@app/pages/Popup/New/redux/selectors';
import { OPTIONAL_CONTROL } from '@shared/containers/Marketing/OptionalControls/constants';

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
            inactiveControls={
              [
                OPTIONAL_CONTROL.ARTISAN_STORE_CONTROL,
                OPTIONAL_CONTROL.SEGMENT,
                OPTIONAL_CONTROL.ARTISAN_VERTICAL_CONTROL,
                OPTIONAL_CONTROL.GETIR_MARKET_SUB_CATEGORY_CONTROL,
                OPTIONAL_CONTROL.ARTISAN_SERVICE_AREA_STORE_CONTROL]
            }
            controls={activeControls}
            form={form}
            controlFieldName="type"
            domainTypeFieldName="activeDomains"
            parentFieldName="controls"
            dependencyArr={['domainType', 'activeDomains']}
          />
        );
      }}
    </Form.Item>
  );
};

export default memo(OptionalControlForm);
