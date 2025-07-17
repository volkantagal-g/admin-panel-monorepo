import { useEffect } from 'react';
import { isEqual, isEmpty, intersection } from 'lodash';

import { usePrevious } from '@shared/hooks';

const getObjectDiff = (obj1, obj2) => {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
      result.push(key);
    }
    else if (isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));
  return diff;
};

const useDependentFormItemValueHasChanged = (fn, dependencies) => {
  const [formValues, dependentItems] = dependencies;
  const previousFormValues = usePrevious(formValues);

  useEffect(() => {
    // previosFormValues = {name:undefined, lastName:undefined} formValues = {name:'asda', lastName:undefined}
    // create scenario
    if ((!isEmpty(previousFormValues) && Object.values(formValues).some(value => !value))) {
      const diffArr = getObjectDiff(formValues, previousFormValues);
      const intersect = intersection(diffArr, dependentItems);
      if (intersect.length) {
        const result = intersect.map(item => ({
          name: item,
          value: formValues[item],
        }));
        fn(result);
      }
    }
    // previosFormValues = {}  formValues has initialValues
    // edit/detail scenario
    else if (isEmpty(previousFormValues) && Object.values(formValues).some(value => value)) {
      const items = dependentItems.map(item => ({
        name: item,
        value: formValues[item],
      }));
      fn(items);
    }
  }, [formValues]);
};

export default useDependentFormItemValueHasChanged;
