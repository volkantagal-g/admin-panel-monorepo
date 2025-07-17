import { useTranslation } from 'react-i18next';
import { Checkbox, Form } from 'antd';
import { get } from 'lodash';
import { compose } from 'redux';

import AntCard from '@shared/components/UI/AntCard';
import { getLangKey } from '@shared/i18n';
import { optionalControlOption } from '@shared/containers/Marketing/OptionalControls/constantValues';
import { isActiveServiceAppropriateForController } from '@shared/containers/Marketing/OptionalControls/utils';
import { OPTIONAL_CONTROL } from '@shared/containers/Marketing/OptionalControls/constants';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/ProductsListModal/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/ProductsListModal/redux/reducer';
import TotalOrderCountControl from '@shared/containers/Marketing/OptionalControls/components/TotalOrderCountControl';
import StockLevelControl from '@shared/containers/Marketing/OptionalControls/components/StockLevelControl';
import AggressionLevelControl from '@shared/containers/Marketing/OptionalControls/components/AggressionLevelControl';
import LocationBasedControl from '@shared/containers/Marketing/OptionalControls/components/LocationBasedControl';
import HourScheduler from '@shared/containers/Marketing/OptionalControls/components/HourScheduler';
import SegmentControl from '@shared/containers/Marketing/OptionalControls/components/SegmentControl';
import ArtisanStoreControl from '@shared/containers/Marketing/OptionalControls/components/ArtisanStoreControl';
import ArtisanVerticalControl from '@shared/containers/Marketing/OptionalControls/components/ArtisanVerticalControl';
import GetirMarketSubCategoryControl
  from '@shared/containers/Marketing/OptionalControls/components/GetirMarketSubCategoryControl';
import VersionControl from '@shared/containers/Marketing/OptionalControls/components/VersionControl/VersionControlContainer';

const getControlComponent = (controlOption, props, t) => {
  const component = {
    [OPTIONAL_CONTROL.TOTAL_ORDER_COUNT]: <TotalOrderCountControl
      key={OPTIONAL_CONTROL.TOTAL_ORDER_COUNT}
      {...props}
    />,
    [OPTIONAL_CONTROL.STOCK_LEVEL]: <StockLevelControl key={OPTIONAL_CONTROL.STOCK_LEVEL} {...props} />,
    [OPTIONAL_CONTROL.AGGRESSION_LEVEL]: <AggressionLevelControl
      key={OPTIONAL_CONTROL.AGGRESSION_LEVEL}
      {...props}
    />,
    [OPTIONAL_CONTROL.LOCATION_BASED_CONTROL]: <LocationBasedControl
      key={OPTIONAL_CONTROL.LOCATION_BASED_CONTROL}
      {...props}
    />,
    [OPTIONAL_CONTROL.HOUR_SCHEDULER]: <HourScheduler key={OPTIONAL_CONTROL.HOUR_SCHEDULER} {...props} />,
    [OPTIONAL_CONTROL.SEGMENT]: <SegmentControl key={OPTIONAL_CONTROL.SEGMENT} {...props} />,
    [OPTIONAL_CONTROL.GETIR_MARKET_SUB_CATEGORY_CONTROL]: <GetirMarketSubCategoryControl
      key={OPTIONAL_CONTROL.GETIR_MARKET_SUB_CATEGORY_CONTROL}
      {...props}
    />,
    [OPTIONAL_CONTROL.ARTISAN_STORE_CONTROL]: <ArtisanStoreControl
      key={OPTIONAL_CONTROL.ARTISAN_STORE_CONTROL}
      {...props}
      parentFieldName={[props.parentFieldName]}
    />,
    [OPTIONAL_CONTROL.ARTISAN_VERTICAL_CONTROL]: <ArtisanVerticalControl
      key={OPTIONAL_CONTROL.ARTISAN_VERTICAL_CONTROL}
      {...props}
      parentFieldName={[props.parentFieldName]}
    />,
    [OPTIONAL_CONTROL.ARTISAN_SERVICE_AREA_STORE_CONTROL]: <ArtisanStoreControl
      key={OPTIONAL_CONTROL.ARTISAN_STORE_CONTROL}
      cardTitle={t('LOCALS_SERVICE_AREA_STORE_CONTROL')}
      storeFieldName="localServiceAreaShopIds"
      {...props}
      parentFieldName={[props.parentFieldName]}
    />,
    [OPTIONAL_CONTROL.VERSION_CONTROL]: <VersionControl key={OPTIONAL_CONTROL.VERSION_CONTROL} {...props} />,
  };
  return component[controlOption];
};

const OptionalControls = ({
  inactiveControls = [],
  controlFieldName,
  disabled,
  controls,
  footer,
  form,
  parentFieldName,
  domainTypes = [],
  selectedControlOptions = [],
}) => {
  const { t } = useTranslation('marketing');

  const eligibleControlOptions = [];
  const ControlComponentList = controls.map(controlOptionKey => {
    if (!inactiveControls?.includes(controlOptionKey)) {
      if (isActiveServiceAppropriateForController(domainTypes, optionalControlOption[controlOptionKey]?.eligibleDomains)) {
        eligibleControlOptions.push({
          label: get(optionalControlOption[controlOptionKey].label, getLangKey(), ''),
          value: controlOptionKey,
          key: controlOptionKey,
        });

        if (selectedControlOptions?.includes(controlOptionKey)) {
          return (
            <div className="mt-3" key={controlOptionKey}>
              {getControlComponent(controlOptionKey, { form, parentFieldName, domainTypes, disabled }, t)}
            </div>
          );
        }
      }
    }
    return null;
  });

  return (
    <AntCard footer={footer} bordered={false} title={t('OPTIONAL_CONTROLS')}>
      <ControlCheckbox
        eligibleControlOptions={eligibleControlOptions}
        controlFieldName={controlFieldName}
        disabled={disabled}
      />
      {ControlComponentList}
    </AntCard>
  );
};

const OptionalControlWrapper = ({
  isFormEditable = true,
  inactiveControls = [],
  footer,
  parentFieldName,
  controlFieldName = 'controlType',
  domainTypeFieldName = 'domainTypes',
  controls = [
    OPTIONAL_CONTROL.TOTAL_ORDER_COUNT,
    OPTIONAL_CONTROL.STOCK_LEVEL,
    OPTIONAL_CONTROL.AGGRESSION_LEVEL,
    OPTIONAL_CONTROL.LOCATION_BASED_CONTROL,
    OPTIONAL_CONTROL.HOUR_SCHEDULER,
    OPTIONAL_CONTROL.SEGMENT,
    OPTIONAL_CONTROL.ARTISAN_STORE_CONTROL,
  ],
  // It's used for re-render . When fields changed on dependencyArr the section will update.
  // ref: https://ant.design/components/form/#dependencies
  dependencyArr = ['domainType'],
  form = () => {
  },
}) => {
  // If it has parent form field for optional controls use that naming convention , otherwise use default naming convention
  // controls: { warehouse : {...} } || { warehouse : {...} }
  const finalControlFieldName = parentFieldName ? [parentFieldName, controlFieldName] : [controlFieldName];
  return (
    <Form.Item noStyle dependencies={[...dependencyArr, finalControlFieldName]}>
      {({ getFieldValue }) => {
        // Target domain type can more than one
        // Case : Push Notification could have single domain type but popup can have more than one
        let domainTypes = getFieldValue(domainTypeFieldName) || [];
        const selectedOptions = getFieldValue(finalControlFieldName);
        domainTypes = typeof domainTypes === 'number' ? [domainTypes] : domainTypes;
        return (
          // At least one domain type must be selected, otherwise don't show optional controls
          domainTypes.length ? (
            <OptionalControls
              footer={footer}
              disabled={!isFormEditable}
              inactiveControls={inactiveControls}
              form={form}
              domainTypes={domainTypes}
              controls={controls}
              parentFieldName={parentFieldName}
              selectedControlOptions={selectedOptions}
              controlFieldName={finalControlFieldName}
            />
          ) : null
        );
      }}
    </Form.Item>
  );
};

const ControlCheckbox = ({ controlFieldName, eligibleControlOptions, disabled }) => (
  <Form.Item name={controlFieldName} className="w-100 d-inline" initialValue={[]}>

    <Checkbox.Group className="w-100 py-3 " disabled={disabled}>
      {eligibleControlOptions?.map(option => (
        <Checkbox key={option.key} value={option.value}>
          {option.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  </Form.Item>
);

const reduxKey = REDUX_KEY.MARKETING.OPTIONAL_CONTROL.CONTROL_WRAPPER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(OptionalControlWrapper);
