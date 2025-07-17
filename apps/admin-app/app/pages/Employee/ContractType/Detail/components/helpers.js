import { cloneDeep, get, isEqual, set } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export function convertDotToUnderscore(formGroups = []) {
  return formGroups.map(formGrp => ({
    ...formGrp,
    name: formGrp.name?.replace('.', '_'),
    children: formGrp.children.map(m => ({ ...m, name: m.name?.replace('.', '_') })),
  }));
}

export function convertUnderscoreToDot(dataWithUnderscoreKeys) {
  return Object.keys(dataWithUnderscoreKeys).reduce((a, c) => {
    set(a, c.replace('_', '.'), dataWithUnderscoreKeys[c]);
    return a;
  }, {});
}

export const createContractGroupKey = groupId => `contract_${groupId}`;

export const formName = 'PERSON_CONTRACT';

export function useFormItems(formStruct = {}, detailValues = {}) {
  const [state, setState] = useState([]);
  const refStruct = useRef();
  const refDetail = useRef();

  useEffect(() => {
    const isDiffStruct = !isEqual(formStruct, refStruct.current);
    const isDiffDetail = !isEqual(detailValues, refDetail.current);
    const { formItems } = formStruct;
    if (formItems?.length && (isDiffStruct || isDiffDetail)) {
      const tempData = cloneDeep(convertDotToUnderscore(formItems));
      const initValues = (detailValues || {});
      const updatedFormValues = tempData?.map(formItemGroup => {
        formItemGroup.children.map(formItem => {
          const value = get(initValues, formItem.name?.replace('_', '.')) || undefined;
          // eslint-disable-next-line no-param-reassign
          formItem.initialValue = value;
          // eslint-disable-next-line no-param-reassign
          formItem.defaultValue = value;
          return formItem;
        });
        return formItemGroup;
      });
      refStruct.current = formStruct;
      refDetail.current = detailValues;
      setState(updatedFormValues);
    }
  }, [formStruct, detailValues]);

  return state;
}
