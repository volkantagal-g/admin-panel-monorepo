import DynamicFormItem from '../DynamicFormItem';
import { validateConfigs } from '../utils';

// use this to get array of form items, maybe place them in a layout you might prefer
export function getDynamicFormItems({ formConfigs = [], formik }) {
  validateConfigs(formConfigs);
  if (!formik) {
    throw new Error('formik is required, pass the formik object from useFormik');
  }

  return formConfigs?.map(config => (
    <DynamicFormItem key={config.fieldName} formik={formik} config={config} childDynamicFormItems={DynamicFormItems} />
  ));
}
/**
 *
 * @param {[Object]} formConfigs - required - Array of configs, don't forget to memoize when passing this array
 * @param {Object} formik - required - pass useFormik result to include validations etc
 * @returns
 */
export function DynamicFormItems({ formConfigs, formik }) {
  return <>{getDynamicFormItems({ formConfigs, formik })}</>;
}
