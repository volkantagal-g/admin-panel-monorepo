import { ErrorBadge } from '@shared/components/GUI/ErrorBadge';
import { PRODUCT_DETAIL_TAB_ID } from '@app/pages/MarketProduct/constants';
import { filterValidationErrors } from '@app/pages/MarketProduct/utils';
import Notifications from '../Notifications';

export const TabLabel = ({ t, label, validationErrors, tabId }) => {
  const filteredErrors = filterValidationErrors({ validationErrors, tabId });

  return (
    <>
      {label}
      <ErrorBadge
        title={t('PRODUCT_ACTIVATION_ERRORS')}
        errors={filteredErrors}
      />
    </>
  );
};

export const getTabItems = ({ t, validationErrors = [], handleChange, values, setFieldValue }) => {
  const tabItems = [
    {
      label: (
        <TabLabel
          t={t}
          tabId={PRODUCT_DETAIL_TAB_ID.GENERAL_INFO}
          label={t('GENERAL_INFO')}
          validationErrors={validationErrors}
        />
      ),
      children: <Notifications handleChange={handleChange} values={values} setFieldValue={setFieldValue} />,
      key: PRODUCT_DETAIL_TAB_ID.GENERAL_INFO,
    },
  ];

  return tabItems;
};
